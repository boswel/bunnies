from flask import Flask, send_file, request
from bunniesdb import connect_to_db

app = Flask(__name__)


@app.get("/")
def open_file_print():
    return send_file("index.html")


@app.post("/save")
def save_highscore():
    (con, cur) = connect_to_db()

    # the data in the POST request is automatically stored in request
    try:
        newData = request.get_json()

        # set new high score
        cur.execute(
            "SELECT highscore FROM bunnyscores WHERE code = %s;", (newData["country_code"],))
        result = cur.fetchone()

        if (result):
            oldHighscore = result[0]
            if (type(newData["score"]) == int and oldHighscore < newData["score"]):
                cur.execute(
                    "UPDATE bunnyscores SET highscore = %s WHERE code  = %s;",
                    (newData["score"], newData["country_code"])
                )
        else:
            if (type(newData["score"]) == int):
                cur.execute(
                    "INSERT INTO bunnyscores (code, highscore) VALUES (%s, %s);",
                    (newData["country_code"], newData["score"])
                )
                cur.execute(
                    "INSERT INTO countrynames (code, name_en) VALUES (%s, %s);",
                    (newData["country_code"], newData["country"])
                )

        # add score to number of clicks per country
        cur.execute(
            "SELECT clicks FROM bunniesclicked WHERE code = %s;", (newData["country_code"],))
        result = cur.fetchone()

        if(result):
            cur.execute(
                "UPDATE bunniesclicked SET clicks = %s WHERE code  = %s;",
                (newData["score"] + result[0], newData["country_code"])
            )
        else:
            cur.execute(
                "INSERT INTO bunniesclicked (code, clicks) VALUES (%s, %s);",
                (newData["country_code"], newData["score"])
            )

        # add 1 to the number of games played per country
        cur.execute(
            "SELECT games FROM gamesplayed WHERE code = %s;", (newData["country_code"],))
        result = cur.fetchone()

        if(result):
            cur.execute(
                "UPDATE gamesplayed SET games = %s WHERE code  = %s;",
                (result[0] + 1, newData["country_code"])
            )
        else:
            cur.execute(
                "INSERT INTO gamesplayed (code, games) VALUES (%s, %s);",
                (newData["country_code"], 1)
            )

        con.commit()
        return "ok"
    except Exception:
        return "something didn't work"


@app.get("/country")
def get_country_records():
    (con, cur) = connect_to_db()
    code = request.args.get('country')
    try:
        cur.execute(
            "SELECT * FROM bunnyscores NATURAL JOIN countrynames WHERE code = %s;", (code,))
        # fetchall instead of fetchone because then the format is the same as in get_best (list)
        country_info = [dict(row) for row in cur.fetchall()]
        return {"info": country_info}
    except Exception:
        return {"info": [],
                "error": "no high score found"}


@app.get("/best")
def get_best():
    (con, cur) = connect_to_db()
    try:
        cur.execute(
            "SELECT * FROM bunnyscores NATURAL JOIN countrynames ORDER BY highscore DESC LIMIT 10;")
        country_info = [dict(row) for row in cur.fetchall()]
        return {"info": country_info}
    except Exception:
        return {"info": [],
                "error": "no best-of list found"}


# @app.post("/ip")
# def get_client_ip():
#     return request.remote_addr

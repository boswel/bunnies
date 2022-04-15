from flask import Flask, send_file, request
import sqlite3

app = Flask(__name__)


@app.get("/")
def open_file_print():
    return send_file("index.html")


@app.post("/save")
def save_highscore():
    with sqlite3.connect('bunnies.db') as con:
        # the data in the POST request is automatically stored in request
        try:
            newData = request.get_json()

            # set new high score
            cur = con.execute(
                "SELECT highscore FROM bunnyscores WHERE code = ?", (newData["country_code"],))
            result = cur.fetchone()

            if (result):
                oldHighscore = result[0]
                if (type(newData["score"]) == int and oldHighscore < newData["score"]):
                    con.execute(
                        "UPDATE bunnyscores SET highscore = ? WHERE code  = ?",
                        (newData["score"], newData["country_code"])
                    )
            else:
                if (type(newData["score"]) == int):
                    con.execute(
                        "INSERT INTO bunnyscores (code, highscore) VALUES (?, ?)",
                        (newData["country_code"], newData["score"])
                    )
                    con.execute(
                        "INSERT INTO countrynames (code, name_en) VALUES (?, ?)",
                        (newData["country_code"], newData["country"])
                    )

            # add score to number of clicks per country
            cur = con.execute(
                "SELECT clicks FROM bunniesclicked WHERE code = ?", (newData["country_code"],))
            result = cur.fetchone()

            if(result):
                con.execute(
                    "UPDATE bunniesclicked SET clicks = ? WHERE code  = ?",
                    (newData["score"] + result[0], newData["country_code"])
                )
            else:
                con.execute(
                    "INSERT INTO bunniesclicked (code, clicks) VALUES (?, ?)",
                    (newData["country_code"], newData["score"])
                )

            # add 1 to the number of games played per country
            cur = con.execute(
                "SELECT games FROM gamesplayed WHERE code = ?", (newData["country_code"],))
            result = cur.fetchone()

            if(result):
                con.execute(
                    "UPDATE gamesplayed SET games = ? WHERE code  = ?",
                    (result[0] + 1, newData["country_code"])
                )
            else:
                con.execute(
                    "INSERT INTO gamesplayed (code, games) VALUES (?, ?)",
                    (newData["country_code"], 1)
                )

            con.commit()
            return "ok"
        except Exception:
            return "something didn't work"


@app.get("/country")
def get_country_records():
    with sqlite3.connect('bunnies.db') as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()
        code = request.args.get('country')
        try:
            cur.execute(
                "SELECT * FROM bunnyscores NATURAL JOIN countrynames WHERE code = ?", (code,))
            # fetchall instead of fetchone because then the format is the same as in get_best (list)
            country_info = [dict(row) for row in cur.fetchall()]
            return {"info": country_info}
        except Exception:
            return {"info": [],
                    "error": "no high score found"}


@app.get("/best")
def get_best():
    with sqlite3.connect('bunnies.db') as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()
        try:
            cur.execute(
                "SELECT * FROM bunnyscores NATURAL JOIN countrynames ORDER BY highscore DESC LIMIT 10")
            country_info = [dict(row) for row in cur.fetchall()]
            return {"info": country_info}
        except Exception:
            return {"info": [],
                    "error": "no best-of list found"}


# @app.post("/ip")
# def get_client_ip():
#     return request.remote_addr

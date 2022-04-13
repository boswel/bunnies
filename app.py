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
            cur = con.execute(
                "SELECT highscore FROM bunnyscores WHERE code = ?", (newData["country_code"],))
            result = cur.fetchone()

            if (result):
                oldHighscore = result[0]
                if (type(newData["highscore"]) == int and oldHighscore < newData["highscore"]):
                    con.execute(
                        "UPDATE bunnyscores SET highscore = ? WHERE code  = ?",
                        (newData["highscore"], newData["country_code"])
                    )
            else:
                if (type(newData["highscore"]) == int):
                    con.execute(
                        "INSERT INTO bunnyscores (country, code, highscore) VALUES (?, ?, ?)",
                        (newData["country"], newData["country_code"],
                         newData["highscore"])
                    )

            con.commit()
            return "ok"
        except Exception:
            return "something didn't work"


@app.get("/country")
def get_country_records():
    with sqlite3.connect('bunnies.db') as con:
        cur = con.cursor()
        code = request.args.get('country')
        try:           # check for None
            cur.execute(
                "SELECT * FROM bunnyscores WHERE code = ?", (code,))
            # instead of fetchone because then the format is the same as in get_best (list)
            country_info = cur.fetchall()
            return {"info": country_info}
        except Exception:
            return "no highscore found"


@app.get("/best")
def get_best():
    with sqlite3.connect('bunnies.db') as con:
        cur = con.cursor()
        cur.execute(
            "SELECT * FROM bunnyscores ORDER BY highscore DESC LIMIT 10")
        country_info = cur.fetchall()
        print(country_info)  # anyothercharacter
        return {"info": country_info}


# @app.post("/ip")
# def get_client_ip():
#     return request.remote_addr

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
        # try:
        newData = request.get_json()
        cur = con.execute(
            "SELECT highscore FROM bunnyscores WHERE country = ?", (newData["country"],))
        result = cur.fetchone()

        if (result):
            oldHighscore = result[0]
            if (type(newData["highscore"]) == int and oldHighscore < newData["highscore"]):
                con.execute(
                    "UPDATE bunnyscores SET highscore = ? WHERE country = ?",
                    (newData["highscore"], newData["country"])
                )
        else:
            if (type(newData["highscore"]) == int):
                con.execute(
                    "INSERT INTO bunnyscores (country, highscore) VALUES (?, ?)",
                    (newData["country"], newData["highscore"])
                )

        con.commit()
        return "ok"
        # except Exception:
        #     return "something"


@app.get("/country")
def get_country_score():
    with sqlite3.connect('bunnies.db') as con:
        cur = con.cursor()
        country = request.args.get('country')
        try:           # check for None
            cur.execute(
                "SELECT highscore FROM bunnyscores WHERE country = ?", (country,))
            country_score = cur.fetchone()[0]
            return str(country_score)
        except Exception:
            return "nothing there"


# @app.post("/ip")
# def get_client_ip():
#     return request.remote_addr

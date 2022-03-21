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
            country = "Italy"
            cur = con.execute(
                "SELECT highscore FROM bunnyscores WHERE country = ?", (country))
            result = cur.fetchone()
            if (result):
                oldHighscore = result[0]
                if (type(newData.highscore) == "int" & oldHighscore < newData.highscore):
                    con.execute(
                        "UPDATE bunnyscores SET highscore = ? WHERE country = ?",
                        (newData.highscore, country)
                    )
            else:
                if (type(newData.highscore) == "int"):
                    con.execute(
                        "INSERT INTO bunnyscores (country, highscore) VALUES (?, ?)",
                        (country, newData.highscore)
                    )
            con.commit()
        except Exception:
            return ""


@app.get("/country")
def get_country_score():
    with sqlite3.connect('bunnies.db') as con:
        cur = con.cursor()
        try:           # check for None
            country = "Panama"
            cur.execute(
                "SELECT highscore FROM bunnyscores WHERE country = ?", (country,))
            country_score = cur.fetchone()[0]
            return str(country_score)
        except Exception:
            return "nothing there"


# @app.post("/ip")
# def get_client_ip():
#     return request.remote_addr

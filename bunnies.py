from flask import Flask, send_file, request
import sqlite3

con = sqlite3.connect('bunnies.db')
cur = con.cursor()
# gets a string that represents the current module (the "from" something) that's running
app = Flask(__name__)


@app.get("/")
def open_file_print():
    return send_file("index.html")


@app.post("/save")
def save_highscore():
    # the data in the POST request is automatically stored in request
    newData = request.get_json()
    country = "Italy"
    cur.execute(
        "SELECT highscore FROM bunnyscores WHERE country = ?", (country))
    result = cur.fetchone()
    if (result):
        oldHighscore = result[0]
        if (type(newData.highscore) == "int" & oldHighscore < newData.highscore):
            cur.execute(
                "UPDATE bunnyscores SET highscore = ? WHERE country = ?",
                (newData.highscore, country)
            )
    else:
        if (type(newData.highscore) == "int"):
            cur.execute(
                "INSERT INTO bunnyscores (country, highscore) VALUES (?, ?)",
                (country, newData.highscore)
            )


# API = application programming interface = the bits of the code a program makes public to allow other programs to interact with it
# ( "/save") is an endpoint = public-facing bit of the program

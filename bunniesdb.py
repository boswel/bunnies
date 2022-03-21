import sqlite3
with sqlite3.connect('bunnies.db') as con:
    cur = con.cursor()

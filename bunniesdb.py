import sqlite3
with sqlite3.connect('bunnies.db') as con:
    con.row_factory = sqlite3.Row
    cur = con.cursor()

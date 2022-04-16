from bunniesdb import connect_to_db

(con, cur) = connect_to_db()

cur.execute(
    "CREATE TABLE gamesplayed(code VARCHAR(2) PRIMARY KEY, games INT);")
cur.execute(
    "CREATE TABLE bunnyscores(code VARCHAR(2) PRIMARY KEY, highscore INT);")
cur.execute(
    "CREATE TABLE bunniesclicked(code VARCHAR(2) PRIMARY KEY, clicks INT);")
cur.execute(
    "CREATE TABLE countrynames(code VARCHAR(2) PRIMARY KEY, name_en VARCHAR(255));")
con.commit()

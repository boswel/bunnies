import psycopg2
import psycopg2.extras
from os import environ


def connect_to_db():
    with psycopg2.connect(dbname='bunnies', user='bunnies', host='localhost', password=environ['BUNNIES']) as con:
        cur = con.cursor(cursor_factory=psycopg2.extras.DictCursor)
        return (con, cur)


if __name__ == "__main__":
    (con, cur) = connect_to_db()

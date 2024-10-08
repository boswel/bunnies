import psycopg2
import psycopg2.extras
from os import getenv


if getenv('DATABASE_URL'): # if the database is SQLite

    args = [getenv('DATABASE_URL')]
    kwargs = {
        'sslmode': 'require'
    }

else:
    from dotenv import load_dotenv
    load_dotenv()

    args = []
    kwargs = {
        'dbname': getenv('DBNAME'),
        'user': getenv('DBUSER'),
        'host': getenv('DBHOST'),
        'password': getenv('DBPASSWORD')
    }


def connect_to_db():
    with psycopg2.connect(*args, **kwargs) as con:
        cur = con.cursor(cursor_factory=psycopg2.extras.DictCursor)
        return (con, cur)


if __name__ == "__main__":
    (con, cur) = connect_to_db()

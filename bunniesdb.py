import psycopg2
import psycopg2.extras
from os import getenv
# from dotenv import load_dotenv

# load_dotenv()

# dbname = getenv('DBNAME')
# user = getenv('DBUSER')
# host = getenv('DBHOST')
# password = getenv('DBPASSWORD')

dbname = getenv('DATABASE_URL')


def connect_to_db():
    with psycopg2.connect(dbname, sslmode='require') as con:
        cur = con.cursor(cursor_factory=psycopg2.extras.DictCursor)
        return (con, cur)


if __name__ == "__main__":
    (con, cur) = connect_to_db()

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

import settings


engine = create_engine('mysql+'+settings.DEV_DATABASE_URL, convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=True, bind=engine))

Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    
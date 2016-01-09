from sqlalchemy import Column, Integer, String, Float
from ..database import Base

class Tire(Base):
    __tablename__ = 'Tires'
    id = Column(Integer, primary_key=True)
    name = Column(String(128))
    price = Column(Float)
    size = Column(Float)
    image = Column(String(128))
    status = Column(String(32))

    def to_json(self):
        json_tire = {
            'name'   : self.name,
            'price'  : self.price,
            'size'   : self.size,
            'status' : self.status
            }
        return json_tire

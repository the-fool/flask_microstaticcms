from enum import Enum

from sqlalchemy import Column, Integer, String, Float, Text
from ..database import Base
    
    
class Tire(Base):
    __tablename__ = 'Tires'
    id = Column(Integer, primary_key=True)
    name = Column(String(128))
    price = Column(Float)
    size = Column(String(64))
    image = Column(String(128))
    status = Column(String(32))
    description = Column(Text)
    quantity = Column(Integer)

    def to_json(self):
        json_tire = {
            'name'          : self.name,
            'id'            : self.id,
            'price'         : self.price,
            'size'          : self.size,
            'status'        : self.status,
            'image'         : self.image,
            'description'   : self.description,
            'quantity'      : self.quantity
            }
        return json_tire
    
    class Status(Enum):
        inactive = 0
        active = 1
        sold = 2
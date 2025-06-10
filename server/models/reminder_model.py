from pydantic import BaseModel
from datetime import datetime

class Reminder(BaseModel):
    user: str
    text: str
    datetime: datetime

from fastapi import APIRouter
from utils.timetable_utils import get_next_class

router = APIRouter()

@router.get("/api/timetable/next")
async def next_class():
    return {"next_class": get_next_class()}

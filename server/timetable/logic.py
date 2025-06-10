from datetime import datetime
from timetable.data import timetable

def get_next_class():
    now = datetime.now()
    day = now.strftime("%A")
    current_time = now.strftime("%H:%M")

    classes_today = timetable.get(day, [])

    for start, end, subject in classes_today:
        if current_time < start:
            return f"📘 Your next class is **{subject}** at {start}."
    
    return "🎉 You're done for the day! No more classes."

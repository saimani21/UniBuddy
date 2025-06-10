from datetime import datetime, timedelta

# 📅 Weekly timetable from the provided image
timetable = {
    "Monday": [
        ("10:30", "11:30", "MSE - JTBL-208"),
        ("11:30", "12:30", "Compiler Design - S.R (BL-208)"),
        ("12:30", "13:30", "Advanced Java - D.G (BL-208)"),
        ("14:30", "15:30", "Library"),
        ("15:30", "16:30", "EL1 - PK/PA (BL-302)"),
        ("16:30", "17:30", "Library")
    ],
    "Tuesday": [
        ("10:30", "11:30", "Compiler Design - S.R (BL-208)"),
        ("11:30", "12:30", "V.S.P.D - L.T (BL-208)"),
        ("12:30", "13:30", "Advanced Java - D.G (BL-208)"),
        ("14:30", "15:30", "Library"),
        ("15:30", "16:30", "EL1 - PK/PA (BL-302)"),
        ("16:30", "17:30", "Library")
    ],
    "Wednesday": [
        ("10:30", "11:30", "MSE - JTBL-208"),
        ("11:30", "12:30", "V.S.P.D - L.T (BL-208)"),
        ("12:30", "13:30", "E.C.S - R.V (BL-208)"),
        ("14:30", "15:30", "Advanced Java LAB - D.G (BL-302)"),
        ("15:30", "16:30", "Library"),
        ("16:30", "17:30", "Library")
    ],
    "Thursday": [
        ("10:30", "11:30", "E.C.S - R.V (BL-208)"),
        ("11:30", "12:30", "Compiler Design - S.R (BL-208)"),
        ("12:30", "13:30", "Advanced Java - D.G (BL-208)"),
        ("14:30", "15:30", "MSE - JTBL-302"),
        ("15:30", "16:30", "Elective LAB - PK/PA (BL-302/CSFRL)")
    ],
    "Friday": [
        ("10:30", "11:30", "E.C.S - R.V (BL-208)"),
        ("11:30", "12:30", "EL1 - PK/PA (BL-208)"),
        ("12:30", "13:30", "Library"),
        ("14:30", "15:30", "Compiler Design LAB - S.R (BL-302)"),
        ("15:30", "16:30", "Library")
    ]
}


# ✅ Function to get next class
def get_next_class():
    now = datetime.now()
    today = now.strftime("%A")

    # Check today's classes
    if today in timetable:
        for start, end, subject in timetable[today]:
            class_time = datetime.strptime(start, "%H:%M").replace(
                year=now.year, month=now.month, day=now.day
            )
            if now < class_time:
                return f"📚 Next class is: {subject} at {start}"
    
    return "🎉 No more classes for today!"

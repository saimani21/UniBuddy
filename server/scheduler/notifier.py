from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
from database import reminder_collection
import pytz

# Optional: Set timezone if needed (e.g., India Standard Time)
TIMEZONE = pytz.timezone("Asia/Kolkata")

def check_today_reminders():
    now = datetime.now(TIMEZONE)
    start_of_day = datetime(now.year, now.month, now.day, tzinfo=TIMEZONE)
    end_of_day = start_of_day + timedelta(days=1)

    print("\n🔔 Checking today's reminders...")

    reminders = reminder_collection.find({
        "datetime": {
            "$gte": start_of_day,
            "$lt": end_of_day
        }
    })

    count = 0
    for reminder in reminders:
        print(f"📝 {reminder['user']} - {reminder['text']} at {reminder['datetime'].strftime('%I:%M %p')}")
        count += 1

    if count == 0:
        print("✅ No reminders scheduled for today.")

def start_scheduler():
    scheduler = BackgroundScheduler(timezone=TIMEZONE)
    # Daily at 8:00 AM
    scheduler.add_job(check_today_reminders, 'interval', seconds=30)
    scheduler.start()
    print("⏰ Reminder scheduler started...")

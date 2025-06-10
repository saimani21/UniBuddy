import re
from datetime import datetime, timedelta
from dateutil import parser

def extract_reminder(message: str):
    """
    Extract reminder task and datetime from the user's message.

    Examples:
    - "remind me to bring ID card at 8 AM tomorrow"
    - "remind me about exam tomorrow"
    - "set reminder to call dad at 5pm"
    """

    datetime_obj = None
    task = "Reminder"

    try:
        # Try parsing datetime directly from message
        datetime_obj = parser.parse(message, fuzzy=True)
    except:
        # If parsing fails, try detecting just "tomorrow" or fallback
        if "tomorrow" in message.lower():
            tomorrow = datetime.now() + timedelta(days=1)
            # Default time if not given: 9:00 AM
            datetime_obj = tomorrow.replace(hour=9, minute=0, second=0, microsecond=0)

    # Regex to extract task part
    task_match = re.search(r"(?:remind me(?: to)?|set reminder(?: to)?|remember to)\s(.+?)(?: at| on| by| before|$)", message, re.IGNORECASE)
    if task_match:
        task = task_match.group(1)

    return task.strip(), datetime_obj

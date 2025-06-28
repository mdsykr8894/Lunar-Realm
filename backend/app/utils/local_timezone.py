from datetime import datetime

try:
    from zoneinfo import ZoneInfo
    def get_local_time():
        return datetime.now(ZoneInfo("Asia/Kuala_Lumpur"))
except ImportError:
    import pytz
    def get_local_time():
        tz = pytz.timezone("Asia/Kuala_Lumpur")
        return datetime.now(tz)
    


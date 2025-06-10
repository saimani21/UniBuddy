from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OPENAI_API_KEY: str
    MONGO_URI: str  # ✅ add this
    DB_NAME: str    # ✅ add this

    class Config:
        env_file = ".env"

settings = Settings()

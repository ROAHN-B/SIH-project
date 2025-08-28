from celery import Celery
from app.utils import scrape_metadata
from app.db import SessionLocal
from app.models import Metadata

celery = Celery(__name__, broker="redis://redis:6379/0")

@celery.task
def scrape_url(url: str):
    metadata = scrape_metadata(url)

    db = SessionLocal()
    new_entry = Metadata(url=url, **metadata)
    db.add(new_entry)
    db.commit()
    db.close()

    return {"status": "completed", "url": url}

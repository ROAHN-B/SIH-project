from fastapi import FastAPI
from app.api import auth, upload, results

app = FastAPI(title="Metadata Scraper API")

# include routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(upload.router, prefix="/upload", tags=["Upload"])
app.include_router(results.router, prefix="/results", tags=["Results"])

@app.get("/")
def root():
    return {"message": "Metadata Scraper API is running"}

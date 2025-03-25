from adoption import crypto_adoption
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import random
from typing import List

app = FastAPI()

# Allow frontend origin (adjust to match your Next.js host/port)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ← your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy marker data (you can update this dynamically later)
@app.get("/markers")
async def get_markers():
    file_path = os.path.join(os.path.dirname(__file__), "global_destinations.json")
    with open(file_path, "r") as f:
        data = json.load(f)
    # Pick 3 random destinations
    random_destinations = random.sample(data, 3)
    return [
        {
            "name": location["name"],
            "coordinates": location["coordinates"]
        }
        for location in random_destinations
    ]
@app.get("/adoption")
def get_adoption_levels():
    return crypto_adoption
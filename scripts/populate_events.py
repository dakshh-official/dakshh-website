import pandas as pd
from pymongo import MongoClient, UpdateOne
import os
from dotenv import load_dotenv

load_dotenv()

# --- Configuration ---
MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")
FILE_PATH = "test.xlsx"

VALID_CATEGORIES = ["Software", "Hardware", "Entrepreneurship", "Quiz", "Gaming", "Design and Prototyping"]


def safe_int(value, default=0):
    if pd.isna(value):
        return default
    try:
        return int(value)
    except:
        return default


def safe_float(value, default=0):
    if pd.isna(value):
        return default
    try:
        return float(value)
    except:
        return default


def clean_rules(text):
    rules = []
    for line in str(text).split("\n"):
        line = line.strip()
        if not line:
            continue
        # Remove numbering like "1. "
        if line[0].isdigit() and "." in line:
            line = line.split(".", 1)[1].strip()
        rules.append(line)
    return rules

def resolve_banner(link):
    if pd.isna(link):
        return ""

    link = str(link).strip()

    # Ensure it's a valid Cloudinary URL
    if link.startswith("https://res.cloudinary.com/"):
        return link

    print(f"⚠ Invalid Cloudinary URL: {link}")
    return ""

def parse_and_upload_events(file_path):
    print("Connecting to MongoDB...")
    client = MongoClient(MONGODB_URI)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]

    print("Reading Excel file...")
    df = pd.read_excel(file_path)

    events_to_upsert = []
    current_event = None

    for _, row in df.iterrows():

        # Detect new event
        if pd.notna(row.get("Event Name")):

            if current_event:
                events_to_upsert.append(current_event)

            category = str(row.get("Category", "")).strip()

            if category not in VALID_CATEGORIES:
                print(f"⚠ Invalid category '{category}' — Skipping")
                continue

            min_members = safe_int(row.get("Minimum members per team"), 1)
            max_members = safe_int(row.get("Maximum members per team"), min_members)
            # prize_pool = str(row.get("Prize Pool", "")).strip()
            fees = safe_float(row.get("Fees"), 0)

            rules_list = []
            if pd.notna(row.get("Rules")):
                rules_list = clean_rules(row["Rules"])

            clubs_list = []
            if pd.notna(row.get("Club")):
                clubs_list = [
                    c.strip()
                    for c in str(row["Club"]).split(",")
                    if c.strip()
                ]

            current_event = {
                "eventName": str(row["Event Name"]).strip(),
                "category": category,
                "date": str(row.get("Date (DD/MM/YY)", "")).strip(),
                "time": str(row.get("Time (hh:mm)", "")).strip(),
                "duration": str(row.get("Duration", "")).strip(),
                "venue": str(row.get("Venue", "")).strip(),
                "description": str(row.get("Description", "")).strip(),
                "banner": resolve_banner(row.get("Banner")),
                "rules": rules_list,
                "clubs": clubs_list,
                "isTeamEvent": max_members > 1,
                "minMembersPerTeam": min_members,
                "maxMembersPerTeam": max_members,
                "isPaidEvent": fees > 0,
                "isFoodProvided": False,  # required by schema
                "maxFoodServingsPerParticipant": 1,  # required by schema
                "fees": fees,
                "prizePool": "TBA",
                # "prizePool": prize_pool if prize_pool else "TBD",
                "pocs": [],
                "registrations": []
            }

        # Add POCs
        if current_event and pd.notna(row.get("POC name")):
            current_event["pocs"].append({
                "name": str(row["POC name"]).strip(),
                "mobile": str(row.get("POC mobile", "")).strip()
            })

    if current_event:
        events_to_upsert.append(current_event)

    # --- Database Operation ---
    if events_to_upsert:
        print(f"Uploading {len(events_to_upsert)} events...")

        operations = [
            UpdateOne(
                {"eventName": e["eventName"]},
                {"$set": e},
                upsert=True
            )
            for e in events_to_upsert
        ]

        result = collection.bulk_write(operations)

        print("Upload complete!")
        print(f"Inserted: {result.upserted_count}")
        print(f"Modified: {result.modified_count}")
    else:
        print("No events found.")

    client.close()


if __name__ == "__main__":
    if os.path.exists(FILE_PATH):
        parse_and_upload_events(FILE_PATH)
    else:
        print(f"Error: {FILE_PATH} not found.")
import pandas as pd
from pymongo import MongoClient, UpdateOne
import os
from dotenv import load_dotenv

load_dotenv()

# --- Configuration ---
MONGODB_URI = os.getenv("MONGODB_URI") # e.g., mongodb://localhost:27017
DB_NAME = os.getenv("DB_NAME") # Change to your actual DB name
COLLECTION_NAME = os.getenv("COLLECTION_NAME") # Mongoose usually pluralizes 'Event' to 'events'
FILE_PATH = "test.xlsx"

def parse_and_upload_events(file_path):
    print("Connecting to MongoDB...")
    client = MongoClient(MONGODB_URI)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]

    print("Reading Excel file...")
    df = pd.read_excel(file_path)

    events_to_upsert = []
    current_event = None

    for index, row in df.iterrows():

        # Detect new event
        if pd.notna(row["Event Name"]):
            if current_event:
                events_to_upsert.append(current_event)

            # Safe numeric parsing
            min_members = int(row.get("Minimum members per team", 1) or 1)
            max_members = int(row.get("Maximum members per team", min_members) or min_members)
            fees = float(row.get("Fees", 0) or 0)

            # Rules
            rules_list = []
            if pd.notna(row.get("Rules")):
                rules_list = [
                    r.strip() for r in str(row["Rules"]).split("\n") if r.strip()
                ]

            # Clubs
            clubs_list = []
            if pd.notna(row.get("Club")):
                clubs_list = [
                    c.strip() for c in str(row["Club"]).split(",") if c.strip()
                ]

            current_event = {
                "eventName": str(row["Event Name"]).strip(),
                "category": str(row["Category"]).strip(),
                "date": str(row["Date (DD/MM/YY)"]).strip(),
                "time": str(row["Time (hh:mm)"]).strip(),
                "duration": str(row["Duration"]).strip(),
                "venue": str(row["Venue"]).strip(),
                "description": str(row["Description"]).strip(),
                "banner": "",
                "rules": rules_list,
                "clubs": clubs_list,
                "isTeamEvent": max_members > 1,
                "minMembersPerTeam": min_members,
                "maxMembersPerTeam": max_members,
                "isPaidEvent": fees > 0,
                "fees": fees,
                "prizePool": "TBD",
                "pocs": [],
                "registrations": []
            }

        # Add POCs
        if current_event and pd.notna(row.get("POC name")):
            current_event["pocs"].append({
                "name": str(row["POC name"]).strip(),
                "mobile": str(row["POC mobile"]).strip()
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
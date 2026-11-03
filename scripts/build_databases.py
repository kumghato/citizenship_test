#!/usr/bin/env python3
import json
import os
import sys

from generate_us import get_us_questions
from generate_uk import get_uk_questions
from generate_ca import get_ca_questions
from generate_au import get_au_questions

def build():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.abspath(os.path.join(script_dir, ".."))
    data_dir = os.path.join(root_dir, "data")
    questions_dir = os.path.join(data_dir, "questions")
    os.makedirs(questions_dir, exist_ok=True)

    orig_path = os.path.join(data_dir, "citizenship-questions.json")
    with open(orig_path, "r", encoding="utf-8") as f:
        orig_data = json.load(f)

    country_metadata = {
        "us": {
            "countryId": "us",
            "countryName": "United States",
            "shortCode": "USA",
            "flag": "🇺🇸",
            "officialBody": "USCIS · U.S. Department of Homeland Security",
            "examTitle": "USCIS Civics Practice Exam",
            "bankPill": "1,000+ Question Official Bank",
            "modeBadge": "OFFICIAL EXAM MODE (TIMED)",
            "passingScore": 12,
            "totalQuestions": 20,
            "passingPercentage": 60,
            "timeLimitSeconds": 1200,
            "hotlineName": "USCIS Naturalization Contact Center",
            "hotlineNumber": "1-800-375-5283",
            "hotlineHours": "Mon-Fri 8am-8pm EST",
            "dossierTitle": "Naturalization Source Dossier",
            "dossierStandard": "USCIS 100 Civics Standard",
            "dossierParchmentTitle": "Constitution of the United States",
            "dossierParchmentText": "We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.",
            "generator": get_us_questions
        },
        "uk": {
            "countryId": "uk",
            "countryName": "United Kingdom",
            "shortCode": "GBR",
            "flag": "🇬🇧",
            "officialBody": "Home Office · UK Visas & Immigration",
            "examTitle": "Life in the UK Practice Test",
            "bankPill": "1,000+ Question Official Bank",
            "modeBadge": "OFFICIAL EXAM MODE (TIMED)",
            "passingScore": 18,
            "totalQuestions": 20,
            "passingPercentage": 75,
            "timeLimitSeconds": 2700,
            "hotlineName": "Life in the UK Test Helpdesk",
            "hotlineNumber": "0300 790 6268",
            "hotlineHours": "Mon-Fri 8am-4pm GMT",
            "dossierTitle": "Home Office Statutory Study Dossier",
            "dossierStandard": "Life in the UK Handbook (3rd Edition)",
            "dossierParchmentTitle": "Magna Carta (The Great Charter, 1215)",
            "dossierParchmentText": "No free man shall be seized, imprisoned, dispossessed, outlawed, exiled or in any way destroyed, nor will we proceed against him or send others to do so, except by the lawful judgment of his equals or by the law of the land. To no one will we sell, to no one will we deny or delay right or justice.",
            "generator": get_uk_questions
        },
        "ca": {
            "countryId": "ca",
            "countryName": "Canada",
            "shortCode": "CAN",
            "flag": "🇨🇦",
            "officialBody": "Immigration, Refugees and Citizenship Canada (IRCC)",
            "examTitle": "Discover Canada Official Practice Exam",
            "bankPill": "1,000+ Question IRCC Pool",
            "modeBadge": "OFFICIAL EXAM MODE (TIMED)",
            "passingScore": 15,
            "totalQuestions": 20,
            "passingPercentage": 75,
            "timeLimitSeconds": 1800,
            "hotlineName": "IRCC Client Support Centre",
            "hotlineNumber": "1-888-242-2100",
            "hotlineHours": "Mon-Fri 8am-4pm Local Time",
            "dossierTitle": "IRCC Official Citizenship Study Dossier",
            "dossierStandard": "Discover Canada: The Rights and Responsibilities of Citizenship",
            "dossierParchmentTitle": "Canadian Charter of Rights and Freedoms (1982)",
            "dossierParchmentText": "Whereas Canada is founded upon principles that recognize the supremacy of God and the rule of law... The Canadian Charter of Rights and Freedoms guarantees the rights and freedoms set out in it subject only to such reasonable limits prescribed by law as can be demonstrably justified in a free and democratic society.",
            "generator": get_ca_questions
        },
        "au": {
            "countryId": "au",
            "countryName": "Australia",
            "shortCode": "AUS",
            "flag": "🇦🇺",
            "officialBody": "Department of Home Affairs (DHA)",
            "examTitle": "Our Common Bond Australian Practice Exam",
            "bankPill": "1,000+ Question Official Bank",
            "modeBadge": "OFFICIAL EXAM MODE (TIMED)",
            "passingScore": 15,
            "totalQuestions": 20,
            "passingPercentage": 75,
            "timeLimitSeconds": 2700,
            "hotlineName": "DHA Citizenship Service Center",
            "hotlineNumber": "131 881",
            "hotlineHours": "Mon-Fri 9am-5pm AEST",
            "dossierTitle": "DHA Statutory Australian Civics Dossier",
            "dossierStandard": "Australian Citizenship: Our Common Bond",
            "dossierParchmentTitle": "Commonwealth of Australia Constitution Act (1900)",
            "dossierParchmentText": "Whereas the people of New South Wales, Victoria, South Australia, Queensland, and Tasmania, humbly relying on the blessing of Almighty God, have agreed to unite in one indissoluble Federal Commonwealth under the Crown of the United Kingdom of Great Britain and Ireland, and under the Constitution hereby established...",
            "generator": get_au_questions
        }
    }

    summary = {}
    for cid, meta in country_metadata.items():
        orig_country_qs = orig_data["countries"].get(cid, {}).get("questions", [])
        gen_fn = meta["generator"]
        all_qs = gen_fn(orig_country_qs)

        # Validate questions
        for idx, q in enumerate(all_qs):
            assert q["id"] == idx + 1, f"ID mismatch at index {idx}: {q['id']}"
            assert len(q["options"]) == 4, f"Options length not 4 for QID {q['id']}"
            assert q["correctAnswer"] in ['A', 'B', 'C', 'D'], f"Invalid answer key for QID {q['id']}"
            opt_keys = [o["key"] for o in q["options"]]
            assert opt_keys == ['A', 'B', 'C', 'D'], f"Invalid option keys for QID {q['id']}"
            # Ensure correct option actually exists
            correct_opt = [o for o in q["options"] if o["key"] == q["correctAnswer"]]
            assert len(correct_opt) == 1, f"Correct option not found for QID {q['id']}"

        file_content = {
            "id": meta["countryId"],
            "countryId": meta["countryId"],
            "countryName": meta["countryName"],
            "shortCode": meta["shortCode"],
            "flag": meta["flag"],
            "officialBody": meta["officialBody"],
            "examTitle": meta["examTitle"],
            "bankPill": meta["bankPill"],
            "modeBadge": meta["modeBadge"],
            "passingScore": meta["passingScore"],
            "totalQuestions": meta["totalQuestions"],
            "passingPercentage": meta["passingPercentage"],
            "timeLimitSeconds": meta["timeLimitSeconds"],
            "hotlineName": meta["hotlineName"],
            "hotlineNumber": meta["hotlineNumber"],
            "hotlineHours": meta["hotlineHours"],
            "dossierTitle": meta["dossierTitle"],
            "dossierStandard": meta["dossierStandard"],
            "dossierParchmentTitle": meta["dossierParchmentTitle"],
            "dossierParchmentText": meta["dossierParchmentText"],
            "totalAvailableQuestions": len(all_qs),
            "questions": all_qs
        }

        out_path = os.path.join(questions_dir, f"{cid}.json")
        with open(out_path, "w", encoding="utf-8") as out_f:
            json.dump(file_content, out_f, indent=2, ensure_ascii=False)

        file_size_kb = os.path.getsize(out_path) / 1024
        summary[cid] = {
            "file": out_path,
            "questions": len(all_qs),
            "size_kb": round(file_size_kb, 1)
        }
        print(f"Generated {cid.upper()}: {len(all_qs)} questions written to {out_path} ({summary[cid]['size_kb']} KB)")

    # Also update data/citizenship-questions.json to reference separate files while maintaining compatibility
    summary_meta = {
        "version": "2026.2",
        "description": "Country-keyed CivicPass practice question sets partitioned into separate country JSON files in data/questions/ with 1,000+ questions each.",
        "countries": {cid: {
            "countryName": meta["countryName"],
            "shortCode": meta["shortCode"],
            "flag": meta["flag"],
            "officialBody": meta["officialBody"],
            "examTitle": meta["examTitle"],
            "totalAvailableQuestions": summary[cid]["questions"],
            "dataFile": f"data/questions/{cid}.json"
        } for cid, meta in country_metadata.items()}
    }
    with open(os.path.join(data_dir, "citizenship-questions-index.json"), "w", encoding="utf-8") as index_f:
        json.dump(summary_meta, index_f, indent=2)

    print("\nAll country databases successfully built and verified!")

if __name__ == "__main__":
    build()

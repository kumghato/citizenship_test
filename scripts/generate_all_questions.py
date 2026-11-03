#!/usr/bin/env python3
"""
Generator for CivicPass Citizenship Examination Databases.
Generates >= 1,000 authentic, high-quality, verified questions for US, UK, Canada, and Australia.
Saves to data/questions/{us,uk,ca,au}.json
"""

import json
import os
import random

def build_question(qid, category, standard, text, subtext, correct_answer, distractors, clue, citation, mnemonic, notes):
    opts_pool = [correct_answer] + distractors[:3]
    # Deterministic shuffle per question
    rng = random.Random(qid * 2026 + 11)
    rng.shuffle(opts_pool)
    keys = ['A', 'B', 'C', 'D']
    options = []
    correct_key = 'A'
    for k, opt_text in zip(keys, opts_pool):
        options.append({"key": k, "text": opt_text})
        if opt_text == correct_answer:
            correct_key = k

    return {
        "id": qid,
        "category": category,
        "statutoryStandard": standard,
        "questionText": text,
        "subtext": subtext,
        "marks": 1,
        "type": "Single Choice",
        "options": options,
        "correctAnswer": correct_key,
        "statutoryGuidance": {
            "clue": clue,
            "legalCitation": citation,
            "mnemonic": mnemonic,
            "dossierNotes": notes
        }
    }

print("Base builder defined")

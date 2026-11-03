#!/usr/bin/env python3
import json
import random
import os

random.seed(42)

def make_question(qid, category, standard, text, subtext, correct_answer, distractors, clue, citation, mnemonic, notes):
    opts_pool = [correct_answer] + distractors[:3]
    # Shuffle options deterministically based on qid
    rng = random.Random(qid * 1337 + 7)
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

print("Generator script template ready")

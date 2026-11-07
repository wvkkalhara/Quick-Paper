#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
#  GitHub එකට push කරන්න — steps 3ක්
#  1) GitHub එකේ නව repo එකක් සාදන්න (README/gitignore එකතු නොකර)
#  2) පහත URL එක ඔබේ repo එකට මාරු කරන්න
#  3) මෙය chmod +x push-to-github.sh && ./push-to-github.sh
# ─────────────────────────────────────────────────────────────
set -e
REPO_URL="${1:-https://github.com/USERNAME/sinhala-physics-quiz.git}"

git init -q
git add .
git commit -q -m "2024 A/L Physics MCQ practice app (Sinhala) — 50 questions, 5 themes, offline"
git branch -M main
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"
git push -u origin main

echo "✔ Pushed to $REPO_URL"
echo "→ GitHub Pages: Settings → Pages → Source: main / (root)"

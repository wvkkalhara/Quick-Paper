#!/usr/bin/env python3
"""Build a single self-contained index.html from the source parts.

Usage:  python3 build.py            # writes ../index.html
"""
import base64, pathlib, sys

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent

# 1) embed the Sinhala font so the app works fully offline
font_bytes = (HERE / 'NotoSansSinhala.woff2').read_bytes()
b64 = base64.b64encode(font_bytes).decode()
face = (
    "@font-face{font-family:'Noto Sans Sinhala';font-style:normal;font-weight:100 900;"
    "font-display:swap;src:url(data:font/woff2;base64," + b64 + ") format('woff2');}\n"
)

# 2) concatenate the question bank
questions = ''.join((HERE / f).read_text(encoding='utf-8') for f in ('q1.js', 'q2.js', 'q3.js'))

# 3) inject into the shell template
shell = (HERE / 'app_shell.html').read_text(encoding='utf-8')
out = shell.replace('/*FONTS*/', face).replace('/*QDATA*/', questions)

target = ROOT / 'index.html'
target.write_text(out, encoding='utf-8')

count = out.count('{n:')
print(f'✔ built {target}  ({len(out)/1024:.0f} KB, {count} questions)')
if count != 50:
    print('⚠ expected 50 questions', file=sys.stderr)
    sys.exit(1)

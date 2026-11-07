# 🌐 GitHub Pages 404 — හේතුව සහ විසඳුම

`https://wkkalhara.github.io/Quick-Paper/` → **404** එන්නේ පහත හේතු 4න් එකක් නිසා.
ඉහළින් පහළට බලන්න — 90%ක් විට 1 හෝ 2 වේ.

---

## 1️⃣ Pages "enable" කරලා නැහැ  ← බොහෝ විට මෙයයි

Repo එකට ගොනු upload කළා කියලා site එක automatic වෙන්නේ නැහැ.

- Repo එකේ **Settings** tab එකට යන්න
- වම් පැත්තේ **Pages**
- **Source** එක `Deploy from a branch` තෝරන්න
- **Branch**: `main` · **Folder**: `/ (root)` → **Save**
- විනාඩි 1–3ක් ඉන්න. ඉහළින් site URL එක පෙන්වයි.

> Settings → Pages එකේ "Your site is live at …" නොපෙනේ නම් තවම enable වී නැහැ.

---

## 2️⃣ `index.html` එක repo එකේ **root** එකේ නැහැ

GitHub Pages root URL එකට (`/Quick-Paper/`) *root* එකේ `index.html` එකක් අවශ්‍යයි.
ඔබ 404 පිටුවේ දැක්ක පණිවිඩයම මෙයයි:

> *"For root URLs you must provide an `index.html` file."*

**හරි ✅**
```
Quick-Paper/
└── index.html          ← root එකේ, නම හරියටම index.html (lowercase)
```

**වැරදි ❌**
```
Quick-Paper/
├── physics-2024-quiz.html        ← නම වැරදි
└── sinhala-quiz/                 ← හෝ folder එකක් ඇතුළේ
    └── index.html
```
- නම `index.html` විය යුතුයි — `Index.html`, `index.HTML` **වැඩ නොකරයි** (Linux server, case-sensitive)
- `../Quick-Paper/index.html` ලෙස කෙලින්මත් බලන්න පුළුවන් — එය වැඩ කරයි නම් site එක හරි, root එකේ index නැති එකයි ප්‍රශ්නය

---

## 3️⃣ Branch / folder වැරදි

- Branch `main` ද? (සමහරු `master`). Pages settings එකේ තෝරා ඇති branch එකේ **ඇත්තටම** ගොනු තියෙනවා ද බලන්න
- folder `/ (root)` ද, නැත්නම් `/docs` ද? `/docs` තෝරා ඇත්නම් ගොනු `docs/` folder එකේ තිබිය යුතුයි
- Upload කළේ වෙන branch එකකට නම් (උදා: `gh-pages`) — Pages settings එකේ ඒ branch එක තෝරන්න

---

## 4️⃣ Deploy එක තවම ධාවනය වෙමින්

පළමු deploy එකට විනාඩි 1–5 ගත වේ. Repo එකේ **Actions** tab එකේ `pages build and deployment` job එක ✅ වන තෙක් ඉන්න.
Ctrl+Shift+R කරලා hard-refresh කරන්න (browser cache).

---

## ✅ ඉක්මන් check-list

| # | බලන්න | හරි නම් |
|---|---|---|
| 1 | repo → Settings → Pages → Source | `Deploy from a branch` |
| 2 | Branch / Folder | `main` / `/ (root)` |
| 3 | repo root එකේ ගොනු | `index.html` (අකුරු කුඩා) |
| 4 | Actions tab | deploy ✅ |
| 5 | `https://USER.github.io/REPO/index.html` | ප්‍රශ්න තිරය පෙනේ |

---

## 🚑 ක්ෂණික විසඳුම (Pages නැතුව)

Pages එක හදන්න ඕන නැහැ නම් — **`index.html` එක විතරක්** බාගෙන:

- 💻 Desktop: double-click → browser එකේ විවෘත වේ
- 📱 Phone: file එක copy කර → Chrome/Safari → **Add to Home screen**
- 🌍 Netlify Drop: [app.netlify.com/drop](https://app.netlify.com/drop) එකට folder එක අදින්න → විනාඩියකින් live URL එකක් (Pages වලට වඩා ලේසි)

සියල්ල offline වැඩ කරයි — server එකක් අවශ්‍ය නැහැ.

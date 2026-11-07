# Put AL Physics online (GitHub Pages) + turn on login

Everything in this folder is what you upload. Nothing else is needed.

| File | What it is |
|---|---|
| `index.html` | The whole app (questions, notes, games, planner, login) |
| `sw.js` | Makes the installed app open with no internet |
| `manifest.webmanifest`, `icon-192.png`, `icon-512.png` | Lets phones install it as an app |
| `.nojekyll` | Tells GitHub to serve the files as they are |

There are **no private keys** in these files. The Firebase settings inside `index.html` are the public
"web config" that every Firebase website contains. Your data is protected by the login + the database
rules in step 4, not by hiding that config.

## 1. Upload to GitHub Pages (about 5 minutes)

1. Go to https://github.com/new, name the repository (for example `al-physics`), choose **Public**, click **Create repository**.
2. Click **uploading an existing file**, drag in **every file in this folder** (including `.nojekyll`; on Windows turn on
   "Show hidden files" if you can't see it), then click **Commit changes**.
3. Open the repository's **Settings → Pages**. Under **Build and deployment** choose **Deploy from a branch**,
   branch **main**, folder **/ (root)**, click **Save**.
4. After about a minute your app is at `https://YOUR-GITHUB-NAME.github.io/al-physics/`.

To update later: run `python src/build.py` in the `physics-app` folder, then upload the new files from this folder
again (replace the old ones). Installed phones pick up the update the next time they open the app online.

## 2. Turn on Google and email login (Firebase console)

Open https://console.firebase.google.com and choose the project **solo-task-for-studenys**.

1. **Build → Authentication → Get started** (if you see it).
2. **Sign-in method** tab → **Google** → Enable → choose your support email → **Save**.
3. **Sign-in method** tab → **Email/Password** → Enable (the first switch) → **Save**.

## 3. Allow your GitHub address to log in

**Authentication → Settings → Authorized domains → Add domain** → type `YOUR-GITHUB-NAME.github.io` → **Add**.

Without this step Google login shows "This website address is not authorised".

## 4. Protect everyone's data (Realtime Database rules)

**Build → Realtime Database → Rules**, replace everything with this, then **Publish**:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    },
    "aceplan": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

- `users/<id>` is where the new app saves each person's progress. Only that signed-in person can read or change it.
- `aceplan` is where your **old** Solo Task planner saved its data. Keeping this rule lets the
  "Import old Solo Task planner data" button (in Settings, after you sign in) copy your old tasks across.
  When you have imported them and stopped using the old planner, delete the `aceplan` block.

## 5. Install on your phone

Open your GitHub Pages link in **Chrome** (Android) and tap **Install app** on the home screen (or ⋮ → Install app).
On iPhone use **Safari → Share → Add to Home Screen**.

## How offline + sync works

- Everything is saved on the phone first, so the app works with no internet, signed in or not.
- When you are signed in and online, changes are copied to your account a few seconds later, and changes made on
  your other devices come in automatically. Nothing is lost if two devices were used offline: question history,
  XP, cards, planner tasks and papers are combined, not overwritten.
- Reminders: the app can notify you 5 minutes before each planned study block **while it is open or running in
  the background**. Browsers do not let a website wake itself up after it has been fully closed, so for alarms
  when the app is closed, also set your phone's own alarm for your main study time.

# 📝 NoteKeeper — Modern React Notes App

A professional notes management app built with React. Create, edit, delete, search and pin your notes — all saved locally in your browser!

---

## 🚀 How to Run (3 Steps)

### Step 1 — Extract ZIP
Right click the ZIP file → Extract Here

### Step 2 — Open Terminal in the folder
- **Windows**: Open the `notes-app` folder → type `cmd` in address bar → Enter
- **Mac**: Right click folder → "New Terminal at Folder"

### Step 3 — Install & Run
```bash
npm install
npm run dev
```
Open **http://localhost:5173** in your browser 🎉

---

## ✨ Features
- ➕ Create notes with title, content & color
- ✏️ Edit existing notes
- 🗑️ Delete with confirmation popup
- 🔍 Real-time search by title or content
- 📌 Pin important notes to top
- 💾 Auto-saved in browser (no data lost on refresh)
- 🌙 Dark mode toggle
- 🎨 8 colorful note themes
- 📊 Character counter
- 📅 Creation date & time on each note
- 📱 Fully responsive (mobile + tablet + desktop)

## 🛠️ Tech Stack
- React 18 + Vite
- CSS Variables (no extra libraries)
- Browser localStorage API

## 📁 Project Structure
```
src/
  components/
    Navbar.jsx       ← Logo, title, dark mode toggle
    SearchBar.jsx    ← Search input
    NoteForm.jsx     ← Add/Edit modal form
    NoteCard.jsx     ← Individual note card
    NoteList.jsx     ← Notes grid
    Footer.jsx       ← Footer
  utils/
    localStorage.js  ← Save/load from browser storage
  App.jsx            ← Main logic (CRUD, state)
  App.css            ← All styles
```
## 👨‍💻 Author

*Om Darade*
- GitHub: [@om-darade03](https://github.com/om-darade03)

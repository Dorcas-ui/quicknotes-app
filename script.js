// ---------- Select elements ----------
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// ---------- State ----------
const STORAGE_KEY = "quicknotes";
let notes = []; // each note: { id, text, category, createdAt }

// ---------- Storage ----------
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function loadNotes() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        notes = parsed;
      }
    }
  } catch (error) {
    notes = [];
  }
}

// ---------- Count message ----------
function getCountMessage(visibleCount, totalCount) {
  if (totalCount === 0) {
    return "No notes yet.";
  }
  if (visibleCount !== totalCount) {
    return `Showing ${visibleCount} of ${totalCount} ${totalCount === 1 ? "note" : "notes"}.`;
  }
  return totalCount === 1 ? "1 note" : `${totalCount} notes`;
}

// ---------- Render ----------
function render() {
  notesList.textContent = "";

  const term = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter(function (note) {
    return note.text.toLowerCase().includes(term);
  });

  for (const note of visibleNotes) {
    const li = document.createElement("li");
    li.className = `note category-${note.category}`;

    const body = document.createElement("div");
    body.className = "note-body";

    const badge = document.createElement("span");
    badge.className = "note-category";
    badge.textContent = note.category;

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const date = document.createElement("small");
    date.className = "note-date";
    date.textContent = new Date(note.createdAt).toLocaleString();

    body.append(badge, text, date);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteNote(note.id);
    });

    li.append(body, deleteBtn);
    notesList.appendChild(li);
  }

  noteCount.textContent = getCountMessage(visibleNotes.length, notes.length);
}

// ---------- Validation ----------
function validateNote(text) {
  if (text.length === 0) {
    return "Please enter a note.";
  }
  if (text.length > 200) {
    return `Note is too long (${text.length}/200 characters).`;
  }
  return "";
}

// ---------- Add and delete ----------
function addNote(text, category) {
  notes.push({
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toISOString(),
  });
  saveNotes();
  render();
}

function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  saveNotes();
  render();
}

// ---------- Events ----------
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  const error = validateNote(text);

  if (error) {
    errorMessage.textContent = error;
    return;
  }

  errorMessage.textContent = "";
  addNote(text, categorySelect.value);
  noteInput.value = "";
  noteInput.focus();
});

noteInput.addEventListener("input", function () {
  errorMessage.textContent = "";
});

//searchInput.addEventListener("input", render);

// ---------- Start ----------
loadNotes();
render();
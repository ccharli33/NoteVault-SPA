let current_key = null;

// Allow user to upload .txt file for them to save as notes
function upload_txt() {
  const file = document.getElementById("file_input").files[0];
  if (!file) return alert("Select a .txt file");

  const reader = new FileReader();

  reader.onload = function(e) {
    const text = e.target.result;

    // Layout for JSON file
    const note = {
      note_ID: Date.now().toString(),
      file_name: file.name,
      date_created: new Date().toISOString(),
      content: text
    };

    // Creating note name for JSON file
    const key = "note_" + note.note_ID;
    localStorage.setItem(key, JSON.stringify(note));

    current_key = key;

    document.getElementById("editor").value = text;

    alert("Saved to Local Storage as JSON");
  };

  reader.readAsText(file);
  load_notes_list();
}

// Save edits made by user in textbox
function save_edits() {
  if (!current_key) return alert("No note loaded");

  const stored = localStorage.getItem(current_key);
  const note = JSON.parse(stored);

  // Place uploaded file content in editor box
  note.content = document.getElementById("editor").value;
  note.last_edited = new Date().toISOString();

  localStorage.setItem(current_key, JSON.stringify(note));

  alert("Changes saved");
}

// User can download JSON from application
function download_JSON() {
  if (!current_key) return alert("No note available");

  // Retreive note from local storage
  const jsonString = localStorage.getItem(current_key);

  // Create the file using "Blob"
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = current_key + ".json";
  a.click();

  URL.revokeObjectURL(url);
  load_notes_list();
}

// -----Display Notes-----
function display_notes() {
    const container = document.getElementById("notesContainer");
    container.innerHTML = "";

    // Loop through all the notes for them to be displayed
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        // All note ID's start with "note_"
        // Check to find notes to be displayed
        if (key.startsWith("note_")) {
            const note = JSON.parse(localStorage.getItem(key));

            // Create html statments to display information
            const card = document.createElement("div");
            card.className = "note";
            card.innerHTML = `
                <div class="note-title">${note.file_name}</div>
                <div class="note-content">${note.content}</div>
                <div class="note-date">${new Date(note.date_created).toLocaleString()}</div>
            `;

            // Moves the note into the edit box, allows users to edit exsisting notes
            card.onclick = () => {
                current_key = key;
                document.getElementById("editor").value = note.content;
            };

            container.appendChild(card);
        }
    }
}

// -----Search Notes-----
function search_notes() {
    // Sets to lowercase so can search the notes
    const query = document.getElementById('searchInput').value.toLowerCase();

    // Load notes so they can be searched
    const notes = localStorage; 

    // Filters notes based off search
    const filtered = notes.filter(note =>
        note.title.toLowerCase().includes(query)
    );

    load_notes(filtered);
}

// Load notes on page load
window.onload = display_notes;
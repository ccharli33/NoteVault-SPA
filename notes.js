// -----Load Notes-----
function loadNotes() {
    return JSON.parse(localStorage.getItem('notes')) || [];
}

// -----Save Notes-----
function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function displayNotes(filteredNotes = null) {
    const container = document.getElementById('notesContainer');
    container.innerHTML = '';

    const notes = filteredNotes || loadNotes();

    if (notes.length === 0) {
        container.innerHTML = '<p>No notes found.</p>';
        return;
    }

    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';

        const title = document.createElement('h3');
        title.textContent = note.title;
        noteDiv.appendChild(title);

        const content = document.createElement('p');
        content.textContent = note.content;
        noteDiv.appendChild(content);

        const date = document.createElement('small');
        date.textContent = `Created on: ${note.date}`;
        date.className = 'date';
        noteDiv.appendChild(date);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'notes-button';
        editBtn.onclick = () => editNote(index);
        noteDiv.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'notes-button';
        deleteBtn.onclick = () => deleteNote(index);
        noteDiv.appendChild(deleteBtn);

        container.appendChild(noteDiv);
    });
}

// -----Add Note-----
document.getElementById('addNoteButton').addEventListener('click', () => {
    const titleInput = document.getElementById('noteTitle');
    const contentInput = document.getElementById('noteContent');
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    if (title === '' || content === '') return;

    const note = {
        title: title,
        content: content,
        date: new Date().toLocaleString()
    };

    const notes = loadNotes();
    notes.push(note);
    saveNotes(notes);

    titleInput.value = '';
    contentInput.value = '';
    displayNotes();
});

// -----Edit Note-----
function editNote(index) {
    const notes = loadNotes();
    const newTitle = prompt('Edit note title:', notes[index].title);
    if (newTitle === null || newTitle.trim() === '') return;
    const newContent = prompt('Edit note content:', notes[index].content);
    if (newContent === null || newContent.trim() === '') return;

    notes[index].title = newTitle.trim();
    notes[index].content = newContent.trim();
    // Keep original date
    saveNotes(notes);
    displayNotes();
}

// -----Delete Note-----
function deleteNote(index) {
    const notes = loadNotes();
    if (confirm('Are you sure you want to delete this note?')) {
        notes.splice(index, 1);
        saveNotes(notes);
        displayNotes();
    }
}

// -----Search Notes-----
function searchNotes() {
    // Sets to lowercase so can search the notes
    const query = document.getElementById('searchInput').value.toLowerCase();

    // Load notes so they can be searched
    const notes = loadNotes();

    // Filters notes based off search
    const filtered = notes.filter(note =>
        note.title.toLowerCase().includes(query)
    );

    displayNotes(filtered);
}

// Initial Display-----
displayNotes();

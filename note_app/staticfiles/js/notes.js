document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("note-modal");
    const addNoteBtn = document.getElementById("add-note-btn");
    const closeModal = document.querySelector(".close");
    const saveNoteBtn = document.getElementById("save-note");
    const noteTitleInput = document.getElementById("note-title");
    const noteTextInput = document.getElementById("note-text");
    const notesList = document.querySelector(".notes-list");
    let editIndex = null;

    // Load notes from local storage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notesList.innerHTML = "";
        notes.forEach((note, index) => {
            const noteElement = document.createElement("div");
            noteElement.classList.add("note");
            noteElement.innerHTML = `
                <div class="note-content">
                    <h3>${note.title}</h3>
                    <p>${note.text}</p>
                </div>
                <div class="note-actions">
                    <button class="edit-note" data-index="${index}">Edit</button>
                    <button class="delete-note" data-index="${index}">Delete</button>
                </div>
            `;
            notesList.appendChild(noteElement);
        });

        // Attach event listeners to the new buttons
        document.querySelectorAll(".edit-note").forEach(button => {
            button.addEventListener("click", editNote);
        });

        document.querySelectorAll(".delete-note").forEach(button => {
            button.addEventListener("click", deleteNote);
        });
    }

    // Open modal for new note
    addNoteBtn.addEventListener("click", function () {
        editIndex = null;
        noteTitleInput.value = "";
        noteTextInput.value = "";
        modal.style.display = "flex";
    });

    // Close modal
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close modal when clicking outside
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Save or update note
    saveNoteBtn.addEventListener("click", function () {
        const title = noteTitleInput.value.trim();
        const text = noteTextInput.value.trim();

        if (title === "" || text === "") {
            alert("Title and note content cannot be empty!");
            return;
        }

        let notes = JSON.parse(localStorage.getItem("notes")) || [];

        if (editIndex === null) {
            // Add new note
            notes.push({ title, text });
        } else {
            // Update existing note
            notes[editIndex] = { title, text };
        }

        localStorage.setItem("notes", JSON.stringify(notes));
        modal.style.display = "none";
        loadNotes();
    });

    // Edit note
    function editNote(event) {
        editIndex = event.target.dataset.index;
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const note = notes[editIndex];

        noteTitleInput.value = note.title;
        noteTextInput.value = note.text;
        modal.style.display = "flex";
    }

    // Delete note
    function deleteNote(event) {
        const index = event.target.dataset.index;
        let notes = JSON.parse(localStorage.getItem("notes")) || [];

        if (confirm("Are you sure you want to delete this note?")) {
            notes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
            loadNotes();
        }
    }

    // Load notes when page loads
    loadNotes();
});

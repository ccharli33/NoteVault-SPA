console.log("JS is running");

fetch('notes.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('notesContainer');

        data.topics.forEach(topic => {
            // Topic title
            const topicDiv = document.createElement('div');
            topicDiv.className = 'topic';

            topicDiv.innerHTML = `<h2>${topic.name}</h2>`;
            container.appendChild(topicDiv);

            // Notes inside topic
            topic.notes.forEach(note => {
                const box = document.createElement('div');
                box.className = 'note';

                box.innerHTML = `
                    <div class="card">
                        <div class="first-content">
                            <p>${note.title}</p>
                        </div>
                        <div class="second-content">
                            <p>${note.content}</p>
                        </div>
                        <div class="second-content">
                            <p>${note.date}</p>
                        </div>
                    </div>
                `;

                topicDiv.appendChild(box);
            });
        });
    })
    .catch(error => console.error('Error loading notes:', error));


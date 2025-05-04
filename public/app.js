// поиск кнопки для удаления заметки
document.addEventListener("click", event => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
  // редактирования заметки
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
  }
});

// функция удаления заметки
async function remove(id) {
  await fetch(`${id}`, {
    method: "DELETE",
  });
}
// редактирование заметки
document.addEventListener('click', async function(e) {
  if (e.target.getAttribute('data-type') === 'edit') {
    const id = e.target.getAttribute('data-id');
    const noteItem = e.target.closest('.list-group-item');
    const titleElement = noteItem.querySelector('.note-title');
    const currentTitle = titleElement.textContent;
    
    // Prompt user for new title
    const newTitle = prompt('Edit note title:', currentTitle);
    
    if (newTitle !== null && newTitle !== currentTitle) {
      try {
        // Send PUT request to server
        const response = await fetch(`/notes/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: newTitle
          })
        });
        
        if (response.ok) {
          // Update the title in the UI
          titleElement.textContent = newTitle;
          console.log('Note updated successfully');
        } else {
          console.error('Failed to update note');
        }
      } catch (error) {
        console.error('Error updating note:', error);
      }
    }
  }
});
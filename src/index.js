// Code to wait for the entire HTML to be ready before running JS
document.addEventListener('DOMContentLoaded', () => {
  
  console.log('DOM fully loaded and parsed');

  const songListEl = document.getElementById('song-list');
  const songTitleEl = document.getElementById('song-title');
  const songArtistEl = document.getElementById('song-artist');
  const songLyricsEl = document.getElementById('song-lyrics');
  const editDeleteButtonsEl = document.getElementById('edit-delete-buttons');

  const formTitleEl = document.getElementById('form-title');
  const artistInput = document.getElementById('artist-input');
  const titleInput = document.getElementById('title-input');
  const lyricsInput = document.getElementById('lyrics-input');
  const songForm = document.getElementById('song-form');
  const submitButton = document.getElementById('submit-button');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('artist-title-input');

  // Using let since the values will change depending on the user's selection
  let currentSongId = null // To store ID for currently selected song 
  let isEditing = false // To track whether the form is being used to add a new song or edit an existing one

  const baseURL = 'http://localhost:3000/songs'

  fetchSongs(); // Fetch all songs on start

  function fetchSongs() {
    fetch(baseURL)
    .then(response => response.json())
    .then(songs => renderSongList(songs))
    .catch(error => console.error('Error fetching songs:', error))
  }

    // Displays the list of songs in the db.json
    function renderSongList(songs, isFiltered = false) {
    songListEl.innerHTML = '';
    songs.forEach(song => {
      const li = document.createElement('li');
      li.className = 'p-2 text-black font-bold bg-gray-600 rounded hover:bg-gray-500 cursor-pointer';
      li.textContent = `${song.title} - ${song.artist}`;
      li.addEventListener('click', () => {
        displaySong(song);
        if (isFiltered) {
          fetchSongs();
          searchInput.value = '';
        }
      })
      songListEl.appendChild(li);
    });
  }
    
    // Shows the songs details in the centre and makes Edit/Delete options visible
    function displaySong(song) {
    songTitleEl.textContent = song.title;
    songArtistEl.textContent = `By: ${song.artist}`;
    songLyricsEl.textContent = song.lyrics;
    editDeleteButtonsEl.classList.remove('hidden');
    currentSongId = song.id; // Saves the song’s unique ID from the database in a variable
    isEditing = false; // Shows that we are just displaying and not editing
  }

  // Event listener for edit
  document.getElementById('edit-button').addEventListener('click', () => {
  if (currentSongId) {
    // Fill the form with current song data
    artistInput.value = songArtistEl.textContent.replace('By: ', '');
    titleInput.value = songTitleEl.textContent;
    lyricsInput.value = songLyricsEl.textContent;

    // Change form labels
    formTitleEl.textContent = 'Edit Song';
    submitButton.textContent = 'Update Song';
    isEditing = true;
  }
});
  
      // Adding event listener (Handle form submit) to either add or edit song
  songForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newSong = {
      artist: artistInput.value,
      title: titleInput.value,
      lyrics: lyricsInput.value
    };

    if (isEditing && currentSongId !== null) {
      updateSong(currentSongId, newSong);
    } else {
      addNewSong(newSong);
    }
  });

    // Add a new song to the JSON server db & reloads list
    function addNewSong(song) {
    fetch(baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Tells server that data is in JSON format
      body: JSON.stringify(song) // The song object is turned into a JSON string using to be sent to the server.
    })
      .then(response => response.json())
      .then(() => {
        fetchSongs();
        songForm.reset();
      })
      .catch(error => console.error('Error adding song:', error));
  }

    // Updates (edits) a song on the JSON server db
    function updateSong(id, updatedSong) {
    fetch(`${baseURL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedSong)
    })
      .then(response => response.json())
      .then(() => {
        fetchSongs();
        songForm.reset(); // Reload the song list with the new data
        formTitleEl.textContent = 'Add New Song'; // Switch form title back
        submitButton.textContent = 'Add Song'; // Switch button text back
        isEditing = false; // Exit edit mode
      })
      .catch(error => console.error('Error updating song:', error));
  }

    // Event listener for delete button
    document.getElementById('delete-button').addEventListener('click', () => {
    if (currentSongId) {
      fetch(`${baseURL}/${currentSongId}`, { method: 'DELETE' })
        .then(() => {
          fetchSongs();
          resetDisplay();
        })
        .catch(error => console.error('Error deleting song:', error));
    }
  })

    // Function to reset display
    function resetDisplay() {
    songTitleEl.textContent = 'Select a song to display lyrics';
    songArtistEl.textContent = '';
    songLyricsEl.textContent = '';
    editDeleteButtonsEl.classList.add('hidden');
    songForm.reset();
    formTitleEl.textContent = 'Add New Song';
    submitButton.textContent = 'Add Song';
    currentSongId = null;
    isEditing = false;
  }

    // Adding event listener to Find Lyrics button (to find lyrics by song or artist name)
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.toLowerCase(); // turns value to lowercase

    fetch(baseURL)
      .then(response => response.json())
      .then(songs => {
        const filtered = songs.filter(song => // Checks if the title or artist is indicated in the search bar
          song.title.toLowerCase().includes(query) ||
          song.artist.toLowerCase().includes(query) 
        );

        if (filtered.length > 0) {
          renderSongList(filtered, true); // If yes. it shows only those songs by calling renderSongList(filtered)
        } else {
          songListEl.innerHTML = '<li>No matching songs found.</li>'; 
        }
      });
  });

  // Home link event listener (to reset page when clicked)
  document.getElementById('home-link').addEventListener('click', (e) => {
  e.preventDefault();
  fetchSongs();          // Reload all songs
  resetDisplay();        // Clear lyrics section
  searchInput.value = ''; // Clear search
  })
})
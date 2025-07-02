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
    function renderSongList(songs) {
    songListEl.innerHTML = '';
    songs.forEach(song => {
      const li = document.createElement('li');
      li.className = 'p-2 text-black font-bold bg-gray-600 rounded hover:bg-gray-500 cursor-pointer';
      li.textContent = `${song.title} - ${song.artist}`;
      li.addEventListener('click', () => displaySong(song));
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

});
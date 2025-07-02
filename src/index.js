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



});
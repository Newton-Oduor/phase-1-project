// Code to wait for the entire HTML to be ready before running JS
document.addEventListener('DOMContentLoaded', () => {
  
  console.log('DOM fully loaded and parsed');

  const songListEl = document.getElementById('song-list');
  const songTitleEl = document.getElementById('song-title');
  const songArtistEl = document.getElementById('song-artist');
  const songLyricsEl = document.getElementById('song-lyrics');
  const editDeleteButtonsEl = document.getElementById('edit-delete-buttons');

// Home link (Click 'Musiqale' to refresh page)
document.getElementById("home-link").addEventListener("click", (e) => {
    e.preventDefault();
    location.reload();
});

// Find displayed lyrics by artist and song 
document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault(); 

    const artist = document.getElementById("artist-input").value.trim();
    const song = document.getElementById("song-input").value.trim();

    if (artist && song) {
        fetchLyrics(artist, song);
    } else {
        alert("Please enter both artist and song name");
    }

    // Clear input fields after search
    document.getElementById("artist-input").value = "";
    document.getElementById("song-input").value = "";
});

// function to fetch lyrics from db,json
function fetchLyrics(artist, song) {
    const apiurl = `http://localhost:3000/songs?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(song)}`;

    // Make the request and display lyrics, 
    fetch(apiurl)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        displayLyrics(data[0].lyrics);
      } else {
        displayLyrics("Lyrics not found in local database.");
      }
    })
      .catch(error => {
        console.error("Error fetching Lyrics", error);
        displayLyrics("An error occured while fetching lyrics"); // Catch any error during the process and display error message
      });
}

// Function to display lyrics & hide most popular section
function displayLyrics(lyricsText) {
    console.log("Display Lyrics", lyricsText)
    document.getElementById("most-popular").classList.add("hidden"); // Hide most popular section
    document.getElementById("lyrics-section").classList.remove("hidden"); // Show lyrics section
    document.getElementById("lyrics-display").innerText = lyricsText; // Display the fetched lyrics
}

// Add event listener to make all popular songs clickable
document.querySelectorAll("#most-popular li").forEach((songItem) => {
  songItem.addEventListener("click", () => {
    
    const text = songItem.innerText;
    const lines = text.split("\n");
    if (lines.length >= 2) {
      const title = lines[0].replace(/^\d+\.\s*/, ""); // Remove numbering like "1. " (Regex & replacement string)
      const artist = lines[1];
      fetchLyrics(artist, title);
    }
  });

  // Styling for clickable songs
  songItem.style.cursor = "pointer";
  songItem.classList.add("hover:scale-105", "transition", "duration-200");
});

// Event listener to add song/artist to playlist display
document.getElementById("add-to-playlist").addEventListener("click", () => {
  const playlistInput = document.getElementById("playlist-input");
  const newItemText = playlistInput.value.trim();

  if (newItemText) {
    const newLi = document.createElement("li");
    newLi.style.cursor = "pointer";
    newLi.classList.add("hover:scale-105", "transition", "duration-200");
    newLi.innerText = newItemText;

    // Make the playlist item clickable
    newLi.classList.add("cursor-pointer", "hover:text-yellow-300");

    newLi.addEventListener("click", () => {
      const [title, artist] = newItemText.split(" - ");

      if (artist && title) {
        fetchLyrics(artist.trim(), title.trim());
      } else {
        alert("Please add song and artist in this format: Song - Artist");
      }
    });

    document.getElementById("playlist-display").appendChild(newLi);
    playlistInput.value = "";
  } else {
    alert("Please enter a song and artist name like this: Song - Artist");
  }
});

// Function to rotate cover image
const coverImages = [
  "rotating covers/cover1.jpg",
  "rotating covers/cover2.jpg",
  "rotating covers/cover3.jpg"
];
let currentCover = 0;

function rotateCoverImage() {
  currentCover = (currentCover + 1) % coverImages.length;
  document.getElementById("cover-image").src = coverImages[currentCover];
}

// Rotate images every 5 seconds (5000ms)
setInterval(rotateCoverImage, 5000); 



});
// Home link (Click 'Musiqale' to refresh page)
document.getelementbyid("home-link").addEventListener("click", (e) => {
    e.preventDefault();
    location.reload();
});

// Find lyrics by artist and song (The API can only find lyrics by both artist and song)
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
    document.getelementbyid("artist-input").value = "";
    document.getElementById("song-input").value = "";
});

// function to fetch lyrics from API and show them on the web page
function fetchLyrics(artist, song) {
    const apiurl = `https://api.lyrics.ovh/v1/${artist}/${song}`;

    // Make the request from API and display lyrics, 
    fetch(apiurl)
      .then(response => response.json())
      .then(data => {
        if (data.lyrics) {
            displayLyrics(data.lyrics);
        } else {
          displayLyrics("Lyrics for this song not available") // If not found, display lyrics not found
        }
      })
      .catch(error => {
        console.error("Error fetching Lyrics", error);
        displayLyrics("An error occured while fetching lyrics"); // Catch any error during the process and display error message
      });
}

// Function to display lyrics & hide most popular section
function displayLyrics(lyricsText) {
    document.getelementbyid("most-popular").classList.add("hidden"); // Hide most popular section
    document.getelementbyid("lyrics-section").classList.remove("hidden"); // Show lyrics section
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
});

// Event listener to add song/artist to playlist display
document.getElementById("add-to-playlist").addEventListener("click", () => {
    const playlistInput = document.getElementById("playlist-input");
    const newItemText = playlistInput.value.trim();

    // Check if user typed, create a new list and add item
    if (newItemText) {
        const newLi = document.createElement("li");
        newLi.innerText = newItemText;
        document.getElementById("playlist-display").appendChild(newLi);

        // Clear input field after adding or show message if input was empty
        playlistInput.value = "";
    } else {
        alert("Please enter a song or artist name before adding to playlist")
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
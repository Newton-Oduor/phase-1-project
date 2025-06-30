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
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

    fetch(apiurl)
      .then(response => response.json())
      .then(data => {
        if (data.lyrics) {
            displayLyrics(data.lyrics);
        } else {
          displayLyrics("Lyrics for this song not available")
        }
      })
      .catch(error => {
        console.error("Error fetching Lyrics", error);
        displayLyrics("An error occured while fetching lyrics");
      });
}
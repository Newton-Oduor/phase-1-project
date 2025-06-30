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


# 🎵 Musiqale:Song Lyrics Finder🎵

## Description

Musiqale is a sleek and interactive single-page web application (SPA) that allows users to search and view song lyrics from their favorite artists. It connects to the free public API *[lyrics.ovh](https://api.lyrics.ovh/v1/)* and uses asynchronous JavaScript (Fetch API) to retrieve lyrics data in JSON format.

### Users can

* Search for lyrics by artist and song title
* View lyrics on the same page dynamically (without reloads)
* See a rotating album cover section featuring 3 popular music images
* Explore a Most Popular Songs list (8 famous songs across genres)
* Add songs to a custom Playlist and click on saved playlist items to fetch lyrics
* Enjoy a responsive TailwindCSS-styled layout with mobile-friendly sections
* Return to the home (default) state by clicking the Musiqale logo

## 🚀 Live Site

View Musiqale on GitHub Pages:  
[GitHub](https://github.com/Newton-Oduor/phase-1-project)

## 🎯 Features and Functionality

|Feature|Description|
|:------|:----------|
| API Integration | Fetches lyrics from the public Lyrics.ovh API asynchronously in JSON |
|3 Different Event Listeners|DOMContentLoaded to ensure full HTML load|
|3 Different Event Listeners|click on most popular and playlist songs|
|3 Different Event Listeners|submit on the search form|
|Array Iteration|Uses .forEach() to add click event listeners on the most popular song list|
|Responsive Design|Styled using TailwindCSS for responsiveness and aesthetics|
|Playlist Creation|Allows users to build their own playlist and click on playlist items for lyrics|
|Album Cover Rotation|JavaScript-powered image rotator showing 3 different album covers at 5-second intervals|
|Form Validation and Reset|Validates form inputs and clears them after submission|
|Single Page App (SPA)|All actions and views happen on a single HTML page, with DOM manipulation|
|Back to Home|Clicking the Musiqale logo refreshes the page to its original state (soft reload)|

## 🧱 Project File Structure

pgsql

```javascript
Copy
Edit
├── index.html
├── src
│   └── index.js
├── pics
│   └── music-logo.png
├── rotating covers
│   ├── cover1.jpg
│   ├── cover2.jpg
│   └── cover3.jpg
├── README.md
```

## Setup Instructions

1. Clone this repository:

```bash
git clone [git@github.com:Newton-Oduor/phase-1-project.git](git@github.com:Newton-Oduor/phase-1-project.git)
```

2. Open the project folder in VS Code or any code editor.

3. Start a live server or open index.html directly in your browser.

4. Ensure your internet connection works (Tailwind CDN and Lyrics API require it).

5. You can deploy the project on GitHub Pages for grading.

## 💻 Technologies Used

HTML5 Page - structure
TailwindCSS CDN - Styling and responsiveness
JavaScript (Vanilla) - Interactivity and API calls
[Lyrics.ovh API](https://api.lyrics.ovh/v1/) - Public API for song lyrics
Git / GitHub - Version control and deployment

## ✅ Tailwind CSS Setup
This project uses the Tailwind CDN link for styling.
No installation needed. Included in the <head> of index.html like this:

```html
<script src="https://cdn.tailwindcss.com"></script>
```
For more on Tailwind:
[https://tailwindcss.com/docs/installation/play-cdn](https://tailwindcss.com/docs/installation/play-cdn)

## 📌 Future Improvements

* Add user authentication for saved playlists

* Use a database (json-server or Firebase) for playlist persistence

* Add artist auto-suggestions while typing

* Integrate album art APIs for dynamic covers

* Improve error handling with custom messages and animations

## 📜 License
*This project is licensed under the MIT License.
Feel free to fork and improve it.*

📝 Acknowledgments
[Lyrics.ovh API](https://api.lyrics.ovh/v1/) 

[Tailwind CSS](https://cdn.tailwindcss.com)

[Markdown](https://www.markdownguide.org/)

[Emojipedia](https://emojipedia.org/)

_**Author**_
*Newton Oduor*

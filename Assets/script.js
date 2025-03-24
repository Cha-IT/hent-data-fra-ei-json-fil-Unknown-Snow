document.addEventListener('DOMContentLoaded', function() {
  fetch('songs.json')
    .then(response => response.json())
    .then(data => {
      const songList = document.getElementById('songList');
      data.songs.forEach(song => {
        const li = document.createElement('li');

        // Hvis det finnes en YouTube-link, opprettes en knapp som lenker til videoen.
        const youtubeLink = song.youtubeUrl ? `<a class="youtube-link" href="${song.youtubeUrl}" target="_blank">Se på YouTube</a>` : '';

        li.innerHTML = `
          <div class="song-details">
            <span class="song-title">${song.title}</span>
            <span class="song-meta">${song.artist} &bull; ${song.year} &bull; ${song.views}</span>
          </div>
          ${youtubeLink}
        `;
        songList.appendChild(li);
      });
    })
    .catch(error => console.error('Error fetching JSON:', error));
});

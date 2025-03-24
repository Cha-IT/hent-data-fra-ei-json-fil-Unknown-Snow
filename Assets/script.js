document.addEventListener('DOMContentLoaded', function() {
  let currentSong = null;
  const videoModal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');
  const songInfoDiv = document.getElementById('songInfo');
  const moreInfoBtn = document.getElementById('moreInfoBtn');
  const closeBtn = document.querySelector('.close');

  function getEmbedUrl(url) {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }

  fetch('songs.json')
    .then(response => response.json())
    .then(data => {
      const songList = document.getElementById('songList');
      data.songs.forEach(song => {
        const li = document.createElement('li');
        li.innerHTML = `
          <div class="song-details">
            <span class="song-title">${song.title}</span>
            <span class="song-meta">${song.artist} &bull; ${song.year} &bull; ${song.views}</span>
          </div>
          <button class="video-btn" data-youtube="${song.youtubeUrl}" data-title="${song.title}" data-artist="${song.artist}" data-year="${song.year}" data-views="${song.views}">
            Se YT-video
          </button>
        `;
        songList.appendChild(li);
      });

      document.querySelectorAll('.video-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const youtubeUrl = this.getAttribute('data-youtube');
          currentSong = {
            title: this.getAttribute('data-title'),
            artist: this.getAttribute('data-artist'),
            year: this.getAttribute('data-year'),
            views: this.getAttribute('data-views')
          };
          videoFrame.src = getEmbedUrl(youtubeUrl);
          songInfoDiv.style.display = "none"; 
          videoModal.style.display = "block";
        });
      });
    })
    .catch(error => console.error('Error fetching JSON:', error));

  closeBtn.addEventListener('click', function() {
    videoModal.style.display = "none";
    videoFrame.src = ""; 
    songInfoDiv.style.display = "none";
  });

  moreInfoBtn.addEventListener('click', function() {
    if (currentSong) {
      songInfoDiv.innerHTML = `
        <p><strong>Tittel:</strong> ${currentSong.title}</p>
        <p><strong>Artist:</strong> ${currentSong.artist}</p>
        <p><strong>År:</strong> ${currentSong.year}</p>
        <p><strong>Visninger:</strong> ${currentSong.views}</p>
      `;
      songInfoDiv.style.display = songInfoDiv.style.display === "none" ? "block" : "none";
    }
  });

  window.addEventListener('click', function(event) {
    if (event.target === videoModal) {
      videoModal.style.display = "none";
      videoFrame.src = "";
      songInfoDiv.style.display = "none";
    }
  });
});

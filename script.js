window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const folder = params.get('folder'); // The folder parameter determines which media to load

    if (folder) {
        fetch(`/public/${folder}/`)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const links = Array.from(doc.querySelectorAll('a')).map(link => link.href);

                const mediaContainer = document.getElementById('media-container');
                links.forEach(link => {
                    if (link.endsWith('.jpg') || link.endsWith('.png')) {
                        const img = document.createElement('img');
                        img.src = link;
                        mediaContainer.appendChild(img);
                    } else if (link.endsWith('.mp4')) {
                        const video = document.createElement('video');
                        video.controls = true;
                        const source = document.createElement('source');
                        source.src = link;
                        source.type = 'video/mp4';
                        video.appendChild(source);
                        mediaContainer.appendChild(video);
                    }
                });
            })
            .catch(error => console.error('Error loading the media:', error));
    } else {
        document.getElementById('media-container').innerText = 'No media folder specified.';
    }
};

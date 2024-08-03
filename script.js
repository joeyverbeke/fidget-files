window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const folder = params.get('folder'); // Get the folder name from the URL query parameter

    if (folder) {
        const url = `https://joeyverbeke.github.io/fidget-files/public/${folder}/media.json`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(files => {
                const mediaContainer = document.getElementById('media-container');
                files.forEach(file => {
                    const fullPath = `https://joeyverbeke.github.io/fidget-files/public/${folder}/${file}`;
                    if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.gif')) {
                        const img = document.createElement('img');
                        img.src = fullPath;
                        mediaContainer.appendChild(img);
                    } else if (file.endsWith('.mp4')) {
                        const video = document.createElement('video');
                        video.controls = true;
                        const source = document.createElement('source');
                        source.src = fullPath;
                        source.type = 'video/mp4';
                        video.appendChild(source);
                        mediaContainer.appendChild(video);
                    }
                });
            })
            .catch(error => {
                console.error('Failed to load media:', error);
                document.getElementById('media-container').innerText = 'Failed to load media.';
            });
    } else {
        document.getElementById('media-container').innerText = 'No media folder specified.';
    }
};

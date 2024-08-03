window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const folder = params.get('folder'); // Get the folder name from the URL query parameter

    if (folder) {
        fetch(`/public/${folder}/media.json`) // Fetch the JSON file that lists the files
            .then(response => response.json())
            .then(files => {
                const mediaContainer = document.getElementById('media-container');
                files.forEach(file => {
                    if (file.endsWith('.jpg') || file.endsWith('.png')) {
                        const img = document.createElement('img');
                        img.src = `/public/${folder}/${file}`;
                        mediaContainer.appendChild(img);
                    } else if (file.endsWith('.mp4')) {
                        const video = document.createElement('video');
                        video.controls = true;
                        const source = document.createElement('source');
                        source.src = `/public/${folder}/${file}`;
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

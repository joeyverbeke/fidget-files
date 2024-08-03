import os
import json

def generate_media_json_for_subfolders(base_directory):
    # Define media file extensions to include
    media_extensions = {'.jpg', '.jpeg', '.png', '.mp4', '.avi', '.mov', '.gif'}
    
    # Traverse subdirectories in the specified base directory
    for folder in os.listdir(base_directory):
        folder_path = os.path.join(base_directory, folder)
        if os.path.isdir(folder_path):  # Check if it's a directory
            media_files = []
            
            # Collect all media files in the subdirectory
            for filename in os.listdir(folder_path):
                if os.path.splitext(filename)[1].lower() in media_extensions:
                    media_files.append(filename)
            
            # Generate media.json file for the subdirectory
            if media_files:  # Only create a media.json if there are media files
                with open(os.path.join(folder_path, 'media.json'), 'w') as f:
                    json.dump(media_files, f, indent=4)
                print(f"media.json has been created in {folder_path} with {len(media_files)} files.")

# Usage
if __name__ == "__main__":
    # Assume script is run from the root directory and 'public/' is a subdirectory there
    public_directory = os.path.join(os.getcwd(), 'public')
    generate_media_json_for_subfolders(public_directory)

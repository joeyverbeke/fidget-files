import os
import subprocess

def convert_and_remove_media_files(base_directory):
    # Traverse subdirectories in the specified base directory
    for folder in os.listdir(base_directory):
        folder_path = os.path.join(base_directory, folder)
        if os.path.isdir(folder_path):  # Check if it's a directory
            for filename in os.listdir(folder_path):
                file_path = os.path.join(folder_path, filename)
                if filename.lower().endswith('.heic'):
                    # Convert HEIC to JPG
                    jpg_path = os.path.splitext(file_path)[0] + '.jpg'
                    command = ['ffmpeg', '-i', file_path, jpg_path]
                    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                    if result.returncode == 0:
                        os.remove(file_path)  # Remove the original file if conversion was successful
                        print(f"Converted and removed {filename}.")

                elif filename.lower().endswith('.mov'):
                    # Convert MOV to MP4
                    mp4_path = os.path.splitext(file_path)[0] + '.mp4'
                    command = ['ffmpeg', '-i', file_path, '-codec', 'copy', mp4_path]
                    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                    if result.returncode == 0:
                        os.remove(file_path)  # Remove the original file if conversion was successful
                        print(f"Converted and removed {filename}.")

# Usage
if __name__ == "__main__":
    public_directory = os.path.join(os.getcwd(), 'public')
    convert_and_remove_media_files(public_directory)
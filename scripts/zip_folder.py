import os
import sys
import zipfile

def zip_folder(folder_path, output_path):
    folder_path = os.path.abspath(folder_path)
    output_path = os.path.abspath(output_path)
    
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                abs_file = os.path.join(root, file)
                rel_path = os.path.relpath(abs_file, folder_path)
                # Ensure unix-style forward slashes in zip
                zip_entry = "./" + rel_path.replace("\\", "/")
                zipf.write(abs_file, arcname=zip_entry)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python zip_folder.py <source_dir> <output_zip>")
        sys.exit(1)
    zip_folder(sys.argv[1], sys.argv[2])
    print(f"Archive created: {sys.argv[2]}")

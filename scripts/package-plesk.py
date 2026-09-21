import os
import sys
import shutil
import subprocess
import zipfile

def run():
    app_name = "puralpha-front"
    dist_dir = os.path.abspath("plesk-dist")
    version = sys.argv[1] if len(sys.argv) > 1 else "29"
    zip_name = f"puralpha-front-plesk{version}.zip"
    next_dist_dir = os.path.abspath(".next")
    standalone_dir = os.path.join(next_dist_dir, "standalone")

    print("=" * 60)
    print(f"[*] Debut du packaging Plesk pour {app_name}")
    print(f"[*] Version/Suffixe : {version} ({zip_name})")
    print("=" * 60)

    # 1. Build Next.js
    print("[1/6] Execution de npm run build...")
    ret = subprocess.run("npm run build", shell=True)
    if ret.returncode != 0:
        print("[!] Erreur : Le build Next.js a echoue.")
        sys.exit(1)

    # 2. Vérification Standalone
    print("[2/6] Verification du mode standalone...")
    if not os.path.isdir(standalone_dir):
        print("[!] Erreur : Le dossier standalone est introuvable.")
        sys.exit(1)

    # Trouver la source standalone qui contient server.js
    standalone_src = None
    if os.path.isfile(os.path.join(standalone_dir, "server.js")):
        standalone_src = standalone_dir
    else:
        for root, dirs, files in os.walk(standalone_dir):
            if "server.js" in files:
                standalone_src = root
                break

    if not standalone_src:
        print("[!] Erreur : server.js est introuvable dans le dossier standalone.")
        sys.exit(1)

    print(f"   -> Standalone detecte dans : {standalone_src}")

    # 3. Préparation du dossier de distribution
    print(f"[3/6] Preparation du dossier {dist_dir}...")
    if os.path.exists(dist_dir):
        shutil.rmtree(dist_dir)
    os.makedirs(dist_dir, exist_ok=True)

    # 4. Copie des fichiers standalone
    print("[4/6] Copie des fichiers...")
    print("   -> Copie des fichiers standalone...")
    for item in os.listdir(standalone_src):
        s = os.path.join(standalone_src, item)
        d = os.path.join(dist_dir, item)
        if os.path.isdir(s):
            shutil.copytree(s, d, dirs_exist_ok=True)
        else:
            shutil.copy2(s, d)

    # Copie du dossier public
    public_dir = os.path.abspath("public")
    if os.path.isdir(public_dir):
        print("   -> Copie du dossier public...")
        shutil.copytree(public_dir, os.path.join(dist_dir, "public"), dirs_exist_ok=True)

    # Copie de .next/static dans plesk-dist/.next/static
    static_src = os.path.join(next_dist_dir, "static")
    static_dst = os.path.join(dist_dir, ".next", "static")
    if os.path.isdir(static_src):
        print("   -> Copie de .next/static...")
        shutil.copytree(static_src, static_dst, dirs_exist_ok=True)

    # Création de tmp/restart.txt pour Passenger / Plesk
    print("   -> Creation de tmp/restart.txt pour Plesk...")
    tmp_dir = os.path.join(dist_dir, "tmp")
    os.makedirs(tmp_dir, exist_ok=True)
    with open(os.path.join(tmp_dir, "restart.txt"), "w") as f:
        f.write("")

    # Copie de package-lock.json
    if os.path.isfile("package-lock.json"):
        shutil.copy2("package-lock.json", os.path.join(dist_dir, "package-lock.json"))

    # Suppression de node_modules pour alléger le ZIP
    nm_dir = os.path.join(dist_dir, "node_modules")
    if os.path.isdir(nm_dir):
        print("[5/6] Suppression de node_modules pour alleger le ZIP...")
        shutil.rmtree(nm_dir)

    # 5. Création du ZIP
    print(f"[6/6] Creation de l'archive ZIP ({zip_name})...")
    output_zip = os.path.abspath(zip_name)
    with zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(dist_dir):
            for file in files:
                abs_file = os.path.join(root, file)
                rel_path = os.path.relpath(abs_file, dist_dir)
                zip_entry = rel_path.replace("\\", "/")
                zipf.write(abs_file, arcname=zip_entry)

    # Duplication vers plesk-build.zip également
    shutil.copy2(output_zip, os.path.abspath("plesk-build.zip"))

    # Nettoyage
    shutil.rmtree(dist_dir)

    zip_size_mb = os.path.getsize(output_zip) / (1024 * 1024)
    print("=" * 60)
    print("[+] Packaging Plesk termine avec succes !")
    print("Archives generees :")
    print(f"   - {zip_name} ({zip_size_mb:.2f} Mo)")
    print(f"   - plesk-build.zip ({zip_size_mb:.2f} Mo)")
    print("=" * 60)

if __name__ == "__main__":
    run()

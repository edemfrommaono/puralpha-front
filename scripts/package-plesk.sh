#!/bin/bash

# Configuration
APP_NAME="puralpha-front"
DIST_DIR="plesk-dist"
VERSION=${1:-"$(date +%Y%m%d%H%M)"} # Prend l'argument 1 ou utilise la date par défaut
ZIP_NAME="puralpha-front-plesk${VERSION}.zip"
NEXT_DIST_DIR=".next"

echo "=========================================================="
echo "📦 Début du packaging Plesk pour $APP_NAME"
echo "🕒 Horodatage : $(date +%Y%m%d-%H%M)"
echo "📂 Racine projet : $PWD"
echo "🔖 Version/Suffixe : $VERSION"
echo "=========================================================="

# 1. Build
echo "🔨 Étape 1 — Lancement du build de production..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erreur : Le build Next.js a échoué."
    exit 1
fi

# 2. Vérification Standalone
echo "🔍 Étape 2 — Vérification du mode standalone..."
STANDALONE_DIR="$NEXT_DIST_DIR/standalone"
if [ ! -d "$STANDALONE_DIR" ]; then
    echo "❌ Erreur : Le dossier standalone est introuvable."
    echo "Assure-toi que output: 'standalone' est bien dans next.config.mjs."
    exit 1
fi

# Recherche du bon dossier racine dans standalone (peut être imbriqué selon le workspace)
STANDALONE_SRC=""
if [ -f "$STANDALONE_DIR/server.js" ]; then
    STANDALONE_SRC="$STANDALONE_DIR"
elif [ -f "$STANDALONE_DIR/puralpha-front/server.js" ]; then
    STANDALONE_SRC="$STANDALONE_DIR/puralpha-front"
elif [ -f "$STANDALONE_DIR/opt/workspace/maono.co/web/puralpha-front/server.js" ]; then
    STANDALONE_SRC="$STANDALONE_DIR/opt/workspace/maono.co/web/puralpha-front"
else
    # Essayer de trouver server.js dynamiquement
    FOUND_SERVER=$(find "$STANDALONE_DIR" -name "server.js" | head -n 1)
    if [ -n "$FOUND_SERVER" ]; then
        STANDALONE_SRC=$(dirname "$FOUND_SERVER")
    fi
fi

if [ -z "$STANDALONE_SRC" ]; then
    echo "❌ Erreur : server.js est introuvable dans le dossier standalone."
    exit 1
fi

echo "   → Standalone détecté dans : $STANDALONE_SRC"

# 3. Préparation du dossier de distribution
echo "📂 Étape 3 — Préparation du dossier $DIST_DIR..."
rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"

# 4. Copie des fichiers
echo "📋 Étape 4 — Copie des fichiers..."
echo "   → Copie des fichiers du standalone..."
cp -r "$STANDALONE_SRC/." "$DIST_DIR/"

echo "   → Copie des dossiers public et .next/static..."
cp -r public "$DIST_DIR/"
mkdir -p "$DIST_DIR/.next"
cp -r "$NEXT_DIST_DIR/static" "$DIST_DIR/.next/"

echo "   → Création de tmp/restart.txt pour redémarrer automatiquement l'application sur Plesk..."
mkdir -p "$DIST_DIR/tmp"
touch "$DIST_DIR/tmp/restart.txt"

# Suppression de node_modules pour alléger le ZIP (npm install devra être fait sur le serveur)
echo "🧹 Étape 5 — Suppression de node_modules pour le zip..."
rm -rf "$DIST_DIR/node_modules"

# 5. Création du ZIP
echo "🤐 Étape 6 — Création de l'archive ZIP..."
cd "$DIST_DIR"
zip -qr "../$ZIP_NAME" .
cd ..

# Nettoyage
rm -rf "$DIST_DIR"

echo "=========================================================="
echo "✅ Packaging terminé avec succès !"
echo "🚀 Fichier généré : $ZIP_NAME"
echo "=========================================================="

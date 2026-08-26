/**
 * Génère public/documents/fiche-mediateur-consommation.pdf
 *
 * Fiche PROVISOIRE reprenant les coordonnées du médiateur de la consommation
 * (CMCO) déjà validées et publiées sur pur-alpha.fr (mentions légales §4).
 * Elle garantit que le lien « Médiateur de la consommation » du footer ouvre
 * un PDF consultable et imprimable dès maintenant (instruction §8.2).
 *
 * ▶ Pour intégrer la fiche officielle transmise par le client : écraser le
 *   fichier généré en conservant exactement le même nom — aucune modification
 *   de code nécessaire.
 *
 * Usage : node scripts/generate-fiche-mediateur.js
 */
const fs = require("fs");
const path = require("path");

const PAGE_W = 595; // A4 en points
const PAGE_H = 842;
const MARGIN = 56;

// Contenu de la fiche (caractères Latin-1/WinAnsi uniquement)
const LINES = [
  { text: "PUR Alpha", font: "F2", size: 22, dy: 0 },
  { text: "Fiche du médiateur de la consommation", font: "F2", size: 15, dy: 28 },
  { rule: true, dy: 14 },
  { text: "Après avoir adressé une réclamation écrite préalable à PUR Alpha et à défaut de réponse", font: "F1", size: 11, dy: 24 },
  { text: "satisfaisante, le consommateur peut recourir gratuitement au médiateur de la consommation", font: "F1", size: 11, dy: 16 },
  { text: "dont relève PUR Alpha :", font: "F1", size: 11, dy: 16 },
  { text: "Centre de Médiation de la Consommation d'Opale (CMCO)", font: "F2", size: 12, dy: 28 },
  { text: "1 rue de Course", font: "F1", size: 11, dy: 18 },
  { text: "Hameau Le Bois Julien", font: "F1", size: 11, dy: 16 },
  { text: "62240 Courset", font: "F1", size: 11, dy: 16 },
  { text: "Téléphone : 06 82 13 38 86", font: "F1", size: 11, dy: 20 },
  { text: "Courriel : cmco-mediation@outlook.com", font: "F1", size: 11, dy: 16 },
  { text: "Site internet : https://www.cmco-mediation.fr/", font: "F1", size: 11, dy: 16 },
  { text: "PUR Alpha", font: "F2", size: 12, dy: 32 },
  { text: "26 rue des Sablons, 95360 Montmagny", font: "F1", size: 11, dy: 18 },
  { text: "Courriel : contact@puralpha.fr - Téléphone : 06 14 79 60 47", font: "F1", size: 11, dy: 16 },
  { text: "Document établi à partir des informations publiées sur pur-alpha.fr.", font: "F1", size: 8, dy: 36 },
  { text: "La fiche officielle du médiateur remplacera le présent document.", font: "F1", size: 8, dy: 12 },
];

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

// ── Flux de contenu (texte positionné ligne par ligne) ──
let y = PAGE_H - MARGIN;
const parts = [];
for (const line of LINES) {
  y -= line.dy;
  if (line.rule) {
    parts.push(`0.8 w ${MARGIN} ${y} m ${PAGE_W - MARGIN} ${y} l S`);
  } else {
    parts.push(`BT /${line.font} ${line.size} Tf ${MARGIN} ${y} Td (${esc(line.text)}) Tj ET`);
  }
}
const stream = parts.join("\n");

// ── Objets PDF ──
const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>`,
  `<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
];

// ── Assemblage avec table xref correcte ──
const chunks = [];
let offset = 0;
const push = (buf) => {
  chunks.push(buf);
  offset += buf.length;
};

push(Buffer.from("%PDF-1.4\n", "latin1"));
const offsets = [0];
objects.forEach((body, i) => {
  offsets.push(offset);
  push(Buffer.from(`${i + 1} 0 obj\n${body}\nendobj\n`, "latin1"));
});
const xrefStart = offset;
let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let i = 1; i <= objects.length; i++) {
  xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
push(Buffer.from(xref, "latin1"));
push(Buffer.from(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`, "latin1"));

const pdf = Buffer.concat(chunks);
const outDir = path.join(__dirname, "..", "public", "documents");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "fiche-mediateur-consommation.pdf");
fs.writeFileSync(outFile, pdf);
console.log(`PDF généré : ${outFile} (${pdf.length} octets)`);

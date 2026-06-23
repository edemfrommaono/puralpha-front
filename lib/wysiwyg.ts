/**
 * Convertit du texte brut (séparé par \n\n) ou du HTML WYSIWYG en HTML affichable.
 * - Si le contenu contient déjà des balises HTML → retourné tel quel (cas WYSIWYG ACF)
 * - Sinon (texte brut hérité) → chaque paragraphe est enveloppé dans <p>
 */
export function toHtml(content: string): string {
  if (!content) return '';
  // Déjà du HTML → on le retourne tel quel
  if (/<[a-z][\s\S]*>/i.test(content)) return content;
  // Texte brut → conversion en paragraphes
  return content
    .split(/\r\n\r\n|\n\n/)
    .map(p => p.replace(/\r\n|\n/g, '<br />').trim())
    .filter(Boolean)
    .map(p => `<p>${p}</p>`)
    .join('');
}

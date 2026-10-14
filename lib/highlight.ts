/**
 * Tiny regex-based syntax highlighter for the decorative code background.
 * It only needs to look right for the short snippets in data/codeSnippets.ts, so it
 * is intentionally simple (no real parsing) and safe to run on half-typed code.
 */

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Each capture group maps to one CSS class (see TOKEN_CLASSES below)
const TOKEN =
  /(\/\/[^\n]*)|("(?:[^"\\\n]|\\.)*"?|`(?:[^`\\]|\\.)*`?|'(?:[^'\\\n]|\\.)*'?|<[\w.]+\.h>)|(#\w+)|(\b\d+(?:\.\d+)?\b)|(\b(?:const|int|float|void|if|else|import|from|export|async|await|function|return|new|true|false|let|var)\b)|(\.?[A-Za-z_]\w*(?=\())|(\.[A-Za-z_]\w*)|(\b[A-Z]\w*\b)/g;

const TOKEN_CLASSES = ['tk-com', 'tk-str', 'tk-pre', 'tk-num', 'tk-kw', 'tk-fn', 'tk-prop', 'tk-type'];

/** Returns HTML where tokens are wrapped in <span class="tk-*">. Input is HTML-escaped. */
export function highlight(code: string): string {
  let out = '';
  let last = 0;

  for (const match of code.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    out += escapeHtml(code.slice(last, index));

    const groupIndex = match.findIndex((g, i) => i > 0 && g !== undefined);
    out += `<span class="${TOKEN_CLASSES[groupIndex - 1]}">${escapeHtml(match[0])}</span>`;
    last = index + match[0].length;
  }

  return out + escapeHtml(code.slice(last));
}

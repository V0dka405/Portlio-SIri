/**
 * Lightweight tokenizer for the decorative cybersecurity code background.
 * Pre-tokenizes each snippet once at module load time so real-time typing
 * appends directly to DOM text nodes with zero regex or HTML parsing per keystroke.
 */

export interface CodeToken {
  text: string;
  cls?: string;
}

const TOKEN =
  /(\/\/[^\n]*)|("(?:[^"\\\n]|\\.)*"?|`(?:[^`\\]|\\.)*`?|'(?:[^'\\\n]|\\.)*'?|\/(?:[^/\\\n]|\\.)+\/[gimsuy]*)|(#\w+)|(\b\d+(?:\.\d+)?\b)|(\b(?:package|func|def|pub|fn|const|let|var|int|float|void|bool|string|byte|error|if|else|for|in|of|import|from|export|async|await|function|return|new|true|false|nil|throw)\b)|(\.?[A-Za-z_]\w*(?=\())|(\.[A-Za-z_]\w*)|(\b[A-Z]\w*\b)/g;

const TOKEN_CLASSES = [
  'tk-com',
  'tk-str',
  'tk-pre',
  'tk-num',
  'tk-kw',
  'tk-fn',
  'tk-prop',
  'tk-type',
];

/** Pre-splits a code snippet into syntax-colored token chunks once. */
export function tokenize(code: string): CodeToken[] {
  const tokens: CodeToken[] = [];
  let last = 0;

  for (const match of code.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) {
      tokens.push({ text: code.slice(last, index) });
    }
    const groupIndex = match.findIndex((g, i) => i > 0 && g !== undefined);
    tokens.push({
      text: match[0],
      cls: TOKEN_CLASSES[groupIndex - 1],
    });
    last = index + match[0].length;
  }

  if (last < code.length) {
    tokens.push({ text: code.slice(last) });
  }

  return tokens;
}

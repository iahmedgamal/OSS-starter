export const ALL_LANGUAGES = [
  'Assembly',
  'C',
  'C#',
  'C++',
  'CSS',
  'Dart',
  'Elixir',
  'Elm',
  'Erlang',
  'Express',
  'Go',
  'Haskell',
  'HTML',
  'Java',
  'JavaScript',
  'Julia',
  'Kotlin',
  'Lua',
  'Nix',
  'Node.js',
  'Objective-C',
  'OCaml',
  'PHP',
  'Python',
  'R',
  'Ruby',
  'Rust',
  'Scala',
  'Shell',
  'Swift',
  'TypeScript',
  'Zig',
]

const ALIASES: Record<string, string> = {
  'Node.js': 'JavaScript',
  Express: 'JavaScript',
}

export function resolveLanguage(lang: string): string {
  return ALIASES[lang] ?? lang
}

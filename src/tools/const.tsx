import { Language } from './api'

export const LanguageMapping: ReadonlyMap<Language, string> = new Map([
  ['C', 'C (gcc)'],
  ['CPP', 'C++ (g++)'],
  ['JAVA', 'Java (javac)'],
  ['PYTHON', 'Python (python3)'],
])

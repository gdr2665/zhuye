import { Language } from './api'

export const LanguageMapping: ReadonlyMap<Language, string> = new Map([
  ['C', 'C (gcc)'],
  ['CPP', 'C++ (g++)'],
  ['JAVA', 'Java (javac)'],
  ['PYTHON', 'Python (python3)'],
])

export const comeFrom = [
  {
    children: [
      {
        label: '17班',
        value: '1.1',
      },
      {
        label: '18班',
        value: '1.2',
      },
      {
        label: '19班',
        value: '1.3',
      },
      {
        label: '20班',
        value: '1.4',
      },
    ],
    label: '电信 · 大一',
    value: '1',
  },
  {
    children: [
      {
        label: '21班',
        value: '2.1',
      },
      {
        label: '22班',
        value: '2.2',
      },
      {
        label: '23班',
        value: '2.3',
      },
      {
        label: '24班',
        value: '2.4',
      },
    ],
    label: '智科 · 大一',
    value: '2',
  },
  {
    children: [
      {
        label: '1班',
        value: '3.1',
      },
      {
        label: '2班',
        value: '3.2',
      },
      {
        label: '3班',
        value: '3.3',
      },
      {
        label: '4班',
        value: '3.4',
      },
      {
        label: '5班',
        value: '3.5',
      },
      {
        label: '6班',
        value: '3.6',
      },
      {
        label: '7班',
        value: '3.7',
      },
      {
        label: '8班',
        value: '3.8',
      },
    ],
    label: '电管 · 大一',
    value: '3',
  },
]

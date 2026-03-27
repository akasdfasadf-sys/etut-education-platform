export const fakultetler = [
  { id: 1, name: 'Kiberfiziki Ulgamlar Fakulteti', icon: '🤖' },
  { id: 2, name: 'Innowasiýalaryň Ykdysadyýeti Fakulteti', icon: '💡' },
  { id: 3, name: 'Kompýuter Ylymlary we Maglumat Tehnologiýalary Fakulteti', icon: '💻' },
  { id: 4, name: 'Himiki we Nanotehnologiýalar Fakulteti', icon: '🧪' },
  { id: 5, name: 'Biotehnologiýa we Ekologiýa Fakulteti', icon: '🧬' },
];

export const kurslar = [1, 2, 3, 4];

export const subjects = [
  {
    id: 12,
    fakultet: 3,
    kurs: 3,
    name: 'Mathematical Modeling',
    category: 'Matematika',
    icon: '📈',
    description: 'Matematiki modelirleme we simulýasiýa usullary',
    lessonCount: 15,
    difficulty: 'kyn',
  },
];

export const subjectDetails = {
  12: {
    name: 'Mathematical Modeling',
    description: 'Matematiki modelirleme we simulýasiýa usullary',
    topics: [
      { num: 1, name: 'Introduction to Mathematical Modeling', testId: 12 },
      { num: 2, name: 'Objectives of the Modeling', testId: 13 },
    ],
  },
};

export const testsData = {
  12: {
    title: 'Introduction to Mathematical Modeling',
    duration: 20 * 60,
    questions: [
      {
        text: 'What is mathematical modeling?',
        options: ['Drawing pictures', 'Representing real-world systems using mathematics', 'Writing stories'],
        correct: 1,
      },
      {
        text: 'What is the main purpose of a mathematical model?',
        options: ['Entertainment', 'To understand and predict real-world phenomena', 'Decoration'],
        correct: 1,
      },
      {
        text: 'What does a variable represent in a model?',
        options: ['A constant value', 'A changing quantity', 'A fixed object'],
        correct: 1,
      },
    ],
  },
  13: {
    title: 'Objectives of the Modeling',
    duration: 20 * 60,
    questions: [
      { text: 'What is one main objective of modeling?', options: ['To entertain people', 'To understand real-world systems', 'To draw pictures'], correct: 1 },
      { text: 'Why do we simplify systems in modeling?', options: ['To make them more complex', 'To make them easier to study', 'To ignore them'], correct: 1 },
      { text: 'What does modeling help predict?', options: ['The past', 'The future behavior', 'Random guesses'], correct: 1 },
    ],
  },
};

export const videos = [
  { id: 4, fakultet: 2, youtubeId: 'qf8Ei1w11Dg', title: 'Video Culture Creates Innovation', desc: 'Innowasion ykdysadyýet we wideo medeniýeti.' },
  { id: 5, fakultet: 2, youtubeId: '6MK6tuZ7Rws', title: 'How do we create a better economy?', desc: 'Gowy ykdysadyýeti nädip döredip bileris?' },
];

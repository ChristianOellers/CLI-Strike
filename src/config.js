// @flow
const questionsSelection = [
  {
    name: 'party',
    message: 'Which side do you chose?',
    type: 'list',
    choices: ['C0unt3r', 'T3rr0ristS'],
  },
  {
    name: 'costume',
    message: 'What costume?',
    type: 'list',
    choices: ['#000', '#32314f'],
    when: (answers) => {
      return answers.party === 'C0unt3r';
    },
  },
  {
    name: 'costume',
    message: 'What costume?',
    type: 'list',
    choices: ['#fff', '#252410'],
    when: (answers) => {
      return answers.party === 'T3rr0ristS';
    },
  },
  {
    type: 'checkbox',
    name: 'weapons',
    message: 'Weapons?',
    choices: [
      { name: 'M4', checked: false },
      { name: 'Shield', checked: false },
      { name: 'Pistol', checked: false },
      { name: 'Knife', checked: true },
    ],
    when: (answers) => {
      return answers.party === 'C0unt3r';
    },
  },
  {
    name: 'weapons',
    message: 'Weapons?',
    type: 'checkbox',
    choices: [
      { name: 'AK 47', checked: false },
      { name: 'MAC-10', checked: false },
      { name: 'Pistol', checked: false },
      { name: 'Knife', checked: true },
    ],
    when: (answers) => {
      return answers.party === 'T3rr0ristS';
    },
  },
];

const questionsGameLoop = [
  {
    name: 'move',
    message: 'Go which direction?',
    type: 'list',
    choices: [{ name: 'Left' }, { name: 'Right' }, { name: 'Straight' }, { name: 'Better #stayathome' }],
  },
  {
    name: 'jump',
    message: 'Jump?',
    type: 'confirm',
  },
  {
    name: 'duck',
    message: 'Duck?',
    type: 'confirm',
    when: (answers) => {
      return answers.jump === false;
    },
  },
  {
    name: 'see_enemy',
    message: 'Do you see an enemy?',
    type: 'list',
    choices: [{ name: 'Yes' }, { name: 'No' }],
  },
  {
    name: 'attack',
    message: 'Attack?',
    type: 'list',
    choices: [{ name: 'Yes' }, { name: 'Yes, Silenced' }, { name: 'No' }, { name: 'Knife' }],
    when: (answers) => {
      return answers.see_enemy === 'Yes';
    },
  },
];

const questionsGameEndWin = [
  {
    name: 'message_success',
    message: 'You win!',
    type: 'list',
    choices: [{ name: 'Great!' }, { name: 'L0lz' }],
  },
  {
    name: 'spray',
    message: 'Spray graffity?',
    type: 'list',
    choices: [{ name: 'No, thats rude' }, { name: 'Sure' }],
  },
];

const questionsGameEndLose = [
  {
    name: 'message_lose',
    message: 'You lose!',
    type: 'list',
    choices: [{ name: 'Aimb0t !!' }, { name: 'Wallh@ck !1!11' }],
  },
];

// ---------------------------------------------------------------------------------------------------------------------------------v Export

module.exports = {
  questionsSelection,
  questionsGameLoop,
  questionsGameEndLose,
  questionsGameEndWin,
};

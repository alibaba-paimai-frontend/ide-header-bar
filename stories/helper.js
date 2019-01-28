import Chance from 'chance';
const chance = new Chance();

function createButtons(num = chance.integer({ min: 1, max: 3 })) {
  const buttons = [];
  for (let i = 0; i < num; i++) {
    buttons.push({
      id: chance.syllable(),
      title: chance.word(),
      icon: chance.pick(['save', 'eye', 'info-circle', 'info'])
    });
  }

  return buttons;

}

const sets = [
  {
    title: '选取元素',
    icon: 'select',
    id: 'selection',
    isActive: true
  },
  {
    title: '全屏',
    icon: 'scan',
    id: 'fullscreen'
  },
  {
    title: '预览页面',
    icon: 'eye',
    id: 'preview'
  },
  {
    title: '历史记录',
    icon: 'clock-circle',
    id: 'history'
  }
];
function createIconTexts(num = chance.integer({ min: 2, max: 4 })) {
  return chance.pickset(sets, num);
}

export function modelPropsGen() {
  return {
    logo: chance.pick([
      'https://img.alicdn.com/tfs/TB1ysi8SpXXXXcJXpXXXXXXXXXX-210-60.jpg',
      'https://git-scm.com/images/logos/downloads/Git-Logo-2Color.png'
    ]),
    buttons: createButtons(),
    iconTexts: createIconTexts(),
    theme: {
      main: chance.color({ format: 'hex' }),
      second: '#333'
    }
  };
}

import React from 'react';
import { storiesOf } from '@storybook/react';
import { wInfo } from '../../.storybook/utils';

import { HeaderBar, createModel, HeaderBarAddStore } from '../../src/';
import mdMobx from './simple-mobx.md';
import mdPlain from './simple-plain.md';

const propsNormal = {};
const propsModel = createModel(propsNormal);

function onClickButton(button) {
  console.log('点击的按钮：', button.id, button.title);
}

const clickBtn = target => () => {
  if (target && target.setLogo) {
    target.setLogo(
      'https://git-scm.com/images/logos/downloads/Git-Logo-2Color.png'
    );
  } else {
    target.logo =
      'https://git-scm.com/images/logos/downloads/Git-Logo-2Color.png';
  }
};

storiesOf('基础使用', module)
  .addParameters(wInfo(mdMobx))
  .addWithJSX('使用 mobx 化的 props', () => {
    const HeaderBarWithStore = HeaderBarAddStore({ stores: { model: propsModel }});
    return (
      <div>
        <button onClick={clickBtn(propsModel)}>更改 logo（会响应）</button>
        <HeaderBarWithStore onClickButton={onClickButton} />
      </div>
    );
  })
  .addParameters(wInfo(mdPlain))
  .addWithJSX('普通 props 对象', () => (
    <div>
      <button onClick={clickBtn(propsNormal)}>更改 logo（不会响应）</button>
      <HeaderBar {...propsNormal} onClickButton={onClickButton} />
    </div>
  ));

import * as React from 'react';
import { render } from 'react-dom';
import {
  HeaderBar,
  HeaderBarFactory,
  IHeaderBarProps,
  IIconButtons,
  IIconText
} from '../src/';
import { Collapse } from 'antd';
const Panel = Collapse.Panel;

const { ComponentWithStore: HeaderBarWithStore, client } = HeaderBarFactory();

function onClickWithStore(value) {
  client.put(`/model/buttons/${value.id}`, {
    name: 'title',
    value: Math.random() * 10
  });
}

const props: IHeaderBarProps = {
  onClickButton: (button: IIconButtons) => {
    console.log('clicked button:', button);
  },
  onClickIconText: (iconText: IIconText) => {
    console.log('clicked icon text button:', iconText);
  }
};

render(
  <Collapse defaultActiveKey={['1']}>
    <Panel header="普通组件" key="0">
      <HeaderBar {...props} />
    </Panel>
    <Panel header="包含 store 功能" key="1">
      <HeaderBarWithStore onClickButton={onClickWithStore} />
    </Panel>
  </Collapse>,
  document.getElementById('example') as HTMLElement
);

client.post('/model', {
  model: {
    logo: 'https://git-scm.com/images/logos/downloads/Git-Logo-2Color.png'
  }
});

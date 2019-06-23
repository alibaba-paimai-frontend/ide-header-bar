import React from 'react';
import { storiesOf } from '@storybook/react';
import { Row, Col, Button } from 'antd';
import { wInfo } from '../../../.storybook/utils';
import mdGet from './get.md';

import { HeaderBarFactory } from '../../../src';
import { modelPropsGen } from '../../helper';

const {
  ComponentWithStore: HeaderBarWithStore1,
  client: client1
} = HeaderBarFactory();

// const {
//   HeaderBarWithStore: HeaderBarWithStore2,
//   client: client2
// } = HeaderBarFactory();

const styles = {
  demoWrap: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  }
};

function onClickButton(button) {
  console.log('点击的按钮：', button.id, button.title);
}

function onClickIconText(iconText) {
  console.log('点击的 iconText:', iconText.id, iconText.title, iconText.icon);
}

let attributes = {};

const getInfo = (client, filter) => () => {
  const query = filter && filter.length ? `filter=${filter.join(',')}` : '';
  client.get(`/model?${query}`).then(res => {
    const { status, body } = res;
    if (status === 200) {
      attributes = body.data.attributes;
    }

    document.getElementById('info').innerText = JSON.stringify(
      attributes,
      null,
      4
    );
  });
};

const createNew = client => () => {
  const model = modelPropsGen();
  client.post('/model', { model: model });
};

storiesOf('API - get', module)
  .addParameters(wInfo(mdGet))
  .addWithJSX('/model 获取属性信息', () => {
    return (
      <Row style={styles.demoWrap}>
        <Col span={24}>
          <HeaderBarWithStore1
            onClickButton={onClickButton}
            onClickIconText={onClickIconText}
          />
        </Col>
        <Row type="flex" justify="space-between" align="top">
          <Col span={10} offset={2}>
            <Button onClick={getInfo(client1)}>获取信息</Button>
            <Button onClick={getInfo(client1, ['buttons', 'theme'])}>
              获取指定信息(buttons, theme)
            </Button>
            <Button onClick={createNew(client1)}>随机创建</Button>
          </Col>
          <Col span={12}>
            <div id="info" />
          </Col>
        </Row>
      </Row>
    );
  });

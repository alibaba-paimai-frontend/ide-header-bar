import React from 'react';
import { storiesOf } from '@storybook/react';
import { Row, Col, Input, Button } from 'antd';

import { wInfo } from '../../../.storybook/utils';
import mdDel from './del.md';

import { HeaderBarFactory } from '../../../src';
import { modelPropsGen } from '../../helper';

const {
  HeaderBarWithStore: HeaderBarWithStore1,
  client: client1
} = HeaderBarFactory();

const styles = {
  demoWrap: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  }
};

const createNew = client => () => {
  const model = modelPropsGen();
  client.post('/model', { model: model });
};

const resetSchema = client => () => {
  client.del('/model');
};

function onClickButton(button) {
  console.log('点击的按钮：', button.id, button.title);
}

function onClickIconText(iconText) {
  console.log('点击的 iconText:', iconText.id, iconText.title, iconText.icon);
}

storiesOf('API - del', module)
  .addParameters(wInfo(mdDel))
  .addWithJSX('/model 重置', () => {
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
            <Row>
              <Col span={20}>
                <Button onClick={resetSchema(client1)}>重置</Button>
                <Button onClick={createNew(client1)}>随机创建</Button>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <div id="info" />
          </Col>
        </Row>
      </Row>
    );
  });

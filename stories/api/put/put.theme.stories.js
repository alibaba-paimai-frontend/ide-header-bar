import React from 'react';
import { storiesOf } from '@storybook/react';
import { Row, Col, Input, Button, Select } from 'antd';
import { wInfo } from '../../../.storybook/utils';
import mdPut from './put.md';

import { HeaderBarFactory } from '../../../src';
import { modelPropsGen } from '../../helper';

const { HeaderBarWithStore, client } = HeaderBarFactory();

const { Option } = Select;
const styles = {
  demoWrap: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  }
};

function onClick(value) {
  console.log('当前点击值：', value);
}

const createNew = client => () => {
  const model = modelPropsGen();
  client.post('/headerbar', { model: model });
};


function updateCss() {
  const targetKey = document.getElementById('targetKey').value;
  if (!targetKey) {
    document.getElementById('info').innerText = '请输入 theme 变量';
    return;
  }

  const targetValue = document.getElementById('targetValue').value;
  // 更新节点属性，返回更新后的数值
  client
    .put(`/model/theme/${targetKey}`, { value: targetValue })
    .then(res => {
      const { status, body } = res;
      if (status === 200) {
        const result = body;
        client.get(`/headerbar?filter=theme`).then(res => {
          const { status, body } = res;
          if (status === 200) {
            const attributes = body.data.attributes || {};
            document.getElementById('info').innerText =
              `更新操作：${result.data.success} - ${result.data.message}; \n` +
              JSON.stringify(attributes, null, 4);
          }
        });
      }
    })
    .catch(err => {
      document.getElementById('info').innerText =
        `更新失败： \n` + JSON.stringify(err, null, 4);
    });
}

storiesOf('API - put', module)
  .addParameters(wInfo(mdPut))
  .addWithJSX('/model/theme 更改 theme', () => {
    return (
      <Row style={styles.demoWrap}>
        <Col span={24}>
          <HeaderBarWithStore
            onClick={onClick}
          />
        </Col>
        <Row type="flex" justify="space-between" align="top">
          <Col span={10} offset={2}>
            <Row>
              <Col span={6}>
                <Input placeholder="target" id="targetKey" />
              </Col>
              <Col span={10}>
                <Input placeholder="target value" id="targetValue" />
              </Col>
              <Col span={6}>
                <Button onClick={updateCss}>更改 theme </Button>
                <Button onClick={createNew(client)}>随机创建</Button>
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

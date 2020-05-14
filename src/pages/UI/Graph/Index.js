import React, { useEffect, useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { Card } from 'antd';
import Tree from './Tree.js';
import Er from './Er.js';
import Flow from './Flow.js';
import Flow2 from './Flow2.js';

const tabListNoTitle = [
  {
    key: 'tab1',
    tab: '树图',
  },
  {
    key: 'tab3',
    tab: '流程图',
  },
  {
    key: 'tab4',
    tab: '流程图2',
  },
  {
    key: 'tab2',
    tab: 'ER图',
  },
];

const contentListNoTitle = {
  tab1: <Tree />,
  tab2: <Er />,
  tab3: <Flow />,
  tab4: <Flow2 />,
};

export default function() {
  const [key, setKey] = useState('tab1');
  const onTabChange = key => {
    setKey(key);
  };
  return (
    <Card
      style={{ width: '100%' }}
      tabList={tabListNoTitle}
      activeTabKey={key}
      onTabChange={key => {
        onTabChange(key);
      }}
    >
      {contentListNoTitle[key]}
    </Card>
  );
}

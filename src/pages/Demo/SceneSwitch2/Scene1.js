import React, { PureComponent } from 'react';
import { Card, Button, Modal } from 'antd';
import QueryTable from './QueryTable';

class Scene1 extends PureComponent {
  state = {};

  componentDidMount() {}

  render() {
    const { goToStep } = this.props;
    return (
      <>
        <Card
          title="采购入库单查询"
          extra={
            <Button
              icon="plus"
              type="default"
              onClick={() => {
                goToStep(2, { mode: 'create' });
              }}
            >
              创建入库单
            </Button>
          }
        >
          {/* 传递step-wizard副本，使queryTable组件可以取到 goToStep等方法 */}
          <QueryTable {...this.props} />
        </Card>

        {/* <Modal title="test" visible width={1200}>
          <QueryTable />
        </Modal> */}
      </>
    );
  }
}

export default Scene1;

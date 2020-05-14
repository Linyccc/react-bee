import React, { PureComponent } from 'react';
import { Card, Icon } from 'antd';
import QueryTable from './QueryTable';

class Scene1 extends PureComponent {
  state = {};

  componentDidMount() {}

  render() {
    const { goToStep } = this.props;
    return (
      <>
        <Card
          title="我的申请单"
          extra={
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                goToStep(2, {
                  mode: 'create',
                });
              }}
            >
              <Icon type="plus" /> 创建申请单
            </a>
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

import React, { Component, Fragment } from 'react';
import dynamic from 'umi/dynamic';
import LoadingComponent from '@/components/PageLoading/index';
import StepWizard from '@/components/StepWizard';
import FooterToolbar from '@/components/FooterToolbar';
import { Button } from 'antd';

const Scene1 = dynamic({
  loader: () => import('./Scene1'),
  loading: LoadingComponent,
});

const Scene2 = dynamic({
  loader: () => import('./Scene2'),
  loading: LoadingComponent,
});

const Scene3 = dynamic({
  loader: () => import('./Scene3'),
  loading: LoadingComponent,
});

const Nav = props => {
  const { currentStep } = props;

  if (currentStep === 3) {
    return (
      <FooterToolbar>
        <Button type="primary" onClick={() => props.goToStep(1)}>
          返回
        </Button>
      </FooterToolbar>
    );
  }

  if (currentStep === 2) {
    return (
      <FooterToolbar>
        <Button type="default" onClick={() => props.goToStep(1)}>
          返回
        </Button>
        <Button type="primary">提交</Button>
      </FooterToolbar>
    );
  }
  return null;
};

class SceneSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <StepWizard nav={<Nav />} isLazyMount>
          <Scene1 name="Mr.Lin" />
          <Scene2 />
          <Scene3 />
        </StepWizard>
      </Fragment>
    );
  }
}

export default SceneSwitch;

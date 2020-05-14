import React, { Component, Fragment } from 'react';
import dynamic from 'umi/dynamic';
import LoadingComponent from '@/components/PageLoading/index';
import StepWizard from '@/components/StepWizard';
import FooterToolbar from '@/components/FooterToolbar';
import { Button } from 'antd';
import { serialize } from '@/utils/utils';

const List = dynamic({
  loader: () => import('./List'),
  loading: LoadingComponent,
});

const Create = dynamic({
  loader: () => import('./Create'),
  loading: LoadingComponent,
});

const Detail = dynamic({
  loader: () => import('./Detail'),
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

  return null;
};

class SceneSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialStep: 0,
      // params: {},
    };
  }

  componentDidMount() {
    // window.addEventListener('hashchange', this.onHashChange);
  }

  componentWillUnmount() {
    // Remove listener
    // window.removeEventListener('hashchange', this.onHashChange);
  }

  // onHashChange = () => {

  //   // 当前场景且启动url切换模式
  //   if (/^#\/demo\/curd/.test(window.location.hash) && /action=/.test(window.location.hash)) {
  //     const params = this.getParams();

  //     this.setState({params})
  //   }

  // };

  // getParams = () =>{
  //   const arr = window.location.hash.split('?');
  //   const params = {initialStep:1,id: +new Date()};
  //   const {scene,id} = serialize(arr[1]);

  //   //
  //   if(!arr[1]){
  //     return {initialStep:1,params:{}}
  //   }

  //   if(id !== undefined && scene === 2){
  //      return {
  //       initialStep:scene,
  //       mode:'view'
  //      }
  //   }

  //   if(id !== undefined && scene === 3){
  //     return {
  //       initialStep:scene,
  //       mode:'edit'
  //     }
  //  }

  //   return params
  // }

  render() {
    const { initialStep } = this.state;
    return (
      <Fragment>
        <StepWizard nav={<Nav />} isLazyMount initialStep={initialStep}>
          <List />
          <Create destroy />
          <Detail />
        </StepWizard>
      </Fragment>
    );
  }
}

export default SceneSwitch;

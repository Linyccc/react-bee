import React, { Component, Fragment } from 'react';
import dynamic from 'umi/dynamic';
import LoadingComponent from '@/components/PageLoading/index';
import { connect } from 'dva';
import isEqual from 'lodash/isEqual';

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

/**
 * @index [number]表示场景索引
 * @props [object] 传入该场景的入参，会在props取到
 */
const getScene = (index, props) => {
  switch (index) {
    case 0:
      return <Scene1 {...props} />;
    case 1:
      return <Scene2 {...props} />;
    case 2:
      return <Scene3 {...props} />;
    default:
      return <Scene1 {...props} />;
  }
};

@connect(({ scene, loading }) => ({
  index: scene.index,
  paramsArr: scene.paramsArr,
  loading: loading.models.scene,
}))
class SceneSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      index: null,
      params: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { index, params } = this.state;
    dispatch({
      type: 'scene/saveScene',
      payload: {
        index,
        params,
      },
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(nextProps.index, prevState.index)) {
      const { tabs } = prevState;
      const newParams = nextProps.paramsArr[nextProps.index];
      // 入参变了也要重新更新
      if (!tabs[nextProps.index] || !isEqual(newParams, prevState.params)) {
        tabs[nextProps.index] = getScene(nextProps.index, newParams);
      }
      return {
        index: nextProps.index,
        params: newParams,
        tabs,
      };
    }
    // 返回 null 表示不更新，此函数最后一定需要返回值
    return null;
  }

  render() {
    const { index, tabs } = this.state;
    return (
      <Fragment>
        {tabs.map((scene, key) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={key} style={{ display: key === index ? 'block' : 'none' }}>
              {scene}
            </div>
          );
        })}
      </Fragment>
    );
  }
}

export default SceneSwitch;

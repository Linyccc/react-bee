/* eslint-disable */
// import 'raf/polyfill';
import React, { Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { StickyContainer, Sticky } from 'react-sticky';
import { Layout, Menu, Icon, Tabs } from 'antd';
import DocumentTitle from 'react-document-title';
import pathToRegexp from 'path-to-regexp';
import Debounce from 'lodash-decorators/debounce';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { formatMessage } from 'umi-plugin-react/locale';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import Header from './Header';
import SiderMenu from '@/components/SiderMenu';
import Exception from '@/components/Exception';
import Authorized from '@/utils/Authorized';
import sidebarMenu, { headerMenu } from '../../mock/menu';
import defaultSettings from '@/defaultSettings';
import { IEVersion } from '@/utils/utils';
import logo from './img/logo-32x32.png';
import styles from './layout.less';

// 引入子菜单组件
const { Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;

// Conversion router to menu.
function formatter(data, parentPath = '', parentAuthority, parentName) {
  return data.map(item => {
    let locale = 'menu';
    if (parentName && item.name) {
      locale = `${parentName}.${item.name}`;
    } else if (item.name) {
      locale = `menu.${item.name}`;
    } else if (parentName) {
      locale = parentName;
    }
    const result = {
      ...item,
      locale,
      authority: item.authority || parentAuthority,
    };
    if (item.routes) {
      const children = formatter(item.routes, `${parentPath}${item.path}/`, item.authority, locale);
      // Reduce memory usage
      result.children = children;
    }
    delete result.routes;
    return result;
  });
}

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky topOffset={-60}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        style={{
          ...style,
          zIndex: 900,
          top: 60,
          marginBottom: 0,
        }}
        className={styles.tabsBar}
      />
    )}
  </Sticky>
);

class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    // this.getPageTitle = memoizeOne(this.getPageTitle);
    this.getBreadcrumbNameMap = memoizeOne(this.getBreadcrumbNameMap, isEqual);
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);
  }

  state = {
    // tab模式相关的状态
    currentTabKey: '', // 当前激活的是哪个tab
    tabPanes: [], // 当前总共有哪些tab
  };

  /**
   * 组件挂载之前判断是否要更新tab
   */
  componentWillMount() {
    this.tabTitleMap = this.parseTabTitle();
    this.updateTab(this.props);
    // console.log("this.tabTitleMap");
    // console.log(JSON.stringify(this.tabTitleMap, null, "\t"));
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    // dispatch({
    //     type: 'setting/getSetting',
    // });
    this.renderRef = requestAnimationFrame(() => {
      this.setState({
        rendering: false,
      });
    });
    // this.enquireHandler = enquireScreen(mobile => {
    //     const { isMobile } = this.state;
    //     if (isMobile !== mobile) {
    //         this.setState({
    //             isMobile: mobile,
    //         });
    //     }
    // });
  }

  /**
   * 每次在react-router中切换时也要判断是否更新tab
   */
  componentWillReceiveProps(nextProps) {
    // 如果不是tab模式直接返回
    // if (globalConfig.tabMode.enable !== true) {
    //     return;
    // }

    // FIXME: hack, 在react-router中切换时会触发这个方法两次, 据说是和hashHistory有关, 需要手动处理下
    // const action = this.props.location.action;
    // if (action === "PUSH") {
    //     // action有PUSH、POP、REPLACE等几种, 不太清楚分别是做什么用的
    //     return;
    // }

    // FIXME: hack, 因为要区分react-router引起的re-render和redux引起的re-render
    // if (this.props.collapse === nextProps.collapse) {
    this.updateTab(nextProps);
    // }
  }

  getMenuData() {
    const {
      route: { routes },
    } = this.props;
    return formatter(routes);
  }

  /**
   * 获取面包屑映射
   * @param {Object} menuData 菜单配置
   */
  getBreadcrumbNameMap() {
    const routerMap = {};
    const mergeMenuAndRouter = data => {
      data.forEach(menuItem => {
        if (menuItem.children) {
          mergeMenuAndRouter(menuItem.children);
        }
        // Reduce memory usage
        routerMap[menuItem.path] = menuItem;
      });
    };
    mergeMenuAndRouter(this.getMenuData());
    return routerMap;
  }

  matchParamsPath = pathname => {
    const pathKey = Object.keys(this.breadcrumbNameMap).find(key =>
      pathToRegexp(key).test(pathname)
    );
    return this.breadcrumbNameMap[pathKey];
  };

  getTabTitle = pathname => {
    const currRouterData = this.matchParamsPath(pathname);

    if (!currRouterData) {
      return 'undefined';
    }
    const message = formatMessage({
      id: currRouterData.locale || currRouterData.name,
      defaultMessage: currRouterData.name,
    });
    return `${message}`;
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  /**
   * 解析menu.js中的配置, 找到所有叶子节点对应的key和名称
   *
   * @returns {Map}
   */
  parseTabTitle() {
    const tabTitleMap = new Map();

    const addItem = item => {
      if (item.url) {
        // 对于直接跳转的菜单项, 直接忽略, 只有headerMenu中可能有这种
        return;
      }
      if (item.icon) {
        tabTitleMap.set(
          item.key,
          <span className="ant-layout-tab-text">
            <Icon type={item.icon} />
            {item.name}
          </span>
        );
      } else {
        tabTitleMap.set(item.key, <span className="ant-layout-tab-text">{item.name}</span>);
      }
    };
    const browseMenu = item => {
      if (item.child) {
        item.child.forEach(browseMenu);
      } else {
        addItem(item);
      }
    };

    // 又是dfs, 每次用js写这种就觉得很神奇...
    sidebarMenu.forEach(browseMenu);
    headerMenu.forEach(browseMenu);

    // 最后要手动增加一个key, 对应于404页面
    tabTitleMap.set(
      '*',
      <span className="ant-layout-tab-text">
        <Icon type="frown-o" />
        Error
      </span>
    );
    return tabTitleMap;
  }

  /**
   * 根据传入的props决定是否要新增一个tab
   *
   * @param props
   */
  updateTab(props) {
    const key = props.location.pathname; // react-router传入的key
    // 如果key有问题, 就直接隐藏所有tab, 这样简单点
    if (!key || !this.breadcrumbNameMap.hasOwnProperty(key)) {
      this.state.tabPanes.length = 0;
      return;
    }

    const tabTitle = this.getTabTitle(key);

    // 如果允许同一个组件在tab中多次出现, 每次就必须生成唯一的key
    // if (globalConfig.tabMode.allowDuplicate === true) {
    //     if (!this.tabCounter) {
    //         this.tabCounter = 0;
    //     }

    //     this.tabCounter++;
    //     key = key + this.tabCounter;
    // }

    // 更新当前选中的tab
    this.setState({ currentTabKey: key });

    const routerConfig = this.matchParamsPath(key);
    // 更新tab时，如果访问的页面内容是由iframe嵌套的则隐藏body的滚动条（防止出现2条滚动条），否则恢复滚动条
    document.querySelectorAll('body')[0].style.overflow =
      routerConfig.iframe !== undefined ? 'hidden' : 'hidden auto';

    // 当前key对应的tab是否已经在显示了?
    let exist = false;
    for (const pane of this.state.tabPanes) {
      if (pane.key === key) {
        exist = true;
        break;
      }
    }

    // 如果key不存在就要新增一个tabPane
    if (!exist) {
      this.state.tabPanes.push({
        key,
        url: key + props.location.search || '',
        title: tabTitle,
        // content: React.cloneElement(props.children),  // 我本来是想clone一下children的, 这样比较保险, 不同tab不会互相干扰, 但发现似乎不clone也没啥bug
        content: props.children,
      });
    }
  }

  /**
   * 改变tab时的回调
   */
  onTabChange = activeKey => {
    this.setState({ currentTabKey: activeKey });
    // 在切换的时候实时更新url
    router.push(find(this.state.tabPanes, { key: activeKey }).url);
  };

  /**
   * 关闭tab时的回调
   */
  onTabRemove = targetKey => {
    // 如果关闭的是当前tab, 要激活哪个tab?
    // 首先尝试激活左边的, 再尝试激活右边的
    let nextTabKey = this.state.currentTabKey;
    if (this.state.currentTabKey === targetKey) {
      let currentTabIndex = -1;
      this.state.tabPanes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          currentTabIndex = i;
        }
      });

      // 如果当前tab左边还有tab, 就激活左边的
      if (currentTabIndex > 0) {
        nextTabKey = this.state.tabPanes[currentTabIndex - 1].key;
      }
      // 否则就激活右边的tab
      else if (currentTabIndex === 0 && this.state.tabPanes.length > 1) {
        nextTabKey = this.state.tabPanes[currentTabIndex + 1].key;
      }

      // 其实还有一种情况, 就是只剩最后一个tab, 但这里不用处理
    }

    // 过滤panes
    const newTabPanes = this.state.tabPanes.filter(pane => pane.key !== targetKey);
    this.setState({ tabPanes: newTabPanes, currentTabKey: nextTabKey });
    // 关闭时候实时更新url
    router.push(find(this.state.tabPanes, { key: nextTabKey }).url);
  };

  renderBody(routerConfig, viewMode) {
    // 如果没有tab可以显示, 就显示欢迎界面
    if (this.state.tabPanes.length === 0) {
      return (
        <Fragment>
          <Exception type="404" />
        </Fragment>
      );
    }
    return (
      <Authorized authority={routerConfig.authority} noMatch={<Exception type="403" />}>
        {viewMode === 'inner' ? (
          this.state.tabPanes[findIndex(this.state.tabPanes, { key: this.state.currentTabKey })]
            .content
        ) : (
          <StickyContainer style={{ paddingTop: 60 }}>
            <Tabs
              activeKey={this.state.currentTabKey}
              renderTabBar={renderTabBar}
              type="editable-card"
              onEdit={this.onTabRemove}
              onChange={this.onTabChange}
              hideAdd
              animated={IEVersion() !== 9}
              className="bss-content"
            >
              {this.state.tabPanes.map(pane => (
                <TabPane tab={pane.title} key={pane.key} closable className={styles.content}>
                  {pane.content}
                </TabPane>
              ))}
            </Tabs>
          </StickyContainer>
        )}
      </Authorized>
    );
  }

  @Debounce(80)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
    this.triggerResizeEvent();
    this.getContentStyle();
  };

  /**
   * siderbar 固定时需要给content区域设置一个paddingLeft
   */
  getContentStyle() {
    const { collapsed } = this.props;

    if (!defaultSettings.fixSiderbar) {
      return {};
    }
    if (collapsed) {
      return { paddingLeft: '80px' };
    }
    return { paddingLeft: defaultSettings.siderWidth };
  }

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: {
        pathname,
        query: { viewMode },
      },
    } = this.props;
    const menuData = this.getMenuData();
    const routerConfig = this.matchParamsPath(pathname);
    return (
      <DocumentTitle
        title={`${this.getTabTitle(pathname)} - ${formatMessage({ id: 'app.title' })}`}
      >
        {viewMode === 'inner' ? (
          this.renderBody(routerConfig, viewMode)
        ) : (
          <Layout>
            <SiderMenu
              collapsible
              collapsed
              logo={logo}
              Authorized={Authorized}
              theme={navTheme}
              onCollapse={this.handleMenuCollapse}
              menuData={menuData}
              {...this.props}
            />
            <Layout style={{ ...this.getContentStyle(), width: '100%' }}>
              <Header onCollapse={this.handleMenuCollapse} />
              {this.renderBody(routerConfig, viewMode)}
            </Layout>
          </Layout>
        )}
      </DocumentTitle>
    );
  }
}

export default connect(({ global, setting }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  ...setting,
}))(BasicLayout);

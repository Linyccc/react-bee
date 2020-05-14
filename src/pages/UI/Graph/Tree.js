import React, { useEffect, useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { treeData } from './Data';
import G6 from '@antv/g6';
import styles from './index.less';
import { message } from 'antd';

export default function() {
  const ref = React.useRef(null);
  let [graph, setGraph] = useState(null);

  const [width, setWidth] = useState(
    document.querySelectorAll('body')[0].clientWidth -
      document.querySelectorAll('.ant-layout-sider')[0].clientWidth -
      32 -
      48
  );

  const bindEvents = () => {
    // 监听node上面mouse事件
    graph.on('node:dblclick', evt => {
      const { item } = evt;
      const model = item.getModel();
      console.log(model);
    });
  };

  const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
    return [
      ['M', x, y],
      ['a', r, r, 0, 1, 0, r * 2, 0],
      ['a', r, r, 0, 1, 0, -r * 2, 0],
      ['M', x + 2, y],
      ['L', x + 2 * r - 2, y],
    ];
  };
  const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
    return [
      ['M', x, y],
      ['a', r, r, 0, 1, 0, r * 2, 0],
      ['a', r, r, 0, 1, 0, -r * 2, 0],
      ['M', x + 2, y],
      ['L', x + 2 * r - 2, y],
      ['M', x + r, y - r + 2],
      ['L', x + r, y + r - 2],
    ];
  };
  /**
   * 自定义布局
   */

  const getNodeConfig = function getNodeConfig(node) {
    if (node.flag === 0) {
      return {
        basicColor: '#f50',
        fontColor: '#FFF',
        borderColor: '#f50',
        bgColor: '#f50',
      };
    } else if (node.flag === 1) {
      return {
        basicColor: '#1890FF',
        fontColor: '#FFF',
        borderColor: '#1890FF',
        bgColor: '#1890FF',
      };
    } else if (node.flag === 2) {
      return {
        basicColor: '#FA8C16',
        fontColor: '#FFF',
        borderColor: '#FA8C16',
        bgColor: '#FA8C16',
      };
    } else {
      return {
        basicColor: '#108ee9',
        fontColor: '#FFF',
        borderColor: '#108ee9',
        bgColor: '#108ee9',
      };
    }
  };
  G6.registerNode(
    'tree-node',
    {
      drawShape: function drawShape(cfg, group) {
        const config = getNodeConfig(cfg);
        const rect = group.addShape('rect', {
          attrs: {
            fill: '#fff',
            stroke: '#666',
            fill: config.bgColor,
            stroke: config.borderColor,
            radius: 2,
          },
        });
        const content = cfg.name.replace(/(.{19})/g, '$1\n');
        const text = group.addShape('text', {
          attrs: {
            text: content,
            x: 0,
            y: 0,
            textAlign: 'left',
            textBaseline: 'middle',
            fill: '#FFF',
            cursor: 'pointer',
          },
          className: 'collapse-text',
        });
        const bbox = text.getBBox();
        const hasChildren = cfg.children && cfg.children.length > 0;
        if (hasChildren) {
          group.addShape('circle', {
            attrs: {
              x: bbox.maxX + 6,
              y: bbox.minX + bbox.height / 2 - 6,
              r: 13,
              fill: 'rgba(47, 84, 235, 0.05)',
              opacity: 0,
              // zIndex: -2,
              cursor: 'pointer',
            },
            className: 'collapse-icon-bg',
          });
          group.addShape('marker', {
            attrs: {
              x: bbox.maxX + 6,
              y: bbox.minX + bbox.height / 2 - 6,
              radius: 6,
              symbol: cfg.collapsed ? EXPAND_ICON : COLLAPSE_ICON,
              lineWidth: 1,
              fill: '#FFF',
              stroke: config.borderColor,
              cursor: 'pointer',
            },
            className: 'collapse-icon',
          });
        }
        rect.attr({
          x: bbox.minX - 4,
          y: bbox.minY - 6,
          width: bbox.width + (hasChildren ? 26 : 8),
          height: bbox.height + 12,
        });
        return rect;
      },
    },
    'single-shape'
  );

  useEffect(() => {
    if (graph) {
      graph.destroy();
    }
    const handleResize = () => {
      setWidth(
        document.querySelectorAll('body')[0].clientWidth -
          document.querySelectorAll('.ant-layout-sider')[0].clientWidth -
          32 -
          48
      );
    };
    window.addEventListener('resize', handleResize);
    graph = new G6.TreeGraph({
      container: ref.current,
      width: width,
      height: 500,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            shouldUpdate: function shouldUpdate(e) {
              /* 点击 node 禁止展开收缩 */
              if (
                e.target.get('className') == 'collapse-icon' ||
                e.target.get('className') == 'collapse-icon-bg'
              ) {
                return true;
              }
              return false;
            },
            onChange: function onChange(item, collapsed) {
              let data = item.getModel();
              let icon = item.get('group').findByClassName('collapse-icon');
              if (collapsed) {
                icon.attr('symbol', EXPAND_ICON);
              } else {
                icon.attr('symbol', COLLAPSE_ICON);
              }
              data.collapsed = collapsed;
              return true;
            },
          },
          'drag-canvas',
          'zoom-canvas',
          {
            type: 'tooltip',
            formatText: function formatText(model) {
              const text = `<div>${model.name} </div>`;
              return text;
            },
          },
        ],
      },
      defaultNode: {
        shape: 'tree-node',
        anchorPoints: [[0, 0.5], [1, 0.5]],
        style: {
          fill: '#40a9ff',
          stroke: '#096dd9',
        },
      },
      defaultEdge: {
        shape: 'cubic-horizontal',
        style: {
          stroke: '#A3B1BF',
        },
      },
      layout: {
        type: 'compactBox',
        direction: 'LR',
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 20;
        },
        getHGap: function getHGap() {
          return 80;
        },
      },
    });
    graph.data(treeData);
    graph.render();
    graph.fitView();
    // graph.zoomTo(1, { x: 450, y: 250 });
    setGraph(graph);
    bindEvents();
  }, [treeData, width]);

  return <div ref={ref} />;
}

import React, { useEffect, useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';
import styles from './index.less';
import { flowData } from './Data';

export default function() {
  const ref = React.useRef(null);
  let [graph, setGraph] = useState(null);
  const [width, setWidth] = useState(
    document.querySelectorAll('body')[0].clientWidth -
      document.querySelectorAll('.ant-layout-sider')[0].clientWidth -
      32 -
      48
  );
  let _extends =
    Object.assign ||
    function(target) {
      for (let i = 1; i < arguments.length; i++) {
        let source = arguments[i];
        for (let key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  let nodeExtraAttrs = {
    begin: {
      fill: '#FA8C16',
    },
    end: {
      fill: '#FA8C16',
    },
  };

  G6.registerNode(
    'node',
    {
      drawShape: function drawShape(cfg, group) {
        let rect = group.addShape('rect', {
          attrs: _extends(
            {
              x: -75,
              y: -25,
              width: 150,
              height: 50,
              radius: 10,
              fill: '#1890FF',
              fillOpacity: 1,
            },
            nodeExtraAttrs[cfg.type]
          ),
        });
        return rect;
      },
      // 设置状态
      setState: function setState(name, value, item) {
        let group = item.getContainer();
        let shape = group.get('children')[0]; // 顺序根据 draw 时确定

        if (name === 'selected') {
          if (value) {
            shape.attr('fill', '#F6C277');
          } else {
            shape.attr('fill', '#FFD591');
          }
        }
      },
      getAnchorPoints: function getAnchorPoints() {
        return [[0, 0.5], [1, 0.5]];
      },
    },
    'single-shape'
  );

  G6.registerEdge('line-with-arrow', {
    itemType: 'edge',
    draw: function draw(cfg, group) {
      let startPoint = cfg.startPoint;
      let endPoint = cfg.endPoint;
      let centerPoint = {
        x: (startPoint.x + endPoint.x) / 2,
        y: (startPoint.y + endPoint.y) / 2,
      };
      // 控制点坐标
      let controlPoint = {
        x: (startPoint.x + centerPoint.x) / 2,
        y: startPoint.y,
      };

      // 为了更好的展示效果, 对称贝塞尔曲线需要连到箭头根部
      let path = group.addShape('path', {
        attrs: {
          path: [
            ['M', startPoint.x, startPoint.y],
            ['Q', controlPoint.x + 8, controlPoint.y, centerPoint.x, centerPoint.y],
            ['T', endPoint.x - 8, endPoint.y],
            ['L', endPoint.x, endPoint.y],
          ],
          stroke: '#ccc',
          lineWidth: 1.6,
          endArrow: {
            path: 'M 4,0 L -4,-4 L -4,4 Z',
            d: 4,
          },
        },
      });

      return path;
    },
  });

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
    graph = new G6.Graph({
      container: ref.current,
      width: width,
      height: 500,
      pixelRatio: 2,
      layout: {
        type: 'dagre',
        rankdir: 'LR',
      },
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          {
            type: 'tooltip',
            formatText: function formatText(model) {
              const text = `<div>${model.label} </div>`;
              return text;
            },
          },
        ],
      },
      defaultNode: {
        shape: 'node',
        labelCfg: {
          style: {
            fill: '#fff',
            fontSize: 14,
          },
        },
      },
      defaultEdge: {
        shape: 'line-with-arrow',
        style: {
          endArrow: true,
          lineWidth: 2,
          stroke: '#ccc',
        },
      },
    });
    graph.data(flowData);
    graph.render();
    graph.fitView();
    graph.zoomTo(0.8, { x: width / 2, y: 250 });
    setGraph(graph);
  }, [flowData, width]);
  return <div ref={ref} style={{ textAlign: 'center' }} />;
}

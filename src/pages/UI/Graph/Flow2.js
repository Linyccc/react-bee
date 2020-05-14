import React, { useEffect, useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';
import styles from './index.less';
import { flow2Data } from './Data.js';

export default function() {
  const ref = React.useRef(null);
  let [graph, setGraph] = useState(null);
  const [width, setWidth] = useState(
    document.querySelectorAll('body')[0].clientWidth -
      document.querySelectorAll('.ant-layout-sider')[0].clientWidth -
      32 -
      48
  );

  G6.registerNode(
    'sql',
    {
      drawShape(cfg, group) {
        const rect = group.addShape('rect', {
          attrs: {
            x: -90,
            y: -30,
            width: 180,
            height: 60,
            radius: 10,
            fill: '#1890FF',
            fillOpacity: 1,
          },
        });
        if (cfg.name) {
          group.addShape('text', {
            attrs: {
              text: cfg.name,
              x: 0,
              y: 0,
              fill: '#FFF',
              fontSize: 24,
              textAlign: 'center',
              textBaseline: 'middle',
              fontWeight: 'bold',
            },
          });
        }
        return rect;
      },
    },
    'single-shape'
  );
  // G6.Global.nodeStateStyle.selected = {
  //   stroke: '#d9d9d9',
  //   fill: '#5394ef',
  // };

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
        nodesepFunc: d => {
          if (d.id === '3') {
            return 500;
          }
          return 50;
        },
        ranksep: 70,
      },
      defaultNode: {
        shape: 'sql',
      },
      defaultEdge: {
        shape: 'polyline',
        style: {
          radius: 20,
          offset: 45,
          endArrow: true,
          lineWidth: 2,
          stroke: '#C2C8D5',
        },
      },
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          'click-select',
          {
            type: 'tooltip',
            formatText(model) {
              const text = `<div>${model.name} </div>`;
              return text;
            },
            // shouldUpdate: e => {
            //   // 如果移动到节点文本上显示，不是文本上不显示
            //   if (e.target.type !== 'text') {
            //     return false;
            //   }
            //   return true;
            // },
          },
        ],
      },
    });
    graph.data(flow2Data);
    graph.render();
    graph.fitView();
    setGraph(graph);
  }, [flow2Data, width]);
  return <div ref={ref} style={{ textAlign: 'center' }} />;
}

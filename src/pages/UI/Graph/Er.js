import React, { useEffect, useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { erData } from './Data';
import G6 from '@antv/g6';
import styles from './index.less';

export default function() {
  const ref = React.useRef(null);
  let [graph, setGraph] = useState(null);
  //   const [height, setHeight] = useState(
  //     document.querySelectorAll('body')[0].clientHeight -
  //       document.querySelectorAll('.ant-layout-header')[0].clientHeight -
  //       44 -
  //       32 -
  //       104
  //   );
  //   const [width, setWidth] = useState(
  //     document.querySelectorAll('body')[0].clientWidth -
  //       document.querySelectorAll('.ant-layout-sider')[0].clientWidth -
  //       32 -
  //       48
  //   );
  G6.registerEdge('relation', {
    draw: function draw(cfg, group) {
      const keyShape = group.addShape('path', {
        attrs: {
          path: [['M', cfg.startPoint.x, cfg.startPoint.y], ['L', cfg.endPoint.x, cfg.endPoint.y]],
          stroke: '#C2C8D5',
          lineWidth: 1,
          lineAppendWidth: 4,
        },
      });
      let center = keyShape.getPoint(0.5);
      let shapeContainer = group.addGroup();

      let point = G6.Util.getLabelPosition(keyShape, 0, 10, 4, true);
      group.addShape('text', {
        attrs: {
          text: cfg.sourceEntity,
          x: point.x,
          y: point.y,
          rotate: point.rotate,
          fill: '#666',
        },
      });
      point = G6.Util.getLabelPosition(keyShape, 1, -15, 4, true);
      group.addShape('text', {
        attrs: {
          text: cfg.targetEntity,
          x: point.x,
          y: point.y,
          fill: '#666',
          rotate: point.rotate,
        },
      });
      shapeContainer.transform([
        ['t', -center.x, -center.y],
        ['r', point.angle],
        ['t', center.x, center.y],
      ]);
      shapeContainer.addShape('path', {
        attrs: {
          path: [
            ['M', center.x - 40, center.y],
            ['L', center.x, center.y - 20],
            ['L', center.x + 40, center.y],
            ['L', center.x, center.y + 20],
            ['Z'],
          ],
          fill: '#fff',
          stroke: '#C2C8D5',
        },
      });
      shapeContainer.addShape('text', {
        attrs: {
          text: cfg.relation,
          x: center.x,
          y: center.y,
          textAlign: 'center',
          textBaseline: 'middle',
          fill: '#666',
        },
      });
      return keyShape;
    },
  });

  useEffect(() => {
    if (graph) {
      graph.destroy();
    }
    // const handleResize = () => {
    //   setWidth(
    //     document.querySelectorAll('body')[0].clientWidth -
    //       document.querySelectorAll('.ant-layout-sider')[0].clientWidth -
    //       32 -
    //       48
    //   );
    //   setHeight(
    //     document.querySelectorAll('body')[0].clientHeight -
    //       document.querySelectorAll('.ant-layout-header')[0].clientHeight -
    //       44 -
    //       32 -
    //       104
    //   );
    // };
    // window.addEventListener('resize', handleResize);
    graph = new G6.Graph({
      container: ref.current,
      width: 900,
      height: 500,
      defaultNode: {
        labelCfg: {
          style: {
            fill: '#fff',
            fontSize: 12,
          },
        },
        style: {
          fill: '#1890FF',
          stroke: '#1890FF',
        },
      },
      defaultEdge: {
        style: {
          stroke: '#C2C8D5',
        },
      },
      modes: {
        default: ['drag-node', 'drag-canvas', 'zoom-canvas'],
      },
    });

    graph.data(erData);
    graph.render();
    graph.fitView();
    setGraph(graph);
  }, [erData]);
  return <div ref={ref} style={{ textAlign: 'center' }} />;
}

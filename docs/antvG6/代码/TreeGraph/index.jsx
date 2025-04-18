import React, { useEffect, useRef } from 'react';
import G6 from '@antv/g6';
import { formatAmount } from '@/utils/format';
import styles from './index.less';

const { Util } = G6;

const TreeGraph = ({
  data = [],
  unit = 'tCO2/万元',
  colors = ['#2278FA', '#68C57C', '#FFC100', '#F6903D', '#7262FD', '#F08BB4', '#40A9FF', '#008685'],
}) => {
  const ref = useRef(null);

  // 自定义节点、边b
  const registerFn = () => {
    // 自定义节点
    G6.registerNode(
      'flow-rect',
      {
        shapeType: 'flow-rect',
        draw(cfg, group) {
          const {
            name = '',
            value,
            collapsed,
            branchColor = '#008599',
            depth,
            rank,
            notEmissionControlFlag,
          } = cfg;

          const newName = name.replace(/\s/g, '').replace(/(.{12})/g, '$1\n');

          const isRoot = depth === 0;
          const grey = '#CED4D9';
          const rectConfig = {
            width: 240,
            // height: 92,
            height: 92 + Math.floor(name?.length % 12 === 0 ? 0 : name?.length / 12) * 14,
            lineWidth: isRoot ? 20 : 1,
            fontSize: 12,
            fill: isRoot ? '#008599' : '#fff',
            radius: 4,
            stroke: grey,
            opacity: 1,
          };

          // 卡片原点
          const nodeOrigin = {
            x: isRoot ? -rectConfig.width / 2 - 50 : -rectConfig.width / 2 - 40,
            y: -rectConfig.height / 2,
          };

          const textConfig = {
            textAlign: 'left',
            textBaseline: 'bottom',
          };

          const rect = group.addShape('rect', {
            attrs: {
              x: nodeOrigin.x,
              y: nodeOrigin.y,
              ...rectConfig,
              strokeOpacity: isRoot ? 0.1 : 1,
              stroke: isRoot ? 'rgba(0, 133, 153)' : branchColor,
            },
          });

          const rectBBox = rect.getBBox();

          // // 排名
          // if (value) {
          //   group.addShape('dom', {
          //     attrs: {
          //       x: nodeOrigin.x,
          //       y: nodeOrigin.y,
          //       width: 35,
          //       height: 18,
          //       html: `
          //         <div style="width: 100%;height: 18px;text-align: center;font-size: 14px;font-family: Bebas Neue;background: #008599;color: #F7F8FC;border-radius: 3px 0;">
          //           TOP ${rank}
          //         </div>
          //       `,
          //     },
          //     name: 'dom-shape',
          //   });
          // }

          // 标题
          group.addShape('text', {
            attrs: {
              ...textConfig,
              x: 20 + nodeOrigin.x,
              y:
                42 +
                Math.floor(name?.length % 12 === 0 ? 0 : name?.length / 12) * 14 +
                nodeOrigin.y,
              text: name.length > 12 ? newName : name,
              fontSize: 16,
              fill: isRoot ? '#fff' : '#292929',
            },
            name: 'name-shape',
          });

          // 数值 价格+单位
          group.addShape('dom', {
            attrs: {
              x: 20 + nodeOrigin.x,
              // y: nodeOrigin.y,
              y:
                56 +
                Math.floor(name?.length % 12 === 0 ? 0 : name?.length / 12) * 14 +
                nodeOrigin.y,
              width: 200,
              height: 30,
              html: `
                <div style="display: ${
                  value ? 'flex' : 'none'
                };align-items:center;width: 100%;height: 24px;">
                  <span style="color: ${
                    isRoot ? '#fff' : branchColor
                  };font-family: Bebas Neue;font-size: 24px;padding-right: 8px;line-height: 16px;background: ${
                isRoot ? 'rgba(255, 255, 255, 0.20)' : '#F7F8FC'
              };border-radius: 4px 0 0 4px;">${formatAmount(value)}</span>

                  <span style="color: ${
                    isRoot ? '#fff' : branchColor
                  };font-family: PingFang SC;font-size: 14px;line-height: 16px;background: ${
                isRoot ? 'rgba(255, 255, 255, 0.20)' : '#F7F8FC'
              };border-radius: 0 4px 4px 0;">${unit}</span>
                </div>
                <div style="display: ${
                  value ? 'none' : 'block'
                };font-family: PingFang SC;font-size: 14px;color: #B7B7B7;">${
                notEmissionControlFlag ? '非控排企业' : '暂未更新'
              }</div>
                `,
            },
            name: 'value-shape',
          });

          // 展开收起
          if (cfg.children && cfg.children.length) {
            // 侧边
            group.addShape('rect', {
              attrs: {
                x: rectBBox.maxX - 4,
                y: rectBBox.minY,
                width: 4,
                height: rectBBox.height,
                radius: [0, rectConfig.radius, rectConfig.radius, 0],
                fill: isRoot ? 'transparent' : branchColor,
              },
            });

            group.addShape('circle', {
              attrs: {
                x: rectConfig.width / 2,
                y: 0,
                r: 11,
                lineWidth: 2,
                stroke: branchColor,
                cursor: 'pointer',
                fill: collapsed ? branchColor : '#fff',
              },
              // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
              name: 'collapse-icon',
              modelId: cfg.id,
            });

            // 子节点数量
            group.addShape('text', {
              attrs: {
                x: rectConfig.width / 2,
                y: collapsed ? 0 : -1,
                textAlign: 'center',
                textBaseline: 'middle',
                text: collapsed ? cfg.children?.length : '-',
                num: cfg.children?.length,
                fontSize: 14,
                cursor: 'pointer',
                fill: collapsed ? '#fff' : branchColor,
              },
              // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
              name: 'collapse-text',
              modelId: cfg.id,
            });

            // 连接 展开收起 的线段
            group.addShape('path', {
              attrs: {
                path: [
                  ['M', rectConfig.width / 2 - 40, 0],
                  ['L', rectConfig.width / 2 - 10, 0],
                ],
                stroke: branchColor,
                lineWidth: 2,
              },
              // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
              name: 'count-link',
            });
          }

          this.drawLinkPoints(cfg, group);
          return rect;
        },
        setState(name, value, item) {
          if (name === 'collapse') {
            const group = item.getContainer();
            const collapseText = group.find((e) => e.get('name') === 'collapse-text');
            const collapseCircle = group.find((e) => e.get('name') === 'collapse-icon');
            const collapseCircleStyle = item._cfg.originStyle['collapse-icon'];

            if (collapseText && collapseCircle) {
              if (!value) {
                collapseText.attr({
                  text: '-',
                  fill: collapseCircleStyle.stroke,
                });
                collapseCircle.attr({
                  fill: '#fff',
                });
              } else {
                collapseText.attr({
                  text: collapseText.attrs.num,
                  fill: '#fff',
                });
                collapseCircle.attr({
                  fill: collapseCircleStyle.stroke,
                });
              }
            }
          }
        },
        getAnchorPoints() {
          return [
            [0, 0.5],
            [1, 0.5],
          ];
        },
      },
      'rect',
    );
    G6.registerEdge(
      'indentedEdge',
      {
        afterDraw: (cfg, group) => {
          const sourceNode = cfg.sourceNode?.getModel();
          const targetNode = cfg.targetNode?.getModel();
          const color = sourceNode.branchColor || targetNode.branchColor || cfg.color || '#000';
          // const branchThick = sourceNode.depth <= 1 ? 3 : sourceNode.depth <= 3 ? 2 : 1;
          const keyShape = group.get('children')[0];
          keyShape.attr({
            stroke: color,
            lineWidth: 2, // branchThick
          });
          group.toBack();
        },
        getControlPoints: (cfg) => {
          const startPoint = cfg.startPoint;
          const endPoint = cfg.endPoint;
          return [
            {
              x: startPoint.x + 80,
              y: startPoint.y,
            },
            {
              x: startPoint.x + 80,
              y: endPoint.y,
            },
            {
              x: endPoint.x,
              y: endPoint.y,
            },
          ];
        },
        update: undefined,
      },
      'polyline',
    );
  };
  registerFn();

  const dataTransform = (data) => {
    const changeData = (d, level = 0, color) => {
      const data = {
        ...d,
      };
      // 给定 branchColor 和 0-2 层节点 depth
      if (data.children?.length) {
        data.depth = 0;
        data.children.forEach((subtree, i) => {
          subtree.branchColor = colors[i % colors.length];
          // dfs
          let currentDepth = 1;
          subtree.depth = currentDepth;
          Util.traverseTree(subtree, (child) => {
            child.branchColor = colors[i % colors.length];

            if (!child.depth) {
              child.depth = currentDepth + 1;
            } else currentDepth = subtree.depth;
            if (child.children) {
              child.children.forEach((subChild) => {
                subChild.depth = child.depth + 1;
              });
            }
            return true;
          });
        });
      }

      return data;
    };
    return changeData(data);
  };

  useEffect(() => {
    if (ref.current) {
      // 更新视图 重新渲染
      ref.current.data(dataTransform(data));
      ref.current.render();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, unit]);

  const initGraph = (data, defaultConfig) => {
    if (!data) {
      return;
    }
    ref.current = new G6.TreeGraph({
      container: 'container',
      ...defaultConfig,
    });
    ref.current.data(dataTransform(data));
    ref.current.render();

    const handleCollapse = (e) => {
      const target = e.target;
      const id = target.get('modelId');
      const item = ref.current.findById(id);
      const nodeModel = item.getModel();
      nodeModel.collapsed = !nodeModel.collapsed;
      ref.current.layout();
      ref.current.setItemState(item, 'collapse', nodeModel.collapsed);
    };
    ref.current.on('collapse-text:click', (e) => {
      handleCollapse(e);
    });
    ref.current.on('collapse-icon:click', (e) => {
      handleCollapse(e);
    });
  };

  useEffect(() => {
    const container = document.getElementById('container');
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;

    // 默认配置
    const defaultConfig = {
      width,
      height,
      // defaultLevel: 3,
      // defaultZoom: 0.8,
      // minZoom: 0.5,
      modes: {
        default: ['zoom-canvas', 'drag-canvas'],
      },
      fitView: true,
      animate: true,
      renderer: 'svg',
      defaultNode: {
        type: 'flow-rect',
      },
      defaultEdge: {
        type: 'indentedEdge',
        style: { stroke: '#CED4D9', lineWidth: 2, radius: 0 },
      },
      layout: {
        type: 'indented', // 布局类型 缩进树
        direction: 'LR', // 自左至右布局
        dropCap: false, // 每个节点的第一个自节点是否位于下一行
        indent: 350, // 列间间距
        getHeight: (cfg) => {
          return 70 + Math.floor(cfg?.name?.length % 12 === 0 ? 0 : cfg?.name?.length / 12) * 14;
        },
      },
    };

    if (!ref.current) {
      initGraph(data, defaultConfig);
    }
    if (typeof window !== 'undefined') {
      window.onresize = () => {
        if (!ref.current || ref.current.get('destroyed')) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        ref.current.changeSize(container.scrollWidth, container.scrollHeight);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="container" className={styles.graphContainer} />;
};

export default React.memo(TreeGraph);

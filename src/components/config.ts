import type { FlowChartData } from './types/config';

export const FirstFlowChartData: FlowChartData = {
  // 点集
  nodes: [
    /* {
      id: 'node1', // String 必填 节点唯一标识
      type: 'rect',
      x: 100, // Number 可选 节点x坐标
      y: 200, // Number 可选 节点y坐标
    },
    {
      id: 'node2',
      x: 300,
      y: 200,
    }, */
  ],
  // 边集
  edges: [
    /* {
      source: 'node1', // String 必填 起始点 id
      target: 'node2', // String 必填 目标点 id
    }, */
  ],
};

const example = {
  title: 'newFlowTest',
  nodes: {
    demo_node_1: {
      name: '开始',
      left: 42,
      top: 38,
      type: 'start',
      width: 26,
      height: 26,
      alt: true,
    },
    demo_node_2: {
      name: '结束', left: 797, top: 42, type: 'end', width: 26, height: 26, alt: true,
    },
    demo_node_3: {
      name: '入职申请', left: 155, top: 39, type: 'task', width: 104, height: 26, marked: true, alt: true, aaa: 'AAA', ooo: { bbb: 'BBB', text: 'DDDD' }, ccc: { text: 'CCCC' }, xxx: { hhh: 'HHH' },
    },
    demo_node_4: {
      name: '人力审批', left: 364, top: 42, type: 'task', width: 104, height: 26, alt: true, text: '请人力审批',
    },
    demo_node_8: {
      name: '工资判断', left: 571, top: 43, type: 'node', width: 104, height: 26, alt: true,
    },
    demo_node_9: {
      name: '经理终审', left: 559, top: 141, type: 'task', width: 104, height: 26, color: '#f60', fontColor: '#fff',
    },
  },
  lines: {
    demo_line_5: {
      type: 'sl',
      from: 'demo_node_3',
      to: 'demo_node_4',
      name: '提交申请',
      dash: false,
    },
    demo_line_6: {
      type: 'sl', from: 'demo_node_1', to: 'demo_node_3', name: '', dash: true,
    },
    demo_line_7: {
      type: 'tb', M: 18.5, from: 'demo_node_4', to: 'demo_node_3', name: '不通过', dash: false,
    },
    demo_line_10: {
      type: 'sl', from: 'demo_node_4', to: 'demo_node_8', name: '通过', dash: true,
    },
    demo_line_11: {
      type: 'tb', M: 157, from: 'demo_node_9', to: 'demo_node_4', name: '不接受', dash: true,
    },
    demo_line_12: {
      type: 'sl', from: 'demo_node_8', to: 'demo_node_9', name: '大于8000', dash: false,
    },
    demo_line_13: {
      type: 'sl', from: 'demo_node_8', to: 'demo_node_2', name: '小于8000', dash: false,
    },
    demo_line_14: {
      marked: true, type: 'sl', from: 'demo_node_9', to: 'demo_node_2', name: '接受', dash: false,
    },
  },
  areas: {
    1497581247380: {
      name: '审议会', left: 451, top: 110, color: 'red', width: 226, height: 108, alt: true,
    },
  },
  initNum: 16,
  memos: {
    1538791703263: {
      text: '大工在斯柯达斯柯达', left: 190, top: 140, width: 140, height: 54, alt: true,
    },
  },
  extra: {
    targetNamespace: {
      targetNamespace: 'textDemos', id: 'xmlLoader', errorEvent: { type: 'timeout' }, description: '一个GooFlow的示例',
    },
    id: {
      targetNamespace: 'textDemos', id: 'xmlLoader', errorEvent: { type: 'timeout' }, description: '一个GooFlow的示例',
    },
    errorEvent: {
      targetNamespace: 'textDemos', id: 'xmlLoader', errorEvent: { type: 'timeout' }, description: '一个GooFlow的示例',
    },
    description: {
      targetNamespace: 'textDemos', id: 'xmlLoader', errorEvent: { type: 'timeout' }, description: '一个GooFlow的示例',
    },
  },
};

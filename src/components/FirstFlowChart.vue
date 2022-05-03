<template>
  <div class="example">
    <div class="drag node">
      <div v-for="item in nodeExample"
        :key="item.id"
        class="node-item"
        :data-id="item.id"
        draggable="true"
        @dragstart="nodeItemDragstart">
        <img :src="item.icon"
          :data-id="item.id">
      </div>
    </div>
    <div class="drag line">
      <div v-for="item in lineExample"
        :key="item.id"
        class="line-item"
        @click="lineClick">
        <img :src="item.icon"
          :data-id="item.id">
      </div>
    </div>
    <div class="flow-chart"
      ref="flowChart"
      @drop="flowChartDrop"></div>
  </div>
  <input ref="globalInput"
    type="text"
    v-model="globalText"
    @input="globalInputHandler"
    @blur="globalBlurHandler"
    class="globalInput">
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import G6 from '@antv/g6';
import { FirstFlowChartData } from './config';
import rect from '../assets/flow-chart/rect.png';
import circle from '../assets/flow-chart/circle.png';
import polyline from '../assets/flow-chart/line.png';

const flowChart = ref<HTMLElement | null>(null);
const globalInput = ref<HTMLElement | null>(null);
let globalInputValue: HTMLElement;
const globalText = ref('');

const nodeExample = [
  {
    id: 1,
    icon: rect,
    type: 'rect',
  },
  {
    id: 2,
    icon: circle,
    type: 'circle',
  },
];

const lineExample = [
  {
    id: 1,
    icon: polyline,
    type: 'polyline',
  },
];

// 当前拖动节点 id
let currentNodeElId: number = -1;
// 全局节点 id
let globalNodeId: number = 1;
// 当前点击线 id
let currentLineElId: number = -1;
// 当前选择线起始 id === 流程图里 source id
let currentLineStartId: string = '-1';
// 当前选择线结束 id === 流程图里 target id
let currentLineEndId: string = '';
let isStartNodeId: boolean = true;
// 当前更新节点 id
let currentUpdateNodeId: string = '';
// G6 流程图实例
let graph: any = null;

function nodeItemDragstart(e: any) {
  console.log(e.target.dataset);

  currentNodeElId = +e.target.dataset.id;
}

function flowChartDrop(e: any) {
  const node = {
    id: `node${globalNodeId}`,
    x: e.offsetX,
    y: e.offsetY,
    type: nodeExample.find((item) => item.id === currentNodeElId)?.type,
  };
  globalNodeId += 1;
  console.log(globalNodeId);
  graph.addItem('node', node);
}

function lineClick(e: any) {
  currentLineElId = +e.target.dataset.id;
}

function globalInputHandler() {
  console.log(globalText.value);
  graph.updateItem(currentUpdateNodeId, {
    label: globalText.value,
  });
}

function globalBlurHandler() {
  globalInputValue.style.display = 'none';
  globalText.value = '';
  console.log('globalBlurHandler');
}

// 节流函数
function throttle(cb: Function, wait: number = 1000, flag: boolean = false): Function {
  let flagTemp: boolean = flag;
  let timer: number = +new Date();
  let future: number = timer + wait;
  return (...args: any[]) => {
    timer = +new Date();
    if (flagTemp) {
      cb(...args);
      flagTemp = false;
    }

    if (timer >= future) {
      cb(...args);
      future = timer + wait;
    }
  };
}

onMounted(() => {
  globalInputValue = globalInput.value as HTMLElement;
  graph = new G6.Graph({
    container: flowChart.value as HTMLElement,
    width: 800,
    height: 500,
    defaultEdge: {
      // ... 其他属性
      style: {
        stroke: '#f00',
        lineWidth: 5,
        // ... 其他样式属性
      },
    },
  });
  graph.data(FirstFlowChartData);
  graph.render();
  graph.on('node:click', throttle((ev: any) => {
    const { _cfg: { id } } = ev.item;
    console.log(id, ev);

    if (isStartNodeId) {
      currentLineStartId = id as string;
    } else {
      currentLineEndId = id as string;
      const edge = {
        source: currentLineStartId,
        target: currentLineEndId,
        type: lineExample.find((item) => item.id === currentLineElId)?.type as string,
        style: {
          endArrow: true,
          startArrow: false,
        },
      };
      graph.addItem('edge', edge);
    }
    isStartNodeId = !isStartNodeId;
  }, 300));
  graph.on('node:dblclick', (ev: any) => {
    const { clientX, clientY, item: { _cfg: { id } } } = ev;
    currentUpdateNodeId = id;
    currentLineStartId = '';
    isStartNodeId = true;
    globalInputValue.style.display = 'block';
    globalInputValue.style.left = `${clientX}px`;
    globalInputValue.style.top = `${clientY}px`;
  });
});

</script>
<style scoped lang="scss">
.example {
  display: flex;

  .drag {
    flex: 1;
    background-color: rgb(131 131 131);
    padding: 10px 0;

    .node-item,
    .line-item {
      cursor: pointer;
      transition: all 0.3s;
      padding: 10px;

      &:hover {
        background-color: rgb(255 255 255);
      }
    }

    .line-item {
      &:focus {
        background-color: red;
      }
    }
  }

  .flow-chart {
    width: 800px;
    height: 500px;
  }

}

.globalInput {
  display: none;
  position: fixed;
  border: 2px solid #a7c5ff;
  background-color: #eff4ff;
  outline: none;
}
</style>

export type id = string;
export type x = number;
export type y = number;

export interface NodeConfig {
  id: id;
  x?: x;
  y?: y;
  type?: string,
}

export interface EdgeConfig {
  source: id;
  target: id;
}

export interface FlowChartData {
  nodes?: NodeConfig[];
  edges?: EdgeConfig[];
}

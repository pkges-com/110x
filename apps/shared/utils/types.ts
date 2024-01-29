export type Activity = {
  name: string;
  number: number;
};

export type Metric = {
  type: 'vscode' | 'chrome';
  created_at: string;
  activities?: Activity[];
};

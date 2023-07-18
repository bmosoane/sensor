type Sensor = {
  id: string;
  name: string;
  connected: boolean;
  unit: string;
  value: string;
};

type WebSocketMessage = {
  command: "connect" | "disconnect";
  id: string;
};

export type { Sensor, WebSocketMessage };

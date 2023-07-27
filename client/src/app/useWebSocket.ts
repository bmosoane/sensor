import { useEffect, useState } from "react";
import { Sensor, SensorRecord } from "./types";

const WEBSOCKET_URL = "ws://localhost:8000";

const useWebSocket = () => {
  const [sensors, setSensors] = useState<SensorRecord>({});
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data) as Sensor;

      setSensors((prevSensors) => {
        const newSensors = { ...prevSensors };
        newSensors[message.id] = {
          ...message,
          value:
            message.value !== null
              ? message.value
              : prevSensors[message.id].value,
        };

        return newSensors;
      });
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return { socket, sensorsList: Object.values(sensors) };
};

export default useWebSocket;

import { useEffect, useState } from "react";
import { Sensor } from "./types";

const WEBSOCKET_URL = "ws://localhost:8000";

const useWebSocket = () => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data) as Sensor;

      setSensors((prevSensors) => {
        const updatedSensors = prevSensors.map((sensor) =>
          sensor.id === message.id ? { ...sensor, ...message } : sensor
        );

        // If the sensor with the same ID doesn't exist, add it to the array
        if (!updatedSensors.some((sensor) => sensor.id === message.id)) {
          updatedSensors.push(message);
        }

        return updatedSensors;
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

  return { sensors, socket };
};

export default useWebSocket;

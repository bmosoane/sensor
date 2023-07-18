import React, { useState, useEffect } from "react";

import {
  AppContainer,
  Title,
  ToggleLabel,
  ToggleCheckbox,
  SensorList,
  SensorItem,
  SensorButton,
} from "./styles";

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

const App: React.FC = () => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [showAllSensors, setShowAllSensors] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");

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

  const handleToggleSensors = () => {
    setShowAllSensors((prevShowAllSensors) => !prevShowAllSensors);
  };

  const handleConnectSensor = (id: string) => {
    if (socket) {
      const message: WebSocketMessage = { command: "connect", id };
      socket.send(JSON.stringify(message));
    }
  };

  const handleDisconnectSensor = (id: string) => {
    if (socket) {
      const message: WebSocketMessage = { command: "disconnect", id };
      socket.send(JSON.stringify(message));
    }
  };

  const filteredSensors = showAllSensors
    ? sensors
    : sensors.filter((sensor) => sensor.connected);

  return (
    <AppContainer>
      <Title>Sensors</Title>
      <ToggleLabel>
        <ToggleCheckbox
          type="checkbox"
          checked={showAllSensors}
          onChange={handleToggleSensors}
        />
        Show All Sensors
      </ToggleLabel>
      <SensorList>
        {filteredSensors.map((sensor) => (
          <SensorItem key={sensor.id}>
            <p>
              <strong>{sensor.name}</strong>
            </p>
            <p>
              Value: {sensor.value} {sensor.unit}
            </p>

            {sensor.connected ? (
              <SensorButton
                data-connected
                onClick={() => handleDisconnectSensor(sensor.id)}
              >
                Disconnect
              </SensorButton>
            ) : (
              <SensorButton
                data-connected={false}
                onClick={() => handleConnectSensor(sensor.id)}
              >
                Connect
              </SensorButton>
            )}
          </SensorItem>
        ))}
      </SensorList>
    </AppContainer>
  );
};

export default App;

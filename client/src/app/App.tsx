import React, { useState } from "react";

import {
  AppContainer,
  Title,
  ToggleLabel,
  ToggleCheckbox,
  SensorList,
  SensorItem,
  SensorButton,
} from "./styles";
import { Sensor, WebSocketMessage } from "./types";
import useWebSocket from "./useWebSocket";

const App: React.FC = () => {
  const [showAllSensors, setShowAllSensors] = useState(true);
  const { sensors, socket } = useWebSocket();

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

  const filteredSensors: Sensor[] = showAllSensors
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

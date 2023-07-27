import React, { FC, useCallback } from "react";
import { Sensor, WebSocketMessage } from "../types";
import { SensorList as SensorWrapper } from "../styles";
import useWebSocket from "../useWebSocket";
import { MemoizedItem } from "./Item";

interface SenorProps {
  showAllSensors: boolean;
}
const SensorList: FC<SenorProps> = ({ showAllSensors }) => {
  const { sensorsList, socket } = useWebSocket();

  const handleConnectSensor = useCallback(
    (id: string) => {
      if (socket) {
        const message: WebSocketMessage = { command: "connect", id };
        socket.send(JSON.stringify(message));
      }
    },
    [socket]
  );

  const handleDisconnectSensor = useCallback(
    (id: string) => {
      if (socket) {
        const message: WebSocketMessage = { command: "disconnect", id };
        socket.send(JSON.stringify(message));
      }
    },
    [socket]
  );

  const filteredSensors: Sensor[] = showAllSensors
    ? sensorsList
    : sensorsList.filter((sensor) => sensor.connected);

  return (
    <SensorWrapper>
      {filteredSensors.map((sensor) => (
        <MemoizedItem
          sensor={sensor}
          handleDisconnectSensor={handleDisconnectSensor}
          handleConnectSensor={handleConnectSensor}
        />
      ))}
    </SensorWrapper>
  );
};

export { SensorList };

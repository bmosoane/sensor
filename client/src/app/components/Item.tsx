import React, { FC } from "react";
import { SensorButton, SensorItem } from "../styles";
import { Sensor } from "../types";

interface ItemProps {
  sensor: Sensor;
  handleDisconnectSensor: (id: string) => void;
  handleConnectSensor: (id: string) => void;
}
const Item: FC<ItemProps> = ({
  sensor,
  handleDisconnectSensor,
  handleConnectSensor,
}: ItemProps) => {
  return (
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
  );
};

// export { Item };
export const MemoizedItem = React.memo(Item);

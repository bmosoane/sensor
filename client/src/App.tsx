import React, { useState, useEffect } from "react";

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
    <div>
      <h1>IoT Sensors</h1>
      <label>
        <input
          type="checkbox"
          checked={showAllSensors}
          onChange={handleToggleSensors}
        />
        Show All Sensors
      </label>
      <ul>
        {filteredSensors.map((sensor) => (
          <li key={sensor.id}>
            <strong>{sensor.name}</strong>: {sensor.value} {sensor.unit}
            {sensor.connected ? (
              <button onClick={() => handleDisconnectSensor(sensor.id)}>
                Disconnect
              </button>
            ) : (
              <button onClick={() => handleConnectSensor(sensor.id)}>
                Connect
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

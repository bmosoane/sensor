import React, { useState } from "react";

import { AppContainer, Title, ToggleLabel, ToggleCheckbox } from "./styles";
import { SensorList } from "./components/SensorList";

const App: React.FC = () => {
  const [showAllSensors, setShowAllSensors] = useState(true);

  const handleToggleSensors = () => {
    setShowAllSensors((prevShowAllSensors) => !prevShowAllSensors);
  };

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
      <SensorList showAllSensors={showAllSensors} />
    </AppContainer>
  );
};

export default App;

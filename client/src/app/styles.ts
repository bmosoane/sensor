import styled from "styled-components";

type SensorButtonProps = {
  "data-connected": boolean;
};

const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 8px;
`;

const ToggleCheckbox = styled.input`
  margin-right: 5px;
`;

const SensorList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const SensorItem = styled.li`
  background-color: lightgray;
  border: 1px solid grey;
  border-radius: 8px;
  margin: 8px;
  padding: 8px;
  flex-basis: calc((100% / 3) - 10px);
  font-size: 16px;
`;

const SensorButton = styled.button<SensorButtonProps>`
  background-color: ${(props) => (props["data-connected"] ? "red" : "green")};
  display: flex;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  margin: 8px auto;
`;

export {
  AppContainer,
  Title,
  ToggleLabel,
  ToggleCheckbox,
  SensorList,
  SensorItem,
  SensorButton,
};

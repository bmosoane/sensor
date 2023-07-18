# Instructions

- You should aim to spend between 3 to 4 hours on the exercise
- Return the solution or make it available to us upon completion

## Minimum Technical Requirements

The solution should as a minimum be defined using:

- TypeScript
- ReactJS

## Task

Your task is to create a front-end UI displaying various Internet of Things (IoT) sensors based on data provided through a Web Socket endpoint.

The UI should be showing the sensors with their current state and the end-user should be able to connect and disconnect the sensors. There should also be a possibility to toggle whether to see all sensors or only the connected sensors.

Layout, colors, fonts and other styling is up to you to make sure the UI is as appealing and useable as possible.

## Web Socket Server

You are provided with a tiny backend server exposing Web Socket endpoint on <http://localhost:8000>.

From the `/server` directory in your terminal or IDE run the following command:

```bash
npm install && npm start
```

### API

On the client connection event, the API will stream back to the current state of the application in the format:

```typescript
{
  id: string;
  name: string;
  connected: boolean;
  unit: string;
  value: string;
}
```

The Web Socket endpoint accepts the following messages, where `id` is the sensor identifier:

```typescript
// Connect Sensor
{
  command: "connect";
  id: string;
}

// Disconnect Sensor
{
  command: "disconnect";
  id: string;
}
```

## Questions

- What aspect of this exercise did you find most interesting?
  - I have never worked with Websockets before, reading up on them and getting the chance to connect a Frontend to a websocket based backend was quite interesting. Always good to explore new areas
- What did you find most cumbersome to do?
  - I struggled with the initial port for the server, even after killing everything. So I changed it to a value of 8000. Also coming up with a potential UI for everything, it started pretty basic but overral some sort of look and feel to aim for would have been great.
- How can we further improve the user experience?
  - On my side, I know there is more I can do to improve experience. Font size, different cards, and custom checkbox item. Also possibly a function to read the units to handle superscript. Maybe add an interval for the open connection, to slow down how many calls are happening, which will look better for the user, as currently values keep changing.

## Demo

[![Watch the video]](https://github.com/bmosoane/sensor/assets/20299282/06dc5a77-b72c-46fc-a333-43cba4e8d500)





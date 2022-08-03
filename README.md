# React Unity WebGL Template

An out-of-the-box sandbox environment for the React Unity WebGL package. This environment contains a Create-React-App including both the source and build of a Unity WebGL project, allowing to test and debug all of its features.

## Contents

This template contains a simple gamed named "Crate Clicker", where you have to start a game and click on crate as many times as you can to earn points. This game uses all of the implemented features of the React Unity WebGL package.

- Before the Unity application is rendered, a loading screen is shown among with a progress bar to show the loading progress. This demonstrates the use of the [loading progression](https://react-unity-webgl.dev/docs/api/loading-progression) and [is loaded](https://react-unity-webgl.dev/docs/api/is-loaded) variables.
- The game has to be started by a click on a button which is rendered in the React application. This event will trigger the game to start while passing a duration of the game in seconds. This demonstrates the use of [invoking a method in Unity with a parameter](https://react-unity-webgl.dev/docs/api/send-message).
- When the user is game over, the game will stop and invoke an event listener in the React application with both the score, and the time left. This demonstrates the use of the [invoking an event listener in React with a parameter](https://react-unity-webgl.dev/docs/api/event-system).

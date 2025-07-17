import { useEffect, useState } from "react";
import { Unity, useUnityContext, useUnityMetricsInfo } from "react-unity-webgl";
import "./game.css";

export function Game() {
  const [score, setScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const {
    loadingProgression,
    unityProvider,
    isLoaded,
    sendMessage,
    addEventListener,
    removeEventListener,
    getMetricsInfo,
  } = useUnityContext({
    codeUrl: `/game/crate-clicker.wasm`,
    dataUrl: `/game/crate-clicker.data`,
    frameworkUrl: `/game/crate-clicker.framework.js`,
    loaderUrl: `/game/crate-clicker.loader.js`,
    companyName: "Jeffrey Lanters",
    productName: "Crate Clicker",
    productVersion: "1.0.0",
  });

  const { fps } = useUnityMetricsInfo(getMetricsInfo, {
    interval: 1000 / 60,
  });

  function handleClickStart() {
    sendMessage("Controller", "StartGame");
    setIsStarted(true);
  }

  useEffect(() => {
    addEventListener("scoreDidUpdate", setScore);
    return () => {
      removeEventListener("scoreDidUpdate", setScore);
    };
  }, [addEventListener, removeEventListener]);

  return (
    <div className="game-container">
      <div className={["loading-overlay", isLoaded && "loaded"].join(" ")}>
        <img src="/game-logo.png" className="game-logo" alt="Game Logo" />
        <div className="loading-indicator-bar">
          <div
            className="loading-indicator-fill"
            style={{ width: `${loadingProgression * 100}%` }}
          />
        </div>
      </div>
      <div className={["main-menu", isStarted && "started"].join(" ")}>
        <img src="/game-logo.png" alt="Game Logo" className="game-logo" />
        <img
          src="/start-button.png"
          alt="Start Button"
          className="start-button"
          onClick={handleClickStart}
        />
      </div>
      <div className="score-display">
        <span className="score-value">{score}</span>
      </div>
      <div className="fps-counter">{Math.round(fps)} FPS</div>
      <Unity
        unityProvider={unityProvider}
        devicePixelRatio={window.devicePixelRatio}
        matchWebGLToCanvasSize={true}
        className="unity-canvas"
        disabledCanvasEvents={["contextmenu"]}
        tabIndex={0}
      />
    </div>
  );
}

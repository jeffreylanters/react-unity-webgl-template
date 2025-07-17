import { Fragment, useEffect, useState } from "react";
import { Unity, useUnityContext, useUnityMetricsInfo } from "react-unity-webgl";
import "./game.css";

export function Game() {
  const [score, setScore] = useState(0);

  const {
    loadingProgression,
    unityProvider,
    isLoaded,
    sendMessage,
    addEventListener,
    removeEventListener,
    getMetricsInfo,
  } = useUnityContext({
    codeUrl: `/crate-clicker.wasm`,
    dataUrl: `/crate-clicker.data`,
    frameworkUrl: `/crate-clicker.framework.js`,
    loaderUrl: `/crate-clicker.loader.js`,
    companyName: "Jeffrey Lanters",
    productName: "Crate Clicker",
    productVersion: "1.0.0",
  });

  const { fps } = useUnityMetricsInfo(getMetricsInfo, {
    interval: 1000 / 60,
  });

  function handleClickStart() {
    sendMessage("Controller", "StartGame");
  }

  useEffect(() => {
    addEventListener("scoreDidUpdate", setScore);
    return () => {
      removeEventListener("scoreDidUpdate", setScore);
    };
  }, [addEventListener, removeEventListener]);

  const loadingOverlayClassname = [
    "loading-overlay",
    isLoaded ? "loaded" : "",
  ].join(" ");

  return (
    <div className="game-container">
      <div className={loadingOverlayClassname}>Loading</div>
      <Unity
        unityProvider={unityProvider}
        devicePixelRatio={window.devicePixelRatio}
        matchWebGLToCanvasSize={true}
        disabledCanvasEvents={["contextmenu"]}
        tabIndex={0}
      />
    </div>
  );
}

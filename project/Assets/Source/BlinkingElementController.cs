using UnityEngine;
using UnityEngine.UI;

public class BlinkingElementController : MonoBehaviour {
  GameController gameController;
  Text text;
  float timer;

  void Awake () {
    gameController = Object.FindObjectOfType<GameController> ();
    text = GetComponent<Text> ();
  }

  void Update () {
    if (gameController.isPlaying == false) {
      text.enabled = false;
      return;
    }
    timer += Time.deltaTime;
    if (timer > 0.5f) {
      timer = 0;
      text.enabled = !text.enabled;
    }
  }
}

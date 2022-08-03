using UnityEngine;
using UnityEngine.UI;

public class TimeElementController : MonoBehaviour {
  GameController gameController;
  Text text;

  void Awake () {
    gameController = Object.FindObjectOfType<GameController> ();
    text = GetComponent<Text> ();
  }

  void Update () {
    var time = gameController.time > 0 ? gameController.time : 0;
    text.text = time.ToString ("0.00");
  }
}

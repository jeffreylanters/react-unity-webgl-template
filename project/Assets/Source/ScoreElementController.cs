using UnityEngine;
using UnityEngine.UI;

public class ScoreElementController : MonoBehaviour {
  GameController gameController;
  Text text;

  void Awake () {
    gameController = Object.FindObjectOfType<GameController> ();
    text = GetComponent<Text> ();
  }

  void Update () {
    text.text = gameController.score.ToString ();
  }
}

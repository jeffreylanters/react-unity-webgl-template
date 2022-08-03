using System.Runtime.InteropServices;
using UnityEngine;

public class GameController : MonoBehaviour {
  public bool isPlaying { private set; get; } = false;
  public float time { private set; get; }
  public int score;

  [DllImport ("__Internal")]
  static extern void GameOver (float time, int score);


  void Awake () {
    time = 0;
  }

  void Update () {
    if (isPlaying == false) {
      return;
    }
    time -= Time.deltaTime;
    if (time <= 0 || score >= 25) {
      isPlaying = false;
#if UNITY_WEBGL && !UNITY_EDITOR
      GameOver (time, score);
#endif
    }
  }

  public void StartGame (int time) {
    this.time = time;
    score = 0;
    isPlaying = true;
  }
}

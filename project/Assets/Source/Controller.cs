#if UNITY_WEBGL && !UNITY_EDITOR
using System.Runtime.InteropServices;
#endif
using UnityEngine;

class Controller : MonoBehaviour
{
#if UNITY_WEBGL && !UNITY_EDITOR
  [DllImport("__Internal")] static extern void ScoreDidUpdate(int score);
#else
  static void ScoreDidUpdate(int score) => Debug.Log($"Internal call not available in this build. Score: {score}");
#endif

  [SerializeField] Crate crate;

  int score = 0;

#if UNITY_EDITOR
  void Start()
  {
    crate.Appear();
  }
#endif

  public void StartGame()
  {
    crate.Appear();
  }

  public void CrateClicked(Crate crate)
  {
    score += 1;
    ScoreDidUpdate(score);
  }
}

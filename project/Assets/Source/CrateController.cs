using System.Runtime.InteropServices;
using UnityEngine;

public class CrateController : MonoBehaviour {
  Animator animator;
  AudioSource audioSource;
  GameController gameController;

  [DllImport ("__Internal")]
  static extern void ClickedCrate ();

  void Awake () {
    gameController = Object.FindObjectOfType<GameController> ();
    animator = GetComponent<Animator> ();
    audioSource = GetComponent<AudioSource> ();
  }

  void OnMouseDown () {
    if (gameController.isPlaying == false) {
      return;
    }
    gameController.score += 1;
    animator.SetTrigger ("Clicked");
    audioSource.Play ();
#if UNITY_WEBGL && !UNITY_EDITOR
    ClickedCrate ();
#endif
  }
}
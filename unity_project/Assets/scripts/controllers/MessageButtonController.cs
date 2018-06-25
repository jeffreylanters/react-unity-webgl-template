using UnityEngine;
using UnityEngine.UI;
using System.Runtime.InteropServices;

public class MessageButtonController : MonoBehaviour {

	public string message;

	[DllImport("__Internal")]
	private static extern void SendMessage(string message);

	private void Awake() {
		this.GetComponent<Button>().onClick.AddListener(() => {
			SendMessage(this.message);
		});
	}
}

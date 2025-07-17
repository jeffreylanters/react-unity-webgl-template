using UnityEngine;

public class Crate : MonoBehaviour
{
    [SerializeField] Controller controller;
    [SerializeField] AudioSource audioSource;

    Vector3 velocity = Vector3.zero;
    Vector3 scale = Vector3.zero;

    void Start()
    {
        transform.localScale = scale;
    }

    void Update()
    {
        transform.Rotate(velocity * Time.deltaTime * 500f);
        velocity *= 1f - (0.05f * Time.deltaTime * 100f);
        transform.position = Vector3.Lerp(transform.position, velocity * 2f, Time.deltaTime * 5f);
        transform.localScale = Vector3.Lerp(transform.localScale, scale, Time.deltaTime * 5f);
        if (velocity.magnitude < 0.01f)
        {
            velocity = Vector3.zero;
        }
    }

    void OnMouseDown()
    {
        velocity += new Vector3(Random.Range(-1f, 1f), Random.Range(-1f, 1f), Random.Range(-1f, 1f));
        audioSource.pitch = Random.Range(0.8f, 1.2f);
        audioSource.Play();
        controller.CrateClicked(this);
    }

    public void Appear()
    {
        scale = Vector3.one;
    }
}

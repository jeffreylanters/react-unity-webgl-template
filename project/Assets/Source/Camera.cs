using UnityEngine;

public class Camera : MonoBehaviour
{
    float shake = 0f;
    Vector3 originalPosition;

    void Start()
    {
        originalPosition = transform.localPosition;
    }

    void Update()
    {
        if (shake > 0)
        {
            transform.localPosition = originalPosition + Random.insideUnitSphere * shake;
            shake -= Time.deltaTime * 0.5f;
        }
        else
        {
            transform.localPosition = originalPosition;
        }
    }

    public void Shake(float amount)
    {
        shake += amount;
    }
}

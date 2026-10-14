/**
 * Snippets typed out in the animated background (components/CodeBackground.tsx).
 * Edit freely — keep each snippet short (≈10–14 lines) so it stays decorative.
 */
export const codeSnippets: string[] = [
  `#include <WiFi.h>
#include <PubSubClient.h>

const int RELAY_PIN = 26;

void loop() {
  float moisture = readSoilSensor();
  if (moisture < 35.0) {
    digitalWrite(RELAY_PIN, HIGH);
  } else {
    digitalWrite(RELAY_PIN, LOW);
  }
  client.publish("farm/moisture", String(moisture).c_str());
  delay(5000);
}`,
  `import mqtt from "mqtt";

const client = mqtt.connect(process.env.MQTT_URL);

client.on("connect", () => {
  client.subscribe("locker/+/status");
});

export async function unlock(id: string) {
  client.publish(\`locker/\${id}/cmd\`, "OPEN");
  return { ok: true, id };
}`,
  `const detections = await faceapi
  .detectSingleFace(video, new TinyFaceDetectorOptions())
  .withFaceLandmarks()
  .withFaceDescriptor();

const distance = faceapi.euclideanDistance(
  detections.descriptor,
  user.descriptor
);

if (distance < 0.5) {
  await api.post("/lockers/open", { userId });
}`,
  `app.get("/api/restaurants", async (req, res) => {
  const { lat, lng } = req.query;
  const places = await fetchNearby(lat, lng);
  const pick = places[Math.floor(Math.random() * places.length)];
  res.json({
    name: pick.name,
    distance: pick.distance,
    price: pick.priceLevel,
  });
});`,
];

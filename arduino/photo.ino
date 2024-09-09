#include <WiFi.h>
#include <ESPAsyncWebServer.h>

const char* ssid = "SHRDI_501B";
const char* password = "a123456789";

AsyncWebServer server(3001);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected");

  server.on("/takePicture", HTTP_POST, [](AsyncWebServerRequest *request){
    // 프론트 클릭 받는 라우터 경로
    // 특정 동작 수행
    // 특정 동작 수행 완려
    // 카메라로 사진 찍기 (ESP32-CAM 등 사용 가능)
    camera_fb_t *fb = esp_camera_fb_get();  // 카메라 프레임버퍼에 저장
    if (!fb) {
      Serial.println("Camera capture failed");
      request->send(500, "text/plain", "Camera capture failed");
      return;
    }

    // 서버로 사진 데이터를 전송하는 함수 호출
    sendPhotoToServer(fb->buf, fb->len);

    request->send(200, "text/plain", "Picture taken and sent to server");
    esp_camera_fb_return(fb);  // 메모리 해제
});
server.begin();  // 서버 시작
}
void loop() {
  // 동작을 계속 수행하거나 대기
}
// 메인 서버에 있는 photoRouter로 보내기
void sendPhotoToServer(uint8_t *imageData, size_t imageLength) {
  WiFiClient client;
  HTTPClient http;
  http.begin(client, "http://localhost:3001/photo/photo");  // 메인 서버의 photoRouter 경로
  http.addHeader("Content-Type", "application/octet-stream");  // 바이너리 데이터 전송

  int httpCode = http.POST(imageData, imageLength);  // 이미지 데이터 POST 전송
   if (httpCode > 0) {
    Serial.printf("Photo sent, response code: %d\n", httpCode);
  } else {
    Serial.printf("Failed to send photo, error: %s\n", http.errorToString(httpCode).c_str());
  }
  http.end();  // 연결 종료
}
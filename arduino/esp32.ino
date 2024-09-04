#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "SHRDI_501B";
const char* password = "a123456789";
String address = "http://localhost:3001/main/myplant"; // 서버 주소
HTTPClient http;

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    String plantName = "상추";  // 예시 식물 이름
    String postdata = "inputPlantName=" + plantName;

    http.begin(address);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    int httpCode = http.POST(postdata);
    if (httpCode > 0) {
      String payload = http.getString();
      Serial.println(payload); // JSON 응답 출력

      // JSON 파싱
      DynamicJsonDocument doc(1024);
      deserializeJson(doc, payload);

      // 데이터 추출
      String plantName = doc[0]["plant_name"];
      String plantHumidity = doc[0]["plant_humidity"];
      String plantTempDay = doc[0]["plant_temp_day"];
      String plantTempNight = doc[0]["plant_temp_night"];
      String plantWater = doc[0]["plant_water"];

      // 추출된 데이터 출력
      Serial.println("Plant Name: " + plantName);
      Serial.println("Humidity: " + plantHumidity);
      Serial.println("Day Temperature: " + plantTempDay);
      Serial.println("Night Temperature: " + plantTempNight);
      Serial.println("Water Needs: " + plantWater);

    } else {
      Serial.println("Error on HTTP request");
    }
    http.end();
  }
  delay(10000);  // 10초마다 요청
}

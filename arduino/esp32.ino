#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "SHRDI_501B";
const char* password = "a123456789";
String address = "http://localhost:3001/main";
HTTPClient http;

const int fanPin = 2;    // 환풍기 핀
const int peltierPin = 3;  // 펠티어 소자 핀
const int lightPin = 4;   // LED 핀 (식물 불)
const int waterPumpPin = 5;  // 물 펌프 핀

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to WiFi");
  pinMode(fanPin, OUTPUT);
  pinMode(peltierPin, OUTPUT);
  pinMode(lightPin, OUTPUT);
  pinMode(waterPumpPin, OUTPUT);
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    http.begin(address);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    
    int httpCode = http.POST();  // GET 방식으로 서버로부터 데이터 받아오기
    if (httpCode > 0) {
      String payload = http.getString();
      Serial.println(payload);

      // JSON 파싱
      DynamicJsonDocument doc(1024);
      deserializeJson(doc, payload);

      String plantSleepCycle = doc[0]["plant_sleep_cycle"];
      String plantTempDay = doc[0]["plant_temp_day"];
      String plantTempNight = doc[0]["plant_temp_night"];
      String plantHumidity = doc[0]["plant_humidity"];
      String plantWater = doc[0]["plant_water"];
      String plantVentilation = doc[0]["plant_ventilation"];

      Serial.println(plantSleepCycle)

      // 1. 식물 수면시간 체크 (수면시간이 아니면 불 켜기)
      if (!isSleepTime(plantSleepCycle)) {
        digitalWrite(lightPin, HIGH);  // 불 켜기
        Serial.println("Light ON");
      } else {
        digitalWrite(lightPin, LOW);   // 불 끄기
        Serial.println("Light OFF");
      }

      // 2. 온도 조절 (수면시간에 따라 낮/밤 온도 조절)
      if (!isSleepTime(plantSleepCycle)) {
        controlTemperature(plantTempDay);  // 낮 온도 조절
      } else {
        controlTemperature(plantTempNight);  // 밤 온도 조절
      }

      // 3. 습도 조절 (습도 값에 따라 물 공급)
      controlHumidity(plantHumidity);

      // 4. 물 필요량에 따른 물 공급
      controlWaterSupply(plantWater);

      // 5. 환기 필요하면 환풍기 작동
      if (plantVentilation.equals("중간") || plantVentilation.equals("높음")) {
        digitalWrite(fanPin, HIGH);  // 환풍기 ON
        Serial.println("Fan ON");
      } else {
        digitalWrite(fanPin, LOW);  // 환풍기 OFF
        Serial.println("Fan OFF");
      }

    } else {
      Serial.println("Error on HTTP request");
    }
    http.end();
  }
  delay(10000);  // 10초마다 업데이트
}

// 수면 시간 여부 체크 함수
bool isSleepTime(String sleepCycle) {
  // 현재 시간을 비교하여 수면 시간인지 확인하는 로직을 구현
  // 예: 6~8시간 문자열을 분석하여 현재 시간을 비교
  return false;  // 테스트 목적으로 일단 false 반환
}

// 온도 조절 함수
void controlTemperature(String tempData) {
  int minTemp = extractMinValue(tempData);
  int maxTemp = extractMaxValue(tempData);
  
  int currentTemp = 22;  // 예시 현재 온도 센서 값
  
  if (currentTemp < minTemp) {
    digitalWrite(peltierPin, HIGH);  // 펠티어 소자 작동 (온도 높이기)
    Serial.println("Peltier ON (Heating)");
  } else if (currentTemp > maxTemp) {
    digitalWrite(peltierPin, LOW);  // 펠티어 소자 작동 (온도 낮추기)
    Serial.println("Peltier ON (Cooling)");
  }
}

// 습도 조절 함수
void controlHumidity(String humidityData) {
  int minHumidity = 60;  // 예시 값
  int maxHumidity = 70;  // 예시 값
  
  int currentHumidity = 55;  // 예시 현재 습도 센서 값
  
  if (currentHumidity < minHumidity) {
    digitalWrite(waterPumpPin, HIGH);  // 물 펌프 작동 (습도 높이기)
    Serial.println("Water Pump ON");
  } else if (currentHumidity > maxHumidity) {
    digitalWrite(waterPumpPin, LOW);   // 물 펌프 작동 종료
    Serial.println("Water Pump OFF");
  }
}

// 물 필요량에 따른 물 공급 함수
void controlWaterSupply(String waterData) {
  if (waterData.indexOf("잘 줌") != -1) {
    digitalWrite(waterPumpPin, HIGH);  // 물 펌프 작동
    Serial.println("Water Pump ON (Need More Water)");
  } else {
    digitalWrite(waterPumpPin, LOW);  // 물 펌프 중지
    Serial.println("Water Pump OFF");
  }
}

// 범위에서 최소 온도 값 추출
int extractMinValue(String data) {
  int index = data.indexOf('~');
  return data.substring(0, index).toInt();
}

// 범위에서 최대 온도 값 추출
int extractMaxValue(String data) {
  int index = data.indexOf('~');
  return data.substring(index + 1, data.indexOf('°')).toInt();
}

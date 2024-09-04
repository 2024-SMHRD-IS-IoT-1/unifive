#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "SHRDI_501B"; // WIFI ID
const char* password = "a123456789"; // WIFI PW
bool sendData = false;
// Server 요청 주소
String address ="http://192.168.219.62:8001/data"; //post방식
String result = ""; // 응답 결과 저장
HTTPClient http; // 통신 객체

void setup() {
  Serial.begin(115200); // Baud rate
  pinMode(19, OUTPUT);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  Serial.println("Connected to the WiFi network");
}

void loop() {
  
  int sensor1 = 300;
  int sensor2 = 500;
  
  if(btn == 0){
    sendData = true;
  }else{
    sendData = false;
  }

  if (sendData == true && (WiFi.status() == WL_CONNECTED)) { //Check the current connection status
    
    String postdata = "sensor1="+String(sensor1)+"&sensor2="+String(sensor2);
    //String postdata = "btn="+String(btn);
    http.begin(address);
    http.addHeader("Content-Type","application/x-www-form-urlencoded");

    int httpCode = http.POST(postdata); // 응답코드
    if (httpCode > 0) {

      Serial.println(httpCode); // 응답코드 출력
      result = http.getString(); // 응답 결과 저장
      Serial.println(result); // 응답 결과 출력

    }


    http.end(); //Free the resources
    // sendData = false;
  } else {
    Serial.println("버튼 안눌림");
  }
  delay(500);
}

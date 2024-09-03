#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

ESP8266WebServer server(80);

void setup() {
    WiFi.begin("SHRDI_501A", "a123456789");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
    }

    server.on("/update", HTTP_POST, []() {
        String plantData = server.arg("plain");
        // plantData를 사용하여 작업 수행
        server.send(200, "text/plain", "Data received");
    });

    server.begin();
}

void loop() {
    server.handleClient();
}

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

// Wi-Fi credentials
const char *ssid = "Excitel 2.4";
const char *password = "#Udit1588";

// API details
const String apiToken = "hBrF7Saz";
const String apiUrl = "http://192.168.1.36:5000/update"; // Replace with your Flask server URL

WiFiClient wifiClient;
unsigned long lastTime = 0;
unsigned long timerDelay = 10000; // 10 seconds

void setup()
{
    Serial.begin(115200);

    // Connect to Wi-Fi
    WiFi.begin(ssid, password);
    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nConnected to Wi-Fi");
    Serial.println("Timer set to 10 seconds (timerDelay variable), data will be sent every 10 seconds.");
}

void loop()
{
    if ((millis() - lastTime) > timerDelay)
    {
        if (WiFi.status() == WL_CONNECTED)
        {
            // Generate random temperature and humidity values
            float temperature = random(200, 350) / 10.0; // Generates 20.0 to 35.0
            float humidity = random(300, 800) / 10.0;    // Generates 30.0 to 80.0

            // Create JSON payload
            StaticJsonDocument<200> jsonDoc;
            jsonDoc["temperature"] = temperature;
            jsonDoc["humidity"] = humidity;

            String jsonPayload;
            serializeJson(jsonDoc, jsonPayload);

            // Send HTTP POST request
            HTTPClient http;
            http.begin(wifiClient, apiUrl);
            http.addHeader("Content-Type", "application/json");
            http.addHeader("Authorization", apiToken);

            int httpResponseCode = http.POST(jsonPayload);

            if (httpResponseCode > 0)
            {
                Serial.printf("HTTP Response Code: %d\n", httpResponseCode);
                String response = http.getString();
                Serial.println("Response: " + response);
            }
            else
            {
                Serial.printf("Error in sending POST request: %s\n", http.errorToString(httpResponseCode).c_str());
            }

            http.end();
        }
        else
        {
            Serial.println("Wi-Fi not connected");
        }
        lastTime = millis();
    }
}

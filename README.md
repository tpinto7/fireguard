# FireGuard

![FireGuard Device](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/000/925/141/datas/original.jpg)

This repository contains all frontend and hardware source code and dependencies for FireGuard.

FireGuard is a innovative hardware device to monitor environment conditions in order to predict and detect forest fires and alert firefighters through IOT. The installation of several FireGuard devices in a mesh network in a forest has the capability to prevent catastrophic damage to the environment, human health and government expenses. 

A NodeMCU ESP8266 microcontroller build on top of the Arduino framework is interfaced with several sensors, as seen in the image above. These sensors collect environmental data that provide insight on the presence of fires. The sensors used include: DHT11 Temperature and Humidity, CCS811 Air Quality, VEML 6070 UV Index, SparkFun Soil Moisture, and the TCS34725 RGB. The IoT enabled microcontroller allows the data to be efficiently sent to Firebase, reducing potential latency in such critical situations. 

![FireGuard Dashboard](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/000/925/741/datas/original.PNG)

The lightweight data uploaded to Firebase is fetched onto a Vue.js web application and displayed in an intuitive and clean dashboard. When dangerous levels are reached, the UI will alert monitors of the potential of a fire by dynamically changing CSS classes.

![FireGuard Control Panel](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/000/925/735/datas/original.PNG)

A list of all FireGuard devices deployed are shown in a Vue-Bootstrap table with its geolocation, severity, and more details. Clicking the device's location will align the map to it's center using the Google Maps Javascript API. The severity column is calculated using the current values of the sensors for that device. By clicking on the associated more details button, the appropriate dashboard modal appears, as shown in the previous image. The combination of these fields provide a succint and expedient way for a firefighter to assess and respond to a fire. 

[Link to Devpost](https://devpost.com/software/fireguard-07cbjk)



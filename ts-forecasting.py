import json
import pandas as pd
from adtk.data import validate_series
from adtk.visualization import plot
from adtk.detector import SeasonalAD

with open('data.txt') as json_file:
    data = json.load(json_file)
    print(data)

s_train = pd.read_csv("./training.csv", index_col="Datetime", parse_dates=True, squeeze=True)
s_train = validate_series(s_train)
# print(s_train)
plot(s_train)
seasonal_ad = SeasonalAD()
anomalies = seasonal_ad.fit_detect(s_train)
print(anomalies)
plot(s_train, anomaly_pred=anomalies, ap_color='red', ap_marker_on_curve=True)

# from firebase import Firebase
#
# config = {
#     "apiKey" : "AIzaSyDHWPY4NelJCF-UkuLjcH2WX4njgU5TDVI",
#     "authDomain" : "fireguard-88888.firebaseapp.com",
#     "databaseURL" : "https://fireguard-88888.firebaseio.com",
#     "projectId" : "fireguard-88888",
#     "storageBucket": "fireguard-88888.appspot.com",
#     "messagingSenderId": "434458514176",
#     "appId": "1:434458514176:web:60d16d55a6f382e7e899e5"
# }
#
# firebase = Firebase(config)
#
# print(firebase.get())

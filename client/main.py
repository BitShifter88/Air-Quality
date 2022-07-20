import time
import urllib.request, json
import matplotlib.pyplot as plt

now = int(time.time())
oneDay = 60 * 60 * 24

url = "http://192.168.50.127:1337/result?start=1&end=10000000000"

pm25y = []
pm10y = []

x = []

with urllib.request.urlopen(url) as url:
    data = json.loads(url.read().decode())
    for item in data:
        print(item)
        pm25y.append(item["pm25"])
        pm10y.append(item["pm10"])
        x.append(item["time"])

fig, ax = plt.subplots(2)
ax[0].grid()
ax[0].plot(x, pm25y, label = "PM 2.5")

ax[1].grid()
ax[1].plot(x, pm10y, label = "PM 10.0")
#plt.plot(x, pm10y, label = "PM 10.0")
plt.show()

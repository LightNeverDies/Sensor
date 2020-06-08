import rstr
from datetime import datetime
from socketIO_client_nexus import SocketIO, LoggingNamespace
from sense_emu import SenseHat

sense = SenseHat()
now = datetime.now()
 
sensorName = rstr.xeger('\w{2}\d{2}')
print(sensorName)

sensorStatus = 1

readingTime = now.strftime("%m/%d/%Y")
sensorId = hash(sensorName)

def on_connect():
	print('connect')

def on_disconnect():
	socketIO.emit('disconnect', {'sensorId':idmodel})
	print('disconnect')

def on_reconnect():
	print('reconnect')

def on_response():
	print('on_response')

socketIO=SocketIO('192.168.1.4/test',8000,LoggingNamespace)
socketIO.on('connect', on_connect)
socketIO.on('reconnect', on_reconnect)
socketIO.on('disconnect', on_disconnect)

#Listen
socketIO.on('response',on_response)
socketIO.emit('new-sensor',{'sensorId':sensorId, 'sensorName':sensorName, 'sensorStatus':sensorStatus})

while True:
temperature = sense.get_temperature()
humidity = sense.get_humidity()
socketIO.wait(seconds=5)
socketIO.emit('new_sensor_reading',{'sensorTemp':temperature , 'sensorHumi':humidity, 'sensorName':sensorName, 'sensorId':sensorId, 'readingTime':readingTime})



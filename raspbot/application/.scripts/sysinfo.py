import sys, psutil, os, json, datetime

def getTemperature():
    result = 0

    if os.path.isfile('/sys/class/thermal/thermal_zone0/temp'):
        result = os.popen('cat /sys/class/thermal/thermal_zone0/temp')
        result = result.readline().replace("\n", "")
        temperature = int(result) / 1000
        remainder = int(result) / 100 % temperature
        result = str(temperature) + '.' + str(remainder)
    else:
        result = 'NaN'

    return result

def getCPUUsage():
    return str(psutil.cpu_percent())

def getRAMUsage():
    ram = psutil.virtual_memory()
    stat = {
        'total': str(ram.total),
        'used': str(ram.used),
        'available': str(ram.available),
        'percent': str(ram.percent)
    }

    return stat

def getDiskUsage():
    ram = psutil.disk_usage('/')
    stat = {
        'total': str(ram.total),
        'used': str(ram.used),
        'free': str(ram.free),
        'percentage_used': str(ram.percent)
    }

    return stat

def getUptime():
		uptime = datetime.datetime.now() - datetime.datetime.fromtimestamp(psutil.boot_time())
		stat = {
			'total_seconds': str(uptime.total_seconds())
		}

		return stat

stat = {
    'temperature': getTemperature(),
    'cpu': getCPUUsage(),
    'ram': getRAMUsage(),
    'disk': getDiskUsage(),
		'uptime': getUptime()
}

print json.dumps(stat)
sys.stdout.flush()

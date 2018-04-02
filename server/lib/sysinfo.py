import sys, psutil, os, json
from tools.main import bytes2human

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
        'total': bytes2human(ram.total),
        'used': bytes2human(ram.used),
        'available': bytes2human(ram.available),
        'percent': str(ram.percent)
    }

    return stat

def getDiskUsage():
    ram = psutil.disk_usage('/')
    stat = {
        'total': bytes2human(ram.total),
        'used': bytes2human(ram.used),
        'free': bytes2human(ram.free),
        'percentage_used': str(ram.percent)
    }

    return stat

stat = {
    'temperature': getTemperature(),
    'cpu': getCPUUsage(),
    'ram': getRAMUsage(),
    'disk': getDiskUsage()
}

print json.dumps(stat)
sys.stdout.flush()

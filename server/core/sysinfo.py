#!/usr/bin/python
# -*- coding: iso-8859-15 -*-
import psutil, os
from server.lib.tools import bytes2human

class SysInfo(object):

    def __init__(self):
        pass

    def getAll(self):
        stat = {
            'temperature': self.getTemperature(),
            'cpu': self.getCPUUsage(),
            'ram': self.getRAMUsage(),
            'disk': self.getDiskUsage()
        }

        return stat

    def getTemperature(self):
        result = 0
        try:
            result = os.popen('cat /sys/class/thermal/thermal_zone0/temp').readline().replace("\n", "")
            temperature = int(result) / 1000
            remainder = int(result) / 100 % temperature
            result = str(temperature) + '.' + str(remainder) + '°C'
        except:
            pass

        return result

    def getCPUUsage(self):
        return str(psutil.cpu_percent())+'%'

    def getRAMUsage(self):
        ram = psutil.virtual_memory()
        stat = {
            'total': bytes2human(ram.total),
            'used': bytes2human(ram.used),
            'available': bytes2human(ram.available),
            'percent': str(ram.percent)+'%'
        }

        return stat

    def getDiskUsage(self):
        ram = psutil.disk_usage('/')
        stat = {
            'total': bytes2human(ram.total),
            'used': bytes2human(ram.used),
            'free': bytes2human(ram.free),
            'percentage_used': str(ram.percent)+'%'
        }

        return stat

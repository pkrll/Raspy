#!/usr/bin/python
# -*- coding: iso-8859-15 -*-
"""
    RPCi
"""
from flask import Flask
import json
from RPCi.lib.tools import bytes2human

app = Flask(__name__)

@app.route('/')
def index():
    return 'RPCi'

@app.route('/system/temp')
def getTemperature():
    import os
    result = os.popen('cat /sys/class/thermal/thermal_zone0/temp').readline().replace("\n", "")
    temperature = int(result) / 1000
    remainder = int(result) / 100 % temperature

    stat = {}
    stat["temperature"] = str(temperature) + "." + str(remainder) + "°C"

    return json.dumps(stat)

@app.route('/system/cpu')
def getCPUUsage():
    import psutil
    stat = {}
    stat["usage"] = str(psutil.cpu_percent())+"%"
    return json.dumps(stat)

@app.route('/system/ram')
def getRAMInfo():
    import psutil
    ram = psutil.phymem_usage()
    stat = {}
    stat["total"] = bytes2human(ram.total)
    stat["used"] = bytes2human(ram.used)
    stat["available"] = bytes2human(ram.available)
    stat["percent"] = str(ram.percent)+"%"

    return json.dumps(stat)

@app.route('/system/disk')
def getDiskInfo():
    import psutil
    disk = psutil.disk_usage('/')
    stat = {}
    stat["total"] = bytes2human(disk.total)
    stat["used"] = bytes2human(disk.used)
    stat["free"] = bytes2human(disk.free)
    stat["percentage_used"] = str(disk.percent)+"%"

    return json.dumps(stat)

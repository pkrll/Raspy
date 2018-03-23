#!/usr/bin/python
# -*- coding: iso-8859-15 -*-
"""
    RPCi
"""
from flask import Flask, request
import json
from RPCi.lib.tools import bytes2human
from RPCi.core.auth import requires_auth

app = Flask(__name__)

# Fixes auth problems
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')

  return response

@app.route('/')
def index():
    response = {
        "resources": {
            "temperature": { "url": "/system/temp" },
            "cpu usage": { "url": "/system/cpu" },
            "ram usage": { "url": "/system/ram" },
            "disk usage": { "url": "/system/disk" }
        }
    }

    return json.dumps(response)

@app.route('/system/temp')
@requires_auth
def getTemperature():
    import os
    result = os.popen('cat /sys/class/thermal/thermal_zone0/temp').readline().replace("\n", "")
    temperature = int(result) / 1000
    remainder = int(result) / 100 % temperature

    stat = {}
    stat["temperature"] = str(temperature) + "." + str(remainder) + "°C"

    return json.dumps(stat)

@app.route('/system/cpu')
@requires_auth
def getCPUUsage():
    import psutil
    stat = {}
    stat["usage"] = str(psutil.cpu_percent())+"%"
    return json.dumps(stat)

@app.route('/system/ram')
@requires_auth
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
@requires_auth
def getDiskInfo():
    import psutil
    disk = psutil.disk_usage('/')
    stat = {}
    stat["total"] = bytes2human(disk.total)
    stat["used"] = bytes2human(disk.used)
    stat["free"] = bytes2human(disk.free)
    stat["percentage_used"] = str(disk.percent)+"%"

    return json.dumps(stat)

@app.route('/filesystem/list/', defaults={'directory': '/'})
@app.route('/filesystem/list/<path:directory>')
@requires_auth
def listDirectory(directory):
    import os

    if directory is not '/':
        directory = '/' + directory.strip('/') + '/'

    response = {}
    response["cwdir"] = directory
    response["files"] = [file for file in os.listdir(directory) if os.path.isfile(directory + file)]
    response["dirs"]  = [dir for dir in os.listdir(directory) if os.path.isdir(directory + dir)]

    return json.dumps(response)

@app.route('/filesystem/file/<path:filepath>', methods = ['GET', 'DELETE'])
@requires_auth
def manageFile(filepath):
    import os

    filepath = '/' + filepath

    if request.method == 'DELETE':
        try:
            os.remove(filepath)
            return "OK"
        except OSError:
            return "Could not delete file"
    elif request.method == 'GET':
        try:
            stat = os.stat(filepath)

            response = {
                "size": stat.st_size,
                "accessed": stat.st_atime,
                "created": stat.st_ctime,
                "modified": stat.st_mtime
            }

            return json.dumps(response)
        except OSError:
            return "Could not get file"

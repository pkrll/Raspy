#!/usr/bin/python
# -*- coding: iso-8859-15 -*-
"""
    RPCi
"""
import json, os
from flask import Flask, request, render_template
from server.lib.tools import bytes2human
from server.core.auth import requires_auth

app = Flask(__name__, static_folder = "../dist/static", template_folder = "../dist")

# Fixes auth problems
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')

  return response

@app.route('/')
def index():
    return render_template("index.html")


@app.route('/api/')
def api_root():
    response = {
        'device': {
            'name': os.uname()[1],
            'uptime': 0
        },
        'resources': {
            'System information': {
                'Temperature': { 'url': '/system/temp' },
                'CPU usage': { 'url': '/system/cpu' },
                'RAM usage': { 'url': '/system/ram' },
                'Disk usage': { 'url': '/system/disk' }
            },
            'Filesystem': {
                'List': { 'url': '/filesystem/list' },
                'View/Delete file': { 'url': '/filesystem/file/<filename>' }
            }
        }
    }

    return json.dumps(response)

@app.route('/api/system/temp')
@requires_auth
def getTemperature():
    result = os.popen('cat /sys/class/thermal/thermal_zone0/temp').readline().replace("\n", "")
    temperature = int(result) / 1000
    remainder = int(result) / 100 % temperature

    stat = {}
    stat['temperature'] = str(temperature) + '.' + str(remainder) + '°C'

    return json.dumps(stat)

@app.route('/api/system/cpu')
@requires_auth
def getCPUUsage():
    import psutil
    stat = {}
    stat['usage'] = str(psutil.cpu_percent())+'%'
    return json.dumps(stat)

@app.route('/api/system/ram')
@requires_auth
def getRAMInfo():
    import psutil
    ram = psutil.phymem_usage()
    stat = {}
    stat['total'] = bytes2human(ram.total)
    stat['used'] = bytes2human(ram.used)
    stat['available'] = bytes2human(ram.available)
    stat['percent'] = str(ram.percent)+'%'

    return json.dumps(stat)

@app.route('/api/system/disk')
@requires_auth
def getDiskInfo():
    import psutil
    disk = psutil.disk_usage('/')
    stat = {}
    stat['total'] = bytes2human(disk.total)
    stat['used'] = bytes2human(disk.used)
    stat['free'] = bytes2human(disk.free)
    stat['percentage_used'] = str(disk.percent)+'%'

    return json.dumps(stat)

@app.route('/api/filesystem/list/', defaults={'directory': '/'})
@app.route('/api/filesystem/list/<path:directory>')
@requires_auth
def listDirectory(directory):
    if directory is not '/':
        directory = '/' + directory.strip('/') + '/'

    response = {}
    response['cwdir'] = directory
    response['files'] = [file for file in os.listdir(directory) if os.path.isfile(directory + file)]
    response['dirs']  = [dir for dir in os.listdir(directory) if os.path.isdir(directory + dir)]

    return json.dumps(response)

@app.route('/api/filesystem/file/<path:filepath>', methods = ['GET', 'DELETE'])
@requires_auth
def manageFile(filepath):
    filepath = '/' + filepath

    if request.method == 'DELETE':
        try:
            os.remove(filepath)
            return 'OK'
        except OSError:
            return 'Could not delete file'
    elif request.method == 'GET':
        try:
            stat = os.stat(filepath)

            response = {
                'size': stat.st_size,
                'accessed': stat.st_atime,
                'created': stat.st_ctime,
                'modified': stat.st_mtime
            }

            return json.dumps(response)
        except OSError:
            return 'Could not get file'

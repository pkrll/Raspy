#!/usr/bin/python
# -*- coding: iso-8859-15 -*-
"""
    RPCi
"""
import json, os
from flask import Flask, request, render_template, send_file
from server.lib.tools import bytes2human
from server.core.auth import requires_auth
from server.core.authenticator import Authenticator
from server.core.sysinfo import SysInfo

app = Flask(__name__, static_folder = "../dist/static", template_folder = "../dist")
auth = Authenticator("config/default.ini")
sysinfo = SysInfo()

# Fixes auth problems
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')

  return response

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

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
            'System information': [
                {'name': 'Temperature', 'url': '/system/temp' },
                {'name': 'CPU usage',   'url': '/system/cpu' },
                {'name': 'RAM usage',   'url': '/system/ram' },
                {'name': 'Disk usage',  'url': '/system/disk' }
            ],
            'Filesystem': [
                {'name': 'List', 'url': '/filesystem/list' },
                {'name': 'View/Delete file', 'url': '/filesystem/file/<filename>' }
            ]
        }
    }

    return json.dumps(response)

@app.route('/api/user/login', methods = ['POST'])
def login():
    response = { 'status': 0 }

    if request.method == 'POST':
        credentials = json.loads(request.data)
        if (auth.check_auth(credentials['username'], credentials['password'])):
            response['status'] = 1
        else:
            response['message'] = 'Wrong username or password!'
    else:
        response['message'] = 'An error occured. Could not sign in.'

    return json.dumps(response)

@app.route('/api/system', methods = ['GET'])
@requires_auth
def getSystem():
    return json.dumps(sysinfo.getAll())

@app.route('/api/filesystem/list/', defaults={'directory': '/'})
@app.route('/api/filesystem/list/<path:directory>')
@requires_auth
def listDirectory(directory):
    if directory != '/':
        directory = '/' + directory.strip('/') + '/'

    response = {'files': [], 'directories': []}
    response['cwdir'] = directory
    for file in os.listdir(directory):
        if os.path.isfile(directory + file):
            response['files'].append({
                'name': file,
                'path': directory + file
            })
    for dir in os.listdir(directory):
        if os.path.isdir(directory + dir):
            response['directories'].append({
                'name': dir,
                'path': directory + dir
            })

    return json.dumps(response)

@app.route('/api/filesystem/file/<path:filepath>', methods = ['GET', 'DELETE'])
@requires_auth
def manageFile(filepath):
    filepath = '/' + filepath

    if request.method == 'DELETE':
        try:
            if os.path.isfile(filepath):
                os.remove(filepath)
            elif os.path.isdir(filepath):
                import shutil
                shutil.rmtree(filepath)
            return json.dumps({'status': 1})
        except OSError:
            print OSError
            return json.dumps({'status': 0, 'message': 'Could not delete file'})
    elif request.method == 'GET':
        try:
            stat = os.stat(filepath)

            response = {
                'filename': os.path.basename(filepath.strip('/')),
                'metadata': {
                    'size': stat.st_size,
                    'accessed': stat.st_atime,
                    'created': stat.st_ctime,
                    'modified': stat.st_mtime
                }
            }

            return json.dumps(response)
        except OSError:
            return json.dumps({'status': 0, 'message': 'Could not get file'})

@app.route('/api/filesystem/download/<path:filepath>', methods = ['GET'])
@requires_auth
def downloadFile(filepath):
    filepath = '/' + filepath
    resource = json.dumps({"status": 0, "message": "Could not download file"})

    if request.method == 'GET':
        resource = send_file(filepath)

    return resource

def convertFromBytes(bytes):
    import math
    units = ["B", "KB", "MB", "GB", "TB", "PB", "EB"]
    exp = math.trunc(math.log(bytes, 1024))
    unit = ""
    if len(units) > exp:
        unit = units[exp]
    return str(round(bytes/pow(1024, exp), 1))+unit

def bytes2human(n):
    # http://code.activestate.com/recipes/578019
    # >>> bytes2human(10000)
    # '9.8K'
    # >>> bytes2human(100001221)
    # '95.4M'
    symbols = ('K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y')
    prefix = {}
    for i, s in enumerate(symbols):
        prefix[s] = 1 << (i + 1) * 10
    for s in reversed(symbols):
        if n >= prefix[s]:
            value = float(n) / prefix[s]
            return '%.1f %sB' % (value, s)
    return "%sB" % n

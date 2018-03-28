import ConfigParser

class Authenticator(object):

    username = None
    password = None
    configFile = None

    def __init__(self, configFile):
        self.configFile = configFile

        config = ConfigParser.ConfigParser()
        config.read(self.configFile)

        self.username = config.get('DEFAULT', 'ADMIN_NAME')
        self.password = config.get('DEFAULT', 'ADMIN_PASS')

    def check_auth(self, username, password):
        return self.username == username and self.password == password

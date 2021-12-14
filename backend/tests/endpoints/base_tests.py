from unittest import TestCase
from api import app


class BaseTest(TestCase):
    def SetUp(self):
        app.testing = True
        self.app = app.test_client()

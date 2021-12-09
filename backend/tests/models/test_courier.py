from unittest import TestCase
from api import models


class CourierTest(TestCase):
    def test_create_courier(self):

        c = models.Courier(public_id='Test', email='test@test.com', username='username', password='password',)

        self.assertEqual('Test', c.public_id)
        self.assertEqual('test@test.com', c.email)
        self.assertEqual('username', c.username)
        self.assertEqual('password', c.password)


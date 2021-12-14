from unittest import TestCase
from api import models


class PartnerTest(TestCase):
    def test_create_partner(self):
        public_id = 'Test'
        email = 'test@test.com'
        username = 'username'
        password = 'password'

        c = models.Partner(public_id=public_id, email=email, username=username, password=password)

        self.assertEqual('Test', c.public_id)
        self.assertEqual('test@test.com', c.email)
        self.assertEqual('username', c.username)
        self.assertEqual('password', c.password)

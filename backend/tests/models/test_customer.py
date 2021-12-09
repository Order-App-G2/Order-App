from unittest import TestCase
from api import models


class CustomerTest(TestCase):
    def test_create_customer(self):
        public_id = 'Test'
        email = 'test@test.com'
        username = 'username'
        password = 'password'
        phoneNumber = 'Test'
        address = 'Test address'
        c = models.Customer(public_id=public_id, email=email, username=username, password=password,
                            phoneNumber=phoneNumber, address=address)

        self.assertEqual(public_id, c.public_id)
        self.assertEqual(email, c.email)
        self.assertEqual(username, c.username)
        self.assertEqual(password, c.password)
        self.assertEqual(phoneNumber, c.phoneNumber)
        self.assertEqual(address, c.address)

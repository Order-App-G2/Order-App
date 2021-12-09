from unittest import TestCase
from api import models


class OrderTest(TestCase):
    def test_create_Order(self):
        partner_id = int
        customer_id = int
        o = models.Order(partner_id=partner_id, customer_id=partner_id)

        self.assertEqual(partner_id, o.Partner_id)
        self.assertEqual(customer_id, o.customer_id)



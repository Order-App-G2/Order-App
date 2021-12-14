from unittest import TestCase
from api import models


class OrderProductsTest(TestCase):
    def test_create_order_product(self):
        product_id = int
        order_id = int
        quantity = int
        o = models.Order_products(product_id=product_id, order_id=order_id, quantity=quantity)

        self.assertEqual(product_id, o.product_id)
        self.assertEqual(order_id, o.order_id)
        self.assertEqual(quantity, o.quantity)




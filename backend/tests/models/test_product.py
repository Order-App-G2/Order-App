from unittest import TestCase
from api import models


class ProductTest(TestCase):
    def test_create_Product(self):
        title = 'test'
        content = 'test content'
        price = int
        user_id = 'test string'
        product_category_id = int

        p = models.Product(title=title, content=content, price=price, user_id=user_id, product_category_id=product_category_id)

        self.assertEqual(title, p.title)
        self.assertEqual(content, p.content)
        self.assertEqual(price, p.price)
        self.assertEqual(user_id, p.partner_id)
        self.assertEqual(product_category_id, p.product_category_id)

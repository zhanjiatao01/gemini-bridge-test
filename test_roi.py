import unittest
from roi import roi, profit


class TestKoujing(unittest.TestCase):
    def test_roi(self):
        self.assertEqual(roi(200, 100), 2.0)

    def test_profit_13_points(self):
        self.assertEqual(profit(200, 100), 200 * 0.87 - 100)

    def test_zero_spend_guard(self):
        with self.assertRaises(ZeroDivisionError):
            roi(200, 0)


if __name__ == "__main__":
    unittest.main()

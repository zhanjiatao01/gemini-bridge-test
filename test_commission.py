import unittest
from commission import commission


class TestCommission(unittest.TestCase):
    def test_tier1_boundary(self):
        self.assertEqual(commission(10000), 500)

    def test_tier2_boundary(self):
        self.assertEqual(commission(50000), 3700)

    def test_tier3(self):
        self.assertEqual(commission(100000), 9700)

    def test_zero(self):
        self.assertEqual(commission(0), 0)

    def test_mid_tier2(self):
        self.assertEqual(commission(20000), 1300)


if __name__ == "__main__":
    unittest.main()

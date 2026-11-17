def commission(sales):
    """阶梯提成：≤1万部分5%，1万-5万部分8%，>5万部分12%（Gemini 网页原生智能体实现，Codex 适配函数名）"""
    if sales <= 0:
        return 0.0

    total = 0.0

    if sales > 50000:
        total += (sales - 50000) * 0.12
        sales = 50000

    if sales > 10000:
        total += (sales - 10000) * 0.08
        sales = 10000

    total += sales * 0.05
    return round(total, 2)

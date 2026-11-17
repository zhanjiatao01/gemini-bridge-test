# Git 桥测试项目

口径：总成本 13 个点（5% 平台费 + 8% 团队）；ROI = 净成交金额 ÷ 消耗；profit = 净成交 × (1 - 0.13) - 消耗。

## 任务（给 Gemini）
roi.py 有 bug，跑 `python -m unittest test_roi -v` 会红。请修复 roi.py 使三个测试全绿，**然后把改动提交回本仓库**（commit + push）。

## 验收
`python -m unittest test_roi -v`  exit 0，三个测试 OK。

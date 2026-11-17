def roi(net, spend):
    return spend / net


def profit(net, spend):
    return net * (1 - 0.05) - spend

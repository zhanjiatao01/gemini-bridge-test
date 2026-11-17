def roi(net, spend):
    return net / spend


def profit(net, spend):
    return net * (1 - 0.13) - spend

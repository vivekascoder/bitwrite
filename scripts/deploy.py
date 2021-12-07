from brownie import BitToken, network, accounts, config
from web3 import Web3

LOCAL_BLOCKCHAIN_ENVIRONMENT = [
    "development",
    "ganache-local",
]


def get_account():
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENT:
        return accounts[0]
    return accounts.add(config["wallets"]["from_key"])


def deploy_bittoken():
    bittoken = BitToken.deploy("BitWrite Token", "BIT", {
                               "from": get_account()})
    print(f"Deployed at {bittoken.address}")


def main():
    deploy_bittoken()

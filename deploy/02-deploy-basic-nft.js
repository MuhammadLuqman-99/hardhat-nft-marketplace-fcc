const { network } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")

    const args = []
    const basicNft = await deploy("BasicNft", {
        from: deployer,
        log: true,
        args: args,
        waitConfirmations: waitBlockConfirmations || 1,
    })

    const basicNftTwo = await deploy("BasicNftTwo", {
        from: deployer,
        log: true,
        args: args,
        waitConfirmations: waitBlockConfirmations || 1,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying....")
        await verify(basicNft.address, args)
        await verify(basicNftTwo.address, args)
    }
}
module.exports.tags = ["all", "basicnft"]

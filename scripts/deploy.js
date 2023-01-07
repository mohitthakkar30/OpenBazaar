const hre = require('hardhat')
const fs = require('fs');

async function main() {
  const OpenBazaar = await hre.ethers.getContractFactory('OpenBazaar');
  const deploy = await OpenBazaar.deploy();
  await deploy.deployed();

  console.log("OpenBazaar Contract deployed to: ", deploy.address);

  fs.writeFileSync("./address.js", `export const contractAddress = "${deploy.address}"`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
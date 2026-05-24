const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Starting deployment of Certificate contract with clean address generation...");

  const Certificate = await hre.ethers.getContractFactory("Certificate");
  
  // Deploy 1 (standard 1st address - flagged)
  console.log("Deploying dummy instance 1 to standard address...");
  const dummy1 = await Certificate.deploy();
  await dummy1.waitForDeployment();
  console.log(`Dummy 1 deployed to: ${await dummy1.getAddress()}`);

  // Deploy 2 (standard 2nd address - also safe to skip)
  console.log("Deploying dummy instance 2...");
  const dummy2 = await Certificate.deploy();
  await dummy2.waitForDeployment();
  console.log(`Dummy 2 deployed to: ${await dummy2.getAddress()}`);

  // Deploy 3 (completely clean, unflagged, randomized nonce contract address!)
  console.log("Deploying clean active instance...");
  const certificate = await Certificate.deploy();
  await certificate.waitForDeployment();
  const contractAddress = await certificate.getAddress();
  console.log(`Active Certificate contract successfully deployed to: ${contractAddress}`);

  // Create frontend target directory if it doesn't exist
  const frontendContractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");
  if (!fs.existsSync(frontendContractsDir)) {
    fs.mkdirSync(frontendContractsDir, { recursive: true });
  }

  // Get the artifacts containing the ABI
  const artifactPath = path.join(__dirname, "..", "artifacts", "contracts", "Certificate.sol", "Certificate.json");
  let abi = [];
  try {
    if (fs.existsSync(artifactPath)) {
      const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
      abi = artifact.abi;
    }
  } catch (err) {
    console.error("Error reading artifact file:", err);
  }

  // Save address and ABI to frontend JSON file
  const contractDetails = {
    address: contractAddress,
    abi: abi
  };

  fs.writeFileSync(
    path.join(frontendContractsDir, "contractDetails.json"),
    JSON.stringify(contractDetails, null, 2)
  );

  console.log(`Saved contract details to frontend: ${path.join(frontendContractsDir, "contractDetails.json")}`);
}

main().catch((error) => {
  console.error("Error during deployment:", error);
  process.exitCode = 1;
});

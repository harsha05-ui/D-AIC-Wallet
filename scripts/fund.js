const hre = require("hardhat");

async function main() {
  const [sender] = await hre.ethers.getSigners();
  console.log(`Funding source from public test key: ${sender.address}`);

  const acc2 = "0xc5bD42ab068C89db927aB292684D4Fa7158E730B";
  const acc3 = "0x4d53c9727eB191811B377b3348ffA596d6196494";

  // Send 500 ETH to Account 2
  const tx1 = await sender.sendTransaction({
    to: acc2,
    value: hre.ethers.parseEther("500.0")
  });
  await tx1.wait();
  console.log(`Successfully transferred 500 ETH to Acc 2: ${tx1.hash}`);

  // Send 500 ETH to Account 3
  const tx2 = await sender.sendTransaction({
    to: acc3,
    value: hre.ethers.parseEther("500.0")
  });
  await tx2.wait();
  console.log(`Successfully transferred 500 ETH to Acc 3: ${tx2.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

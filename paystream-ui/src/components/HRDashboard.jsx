import { useState } from "react";
import { getContract } from "../utils/contract";
import { ethers } from "ethers";

export default function HRDashboard({ account }) {

  const [treasury, setTreasury] = useState("0");
  const [emp, setEmp] = useState("");
  const [rate, setRate] = useState("");

  async function loadTreasury() {
    const c = await getContract();
    const bal = await c.treasuryBalance();
    setTreasury(ethers.formatEther(bal));
  }

  async function deposit() {
    const c = await getContract();
    const tx = await c.depositFunds({
      value: ethers.parseEther("0.02")
    });
    await tx.wait();
    loadTreasury();
  }

  async function startStream() {
    const c = await getContract();

    const tx = await c.startStream(
      emp,
      ethers.parseUnits(rate, "wei"),
      { value: ethers.parseEther("0.01") }
    );

    await tx.wait();
    alert("Stream started");
  }

  return (
    <div>
      <h2>HR Dashboard</h2>

      <div className="card">
        Treasury: {treasury}
        <br/>
        <button className="btn btn-blue" onClick={loadTreasury}>
          Refresh Treasury
        </button>
        <button className="btn btn-green" onClick={deposit}>
          Deposit 0.02
        </button>
      </div>

      <div className="card">
        <h3>Start Stream</h3>
        <input placeholder="Employee address"
          onChange={e=>setEmp(e.target.value)} />
        <input placeholder="Rate per sec (wei)"
          onChange={e=>setRate(e.target.value)} />

        <button className="btn btn-purple"
          onClick={startStream}>
          Start Stream
        </button>
      </div>
    </div>
  );
}

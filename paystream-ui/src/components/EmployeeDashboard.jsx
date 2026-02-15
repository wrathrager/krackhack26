import { useEffect, useState } from "react";
import { getContract } from "../utils/contract";
import { ethers } from "ethers";

export default function EmployeeDashboard({ account }) {

  const [avail, setAvail] = useState("0");

  async function load() {
    const c = await getContract();
    const a = await c.availableToClaim(account);
    setAvail(ethers.formatEther(a));
  }

  async function claim() {
    const c = await getContract();
    const tx = await c.claim();
    await tx.wait();
    load();
  }

  useEffect(()=>{
    load();
    const t = setInterval(load, 2000);
    return ()=>clearInterval(t);
  },[]);

  return (
    <div className="card">
      <h2>Employee Dashboard</h2>
      Available: {avail}

      <br/>
      <button className="btn btn-green" onClick={claim}>
        Claim Salary
      </button>
    </div>
  );
}

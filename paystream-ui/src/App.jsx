import { useEffect, useState } from "react";
import WalletConnect from "./components/WalletConnect";
import HRDashboard from "./components/HRDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import { getContract } from "./utils/contract";
import "./styles.css";

export default function App() {

  const [account, setAccount] = useState(null);
  const [owner, setOwner] = useState(null);

  useEffect(()=>{
    if(!account) return;
    checkOwner();
  },[account]);

  async function checkOwner() {
    const c = await getContract();
    const o = await c.owner();
    setOwner(o.toLowerCase());
  }

  if(!account)
    return <WalletConnect setAccount={setAccount} />

  if(account.toLowerCase() === owner)
    return <HRDashboard account={account} />

  return <EmployeeDashboard account={account} />
}

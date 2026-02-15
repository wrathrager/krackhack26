export default function WalletConnect({ setAccount }) {

  async function connect() {
    const acc = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    setAccount(acc[0]);
  }

  return (
    <div className="card">
      <h2>PayStream Login</h2>
      <button className="btn btn-green" onClick={connect}>
        Connect MetaMask
      </button>
    </div>
  );
}

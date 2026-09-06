import { useState } from "react";
import AccountCard from "./components/AccountCard";
import MoneyForm from "./components/MoneyForm";

const backendUrl = "http://localhost:3000";

function App() {
  const [accountId, setAccountId] = useState("1");
  const [account, setAccount] = useState(null);
  const [message, setMessage] = useState("");

  async function send(path, options) {
    const response = await fetch(`${backendUrl}${path}`, options);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result;
  }

  async function loadAccount() {
    try {
      setAccount(await send(`/accounts/${accountId}`)); setMessage("");
    } catch (error) { setAccount(null); setMessage(error.message); }
  }

  async function perform(operation, values) {
    try {
      const result = await send(`/accounts/${accountId}/${operation}`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values),
      });
      setMessage(result.message); await loadAccount();
    } catch (error) { setMessage(error.message); }
  }

  return (
    <main className="page">
      <header className="pageHeader"><p className="eyebrow">Simple banking</p><h1>Bank Account</h1><p>View an account and manage its balance.</p></header>
      <section className="accountSearch"><label htmlFor="accountId">Account ID</label><input id="accountId" value={accountId} onChange={(event) => setAccountId(event.target.value)} /><button onClick={loadAccount}>View account</button></section>
      {message && <p className="message">{message}</p>}
      {account && <><AccountCard account={account} /><div className="actionGrid"><MoneyForm title="Deposit" button="Deposit money" onSubmit={(values) => perform("deposit", values)} /><MoneyForm title="Withdraw" button="Withdraw money" onSubmit={(values) => perform("withdraw", values)} /><MoneyForm transfer title="Transfer" button="Transfer money" onSubmit={(values) => perform("transfer", values)} /></div></>}
    </main>
  );
}

export default App;


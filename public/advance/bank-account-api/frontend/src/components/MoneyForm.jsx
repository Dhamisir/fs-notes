import { useState } from "react";

function MoneyForm({ title, button, transfer = false, onSubmit }) {
  const [amount, setAmount] = useState("");
  const [destinationId, setDestinationId] = useState("");

  async function submit(event) {
    event.preventDefault();
    await onSubmit({ amount, ...(transfer ? { destinationId } : {}) });
    setAmount(""); setDestinationId("");
  }

  return <section className="panel"><h3>{title}</h3><form onSubmit={submit}>{transfer && <><label>Destination account</label><input value={destinationId} onChange={(event) => setDestinationId(event.target.value)} /></>}<label>Amount</label><input value={amount} onChange={(event) => setAmount(event.target.value)} /><button type="submit">{button}</button></form></section>;
}

export default MoneyForm;


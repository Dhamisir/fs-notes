function AccountCard({ account }) {
  return <section className="accountCard"><div><p>Account #{account.id}</p><h2>{account.ownerName}</h2></div><div><p>Available balance</p><strong>${Number(account.balance).toFixed(2)}</strong></div></section>;
}

export default AccountCard;


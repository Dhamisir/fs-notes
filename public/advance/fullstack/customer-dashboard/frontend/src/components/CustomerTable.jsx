function CustomerTable({ customers }) {
  if (customers.length === 0) {
    return <p className="emptyMessage">No customers found.</p>;
  }

  return (
    <table className="customerTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Plan</th>
          <th>Joined</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.plan}</td>
            <td>{customer.joined}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomerTable;

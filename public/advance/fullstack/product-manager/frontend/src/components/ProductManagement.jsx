import { useState } from "react";

const emptyProduct = { name: "", price: "", description: "" };

function ProductManagement({ backendUrl, products, onChange }) {
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);

  function update(event) { setForm({ ...form, [event.target.name]: event.target.value }); }

  async function save(event) {
    event.preventDefault();
    await fetch(`${backendUrl}/products${editingId ? `/${editingId}` : ""}`, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(emptyProduct); setEditingId(null); onChange();
  }

  function edit(product) {
    setEditingId(product.id);
    setForm({ name: product.name, price: product.price, description: product.description });
  }

  async function remove(id) {
    await fetch(`${backendUrl}/products/${id}`, { method: "DELETE" });
    onChange();
  }

  return (
    <div className="managementGrid">
      <section className="panel"><h2>{editingId ? "Edit product" : "Create product"}</h2>
        <form onSubmit={save}>
          <label>Name</label><input name="name" value={form.name} onChange={update} />
          <label>Price</label><input name="price" type="number" step="0.01" value={form.price} onChange={update} />
          <label>Description</label><textarea name="description" rows="4" value={form.description} onChange={update} />
          <button className="primaryButton" type="submit">{editingId ? "Save changes" : "Create product"}</button>
        </form>
      </section>
      <section className="panel"><h2>Manage products</h2><div className="manageList">
        {products.map((product) => <article key={product.id}><div><strong>{product.name}</strong><p>${Number(product.price).toFixed(2)}</p></div><div><button onClick={() => edit(product)}>Edit</button><button className="danger" onClick={() => remove(product.id)}>Delete</button></div></article>)}
      </div></section>
    </div>
  );
}

export default ProductManagement;


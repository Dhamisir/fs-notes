function SearchBar({ value, onChange }) {
  return (
    <input
      className="searchInput"
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search products by name..."
    />
  );
}

export default SearchBar;

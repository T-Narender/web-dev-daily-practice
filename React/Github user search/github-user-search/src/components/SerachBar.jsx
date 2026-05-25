import {useState} from 'react';

function SearchBar({onSearch}) {
  const [input ,setInput] = useState('');

  function handleSearch() {
    if(!input.trim()) return
    onSearch(input);
    setInput('');
  }

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter GitHub username..."
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}
export default SearchBar;
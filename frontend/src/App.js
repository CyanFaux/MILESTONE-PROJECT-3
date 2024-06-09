import React, {useState, useEffect} from 'react';
import './App.css';
import SearchBar from './components/searchBar';

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => {
    if(searchTerm) {
      setData(fetchData(searchTerm))
    }
  }, [searchTerm])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }
  return (
    
    <div className="App">
      <SearchBar handleSearch={handleSearch} />
    </div>
  );
}

export default App;

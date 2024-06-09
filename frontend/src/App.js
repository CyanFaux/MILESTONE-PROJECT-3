import React, {useState, useEffect} from 'react';
import './App.css';
import SearchBar from './components/searchBar';
import { createResource } from './Request';

function App() {
  let [searchTerm, setSearchTerm] = useState('Jurassic Park')
  let [data, setData] = useState(null)

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }

  useEffect(() => {
    if(searchTerm){
      setData(createResource(searchTerm).result.read)
    }
  }, [searchTerm])

  // useEffect(() => {

  //   console.log(data)
  // }, [data])

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch} />
    </div>
  );
}

export default App;

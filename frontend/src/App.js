import React, {useState, useEffect} from 'react';
import './App.css';
import SearchBar from './components/searchBar';
import { createResource } from './Request';

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [data, setData] = useState(null)

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }

  useEffect(() => {
    if(searchTerm) {
      // setData(fetchData(searchTerm))
      const fetchData = async () => {
        const resource = createResource(searchTerm)
        try{
          const res = await resource.result.read()
          setData(res)
          console.log(res)
        }catch(err){
          console.error(err)
        }
      }
      fetchData()
    }
  }, [searchTerm])

  return (
    <div className="App">
    <SearchBar handleSearch={handleSearch} />
    </div>
  );
}
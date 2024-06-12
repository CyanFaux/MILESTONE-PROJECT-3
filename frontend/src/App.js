import React, {useState, useEffect, Suspense} from 'react';
import './App.css';
import SearchBar from './components/searchBar';
import { createResource } from './Request';
import Display from './components/Display';
import Loading from './Loading';
// import { render } from '@testing-library/react';

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [resource, setResource] = useState(null)

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }

  useEffect(() => {
    if(searchTerm){
      setResource(createResource(searchTerm))
    }
  }, [searchTerm])

  useEffect(() => {
    console.log(resource)
  }, [resource])

  const renderMovie = () => {
    if(resource) {
      return(
        <Suspense fallback={<Loading />}>
          <Display item={resource.result.read()} />
        </Suspense>
      )
    }
    return null
  }

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch} />
      {renderMovie()}
    </div>
  );
}

export default App
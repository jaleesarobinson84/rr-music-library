import { useEffect, useState,useRef, Fragment } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'
import {SearchContext} from './context/SearchContext'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'


function App(){
    let [search, setSearch] = useState('')
    let [data, setData] = useState([])
    let [message, setMessage] = useState('Search for Music!')
    let SearchInput = useRef('')


    const API_URL = 'https://itunes.apple.com/search?term='

    useEffect(() => {
      if (search) {
      const fetchData = async () => {
          document.title = `${search} Music`
          const response = await fetch(API_URL + search)
          const resData = await response.json()
          if (resData.results.length > 0) {
              setData(resData.results)
          } else {
              setMessage('Not Found')
          }
      }
      fetchData()
    }
  }, [search])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }
  

return (
        <div className="App">
          <SearchContext.Provider value={{
            term: SearchInput,
            handleSearch: handleSearch
          }}>
          {message}
          <Router>
            <Routes>
              <Route path="/" element={
            <Fragment>
            <SearchBar handleSearch = {handleSearch}/>
          </SearchContext.Provider>
              {message}
            <DataContext.Provider value={data} >
              <Gallery data={data}/>
              </Fragment>
            } />
            <Route path="/album/:id" element={<AlbumView />} />
            <Route path="/artist/:id" element={<ArtistView />} />
            </Routes>
            </Router>
              <AlbumView/>
              <ArtistView/>
            </DataContext.Provider>
        </div>
    )
}

export default App



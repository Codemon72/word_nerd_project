import { useContext, useState, useEffect } from 'react'
import SearchTermContext from '../context/SearchTermContext'
import { fetchFromDatamuse } from './functions/callDatamuseAPI'
import Display from './Display'

const DisplayRhymesWith = () => {
  console.log('DisplayRhymesWith rendered')

  const { searchTerm } = useContext(SearchTermContext)

  const [resultsArray, setResultsArray] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  let queryString = '/words?rel_rhy=' + searchTerm

  useEffect(() => {
    console.log('useEffect triggered')

    if (searchTerm !== '') {
      setResultsArray([])
      setIsLoading(true)
      fetchFromDatamuse(queryString)
        .then((data) => {
          setResultsArray(data)
        })
        .then(() => setIsLoading(false))
        .catch((error) => console.log(error))
    }
  }, [searchTerm, queryString])

  return (
    <Display
      title='Rhymes with ...'
      isLoading={isLoading}
      searchTerm={searchTerm}
      resultsArray={resultsArray}
    />
  )
}

export default DisplayRhymesWith

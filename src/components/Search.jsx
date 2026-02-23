import React from 'react'

const Search = ({searchTerm,setsearchTerm}) => {
  return (
    
    <div className='search'>
        <div>
            <img src="./search.svg" alt="search" />
            <input 
            type='text'
            placeholder='Search thousands of movies here'
            value={searchTerm}
            onChange={(event)=>setsearchTerm(event.target.value)}
            />
            
        </div>
        
    </div>
    
  )
}

export default Search

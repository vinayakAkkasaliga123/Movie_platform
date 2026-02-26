import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import Search from './components/Search'
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMBD_API_KEY;



const API_OPTIONS = {
  method:'GET',
  headers:{
    accept:'application/json',
    Authorization:`Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setsearchTerm]=useState('');
  const [errormessage, seterrormessage] = useState('');
  const [MovieList, setMovieList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [DebounceSearch,setdebounceSearch] = useState('');

  useDebounce(()=>setdebounceSearch(searchTerm),500,[searchTerm])

  const fetchMovies = async (query='')=>{
    try{
      const endpoint =query ? 
      `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : 
      `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint,API_OPTIONS);
      if(!response.ok){
        throw new Error("Data fetching failed");

      }
      const data = await response.json();
      if(data.response==='False'){
        seterrormessage(data.error || "Fetching failed");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || [])
    }catch(error){
      console.error(error);
      seterrormessage("Error fetching the movies !!!");
    }finally{
      setisLoading(false);
    }
    
  }
  useEffect(()=>{
    fetchMovies(DebounceSearch);
  },[DebounceSearch])
  return (
    <main>
    <div className='pattern'>
      <header className='wrapper'>
        <img src='./hero.png' alt='Hero Banner' />
      <h1>
       Find <span className='text-gradient'>Movies</span> You'll Enjoy without hassle
      </h1>
      </header>
      <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>
    </div>
    <section className='all-movies '>
      <h2 >All Movies</h2>


      {isLoading ? 
      (<p>Loading.....</p>) :
      errormessage ? 
      (<p className='text-white'>{errormessage}</p>) :
      (<ul>
        
          {MovieList.map((movie)=>(
            <MovieCard movie={movie} key={movie.id}/>
          ))}
          
        
      </ul>)
    
    }
    </section>
    </main>
  )
}

export default App

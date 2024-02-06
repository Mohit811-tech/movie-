import React, { useEffect, useState } from 'react'
import Pagination from "./Pagination";

function Favourite() {
  const [curGenere, setCurGenere] = useState("All Genere");
  const [favourites, setFavourites] = useState([]);
  const [genres, setGenres] = useState([]);
  const [rating, setRating] = useState(0);
  const [popularity, setPopularity] = useState(0);
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState(5);
  const [curPage, setCurPage] = useState(1);


  useEffect(() => {
     // Using local storage of browser to get the movies liked
     let oldFav = localStorage.getItem('imdb');
     oldFav = JSON.parse(oldFav) || [];    // JSON.parse is used to convert from data from json to object
     setFavourites([...oldFav]);  // Setting favourite array
     console.log(favourites);
    //  console.log(oldFav);
  },[]);

  useEffect(() => {
    let temp = favourites.map((movie) => genreids[movie.genre_ids[0]]);
    // temp = new Set(temp);
    temp = new Set(temp.filter(genre => genre));
    setGenres(["All Genere", ...temp]);
  }, [favourites]);

  const genreids = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: "Western"
  }

  const del = (movie) => {
    const filteredFav = favourites.filter((m) => m.id !== movie.id);
    setFavourites([...filteredFav]);
    // console.log(filteredFav);
    localStorage.setItem('imdb', JSON.stringify(filteredFav));   // Saving movies that are disliked by user in local storage of browser to keep them saved after reload
  };

  let filteredMovies = [];
  filteredMovies = curGenere == "All Genere" ? favourites : favourites.filter((movie) => genreids[movie.genre_ids[0]] == curGenere);

// Arranging data in table in a sorted manner with respect to rating
if(rating == 1) {
  filteredMovies = filteredMovies.sort(function(objA, objB) {
    return objA.vote_average - objB.vote_average;
  })
} 
else if(rating == -1) {
  filteredMovies = filteredMovies.sort(function(objA, objB) {
    return objB.vote_average - objA.vote_average;
  }
  )
}

// Arranging data in table in a sorted manner with respect to popularity
  if(popularity == 1) {
    filteredMovies = filteredMovies.sort(function(objA, objB) {
      return objA.popularity - objB.popularity;
    })
  } 
  else if(popularity == -1) {
    filteredMovies = filteredMovies.sort(function(objA, objB) {
      return objB.popularity - objA.popularity;
      }
    )
  }

// Searching
  filteredMovies = filteredMovies.filter((movie) => (movie.original_title || movie.name).toLowerCase().includes(search.toLowerCase()))


// Pagination
  let maxPages = Math.ceil(filteredMovies.length / rows);
  let startIndex = (curPage-1) * rows;
  let endIndex = Number(startIndex) + Number(rows);

  filteredMovies = filteredMovies.slice(startIndex, endIndex);

  let goBack = () => {
    if(curPage > 1){
      setCurPage(curPage - 1);
    }
  }
  let goAhead = () => {
    if(curPage < maxPages) {
      setCurPage(curPage + 1);
    }
  }


  return (
    <div>

      <div className='flex flex-wrap justify-center space-x-5'>
        {
          genres.map((genre) => 
            <button onClick={() => {
              setCurGenere(genre);
              setCurPage(1)
            }} className={
            curGenere == genre ?
              'bg-blue-500 rounded-xl p-2 text-white mt-4 items-center ' :
              'hover:bg-blue-400 bg-gray-400 rounded-xl p-2 text-white mt-4 items-center '
              }>{genre}</button>
          )
        }
        
      </div>

      <div className='flex flex-wrap mt-5 justify-center'>
        <input onChange={(e) => {setSearch(e.target.value)}} value={search} className='border-2 border-gray-400 text-center' type="text" placeholder='Search'/>
        <input onChange={(e) => {setRows(e.target.value)}} value={rows} className='border-2 border-gray-400 text-center' type="number" placeholder='Rows'/>
      </div>
      
      <div className="container mx-auto mt-5">
        <table className="min-w-full bg-white border border-gray-300">
          <thead> 
            <tr>
              <th scope='col' className="py-2 px-4 border-b">Name</th>
              <th scope='col' className="py-2 px-4 border-b">
                <button onClick={() => {
                  setRating(-1);
                  setPopularity(0);
                }} className='border-black rounded-full border-2 mr-1'>u</button>
                Rating
                <button onClick={() => {
                  setRating(1);
                  setPopularity(0);
                }} className='border-black rounded-full border-2 ml-1'>d</button>
              </th>
              <th scope='col' className="py-2 px-4 border-b">
              <button onClick={() => {
                setPopularity(-1)
                setRating(0);
              }} className='border-black rounded-full border-2 mr-1'>u</button>
                Popularity
                <button onClick={() => {
                  setPopularity(1)
                  setRating(0);
              }} className='border-black rounded-full border-2 ml-1'>d</button>
              </th>
              <th scope='col' className="py-2 px-4 border-b">Genere</th>
              <th scope='col' className="py-2 px-4 border-b">Remove</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredMovies.map((movie) => (
                <tr key={movie.id}>
                  <td className="py-2 px-4 border-b">{movie.original_title || movie.name}</td>
                  <td className="py-2 px-4 border-b">{movie.vote_average}</td>
                  <td className="py-2 px-4 border-b">{movie.popularity}</td>
                  {/* <td className="py-2 px-4 border-b">{movie.genre}</td> */}
                  <td className="py-2 px-4 border-b">{genreids[movie.genre_ids[0]] || 'Unknown'}</td>

                  <td className="py-2 px-4 border-b">
                    <button onClick={() => del(movie)}>Remove</button>
                  </td>
                </tr>
              ))
            }
           
          </tbody>
        </table>
      </div>

      <Pagination onPrev= {goBack} page= {curPage} onNext= {goAhead}/>

    </div>
  )
}

export default Favourite
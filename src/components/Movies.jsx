import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hovered, setHovered] = useState("");
  const [favourites, setFavourites] = useState([]);

  // Runs everytime when page reloads
  useEffect(
    function () {
      // Fetching data from api
      axios
        .get(
          "https://api.themoviedb.org/3/trending/all/week?api_key=411addf3405ab9bd7f77255caa044707&page=" +
            page
        )
        .then((res) => {
          // console.table(res.data.results)     // To see the data of api in table format
          setMovies(res.data.results);
        });

      // Using local storage of browser to get the movies liked
      let oldFav = localStorage.getItem('imdb');
      oldFav = JSON.parse(oldFav) || [];    // JSON.parse is used to convert from data from json to object
      setFavourites([...oldFav]);  // Setting favourite array
      console.log(favourites);
    },
    [page]
  );

  const onPrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const onNext = () => {
    setPage(page + 1);
  };

  const showEmoji = (id) => {
    setHovered(id);
  };
  const hideEmoji = (id) => {
    setHovered("");
  };

  const likeEmoji = (movie) => {
    let newFav = [...favourites, movie];
    setFavourites([...newFav]);
    localStorage.setItem("imdb", JSON.stringify(newFav)); // Saving movies that are liked by user in local storage of browser to keep them saved after reload
  };

  const dislikeEmoji = (movie) => {
    const filteredFav = favourites.filter((m) => m.id != movie.id);
    setFavourites([...filteredFav]);
    // console.log(filteredFav);
    localStorage.setItem("imdb", JSON.stringify(filteredFav)); // Saving movies that are disliked by user in local storage of browser to keep them saved after reload
  };

  return (
    <div className="mt-8">
      <h3 className="block py-8 text-3xl text-center font-bold">
        Trending Movies
      </h3>
      <div className="flex flex-wrap justify-center">
        {movies.length === 0 ? (
          <h1>Loading...</h1>
        ) : (
          movies.map((movie) => {
            return (
              <div
                key={movie.id}
                className="relative bg-center bg-cover h-[30vh] w-[160px] m-4 rounded-xl hover:scale-110 duration-300 flex items-end"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/original/${movie.poster_path})`,
                }}
                onMouseOver={() => {
                  showEmoji(movie.id);
                }}
                onMouseLeave={() => {
                  hideEmoji();
                }}
              >
                <div
                  className="absolute top-1 right-1 bg-black bg-opacity-80 rounded-xl p-1"
                  style={{
                    display: hovered === movie.id ? "block" : "none",
                  }}
                >
                  {favourites.find((fav) => fav.id === movie.id) ? (
                    <button
                      onClick={() => {
                        dislikeEmoji(movie);
                      }}
                    >
                      ❌
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        likeEmoji(movie);
                      }}
                    >
                      ❤️
                    </button>
                  )}
                </div>
                {/* <div
                  className="absolute top-1 right-1 bg-black bg-opacity-80 rounded-xl p-1"
                  style={{
                    display: hovered === movie.id ? "block" : "none",
                  }}
                >
                  {favourites.includes(movie.id) == false ? (
                    <button
                      onClick={() => {
                        likeEmoji(movie);
                      }}
                    >
                      ❤️
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        dislikeEmoji(movie);
                      }}
                    >
                      ❌
                    </button>
                  )}
                </div> */}

                <div className="font-bold text-center text-white bg-black bg-opacity-80 rounded-b-xl py-2 w-full">
                  {movie.original_title || movie.name}
                </div>
              </div>
            );
          })
        )}
      </div>

      <Pagination onPrev={onPrev} page={page} onNext={onNext} />
    </div>
  );
}

export default Movies;

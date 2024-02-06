import axios from "axios";
import React, { useEffect, useState } from "react";

function Banner() {
  let [banner, setBanner] = useState("");

  useEffect(function () {
    (function () {
      axios
        .get(
          "https://api.themoviedb.org/3/trending/all/week?api_key=411addf3405ab9bd7f77255caa044707"
        )
        .then((res) => {
          // console.table(res.data.results)     // To see the data of api in table format
          setBanner(res.data.results[0]);
        });
    })();
  }, []);

  return (
    <>
      {
        banner == "" ? (
          <h1>Loading</h1>
        ) : (
          // <div className='bg-banner bg-center bg-cover h-[30vh] md:h-[40vh] w-[550px] flex items-end '>
          <div className="flex justify-center mt-4">
            <div
              className="bg-center bg-cover h-[40vh] md:h-[50vh] w-[550px] flex items-end "
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/original/${banner.backdrop_path})`,
              }}
            >
              {" "}
              {/* // Getting image from tailwing.config.js */}
              <div className="text-xl md:text-2xl text-center text-white bg-black bg-opacity-60 py-6 w-full">
                {banner.original_title}
              </div>
            </div>
          </div>
        )
        /* </div>     */
      }
    </>
  );
}

export default Banner;

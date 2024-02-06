import axios from 'axios';
import React, { useEffect } from 'react'

function Api() {

  useEffect(function () {
        (function () {
          axios
            .get(
              "https://api.themoviedb.org/3/trending/all/week?api_key=411addf3405ab9bd7f77255caa044707"
            )
            .then((res) => {
              // console.table(res.data.results)     // To see the data of api in table format
            //   setBanner(res.data.results[0]);
                const data = res.data.results
                // return data;
            });
        })();
      }, []);

  return (
    <div>
        
    </div>
  )
}

export default Api
import axios from "axios";
import { Router, response } from "express";
import { Dogs } from "../modules/Dogs.js";

export async function rout(url) {
  try {
    let response = await fetch(
    `https://api.thedogapi.com/v1/images/search?limit=2&api_key=${process.env.API_KEY}`
    )
    let data = await response.json()
    // console.log(data[0])
    return data
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function fetchAndPromise(url) {
  const data = await rout(url);
  console.log (data)
  if (!data) {
    console.warn('There was an error reading data');
  }
         
  const dogPromises = data.map((dat) => {
    const breed = dat.breeds[0]
    console.log(breed.name)
    //      return Dogs.create({
    //       name: breed.name,
    //  })
    
   }
    )
    try {
      await Promise.all(dogPromises);
      console.log("Dog data fetched and stored successfully");
    } catch (error) {
      console.error("Error storing dog data:", error);
    }}
   
  //     name: breed.name,
  //     height: breed.height ? parseInt(breed.height.metric.split(" ")[0]) : null,
  //     weight: breed.weight ? parseInt(breed.weight.metric.split(" ")[0]) : null,
  //     life_span: breed.life_span
  //       ? parseInt(breed.life_span.split(" ")[0])
  //       : null,
  //   });
  // });

  
 
//  }


import axios from "axios";
import { Router, response } from "express";
import { Dogs } from "../modules/Dogs.js";

 async function rout(url) {
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



export async function filterAndFetch (){   // This is the function read by app.
 
  function extractProp (data, properties){ //this function recursion for catching data
  let result = {}   // here I am going to catch the data (bDone [name and weight])
  function dogsFetcher (data) {  // this one is using the parameters down 
    for (let key in data){  
     if (data.hasOwnProperty(key)){ // determina si tiene propiedad.  (ej: "Esto: con esto"(true)  carro (false))
        let value = data[key];  // This has the data already.          
        if (properties.includes(key)) {   // now it is checking if name and other are included in properties
          result[key] = value;  // i got the result and it has been put in result{}
        }
         if (typeof value === 'object' && value !== null){ // this is important, because that is the way I know if it is an object
        dogsFetcher(value) // recursion
        }
      }                
     } 
    }
    dogsFetcher(data); /// second recursion and it id do it for data
    return result;
   
  }
  let bDone = await rout() // i am calling the external api.
  
  bDone.forEach(item => { // now I am here and I need to make the map for matching with my database 
    let extracted = extractProp(item, ['name', 'weight']);
    console.log(extracted);
    });

 
  }
  

  
    
   
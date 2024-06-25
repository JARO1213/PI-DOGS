import axios from "axios";

import { Dogs } from "../modules/Dogs.js";
import { Temperaments } from "../modules/Temperaments.js";

export async function rout() {
  try {
    let { data } = await axios(
      `https://api.thedogapi.com/v1/images/search?limit=25&api_key=${process.env.API_KEY}`
    );
    if (data !==null){

    return data;}
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}



export async function filterAndFetch() {
  // This is the function read by app.

  function extractProp(data, properties) {
    //this function recursion for catching data
    let result = {}; // here I am going to catch the data (bDone [name and weight])
    function dogsFetcher(data) {
      // this one is using the parameters down
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          // determina si tiene propiedad.  (ej: "Esto: con esto"(true)  carro (false))
          let value = data[key]; // This has the data already.
          if (properties.includes(key)) {
            // now it is checking if name and other are included in properties
            result[key] = value; // i got the result and it has been put in result{}
          }
          if (typeof value === "object" && value !== null) {
            // this is important, because that is the way I know if it is an object
            dogsFetcher(value); // recursion
          }
        }
      }
    }
    dogsFetcher(data); /// second recursion and it id do it for data
    return result;

  }

  async function dogPromise() {

    try {
      const bDone = await rout();
      if (!bDone) {
        throw new Error("No data fetched from the API");
      }
      let dogPromises =  bDone.map(async (item) => {
        let extracted = extractProp(item, [
          "name",
          "weight",
          "height",
          "life_span",
          "temperament",
          "id"
        ]);
        // console.log(extracted);
        const { imperial: weightImperial, metric: weightMetric } = extracted.weight || {};
        const { imperial: heightImperial, metric: heightMetric } = extracted.height || {};

      
        const dbApi = {
          id: item.id,
          name: extracted.name,
          weightImperial,
          weightMetric,
          heightImperial,
          heightMetric,
          life_span: extracted.life_span,
          image: item.url,
          temperament: extracted.temperament
        };
        // console.log (dbApi)
        const dogs = await Dogs.create({
          name: extracted.name,
          weight: extracted.weight,
          height: extracted.height,
          image: item.url,
          life_span: extracted.life_span,
        });

        if (extracted.temperament && extracted.temperament !== null) {
          let tempSpli = extracted.temperament.split(", ");
          const temperamentPromises = tempSpli.map(async temp => {
            const [temperament] = await Temperaments.findOrCreate({
              where: { name: temp }
            });
            return temperament;
          });
          const temperaments = await Promise.all(temperamentPromises);
          await dogs.addTemperaments(temperaments);
        }

        // console.log('Esto es dbApi:', dbApi)
        return { dogs, dbApi }
      })
      const result = (await Promise.all(dogPromises));
      console.log("Every data has been mathched");
      return result;

    } catch (error) {
      console.error("Error fetching and storing dog data:", error);
    }

  }
  return await dogPromise();
}

export async function justApi() {
  // This is the function read by app.

  function extractProp(data, properties) {
    //this function recursion for catching data
    let result = {}; // here I am going to catch the data (bDone [name and weight])
    function dogsFetcher(data) {
      // this one is using the parameters down
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          // determina si tiene propiedad.  (ej: "Esto: con esto"(true)  carro (false))
          let value = data[key]; // This has the data already.
          if (properties.includes(key)) {
            // now it is checking if name and other are included in properties
            result[key] = value; // i got the result and it has been put in result{}
          }
          if (typeof value === "object" && value !== null) {
            // this is important, because that is the way I know if it is an object
            dogsFetcher(value); // recursion
          }
        }
      }
    }
    dogsFetcher(data); /// second recursion and it id do it for data
    return result;

  }

  async function dogPromise() {

    try {
      const bDone = await rout();
      if (!bDone) {
        throw new Error("No data fetched from the API");
      }
      let dogPromises =  bDone.map(async (item) => {
        let extracted = extractProp(item, [
          "name",
          "weight",
          "height",
          "life_span",
          "temperament",
          "id"
        ]);
        // console.log(extracted);
        const { imperial: weightImperial, metric: weightMetric } = extracted.weight || {};
        const { imperial: heightImperial, metric: heightMetric } = extracted.height || {};

      
        const dbApi = {
          id: item.id,
          name: extracted.name,
          weightImperial,
          weightMetric,
          heightImperial,
          heightMetric,
          life_span: extracted.life_span,
          image: item.url,
          temperament: extracted.temperament
        };
        return {dbApi}
      })
      const result = (await Promise.all(dogPromises));
      console.log("Every data has been mathched");
      return result;

    } catch (error) {
      console.error("Error fetching and storing dog data:", error);
    }
  }
  return await dogPromise();
}
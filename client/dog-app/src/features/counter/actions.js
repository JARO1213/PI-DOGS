import { getDogs, getDogsApi } from "./dogsSlice.js";
import axios from "axios";

 
export const gettingDogs = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get('http://localhost:3001/allDogs');
        const filteredDogs = response.data.filter(dog => dog.name !== null).map(dog => ({
          id: dog.id,
          name: dog.name,
          weight:  dog.weight && dog.weight.metric ? dog.weight.metric : 'NA',
          image:dog.image,
          life_span:dog.life_span,
          // // height: dog.height.metric, // Accediendo directamente a la propiedad metric
          // temperament: dog.temperament,
        }));

        dispatch(getDogs(filteredDogs));
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };
  };

  export const gettingApiDogs = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get('http://localhost:3001/dogsApi');
        const filteredDogs = response.data.filter(dog => dog.name !== null).map(dog => ({
          id: dog.id,
          name: dog.name,
          // weight:  dog.weight && dog.weight.metric ? dog.weight.metric : 'NA',
          image:dog.image,
          life_span:dog.life_span,
          // // height: dog.height.metric, // Accediendo directamente a la propiedad metric
          temperament: dog.temperament,
        }));

        dispatch(getDogsApi(filteredDogs));
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };
  };


 
import { getDogs, getDogsApi, getTemp } from "./dogsSlice.js";
import axios from "axios";

 
export const gettingDogs = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get('http://localhost:3001/allDogs');
       
        const filteredDogs = response.data.filter(dog => dog.name !== null).map(dog => ({
        
          id: dog.id,
          name: dog.name,
          weightImperial: dog.weightImperial,
          weightMetric: dog.weightMetric,
          heightImperial: dog.heightImperial,
          heightMetric: dog.heightMetric,
          image:dog.image,
          life_span:dog.life_span,
          temperament: dog.temperaments.map(arr => arr.name).join(', '),
         
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
          weightImperial: dog.weightImperial,
          weightMetric: dog.weightMetric,
          heightImperial: dog.heightImperial,
          heightMetric: dog.heightMetric,
          image:dog.image,
          life_span:dog.life_span,
          
          temperament: dog.temperament,
        }));

        dispatch(getDogsApi(filteredDogs));
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };
  };


  export const getTemperament= () => {
    return async (dispatch) => {
      try {
        const response = await axios.get('http://localhost:3001/temperaments/');      
        const filteredDogs = response.data.filter(tem => tem !== null).map(tmp => ({
         temperament: tmp.name            
        }));
         dispatch(getTemp(filteredDogs));
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };
  };

import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";


const Dogs = []


export const dogSlice = createSlice({
    name: 'dogsIni',
    initialState: Dogs,
    reducers: {
        getDogs: (state, action) => {
            return action.payload.filter(dog => dog.name);
        },
        getDogsApi: (state, action) => {
            return action.payload.filter(dog => dog.name)
        },

     
        addDog:  (state, action) => {
            state.push(action.payload)
            console.log(action.payload)
            // try {
            //     const response = await axios.post('http://localhost:3001/dogs/', action.payload);
            //     console.log('Respuesta del servidor:', response.data);
            // } catch (error) {
            //   console.error('Error al enviar el formulario:', error);
            // }
        },
        deleteDog: (state, action) => {
            const dogFound = state.find(dog => dog.id === action.payload)
            if (dogFound) {
                state.splice(state.indexOf(dogFound), 1)
            }
        },
        editDog: (state, action) => {
            const { id, name, weightImperial, weightMetric, heightMetric, heightImperial,temperament,life_span} = action.payload
            const idNum = Number(id)
            const findIdDog = state.find((dog) => dog.id === idNum)
            if (findIdDog) {
                if (name !== undefined) findIdDog.name = name
                if (weightImperial !== undefined) findIdDog.weightImperial = weightImperial
                if (weightMetric !== undefined) findIdDog.weightMetric = weightMetric
                if (heightMetric !== undefined) findIdDog.height = heightMetric
                if (heightImperial !== undefined) findIdDog.height = heightImperial
                if (temperament !== undefined) findIdDog.temperament = temperament                
                if (life_span !== undefined)  findIdDog.life_span = life_span
            }
        }
    }

})

export const { addDog, deleteDog, editDog, getDogs, getDogsApi } = dogSlice.actions
export default dogSlice.reducer
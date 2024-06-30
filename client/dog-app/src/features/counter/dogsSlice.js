import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    dogs: [],
    temperament : []
}
// const Dogs = []
// const temperament = []


export const dogSlice = createSlice({
    name: 'dogsIni',
    initialState,
    reducers: {
        getDogs: (state, action) => {
            state.dogs = action.payload.filter(dog => dog.name);
        },
        getDogsApi: (state, action) => {
            state.dogs = action.payload.filter(dog => dog.name)
        },
        getTemp : (state, action) => {
            state.temperament = action.payload;
         },

        addDog:  (state, action) => {
            state.dogs.push(action.payload)
            console.log(action.payload)     
        },
        deleteDog: (state, action) => {
            const dogFound = state.dogs.find(dog => dog.id === action.payload)
            if (dogFound) {
                state.splice(state.indexOf(dogFound), 1)
            }
        },
        editDog: (state, action) => {
            const { id, name, weightImperial, weightMetric, heightMetric, heightImperial,temperament,life_span} = action.payload
            const idNum = Number(id)
            const findIdDog = state.dogs.find((dog) => dog.id === idNum)
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

export const { addDog, deleteDog, editDog, getDogs, getDogsApi, getTemp} = dogSlice.actions
export default dogSlice.reducer
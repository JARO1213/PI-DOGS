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
                state.dogs.splice(state.dogs.indexOf(dogFound), 1)
            }
        },
        editDog: (state, action) => {
            const { id, name,  weightMetricMin, weightMetricMax, weightImperialMin, weightImperialMax, heightMetricMin, heightMetricMax, heightImperialMin, heightImperialMax, temperament,life_span} = action.payload
            const idNum = Number(id)
            const findIdDog = state.dogs.find((dog) => dog.id === idNum)
            if (findIdDog) {
                if (name !== undefined) findIdDog.name = name
                
                if (weightMetricMin !== undefined && weightMetricMax !== undefined) {
                    findIdDog.weightMetric = `${weightMetricMin}-${weightMetricMax}`;
                }

                if (weightImperialMin !== undefined && weightImperialMax !== undefined) {
                    findIdDog.weightImperial = `${weightImperialMin}-${weightImperialMax}`;
                }

                if (heightMetricMin !== undefined && heightMetricMax !== undefined) {
                    findIdDog.heightMetric = `${heightMetricMin}-${heightMetricMax}`;
                }

                if (heightImperialMin !== undefined && heightImperialMax !== undefined) {
                    findIdDog.heightImperial = `${heightImperialMin}-${heightImperialMax}`;
                }
                if (temperament !== undefined) findIdDog.temperament = temperament                
                if (life_span !== undefined)  findIdDog.life_span = life_span
            }
        }
    }

})

export const { addDog, deleteDog, editDog, getDogs, getDogsApi, getTemp} = dogSlice.actions
export default dogSlice.reducer
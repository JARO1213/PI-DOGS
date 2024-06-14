import { createSlice } from "@reduxjs/toolkit";
import { gettingDogs } from "./actions";


const  Dogs =  gettingDogs


export const dogSlice = createSlice({
    name: 'dogsIni',
    initialState: Dogs,
    reducers: {
        getDogs: (state, action) =>{
            console.log(state)
            // state.dogsIni = action.payload
        },

        addDog: (state, action) => {
           state.push(action.payload)
        },
        deleteDog: (state, action) => {
            const dogFound = state.find(dog => dog.id === action.payload)
            if (dogFound) {
                state.splice(state.indexOf(dogFound), 1)
            }
        },
        editDog: (state, action) => {
            const {id, name, weight, height, temperament} = action.payload
            const findIdDog = state.find ((dog) => dog.id === id)
             if (findIdDog){
                findIdDog.name = name
                findIdDog.weight = weight
                findIdDog.height = height
                findIdDog.temperament = temperament
            }
        }
    }

})

export const { addDog, deleteDog, editDog, getDogs } = dogSlice.actions
export default dogSlice.reducer
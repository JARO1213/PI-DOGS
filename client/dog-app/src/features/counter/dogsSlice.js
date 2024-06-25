import { createSlice } from "@reduxjs/toolkit";


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
            const {id, name} = action.payload
            const idNum = Number(id)
            const findIdDog = state.find((dog) => dog.id === idNum)
           
            if (findIdDog) {
                if (name !== undefined) findIdDog.name = name
                // if (weight !== undefined) findIdDog.weight = weight
                // if (height !== undefined) findIdDog.height = height
                // if (temperament !== undefined) findIdDog.temperament = temperament
                // if (image !== undefined) findIdDog.image = image
                // if (life_span !== undefined)  findIdDog.life_span = life_span
            }
        }
    }

})

export const { addDog, deleteDog, editDog, getDogs, getDogsApi } = dogSlice.actions
export default dogSlice.reducer
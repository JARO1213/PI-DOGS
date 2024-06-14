import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addDog, editDog } from '../features/counter/dogsSlice.js';
import { v4 as uuid } from 'uuid'
import { useNavigate, useParams  } from 'react-router-dom';


function DogForm() {

    const [dogCreate, setName] = useState({
        name: "",
        weight: "",
        height: "",
        temperament: ""
    })
    const dispatch = useDispatch()
    const naigate = useNavigate()
    const params = useParams()
    const dogsEdit = useSelector(state => state.dogState)

    const handleChange = (e) => {
        setName({
            ...dogCreate,
            [e.target.name]: e.target.value,
        });
       }
    const handleSubmit = (e) => {
        e.preventDefault();
    if (params.id){
    dispatch(editDog(dogCreate))
    
    } else{
        
        dispatch(addDog({
            ...dogCreate,
            id: uuid(),
        }))
        
    }
    naigate ('/')
    }

    useEffect (() => {
        if (params.id){
   setName(dogsEdit.find((dog) => dog.id.toString() === params.id))
        }
    }, [])

    return (
        <form onSubmit={handleSubmit} >
            <textarea name='name' type="text" placeholder='name' onChange={handleChange} value = {dogCreate.name} />
            <textarea name='weight' placeholder="weight" onChange={handleChange} value = {dogCreate.weight}></textarea>
            <textarea name='height' placeholder="height" onChange={handleChange}value = {dogCreate.height}></textarea>
            <textarea name='temperament' placeholder="temperament" onChange={handleChange} value = {dogCreate.temperament}></textarea>
            <button>submit</button>
        </form>
    )
}

export default DogForm
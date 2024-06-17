import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addDog, editDog } from '../features/counter/dogsSlice.js';
import { v4 as uuid } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom';



function DogForm() {

    const [dogCreate, setName] = useState({
        name: "",
        image:"",
        weight: "",
        height: "",
        temperament: ""
    })
    const dispatch = useDispatch()
    const naigate = useNavigate()
    const params = useParams()
    const dogsState = useSelector(state => state.dogState)

    useEffect(() => {
        if (params.id) {
            const paramIdAsNumber = Number(params.id);
            const dogToEdit = (dogsState.find((dog) => dog.id === paramIdAsNumber))
            console.log('aqui:',dogToEdit.name)
            if (dogToEdit) {
                setName(dogToEdit)
            }
        }

    }, [params, dogsState])

    const handleChange = (e) => {
        setName({
            ...dogCreate,
            [e.target.name]: e.target.value,
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (params.id) {
            dispatch(editDog({ ...dogCreate, id: params.id }))

        } else {

            dispatch(addDog({
                ...dogCreate,
                id: uuid(),
            }))

        }
        naigate('/')
    }



    return (
        <form onSubmit={handleSubmit} >
            <div className='divCard'><img src={dogCreate.image} className='imgStyle' alt={dogCreate.image} /></div>
            <input name='name' type="text" placeholder='name' onChange={handleChange} value={dogCreate.name} />
            <textarea name='weight' placeholder="weight" onChange={handleChange} value={dogCreate.weight}></textarea> 
            <textarea name='height' placeholder="height" onChange={handleChange}value = {dogCreate.height}></textarea>
            <textarea name='temperament' placeholder="temperament" onChange={handleChange} value={dogCreate.temperament}></textarea> 
            <button>submit</button>
        </form>
    )
}

export default DogForm
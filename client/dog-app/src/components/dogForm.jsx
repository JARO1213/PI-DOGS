import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addDog, editDog } from '../features/counter/dogsSlice.js';
import { v4 as uuid } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom';



function DogForm() {

    const [dogCreate, setName] = useState({
        name: "",
        image: "",
        weightImperial: "",
        weightMetric: "",
        heightImperial: "",
        heightMetric: "",
        life_span: "",
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
            console.log('aqui:', dogToEdit.name)
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

        } else  {
            dispatch(addDog({
                ...dogCreate,
                id: uuid(),
            }))
       

        }
        let enlace = `/detailedDog/${dogCreate.id}`
        naigate(enlace)
    }
    return (
        <div className='form-container'>
            <div className='form-header'>
                <h2> Edita tu perro </h2>
            </div>
            <form onSubmit={handleSubmit} >
                <div ><img src={dogCreate.image} className='dog-image ' alt={dogCreate.image} /></div>
                <div className='form-group'>
                    <label>Nombre: </label><textarea name='name' type="text" placeholder='name' onChange={handleChange} value={dogCreate.name} />
                </div>
                <div className='form-group'>
                    <label>Peso Máximo:</label><textarea name='weightMetric' placeholder="weightMetric" onChange={handleChange} value={dogCreate.weightMetric}></textarea>
                </div>
                <div className='form-group'>
                    <label>Peso Mínimo:</label><textarea name='weightImperial' placeholder="weightImperial" onChange={handleChange} value={dogCreate.weightImperial}></textarea>
                </div>
                <div className='form-group'>
                    <label>Altura Máxima:</label><textarea name='heightImperial' placeholder="heightImperial" onChange={handleChange} value={dogCreate.heightImperial}></textarea>
                </div>
                <div className='form-group'>
                    <li>Altura Mínima:</li><textarea name='heightMetric' placeholder="heightMetric" onChange={handleChange} value={dogCreate.heightMetric}></textarea>
                </div>
                <div className='form-group'>
                    <label>Tiempo de vida: </label><textarea name='life_span' placeholder="life_span" onChange={handleChange} value={dogCreate.life_span}></textarea>
                </div>
                <div className='form-group'>
                    <label>Temperamento:</label><textarea name='temperament' placeholder="temperament" onChange={handleChange} value={dogCreate.temperament}></textarea>
                </div>
                <button className='form-actions'>Guardar</button>
            </form>
        </div>
    )
}

export default DogForm
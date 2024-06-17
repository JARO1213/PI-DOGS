import { useSelector, useDispatch } from 'react-redux';
import { deleteDog, } from '../features/counter/dogsSlice.js';
import { Link } from 'react-router-dom';
import { gettingDogs } from '../features/counter/actions.js';
import { useEffect } from 'react';

import '../CSS-Components/csmodule.css'


function DogList() {


    const dispatch = useDispatch()
    const dogFormState = useSelector(state => state.dogState)

    useEffect(() => {
        if (dogFormState.length === 0) {
            dispatch(gettingDogs());
        }
    }, [dispatch, dogFormState.length]);

    const handleDelete = (id) => {
        dispatch(deleteDog(id))
    }



    if (!dogFormState || dogFormState.length === 0) {
        return <p>Thare are not dogs available</p>;
    }

    return (
        <div >

            <header>
                <h1>Dogs App {dogFormState.length} </h1>
                <Link to='/formDogs'>
                    Create Dog form
                </Link>
            </header>

            
            {dogFormState.map(dog => (
                <div key={dog.id} className='listItem'>  <Link to={`/detailedDog/${dog.id}`}>
                <div >
                   
                    <img src={dog.image} className='imgStyle' alt={dog.name} />
                    <h2 className='tittleCard'> Raza: {dog.name}</h2>
                    {/* <p className='subtittleDetail'>{dog.weight}</p> */}
                    <p>{dog.weight}</p>
                    {/* <p>{dog.temperament}</p> */}
                    {/* <p>{dog.life_span}</p> */}
                   
                 
                </div>
                </Link>
                <button onClick={() => handleDelete(dog.id)} className='buttonClose'>Delete</button>
                </div>   

            ))}

        </div>
    )
}



export default DogList
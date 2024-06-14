import { useSelector, useDispatch } from 'react-redux';
import { deleteDog, getDogs } from '../features/counter/dogsSlice.js';
import { Link } from 'react-router-dom';




function DogList() {


    console.log('doglist');
    const dispatch = useDispatch()
    const dogFormState = useSelector(state => state.dogState)


    const handleDelete = (id) => {
        dispatch(deleteDog(id))
    }

    const handleShow = () => {
        dispatch(getDogs())
}


return (
    <div>
        
        <header>
            <h1>Dogs App {dogFormState.length} </h1>
            <Link to='/formDogs'>
                Create Dog form
            </Link>
        </header>
        <div>
              <button onClick={()=> handleShow()}>Show</button>
        </div>
            

        {dogFormState.map(dog => (
            <div key={dog.id}>
                <h4>{dog.name}</h4>
                <p>{dog.weight}</p>
                <p>{dog.height}</p>
                <p>{dog.temperament}</p>
                <button onClick={() => handleDelete(dog.id)}>Delete</button>
                <Link to={`/editDog/${dog.id}`}>Actualizar</Link>
            </div>
        
            
        ))}

    </div>
)
}



export default DogList
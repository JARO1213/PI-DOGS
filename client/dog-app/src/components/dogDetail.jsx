import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";



 function DogDetailed() {
    const params = useParams()
    const dogsState = useSelector(state => state.dogState)
    const [dogDetailed, setDogDetailed] = useState(null);
  
    
    useEffect(() => {
        
        if (params.id) {
            
            const paramIdAsNumber = Number(params.id);
            if (!isNaN(paramIdAsNumber)) {
                const foundDog = dogsState.find((dog) => dog.id === paramIdAsNumber);
                setDogDetailed(foundDog);
                // console.log(foundDog);
            } else {
                console.log('El id ingresado no es un número válido');
            }
        }
    }, [params, dogsState])
   
   
    if (!dogDetailed) {
        return <div>It doesn't match...</div>;
    }

    return (
        <div>

            <div>
                <Link to = {'/'} >Home</Link>
                <h3>Detalles del Perro</h3>
                <p>ID: {dogDetailed.id}</p>
                <p>Nombre: {dogDetailed.name}</p>
                <img src={dogDetailed.image} className='imgStyle' alt={dogDetailed.image} />

            </div>

        </div>
    )
}

export default DogDetailed
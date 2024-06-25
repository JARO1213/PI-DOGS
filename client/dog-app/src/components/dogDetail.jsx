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
            } else if (/[a-zA-Z]/.test(params.id) && /\d/.test(params.id)) {
                const foundDog = dogsState.find((dog) => dog.id === params.id);
                setDogDetailed(foundDog);
            } else {
                console.log('El id ingresado no es válido');
            }
        }
    }, [params, dogsState])


    if (!dogDetailed) {
        return <div>It doesn't match...</div>;
    }

    return (
        <div>
            
            <div className='filter-container2'>
                <div>
                <h2>{dogDetailed.name}</h2>
                <li className="filer-label2"> ID: {dogDetailed.id}</li>
                <li> Peso:  </li>                         
                </div>
            <img src={dogDetailed.image} className='imgStyleD' alt={dogDetailed.image} />
            </div>
            <div>
            <Link className='filter-container1' to ={`/editDog/${dogDetailed.id}`}>
                   Editar
                </Link>
            </div>
        </div>
    )
}

export default DogDetailed
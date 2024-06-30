import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";



function DogDetailed() {
    const params = useParams()
    const dogsState = useSelector(state => state.dogState.dogs)
    const [dogDetailed, setDogDetailed] = useState();
    const [dataBase, setDataBase] = useState(0)

    useEffect(() => {

        if (params.id) {

            const paramIdAsNumber = Number(params.id);

            if (!isNaN(paramIdAsNumber)) {
                const foundDog = dogsState.find((dog) => dog.id === paramIdAsNumber);
                setDataBase(0)
                setDogDetailed(foundDog);
            } else if (/[a-zA-Z]/.test(params.id) && /\d/.test(params.id)) {
                const foundDog = dogsState.find((dog) => dog.id === params.id);
                setDataBase(1)
                setDogDetailed(foundDog);
            } else if (((typeof params.id) === 'string') === true) {
                const foundDogL = dogsState.find((dog) => dog.id === params.id);
                setDataBase(0)
                setDogDetailed(foundDogL);
            } else {
                console.log('El id ingresado no es válido');
            }

        }
    }, [params, dogsState,])




    if (!dogDetailed) {
        return <div>It doesn't match...</div>;
    }

    return (
        <div>

            <div className='filter-container2'>
                <div>
                    <h2>{dogDetailed.name}</h2>

                    <li> Peso mínimo: {dogDetailed.weightImperial} </li>
                    <li> Peso máximo: {dogDetailed.weightMetric} </li>
                    <li> Altura mínima: {dogDetailed.heightImperial} </li>
                    <li> Altura mínima: {dogDetailed.heightMetric} </li>
                    <li> Tiempo de vida: {dogDetailed.life_span} </li>
                    <li> Temperament: {dogDetailed.temperament}</li>
                </div>
                <img src={dogDetailed.image} className='imgStyleD' alt={dogDetailed.image} />
                {dataBase === 0 && (
                    <Link className='filter-container' to={`/editDog/${dogDetailed.id}`}>
                        Editar </Link>
                )}
            </div>

        </div>
    )
}

export default DogDetailed
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { gettingDogs, gettingApiDogs } from '../features/counter/actions.js';
import { useState, useEffect } from 'react';
import DogList from '../elements/paginacion.jsx';
import '../CSS-Components/csmodule.css'


function HomePage() {


    const dispatch = useDispatch()
    const [bdSource, setbdSource] = useState(0);
    const dogFormState = useSelector(state => state.dogState)


    useEffect(() => {
        if (bdSource === 0) {
            dispatch(gettingDogs());
        } else if (bdSource === 1) {
            dispatch(gettingApiDogs());
        }
    }, [dispatch, bdSource]);

  

    const handleSelectChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setbdSource(value);
    };



    if (!dogFormState || dogFormState.length === 0) {
        return <p>Loading dogs...</p>;
    }

    return (
        <div >
            <header>
                <h1>Dogs App </h1>
                <h3>Tenemos: {dogFormState.length} perros para ti</h3>
                <div className='filter-container'>
                    <p className='filter-label'>Filtrar por:</p>
                    <select onChange={handleSelectChange} value={bdSource}>
                        <option value={0}>Datos Locales</option>
                        <option value={1}>API</option>
                    </select>
                </div>

                <Link className='filter-container1' to='/formDogs'>
                    Create Dog form
                </Link>
            </header>
            <DogList bdSource={bdSource}/>
        </div>
    )
}



export default HomePage
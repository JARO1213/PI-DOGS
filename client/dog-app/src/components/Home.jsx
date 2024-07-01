import { useSelector, useDispatch } from 'react-redux';
import { gettingDogs, gettingApiDogs, } from '../features/counter/actions.js';
import {  useEffect } from 'react';
import DogList from '../elements/paginacion.jsx';
import '../CSS-Components/csmodule.css'



function HomePage({source}) {


    const dispatch = useDispatch()
   
    const dogFormState = useSelector(state => state.dogState.dogs)
   
    useEffect(() => {
        
        if (source === 0) {
            dispatch(gettingDogs());
        } else if (source === 1) {
            dispatch(gettingApiDogs());
        } 

    }, [dispatch, source]);



        
    if (!dogFormState || dogFormState.length === 0) {
        return <p>Loading dogs...</p>;
    }

    return (
        <div >
            <header>
                <h1>
                Tenemos: {dogFormState.length} perros para ti
                  <span>
                  Dogs App 
                  </span>  
                  </h1>
                  </header>
                {/* <div className='filter-containerF'>
                    <p className='filter-label'>Filtrar por:</p>
                    <select onChange={handleSelectChange} value={source}>
                        <option value={0}>Datos Locales</option>
                        <option value={1}>API</option>
                    </select>
                </div> */}

                           
            <DogList bdSource={source} />¨

        </div>
    )
}



export default HomePage
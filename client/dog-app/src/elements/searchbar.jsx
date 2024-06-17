import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../CSS-Components/csmodule.css'
import { Link } from 'react-router-dom';


export default function SearchBar() {
   const [name, setName] = useState("");
   const [error, setError] = useState(false);
   const dogState = useSelector(state => state.dogState)

   function handleChange(e) {
      setName(e.target.value)
      
   }

   function handleSearch() {
      const dogRecived = String(name.trim()).toLocaleLowerCase()
      let arrayPerros = dogState.map(dog => dog.id)
      let arrayDog= dogState.map(dog => dog.name)
      // console.log(arrayDog[1].toLocaleLowerCase())
    
      const indexDogs = (arrayDog.findIndex(dog => {if (typeof dog === 'string') {
         return dog.toLowerCase() ===  dogRecived} return false
   }))
   if (indexDogs !== -1){
      const idRoute = arrayPerros[indexDogs]
      return `/detailedDog/${idRoute}`
      }
      
   }
     
   function isEmpty(value) {
      return !value || value.trim() === '';
   }
   function resetError() {
      setError(false);
   }

   return (
      <div className="Nav" >
        
            <Link to={!isEmpty(name) ? handleSearch() : '#'}>  
            <button className={`buttonAdd ${isEmpty(name) ? 'disabled' : ''}`}
             onClick={handleSearch}>Buscar</button> </Link>
            
         <input onChange={handleChange} className="searchStyle" type='search' name='name' value={name}/>
         {error && <p className="error-message">Perro no encontrado</p>}
         {error && <Link to={'/'} onClick={resetError}>Volver</Link>}
      </div>
   );

}

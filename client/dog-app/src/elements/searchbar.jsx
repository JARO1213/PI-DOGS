import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../CSS-Components/csmodule.css'
import { Link } from 'react-router-dom';

export default function SearchBar() {
   const [name, setName] = useState("");
   const [error, setError] = useState(false);
   const dogState = useSelector(state => state.dogState.dogs)

   function handleChange(e) {
      setName(e.target.value)

   }
   function handleSearch() {
      const dogRecived = String(name.trim()).toLocaleLowerCase()
      let arrayPerros = dogState.map(dog => dog.id)
      let arrayDog = dogState.map(dog => dog.name)
      const indexDogs = (arrayDog.findIndex(dog => {
         if (typeof dog === 'string') {
            return dog.toLowerCase() === dogRecived
         } return false
      }))
      if (indexDogs !== -1) {
         const idRoute = arrayPerros[indexDogs];
         return `/detailedDog/${idRoute}`
      }
      return '/noFound'
   }

   function isEmpty(value) {
      return !value || value.trim() === '';
   }
   function resetError() {
      setError(false);
   }

   return (
      <div className="Nav" >
         <input onChange={handleChange} className="searchStyle" type='search' name='name' value={name} />
         <Link to={!isEmpty(name) ? handleSearch() : '#'} className= 'searchButton'>Buscar </Link>
         {error && <p className="error-message">Perro no encontrado</p>}
         {error && <Link to={'/home'} onClick={resetError}>Volver</Link>}
      </div>
   );

}
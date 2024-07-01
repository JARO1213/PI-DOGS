import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../components/pagination';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteDog } from '../features/counter/dogsSlice';
import { getTemperament } from '../features/counter/actions';



const DogList = ({ bdSource }) => {
  const dogs = useSelector((state) => state.dogState.dogs);
  const temperament =useSelector (state => state.dogState.temperament)
  const [currentPage, setCurrentPage] = useState(1);
  const [selecTemp, setSelecTemp] = useState();
  const dispatch = useDispatch()
  const dogsPerPage = 8;
  
  
  useEffect(() => {
   dispatch(getTemperament())
 }, [dispatch]);
  
//  console.log('esto son los temperamentos: ', dogs.map(tem => tem.temperament))
  const handleDelete = (id) => {
    dispatch(deleteDog(id))
  }
  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelecTemp(value)
  };
   const handleReset =()=>{
    setCurrentPage(1);
    setSelecTemp('')
   }

   const sortedDogs = [...dogs].sort((a, b) => a.name.localeCompare(b.name))

  const filteredDogs = selecTemp ? sortedDogs.filter(dog => dog.temperament.includes(selecTemp)) : sortedDogs;
  // const filteredDogs = currentDogs 
  useEffect(() => {
    if (selecTemp && filteredDogs.length === 0) {
      alert('No se encontraron perros con el temperamento seleccionado.');
      setSelecTemp(''); 
      setCurrentPage(1)
    }
  }, [selecTemp, filteredDogs.length]);

  // Calcular los índices de los perros a mostrar en la página actual
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = filteredDogs.slice(indexOfFirstDog, indexOfLastDog);
  // una lista ùnica de temperamentos
  const uniqueTemperaments = Array.from(new Set(temperament.map(temp => temp.temperament))).sort();
  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

 
  return (
    <div >
      
        <div className='down'>  
        <button className='ResetButton' onClick={handleReset}>Limpiar filtro</button>
          <select className='select' onChange={handleSelectChange} value={selecTemp}>
            <option value="">Filtrar por Temperamento</option>
            {uniqueTemperaments.map((temp, index) => (
              <option key={index} value={temp}>{temp}</option>
            ))}
          </select>
          

        </div>
     
      {currentDogs.map((dog, index) => (
        <ul className='unorderedList'>
          <Link to={`/detailedDog/${dog.id}`}>
            <ul key={index} className='listItem'>
              <h4>{dog.name} <img src={dog.image} className='imgStyle' alt={dog.name} /> </h4>
              <div className='overlay'>
                <h5 >Temperamentos:</h5>
                <p>{dog.temperament}</p>
              </div>
            </ul>
          </Link>
          {bdSource === 0 && (
            <button onClick={() => handleDelete(dog.id)} className='buttonClose' >Delete</button>
          )}
        </ul>
      ))}

      <Pagination
        dogsPerPage={dogsPerPage}
        totalDogs={dogs.length}
        paginate={paginate}
      />

    </div>
  );
};

export default DogList;
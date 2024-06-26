import { useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../components/pagination';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteDog } from '../features/counter/dogsSlice';


const DogList = ({bdSource}) => {
  const dogs = useSelector((state) => state.dogState);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch()
  const dogsPerPage = 8;

  // Calcular los índices de los perros a mostrar en la página actual
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    dispatch(deleteDog(id))
  }
 
 
  return (
    <div >

      {currentDogs.map((dog, index) => (
        <ul className='unorderedList'>
          <Link  to={`/detailedDog/${dog.id}`}>
            <ul key={index} className='listItem'>
              <h4>{dog.name} <img src={dog.image} className='imgStyle' alt={dog.name} /> </h4>          
            </ul>
          </Link>
          {bdSource === 0 && (
          <button  onClick={() => handleDelete(dog.id)} className='buttonClose' >Delete</button>
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
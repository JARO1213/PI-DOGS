import { useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../components/pagination';
import { Link } from 'react-router-dom';

const DogList = () => {
  const dogs = useSelector((state) => state.dogState);
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;

  // Calcular los índices de los perros a mostrar en la página actual
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div >

      {currentDogs.map((dog, index) => (
        <Link to={`/detailedDog/${dog.id}`}>
          <ul key={index} className='listItem'>
            <h4>{dog.name} <img src={dog.image} className='imgStyle' alt={dog.name} /> </h4>
          </ul>
        </Link>

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
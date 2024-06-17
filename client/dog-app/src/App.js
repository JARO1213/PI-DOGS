
import './App.css';

import DogList from './components/doglist';
import DogForm from './components/dogForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary.js';
import Nav from './elements/nav.jsx';
import DogDetailed from './components/dogDetai.jsx';


function App() {

  return (
    <div className="App">
      
      <header className="App-header">
        <ErrorBoundary>
        <BrowserRouter>
        {<Nav/>}
          <Routes>
            <Route path='/' element={<DogList />} />
            <Route path='/formDogs' element={<DogForm />} />
            <Route path='/editDog/:id' element={<DogForm />} />
            <Route path='/detailedDog/:id' element={<DogDetailed/>} />

          </Routes>
        </BrowserRouter>
        </ErrorBoundary>
      </header>
    </div>
  );
}

export default App;

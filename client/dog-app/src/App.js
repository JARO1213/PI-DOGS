
import './App.css';

import DogList from './components/doglist';
import DogForm from './components/dogForm.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<DogList />} />
            <Route path='/formDogs' element={<DogForm />} />
            <Route path='/editDog/:id' element={<DogForm />} />

          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;


import './App.css';

import HomePage from './components/Home.jsx';
import DogForm from './components/dogForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary.js';
import Nav from './elements/nav.jsx';
import DogDetailed from './components/dogDetail.jsx';
import LandingPage from './components/landing.js';
import NotFound from './elements/noFound.jsx';


function App() {

  return (
    <div className="App">

      <header className="App-header">
        <ErrorBoundary>
          <BrowserRouter>
            {<Nav />}
            <Routes>
            <Route path='/' element={<LandingPage />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/formDogs' element={<DogForm />} />
              <Route path='/editDog/:id' element={<DogForm />} />
              <Route path='/detailedDog/:id' element={<DogDetailed />} />
              <Route path='/noFound' element={<NotFound />} />

            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </header>
    </div>
  );
}

export default App;

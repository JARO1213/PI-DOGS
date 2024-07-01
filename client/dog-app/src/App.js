
import './App.css';
import HomePage from './components/Home.jsx';
import DogForm from './components/dogForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary.js';
import Nav from './elements/nav.jsx';
import DogDetailed from './components/dogDetail.jsx';
import LandingPage from './components/landing.jsx';
import NotFound from './elements/noFound.jsx';
import { useState } from 'react';


function App() {
  const [source, setSource] =useState (0)
   

    const handleSelectChange = (e) => {
        
        setSource(e);
    };

  return (
    <div className="App">

      <header className="App-header">
        <ErrorBoundary>
          <BrowserRouter>
          <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route 
                path='/*' 
                element={
                  <>
                    <Nav source ={source} onSelectChange= {handleSelectChange}/>
                    <Routes>
                      <Route path='/home' element={<HomePage source={source}/>} />
                      <Route path='/formDogs' element={<DogForm />} />
                      <Route path='/editDog/:id' element={<DogForm />} />
                      <Route path='/detailedDog/:id' element={<DogDetailed />} />
                      <Route path='/noFound' element={<NotFound />} />
                    </Routes>
                  </>
                } 
              />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </header>
    </div>
  );
}

export default App;

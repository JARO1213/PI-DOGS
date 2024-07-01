import  React from "react";
import '../CSS-Components/csmodule.css'
import SearchBar from "./searchbar";

import { Link } from "react-router-dom";
import Select from "./select";

function Nav ({onSearch, source, onSelectChange}) {

   return (     
    <div className= "navBar" > 
    <ul>
    <li className="filter-container1"><Link to={'/home'} >Home</Link></li>
    <li className="filter-container1"><Link to='/formDogs'> Create-Dog  </Link></li>
  
       {/* <Link to ="/About">About</Link>
       <br></br>         
      
       <br></br>         
       <Link to ="/Favorite">Favorite</Link> */}
    </ul>
    <SearchBar onSearch={onSearch}/>
    <Select source={source} onSelectChange={onSelectChange} />
   
       
                   
     </div> 
    )    
    }

export default Nav;
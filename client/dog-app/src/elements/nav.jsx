import  React from "react";
import '../CSS-Components/csmodule.css'
import SearchBar from "./searchbar";
import { Link } from "react-router-dom";

function Nav ({onSearch}) {

   return (     
    <div className= "navBar" > 
    <ul>
    <li><Link to={'/home'} >Home</Link></li>
    <li><Link to='/formDogs'> Create-Dog  </Link></li>
    
       {/* <Link to ="/About">About</Link>
       <br></br>         
      
       <br></br>         
       <Link to ="/Favorite">Favorite</Link> */}
    </ul>
    <SearchBar onSearch={onSearch}/>
       
                   
     </div> 
    )    
    }

export default Nav;
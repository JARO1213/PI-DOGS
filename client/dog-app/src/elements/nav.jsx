import  React from "react";
import '../CSS-Components/csmodule.css'
import SearchBar from "./searchbar";
// import { Link } from "react-router-dom";

function Nav ({onSearch}) {

   return (     
    <div className= "styles.nav" > 
       {/* <Link to ="/About">About</Link>
       <br></br>         
       <Link to ="/Home">Home</Link>
       <br></br>         
       <Link to ="/Favorite">Favorite</Link> */}
       <SearchBar onSearch={onSearch}/>               
     </div> 
    )    
    }

export default Nav;
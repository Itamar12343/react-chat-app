import { useContext } from "react";
import { SearchG } from "../allV/global";
import "../style/search.css";

const Search = () => {
    const {searchg,setsearchg} = useContext(SearchG);

    const getInput = (e)=>{
        setsearchg(e.target.value.toLowerCase());
    }


    return ( 
        <input onChange={getInput} className="search-input" placeholder="חפש שם" type="text"/>
     );
}
 
export default Search;
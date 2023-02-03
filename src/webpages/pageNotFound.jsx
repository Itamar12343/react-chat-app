import "../style/pagenotfound.css";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
    const navigate = useNavigate();

    function goback(){
        navigate("/");
    }

    return ( 
    <>
       <div className="title">page not found</div> 
       <button className="btn" onClick={goback}>go back</button>
    </>
    );
}
 
export default PageNotFound;
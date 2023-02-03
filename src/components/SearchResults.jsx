import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { SearchG } from "../allV/global";
import "../style/SearchResults.css";
import { usersref } from "./firebase";
import 'firebase/storage';
import {  useNavigate } from "react-router-dom";


const SearchResults = () => {
    const {searchg, setsearchg} = useContext(SearchG);
    const imgref = useRef(null);
    const users = usersref;
    //const [img, setimg] = useState(null);
    const [img,setimg] = useState({}); 
    const [myimg,setmyimg] = useState(null);

    //let people = ["Itamar", "nuri","clil","eitan","ruth"];
    const [people, setpeople] = useState([]);
    const [firstLoad,setfirstLoad] = useState(true);
    const navigate = useNavigate("");
    //const {type} = useParams();

    //window.onload = ()=>{
        if(firstLoad === true){
                getUsers();
        }
    //}

    function getUsers(){
    users.once("value", snapshot =>{
        snapshot.forEach(childsnapshot =>{
            let user = childsnapshot.val().name;    
            let got_img = childsnapshot.val().img;
            //users.push(user);
            //setimg(got_img);
            img[user] = got_img;
            if(user === localStorage.getItem("username")){
                setmyimg(got_img);
            }else{
                people.push(user);
            }
                //console.log("b");


                    /*const getimg = ref(storage, `users/${user}`);
                  
        
                    getDownloadURL(getimg).then(url =>{
                        setimg(url);
                     });*/
            
         
        });
    });
}

function clickandHold(e){
    e.preventDefault();
    e.target.style.backgroundColor = "red";
}


function gotochat(e){
    let path = e.target.textContent;
    //localStorage.setItem("chat user", path);
        navigate(`/chat/${path}`);

}
/*window.addEventListener("contextmenu", e =>{ 
    e.preventDefault();
    console.log("hello");
});*/


useEffect(()=>{
    setfirstLoad(false);
},[firstLoad]);


    return ( 
        <>
        <div className="set-results">

        <div onContextMenu={clickandHold} className="chat">
        <div alt="את/ה" style={{backgroundImage: `url(${myimg})`}} className="img"></div>
        <div className="result">את/ה</div>
        </div>

        {people.map(p =>{
            //console.log(img);

            if(p.toLocaleLowerCase().includes(searchg) && searchg !== ""){
                return(
                    <div onContextMenu={clickandHold} onClick={gotochat} key={crypto.randomUUID()} className="chat">
                    <div key={crypto.randomUUID()} alt={p} style={{backgroundImage: `url(${img[p]})`}} className="img"></div>
                    <div key={crypto.randomUUID()} className="result">{p}</div>
                    </div>
                )
            }
            if(searchg === undefined || searchg === null || searchg === ""){
                return(
                    <div onContextMenu={clickandHold} onClick={gotochat} key={crypto.randomUUID()} className="chat">
                    <div key={crypto.randomUUID()} alt={p} style={{backgroundImage: `url(${img[p]})`}} className="img"></div>
                    <div key={crypto.randomUUID()} className="result">{p}</div>
                    </div>
                )
            }

        })}
        </div>
       
        </>
     );
}
 
export default SearchResults;
import Search from "../components/search";
import {SearchG} from "../allV/global"
import { useState } from "react";
import SearchResults from "../components/SearchResults";
import { motion } from "framer-motion";
import LoadSpiner from "../components/loadSpiner";
import { usersref } from "../components/firebase";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const HomePage = () => {
    const [searchg,setsearchg] = useState(undefined);
    const [loadThePage,setLoadThePage] = useState(false);
    const [spineranimation, setspineranimation] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem("username")){
            navigate("/login");
        }else{
            usersref.child(localStorage.getItem("username")).once("value", snapshot =>{
                //let h = snapshot.val();
                setLoadThePage(true);
                setspineranimation(false);
            });
        }
    },[]);
    
    
    

        /*setTimeout(() => {
            setLoadThePage(true);
            setspineranimation(false);
        }, 1000);*/

       

    return ( 
        <>
        <SearchG.Provider value={{searchg,setsearchg}}>
            <motion.div initial={{opacity: 1}} animate={{opacity: spineranimation ? 1 : 0}}>
            <LoadSpiner/>
            </motion.div>
        <motion.div initial={{opacity: 0, pointerEvents: "none"}} animate={{opacity: loadThePage ? 1 : 0, pointerEvents: loadThePage ? "all" : "none"}}>
        <Search/>
        <SearchResults/>
        </motion.div>
        </SearchG.Provider>
        </>
     );
}
 
export default HomePage;
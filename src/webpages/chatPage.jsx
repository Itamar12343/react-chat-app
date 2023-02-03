import { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router";
import { usersref } from "../components/firebase";
import LoadSpiner from "../components/loadSpiner";
import { motion } from "framer-motion";
import Chat from "../components/chat";

const ChatPage = () => {
    const {type} = useParams();
    const navigate = useNavigate();
    const [img,setimg] = useState();

    const [loadThePage,setLoadThePage] = useState(false);
    const [spineranimation, setspineranimation] = useState(true);

    useEffect(()=>{
        if(!localStorage.getItem("username")){
            navigate("/login");
        }else{
            usersref.child(type).once("value", snapshot =>{
                let user = snapshot.val();
                if(!user){
                    navigate("*");
                }else{
                    setLoadThePage(true);
                    setspineranimation(false);
                    setimg(user.img);
                }
                
            });
        }
    },[]);

    return ( 
        <>
            <motion.div initial={{opacity: 1}} animate={{opacity: spineranimation ? 1 : 0}}>
            <LoadSpiner/>
            </motion.div>
        <motion.div initial={{opacity: 0}} animate={{opacity: loadThePage ? 1 : 0}}>
        <Chat name={type} img={img}/>
        </motion.div>
        </>
     );
}
 
export default ChatPage;
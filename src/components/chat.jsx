import "../style/chat.css";
import {ArrowLeft, CameraFill, Check2All, Clipboard2Fill, PersonFill, ShareFill, XLg} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { SendFill } from "react-bootstrap-icons";
import { useState } from "react";
import { useRef } from "react";
import {chatsref} from "../components/firebase";
import { useEffect } from "react";
import sendSound from "../images/sendmsg.mp3";
import getSound from "../images/getmsg.mp3";
import {useLocation} from "react-router-dom";
import {motion} from "framer-motion";

const Chat = (chatname) => {
    const navigate = useNavigate();
    const [sendstte, setsendstate] = useState("camera");
    const inputref = useRef(null);
    const chatboxref = useRef(null);
    const [msgs, setmsgs] = useState([]);
    const [chatwith,setchatwith] = useState(`${localStorage.getItem("username")} ${chatname.name}`);
    let chatwithload = `${localStorage.getItem("username")} ${chatname.name}`;
    const [msgnumber, setmsgNumber] = useState();
    let pageLoaded = true;
    let loadstate = true;
    const [load_send_img, setLoad_send_img] = useState(true);
    const {state} = useLocation();
    const [beforeSendImg,setbeforeSendImg] = useState(false);
    const [nomsg, setnomsg] = useState({});
    const [longpressState, setlongpressState] = useState(false);


        if(load_send_img === true){
            setLoad_send_img(false);
            if(state){
            const { pramimg } = state;
            //console.log(pramimg);
            setTimeout(() => {
                setbeforeSendImg(pramimg);
            }, 1000);
            setsendstate("send");
            }
        }

    function thingsAfterLoad(){
        getMsgsOnRealTime();
    }

    function cancel_img(){
        setbeforeSendImg(false);
        navigate(`/chat/${chatname.name}`);
        if(inputref.current.value.length === 0){
            setsendstate("camera");
        }
    }
    //const [pageLoad, setPageLoade] = useState(true);

    function playSendSound(){
        new Audio(sendSound).play();
    }

    function playGetSound(){
        new Audio(getSound).play();
    }

    useEffect(()=>{
        if(pageLoaded === true){
            pageLoaded = false;
        if(localStorage.getItem("username")){
        checkEverythingOnLoad();
        }else{
            navigate("/login");
        }
    }
    },[]);
   
    function checkEverythingOnLoad(){
        chatsref.child(`${localStorage.getItem("username")} ${chatname.name}`).once("value", snapshot =>{
            let gotchatwith = snapshot.val();
            if(gotchatwith){
                setchatwith(`${localStorage.getItem("username")} ${chatname.name}`);
                chatwithload = `${localStorage.getItem("username")} ${chatname.name}`;
                updateNumber();
                getMsgsOnload();
                //console.log("1");
            //console.log(chatwith);
            }else{
                chatsref.child(`${chatname.name} ${localStorage.getItem("username")}`).once("value", snapshot1 =>{
                    let gotchatwith1 = snapshot1.val();
                    if(gotchatwith1){
                        setchatwith(`${chatname.name} ${localStorage.getItem("username")}`);
                        chatwithload = `${chatname.name} ${localStorage.getItem("username")}`;
                        updateNumber();
                        getMsgsOnload();
                        //console.log("2");
                        //console.log(chatwith);
                    }else{
                chatsref.child(chatwith).child("number").set({
                    number: 0
                });
                updateNumber();
                getMsgsOnload();
            }
            });
            }
        });
    }


    function scrollDown(){
        setTimeout(() => {
            chatboxref.current.scrollTo({
             top: 10000000,
             behavior: "smooth"
         });
         }, 200);
    }

    function getMsgsOnload(){
        chatsref.child(chatwithload).once("value", snapshot =>{
            let gotmsg = snapshot.val();
            chatsref.child(chatwithload).child("number").once("value", numbershot =>{
                let gotnumber = numbershot.val().number;
                //console.log(gotnumber);
                if(gotnumber === 0){
                    let today = new Date();
                        let hour = today.getHours();
                        let minute = today.getMinutes();
                        let now = `${hour}:${minute}`;
                        //create_e_Msg(`כתוב הודעה ל${chatname.name}`, now);
                        setnomsg({
                            text: `כתוב הודעה ל${chatname.name}`,
                            type: "emsg",
                            time: now
                        });
                        thingsAfterLoad();
                }

                for(let i = 1; i <= gotnumber; i++){
                    let gotmsgI = gotmsg[i];

                    if(gotmsgI.user === localStorage.getItem("username")){
                        createMsg(gotmsgI.text, gotmsgI.time);
                        scrollDown();
                    }else if(gotmsgI.user){
                        create_e_Msg(gotmsgI.text, gotmsgI.time);
                        scrollDown();
                    }

                    if(i === gotnumber){
                        thingsAfterLoad();
                    }
                }
            });
            /*snapshot.forEach(msg =>{
                let gotmsg = msg.val();
                //console.log(gotmsg);
                if(gotmsg.user === localStorage.getItem("username")){
                    createMsg(gotmsg.text, gotmsg.time);
                    scrollDown();
                }else if(gotmsg.user){
                    create_e_Msg(gotmsg.text, gotmsg.time);
                    scrollDown();
                }
            });*/
        });
    }

    function getMsgsOnRealTime(){
        chatsref.child(chatwithload).once("value", snapshot =>{
            let number = snapshot.val().number.number;

        chatsref.child(chatwithload).on("value", snapshot =>{
            let gotnumber = snapshot.val().number.number;
            let gotmsg = snapshot.val()[gotnumber];

            if(gotnumber > number){
                number = number + 1;

            if(gotmsg.user !== localStorage.getItem("username") && gotmsg.text){
                playGetSound();
                create_e_Msg(gotmsg.text, gotmsg.time);
                
                scrollDown();
            }
        }
        });
    });
    }

    function updateNumber(){
    chatsref.child(chatwithload).child("number").on("value", snapshot =>{
        ///msgnumber = snapshot.val();
        setmsgNumber(snapshot.val().number);
        //console.log(msgnumber);
    });
}

    function goback(){
                navigate("/");
    }

    function createMsg(text,time){
        if(nomsg !== false){
            setnomsg(false);
            }
        setmsgs(prev=>[...prev, {
            text: text,
            type: "msg",
            time: time
        }]);
    }

    function create_e_Msg(text,time){
        if(nomsg !== false){
        setnomsg(false);
        }
        setmsgs(prev=>[...prev, {
            text: text,
            type: "emsg",
            time: time
        }]);
    }

    function incrimentMsgNumber(){
        chatsref.child(chatwith).child("number").set({
            number: msgnumber + 1
        });
    }

    function send(e){
        if(inputref.current.value.length > 0){
            let today = new Date();
            let hour = today.getHours();
            let minute = today.getMinutes();
            //console.log(`${hour}:${minute}`);
            playSendSound();
            createMsg(inputref.current.value,`${hour}:${minute}`);
            //console.log(msgnumber);
            chatsref.child(chatwith).child(msgnumber + 1).set({
                text: inputref.current.value,
                user: localStorage.getItem("username"),
                time: `${hour}:${minute}`,
                seen: false,
                type: "msg"
            });
            incrimentMsgNumber();
            setsendstate("camera");
           inputref.current.value = "";
           inputref.current.style.height = "50px";
           inputref.current.style.top = "0";
           scrollDown();

        //chatsref.set()
        }   
    }

    function autoresize_input(e){
        let input = e.target;
        let number;
        if(input.value.length > 0){
            setsendstate("send");
        }else{
            if(beforeSendImg === false){
            setsendstate("camera");
            }
        }
        //console.log(input.scrollHeight);
        input.style.height = "50px";
        input.style.top = "0";
        if(input.scrollHeight < 126){
            number = input.scrollHeight;
        }else{
            number = 126;
        }
        //if(input.scrollHeight < 126){
        if(input.scrollHeight !== 70){
             input.style.height = `${number}px`;
             input.style.top = "-" + number/4 + "px";
        }
        //}
    }

    function longpress(e){
        e.preventDefault();
        setlongpressState(true);
    }

    //console.log(chatname.img);

    function goToCamera(){
        navigate('camera', { state: { pramstate: chatname.name } });
    }


    return ( 
        <>
        <div className="head">
            <ArrowLeft className="back-btn" onClick={goback}/>
            <div className="longpress-menu">
            <motion.div initial={{scale: 0}} animate={{scale: longpressState ? 1 : 0}} transition={{duration: 0.1}} className="copy"><Clipboard2Fill/></motion.div>
            <motion.div initial={{scale: 0}} animate={{scale: longpressState ? 1 : 0}} className="share"><ShareFill/></motion.div>
            </div>
            <div className="chat-title">{chatname.name}</div>
            <div className="user-img" style={{backgroundImage: `url(${chatname.img})`}}><PersonFill style={{display: "none"}} className="user-icon"/></div>
        </div>
        <div ref={chatboxref} className="chat-box">

        {nomsg && <div onContextMenu={longpress} key={crypto.randomUUID()} className="e-msg">
                <div key={crypto.randomUUID()} className="e-time">{nomsg.time}</div>
                <div key={crypto.randomUUID()} className="emsg-text">{nomsg.text}</div>
              </div>}
            
            {msgs.map(msg =>{
                if(msg.type === "msg"){
                return(
                <div onContextMenu={longpress} key={crypto.randomUUID()} className="msg">
                  <div key={crypto.randomUUID()} className="time">{msg.time}</div>
                  <Check2All key={crypto.randomUUID()} className="check"/>
                  <div key={crypto.randomUUID()} className="msg-text">{msg.text}</div>
                </div>
                );
            }else{
                return(
                <div onContextMenu={longpress} key={crypto.randomUUID()} className="e-msg">
                <div key={crypto.randomUUID()} className="e-time">{msg.time}</div>
                <div key={crypto.randomUUID()} className="emsg-text">{msg.text}</div>
              </div>
                );
            }
            })}

         
    
        </div>
        <div className="container">
            <motion.div initial={{height:0}} animate={{height: beforeSendImg ? 300 : 0}} exit={{height:0}} className="before-send-img" style={{backgroundImage: `url(${beforeSendImg})`}}>{beforeSendImg && <XLg className="cancel-send-img" onClick={cancel_img}/>}</motion.div>
        {sendstte === "send" ? <SendFill className="send-btn" onClick={send}/> : <CameraFill onClick={goToCamera} className="camera-btn"/>}
          <textarea className="input" cols="30" rows="10" placeholder="הודעה" ref={inputref} onKeyUp={autoresize_input}></textarea>
        </div>
        </>
     );
}
 
export default Chat;
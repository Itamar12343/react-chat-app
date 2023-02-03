import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {EyeSlashFill} from 'react-bootstrap-icons';
import { Eye } from "react-bootstrap-icons";
import { PersonFill } from "react-bootstrap-icons";
import { usersref } from "../components/firebase";
import { motion} from "framer-motion";
import { useNavigate } from "react-router";
import "../style/loginPage.css";

const LoginPage = () => {
    const [hover,sethover] = useState("hover");
    const [hidePass, sethidePass] = useState(null);
    const [hidePasssignup, sethidePasssignup] = useState(null);
    const [acceptbtn, setacceptbtn] = useState("login-btn");
    const [acceptbtnsignup, setacceptbtnsignup] = useState("signup-btn");
    const [login_visible, setlogin_visible] = useState("set-login");
    const [signup_visible, setsignup_visible] = useState("set-signup-v");
    const [pass, setPass] = useState("");
    const [passsignup, setPasssignup] = useState("");
    const [name_Input, setname_Input] = useState("");
    const [name_Inputsignup, setname_Inputsignup] = useState("");
    const [loginErr,setloginErr] = useState("login-err");
    const [loginErrText, setloginErrText] = useState("");
    const [signupErr,setsignupErr] = useState("signup-err");
    const [signupErrText, setsignupErrText] = useState("");
    const [load,setload] = useState(true);
    const submitlogin = useRef(null);
    const submitsignup = useRef(null);
    const inputname = useRef(null);
    const inputpass = useRef(null);
    const inputnamesignup = useRef(null);
    const inputpasssignup = useRef(null);
    const users = usersref;
    const [passwordtologin, setpasswordlogin] = useState(null);
    const [ifnameiscorrect,setifnameiscorrect] = useState(false);
    const [ifnameiscorrectsignup,setifnameiscorrectsignup] = useState(false);
    const [img_animation, setImg_animation] = useState("image-animation-pause");
    const fileinput = useRef(null);
    const [imguploaded,setimguploaded] = useState(null);
    const [showpicon, setshowpicon] = useState(true);
    const [loading_animation, setloading_animation] = useState(false);
    const [endScreen, setendScreen] = useState(false);
    const [endscreentext, setendscreentext] = useState("");
    const navigate = useNavigate();


    /*document.onclick = ()=>{
        //console.log(arryofUsers);
        arryofUsers.forEach(u=>{
            console.log(u);
        });
    }*/


    const clickonupload = ()=>{
        if(img_animation === "image-animation"){
        fileinput.current.click();
        }
    }


    const uploadFile = (e)=>{
        const type = fileinput.current.files[0].type;

        if(type === "image/png" || type === "image/jpeg" || type === "jpg"){
            const reader = new FileReader();
        reader.onload = ()=>{
            setimguploaded(reader.result);
            //setImg_animation("image-animation-pause");
            setsignupErr("signup-err");
            setacceptbtnsignup("signup-btn-true");
            setshowpicon(false);
            //console.log(reader.result);
        }
        reader.readAsDataURL(fileinput.current.files[0]);
    }else{
        setsignupErr("signup-err-img");
        setsignupErrText("קובץ זה לא נתמך");
    }
    }


    const passHide = ()=>{
        sethidePass(false);
    }
    const passShow = ()=>{
        sethidePass(true);
    }

    const passHidesignup = ()=>{
        sethidePasssignup(false);
    }
    const passShowsignup = ()=>{
        sethidePasssignup(true);
    }

    const changetohover = ()=>{
        sethover("hover");
        setlogin_visible("set-login");
        setsignup_visible("set-signup-v");
        setload(true);
        setacceptbtnsignup("signup-btn");
        setacceptbtn("login-btn");
        setPass("");
        setname_Input("");
        setPasssignup("");
        setname_Inputsignup("");
        inputname.current.value = "";
        inputpass.current.value = "";
        inputnamesignup.current.value = "";
        inputpasssignup.current.value = "";
        setloginErr("login-err");
        setsignupErr("signup-err");
        setshowpicon(true);
        setimguploaded(null);
        setImg_animation("image-animation-pause");
    }

    const changetohovered = ()=>{
        sethover("hovered");
        setlogin_visible("set-login-v");
        setsignup_visible("set-signup");
        setload(true);
        setacceptbtnsignup("signup-btn");
        setacceptbtn("login-btn");
        setPass("");
        setname_Input("");
        setPasssignup("");
        setname_Inputsignup("");
        inputname.current.value = "";
        inputpass.current.value = "";
        inputnamesignup.current.value = "";
        inputpasssignup.current.value = "";
        setloginErr("login-err");
        setsignupErr("signup-err");
        setshowpicon(true);
        setimguploaded(null);
        setImg_animation("image-animation-pause");
    }

    const getName = (e)=>{
        setname_Input(e.target.value);
        setload(false);
    }

    const getPass = (e)=>{
        setPass(e.target.value);
        setload(false);
    }


    useEffect(()=>{
        //console.log("uytre");
        if(name_Input.length > 0){
            users.child(name_Input).once("value",snapshot =>{
                let user = snapshot.val();
                if(user){
                    setifnameiscorrect(true);
                    setloginErr("login-err");
                    setpasswordlogin(user.pass);
                }else{
                    setifnameiscorrect(false);
                    setloginErr("login-err-true");
                    setloginErrText("לא נמצא שם משתמש עם שם זהה");
                }
            });
        }
          

            if(name_Input.length === 0){
                setloginErr("login-err-true");
                setloginErrText("לא כתבת שם");
            }

    },[name_Input]);

    const getNamesignup = (e)=>{
        setname_Inputsignup(e.target.value);
        setload(false);
    }

    const getPasssignup = (e)=>{
        setPasssignup(e.target.value);
        setload(false);
        /*if(passsignup.length > 5 && name_Inputsignup.length > 0){
            setsignupErr("signup-err");
        }*/
    }

   useEffect(()=>{
    if(load === false){

    if(pass === passwordtologin && name_Input.length > 0 && ifnameiscorrect === true){
        setacceptbtn("login-btn-true");
        setloginErr("login-err");
    }
    if(pass.length === 0 && name_Input.length > 0 && ifnameiscorrect === true){
        setacceptbtn("login-btn");
        setloginErr("login-err-pass");
        setloginErrText("לא כתבת סיסמא");
    }
    if(name_Input.length === 0 && ifnameiscorrect === true){
        setacceptbtn("login-btn");
        setloginErr("login-err-true");
        setloginErrText("לא כתבת שם");
    }
    if(ifnameiscorrect === true && pass !== passwordtologin){
        setacceptbtn("login-btn");
        setloginErr("login-err-pass");
        setloginErrText("הסיסמא שגויה");
    }
}


    if(pass.length > 0){
        sethidePass(true);
    }else{
        sethidePass(null);
    }
   },[pass, name_Input,load,ifnameiscorrect]);









   useEffect(()=>{
   
    if(load === false){
        //console.log(passsignup);


        if(name_Inputsignup.length > 0){
            users.child(name_Inputsignup).once("value", snapshot =>{
                let user = snapshot.val();
                if(user){
                    setacceptbtnsignup("signup-btn");
                    setsignupErr("signup-err-true");
                    setsignupErrText("שם משתמש זה כבר תפוס");
                    setifnameiscorrectsignup(false);
                }else{
                    setifnameiscorrectsignup(true);
                }
            });
           
        }

        if(ifnameiscorrectsignup === true && passsignup.length > 5){
            setsignupErr("signup-err");
            if(imguploaded){
                setacceptbtnsignup("signup-btn-true");
            }
        }


        if(name_Inputsignup.length > 0 && ifnameiscorrectsignup === true && passsignup.length > 5){
            if(!imguploaded){
            setsignupErr("signup-err-img");
            setsignupErrText("תעלה תמונת פרופיל");
            //setacceptbtnsignup("signup-btn-true");
            }
            setImg_animation("image-animation");
        }

    if(passsignup.length <= 5 && name_Inputsignup.length > 0 && ifnameiscorrectsignup === true){
        //console.log("guio");
        setacceptbtnsignup("signup-btn");
        setsignupErr("signup-err-pass");
        setsignupErrText("הסיסמה חייבת להיות באורך של לפחות 6 אותיות");
    }
    if(passsignup.length === 0 && name_Inputsignup.length > 0 && ifnameiscorrectsignup === true){
        setacceptbtnsignup("signup-btn");
        setsignupErr("signup-err-pass");
        setsignupErrText("לא כתבת סיסמא");
    }
    if(name_Inputsignup.length === 0){
        setacceptbtnsignup("signup-btn");
        setsignupErr("signup-err-true");
        setsignupErrText("לא כתבת שם");
    }
}


    if(passsignup.length > 0){
        sethidePasssignup(true);
    }else{
        sethidePasssignup(null);
    }
   },[passsignup, name_Inputsignup,load,ifnameiscorrectsignup,imguploaded]);


   window.onkeydown = (e)=>{
    if(e.key === "Enter"){
        submitlogin.current.click();
        submitsignup.current.click();
    }
   }

    const checkLogin = (e)=>{
        e.target.style.transform = "translate(-50%) scale(0.5)";
        e.target.style.boxShadow = "0 0 20px 6px #fff";
        setTimeout(() => {
            e.target.style.transform = "translate(-50%) scale(1)";
            e.target.style.boxShadow = "none";
        }, 300);
        if(pass === passwordtologin && name_Input.length > 0 && ifnameiscorrect === true){
            setloading_animation(true);
            localStorage.setItem("username",name_Input);
            setTimeout(() => {
                setendscreentext(`ברוך/ה הבא ${name_Input}`);
                setendScreen(true);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }, 500);
        }
    }


    const checkSignup = (e)=>{
        e.target.style.transform = "translate(-50%) scale(0.5)";
        e.target.style.boxShadow = "0 0 20px 6px #fff";
        setTimeout(() => {
            e.target.style.transform = "translate(-50%) scale(1)";
            e.target.style.boxShadow = "none";
        }, 300);

        if(name_Inputsignup.length > 0 && passsignup.length > 5 && imguploaded && ifnameiscorrectsignup === true){
            setloading_animation(true);
            users.child(name_Inputsignup).set({
                name: name_Inputsignup,
                pass: passsignup,
                img: imguploaded
            });
            localStorage.setItem("username",name_Inputsignup);

            /*const imgref = ref(storage, `users/${name_Inputsignup}`);
            uploadBytes(imgref, fileinput.current.files[0]).then(()=>{
                console.log("image uploaded");
            });*/

            setTimeout(() => {
                setendscreentext("החשבון שלך מוכן לשימוש");
                setendScreen(true);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }, 500);
        }
    }

    function dragover(e){
        e.preventDefault();
        if(ifnameiscorrectsignup === true && passsignup.length > 5){
            e.target.classList.add("image-drag");
        }
    }
    function dragleave(e){
        e.target.classList.remove("image-drag");
    }

    function drop(e){
        if(ifnameiscorrectsignup === true && passsignup.length > 5){
              e.preventDefault();
        e.target.classList.remove("image-drag");
        const type = e.dataTransfer.files[0].type;
        
        if(type === "image/png" || type === "image/jpeg" || type === "jpg"){

        const reader = new FileReader();
        reader.onload = ()=>{
            setimguploaded(reader.result);
            //setImg_animation("image-animation-pause");
            setsignupErr("signup-err");
            setacceptbtnsignup("signup-btn-true");
            setshowpicon(false);
            //console.log(reader.result);
        }
        reader.readAsDataURL(e.dataTransfer.files[0]);
    }else{
        setsignupErr("signup-err-img");
        setsignupErrText("קובץ זה לא נתמך");
    }
        }
      
    }

    return ( 
        <>
          <motion.div initial = {{scale: 0}} animate = {{scale: endScreen ? 1 : 0}} className="success">
            <div className="success-text">{endscreentext}</div>
        </motion.div>


        <div className="set-btns">
        <button onClick={changetohovered} className="login">היכנס</button>
        <button onClick={changetohover} className="signup">הירשם</button>
        <div className={hover}></div>
        </div>

        <div className="box">
        <div className="spiner"></div>
        <div className="block-spiner"></div>
        
           <div className={login_visible}>
            <div className="welcome-title">{`ברוך/ה הבא ${name_Input}`}</div>
            <input ref={inputname} onChange={getName} className="login-name" placeholder="שם" type="text" />
            <div className={loginErr}>{loginErrText}</div>
            <input ref={inputpass} onChange={getPass} className="login-pass" placeholder="סיסמה" type={hidePass === true ? "password" : "text"} />
            {hidePass !== null &&  <div className="hhh">
            {hidePass === true ? <EyeSlashFill onClick={passHide} className="pass-o"/> : <Eye onClick={passShow} className="pass-l"/>}
            </div>}
           
            <button ref={submitlogin} onClick={checkLogin} className={acceptbtn}>{loading_animation ?  <div className="set-spiner-load"><div className="spiner-load"></div></div> : <span style={{pointerEvents:"none"}}>היכנס</span>}</button>
           </div>

           <div className={signup_visible}>
            <div className={img_animation}></div>
           <div style={{backgroundImage: `url(${imguploaded})`}} onClick={clickonupload} onDragOver={dragover} onDragLeave={dragleave} onDrop={drop} className="image">{showpicon && <PersonFill className="profile"/>}</div>
           <input ref={inputnamesignup} onChange={getNamesignup} className="login-name" placeholder="שם" type="text" />
            <div className={signupErr}>{signupErrText}</div>
            <input ref={inputpasssignup} onChange={getPasssignup} className="login-pass" placeholder="סיסמה" type={hidePasssignup === true ? "password" : "text"} />
            {hidePasssignup !== null &&  <div className="hhh">
            {hidePasssignup === true ? <EyeSlashFill onClick={passHidesignup} className="pass-o"/> : <Eye onClick={passShowsignup} className="pass-l"/>}
            </div>}
            <button onClick={checkSignup} ref={submitsignup} className={acceptbtnsignup}>{loading_animation ?  <div className="set-spiner-load"><div className="spiner-load"></div></div> : <span style={{pointerEvents:"none"}}>הירשם</span>}</button>
            <input onChange={uploadFile} ref={fileinput} type="file" className="fileinput" />
           </div>

        </div>
        </>
     );
}
 
export default LoginPage;
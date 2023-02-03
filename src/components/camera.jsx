import { useRef } from "react";
import "../style/camera.css";
import { CheckLg, XLg } from "react-bootstrap-icons";
import captureSound from "../images/capture.mp3";
import { useLocation, useNavigate } from "react-router-dom";
import AnimatedPage from "../webpages/animatePage";

const Camera = () => {
    const videoref = useRef(null);
    const btnref = useRef(null);
    const canvasref = useRef(null);
    const animationref = useRef(null);
    const checkref = useRef(null);
    const navigate = useNavigate();
    const {state} = useLocation();
    const { pramstate } = state;


    navigator.mediaDevices.getUserMedia({video:true}).then(stream =>{
        videoref.current.srcObject = stream;
        videoref.current.play();
    });

    function playCaptureSound(){
        new Audio(captureSound).play();
    }

    function snap(){
        playCaptureSound();
        btnref.current.style.transform = "translate(-50%,-50%) scale(0.6)";
        animationref.current.style.opacity = "1";
        setTimeout(() => {
            btnref.current.style.transform = "translate(-50%,-50%) scale(1)";
            animationref.current.style.opacity = "0";
            setTimeout(() => {
                btnref.current.style.opacity = "0";
                btnref.current.style.pointerEvents = "none";
                checkref.current.classList.add("visible");
            }, 100);

            videoref.current.pause();

            let ctx = canvasref.current.getContext("2d");
            ctx.drawImage(videoref.current,0,0);
        }, 200);
    }

    function continueWithImg(){
        //console.log(canvasref.current.toDataURL());
        navigate(`/chat/${pramstate}`, { state: { pramimg: canvasref.current.toDataURL() } });

    }
    function goBack(){
        videoref.current.play();
        checkref.current.classList.remove("visible");
        btnref.current.style.opacity = "1";
        btnref.current.style.pointerEvents = "all";
    }

    function goBacktoCeat(){
        navigate(-1);
    }

    return ( 
        <AnimatedPage>
        <div className="all">
        <div className="snap-btn" ref={btnref} onClick={snap}></div>
        <video ref={videoref} className="video"></video>
        <canvas className="canvas" width="640" height="480" ref={canvasref}></canvas>
        <div ref={animationref} className="blank-animation"></div>
        
        <div ref={checkref} className="check-1">
            <CheckLg onClick={continueWithImg} className="v"/>
            <XLg onClick={goBack} className="x"/>
        </div>
        <XLg onClick={goBacktoCeat} className="exit"/>
        </div>
        </AnimatedPage>
     );
}
 
export default Camera;
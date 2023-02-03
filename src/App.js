import ChatPage from "./webpages/chatPage";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PageNotFound from "./webpages/pageNotFound";
import HomePage from "./webpages/homePage";
import LoginPage from "./webpages/loginPage";
import Camera from "./components/camera";

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="*" element={<PageNotFound/>}/>
      <Route path="/chat/:type" element={<ChatPage/>}/>
      <Route path="/chat/:type/camera" element={<Camera/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Route, Switch, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import HomeLayout from "./components/HomeLayout";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect, useState } from "react";

function App() {

  const { pathname } = useLocation();

  const [shiftPressed,setShiftPressed] = useState(false);
  const [ctrlPressed,setCtrlPressed] = useState(false);
  const [whatIsDragging,setWhatIsDragging] = useState(null);

  if (pathname === "/signup") {
    document.querySelector("body").className = "signUpBody";
  } else {
    document.querySelector("body").classList.remove("signUpBody");
  }
  if (pathname === "/login") {
    document.querySelector("body").className = "logInBody"
  } else {
    document.querySelector("body").classList.remove("logInBody");
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 16)  {
        e.preventDefault();
        setShiftPressed(true);
      }
      if (e.keyCode === 91)  {
        e.preventDefault();
        setCtrlPressed(true);
      }
      if (e.keyCode === 32 || e.keyCode === 179)  {
        e.preventDefault();
        const playPause = document.querySelector(".playPause");
        if (playPause) playPause.click();
      }
    }
    const handleKeyUp = (e) => {
      if (e.keyCode === 16)  {
        e.preventDefault();
        setShiftPressed(false);
      }
      if (e.keyCode === 91)  {
        e.preventDefault();
        setCtrlPressed(false);
      }
    }
    window.addEventListener('keydown',handleKeyDown)
    window.addEventListener('keyup',handleKeyUp)
    return () => {
      window.removeEventListener('keydown',handleKeyDown);
      window.removeEventListener('keyup',handleKeyUp)
    }
  },[])


  return (
    <>
    {/* <Navigation /> */} 
    <ScrollToTop />
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
      <Route path="/search">
        <HomeLayout searching={true} shiftPressed={shiftPressed} ctrlPressed={ctrlPressed} whatIsDragging={whatIsDragging} setWhatIsDragging={setWhatIsDragging}/>   
      </Route>
      <Route path="">
        <HomeLayout searching={false} shiftPressed={shiftPressed} ctrlPressed={ctrlPressed} whatIsDragging={whatIsDragging} setWhatIsDragging={setWhatIsDragging}/>   
      </Route>
    </Switch>
    </>
  );
}

export default App;

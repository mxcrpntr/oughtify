import { Route, Switch, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import HomeLayout from "./components/HomeLayout";
import ScrollToTop from "./components/ScrollToTop";

function App() {

  const { pathname } = useLocation();

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
        <HomeLayout searching={true}/>   
      </Route>
      <Route path="">
        <HomeLayout searching={false}/>   
      </Route>
    </Switch>
    </>
  );
}

export default App;

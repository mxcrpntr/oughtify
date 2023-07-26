import { Route, Switch, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import HomeLayout from "./components/HomeLayout";

function App() {
  const location = useLocation();
  if (location.pathname === "/signup") {
    document.querySelector("body").className = "signUpBody";
  } else {
    document.querySelector("body").classList.remove("signUpBody");
  }
  if (location.pathname === "/login") {
    document.querySelector("body").className = "logInBody"
  } else {
    document.querySelector("body").classList.remove("logInBody");
  }
  // window.location = location;
  return (
    <>
    {/* <Navigation /> */} 
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
      <Route path="">
        <HomeLayout />   
      </Route>
    </Switch>
    </>
  );
}

export default App;

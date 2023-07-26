import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import HomeLayout from "./components/HomeLayout";

function App() {
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

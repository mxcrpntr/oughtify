import { Link, NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./HomeNavigation.css"
import { useDispatch } from "react-redux";
import { logout } from "../../../store/session";

export default function HomeNavigation() {
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <div className="homeNavigation">
            {!sessionStorage["currentUser"] && (
                <>
                    <span>
                        <button className="fa-solid circle loggedOut"><i class="fa-solid fa-chevron-left"></i></button>
                        <button className="fa-solid circle loggedOut"><i class="fa-solid fa-chevron-right"></i></button>
                    </span>
                    <span>
                        <button className="looseLinks">Premium</button>  
                        <button className="looseLinks">Support</button> 
                        <button className="looseLinks">Download</button> 
                        <button className="vl"></button>
                        <button className="signUp" onClick={()=>{history.push("/signup")}}>Sign up</button>
                        <button className="logIn" onClick={()=>{history.push("/login")}}>Log in</button>
                    </span>
                </>
            )}
            {sessionStorage["currentUser"] && (
                <>
                    <span>
                        <button className="fa-solid circle loggedOut"><i class="fa-solid fa-chevron-left"></i></button>
                        <button className="fa-solid circle loggedOut"><i class="fa-solid fa-chevron-right"></i></button>
                    </span>
                    <span>
                        <button className="installApp"><i class="fa-regular fa-circle-down"></i> Install App</button>
                        <button className="profile" onClick={(e)=> {e.preventDefault(); dispatch(logout());}}><i className="fa-solid fa-user-circle" /></button>
                    </span>
                </>
            )}
        </div>
    )
}
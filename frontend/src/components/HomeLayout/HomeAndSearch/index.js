import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import "./HomeAndSearch.css"


export default function HomeAndSearch() {

    return (
        <div className="homeAndSearch">
            <ul>
                <li><NavLink to=""><span className="fa-solid"><i class="fa-solid fa-house"></i> </span><span className="home">Home</span></NavLink></li>
                <li><NavLink to=""><span className="fa-solid"><i class="fa-solid fa-magnifying-glass"></i></span> <span className="search">Search</span></NavLink></li>
            </ul>

        </div>
    )
}
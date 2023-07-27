import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import './AlbumsIndexItem.css'

export default function AlbumsIndexItem() {
    const history = useHistory();

    return (
        <ul onClick={()=> {history.push("/albums")}}>
            <li><img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img></li>
            <li className="albumName">Court and Spark</li>
            <li className="albumYear">1970 · Album</li>
        </ul>
    )
}
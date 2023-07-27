import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


export default function ArtistsIndexItem() {
    const history = useHistory();

    return (
        <ul onClick={()=> {history.push("/artists")}}>
            <li><img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img></li>
            <li className="artistName">Joni MitiiiiiiiiiiiiiiiiichellMitiiiiiiiiiiiiiiiiichell</li>
        </ul>
    )
}
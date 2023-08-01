import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import './AlbumsIndexItem.css'

export default function AlbumsIndexItem({album}) {
    const history = useHistory();
    return (
        <ul onClick={()=> {history.push(`/albums/${album?.id}`)}}>
            <li><img src={album?.imageUrl}></img></li>
            <li className="albumName">{album?.title}</li>
            <li className="albumYear">{album?.date?.substr(0,4)} · Album</li>
        </ul>
    )
}
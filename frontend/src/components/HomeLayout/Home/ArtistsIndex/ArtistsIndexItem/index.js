import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


export default function ArtistsIndexItem({artist}) {
    const history = useHistory();
    console.log(artist)

    return (
        <ul onClick={()=> {history.push(`/artists/${artist.id}`)}}>
            <li><img src={`${artist.imageUrl}`}></img></li>
            <li className="artistName">{artist.name}</li>
        </ul>
    )
}
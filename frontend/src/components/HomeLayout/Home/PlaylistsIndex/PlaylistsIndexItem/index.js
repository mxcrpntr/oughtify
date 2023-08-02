import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


export default function PlaylistsIndexItem({playlist}) {
    const history = useHistory();

    return (
        <ul onClick={()=> {history.push(`/playlists/${playlist.id}`)}}>
            <li>{ playlist.imageUrl ? (
                <img src={`${playlist.imageUrl}`}></img>
            ) : (
                <div className="imageStandIn" style={{backgroundColor: playlist.color}}></div>
            )}
            </li>
            <li className="playlistTitle">{playlist.title}</li>
            <li className="playlistUserName">{playlist.userName}</li>
        </ul>
    )
}
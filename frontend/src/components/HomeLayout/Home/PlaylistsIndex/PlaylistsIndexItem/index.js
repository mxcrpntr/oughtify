import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


export default function PlaylistsIndexItem({playlist, currentSong}) {
    const history = useHistory();

    return (
        <ul onClick={()=> {history.push(`/playlists/${playlist.id}`)}}>
            <li key={playlist.id}>{ playlist.imageUrl ? (
                <img src={`${playlist.imageUrl}`}></img>
            ) : (
                <div className="imageStandIn" style={{backgroundColor: playlist.color}}></div>
            )}
            </li>
            <li  key={playlist.id} className="playlistTitle">{playlist.title}</li>
            <li  key={playlist.id} className="playlistUserName">{playlist.userName}</li>
        </ul>
    )
}
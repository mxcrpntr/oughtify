import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


export default function LibraryIndexItem({playlist, album}) {
    const history = useHistory();

    return (
        <>
            { (playlist || album) && (
                <li onClick={() => {
                    if (playlist) {
                        history.push(`/playlists/${playlist.id}`)
                    } else {
                        history.push(`/albums/${album.id}`)
                    }}}>
                    <div className="albumImage">
                        <div className="playlistImageStandin" style={{backgroundColor: `${playlist.color}`}}></div>
                        {/* <img src={ playlist ? playlist.imageUrl : album.imageUrl}></img> */}
                    </div>
                    <div className="albumInfo">
                        <h3>{playlist ? playlist.title : album.title}</h3>
                        <h4>{playlist ? "Playlist" : "Album"} · { playlist ? playlist.userName : album.artistName}</h4>
                    </div>
                </li>
            )}
        </>
    )
}
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import PlaylistImage from "../../PlaylistShow/PlaylistImage";
import { useEffect, useState } from "react";

const zeroImageMusicSymb = () => {
    return <i class="fa-solid fa-music" style={{color: "#7F7F7F"}}></i>
}

export default function PlaylistsIndexItem({playlist, currentSong}) {
    const history = useHistory();
    const [fourImages,setFourImages] = useState(!playlist?.imageUrl && playlist?.albumImages && playlist.albumImages.length >= 4);

    useEffect(() => {
        if (!playlist?.imageUrl && playlist?.albumImages && playlist.albumImages.length >= 4) {
            setFourImages(true);
        } else if (playlist?.imageUrl) {
            setFourImages(false)
        }
    }, [])

    return (
        <ul onClick={()=> {history.push(`/playlists/${playlist.id}`)}}>
            <li key={playlist.id}>
                <div className={fourImages && playlist?.albumImages ? "albumImage fourImages" : "albumImage"}>
                        {fourImages && playlist?.albumImages ?
                        (<>
                        <div className="fourthPlaylistImageStandin" style={{backgroundImage: `url(${playlist.albumImages[0]})`}}></div>
                        <div className="fourthPlaylistImageStandin" style={{backgroundImage: `url(${playlist.albumImages[1]})`}}></div>
                        <div className="fourthPlaylistImageStandin" style={{backgroundImage: `url(${playlist.albumImages[2]})`}}></div>
                        <div className="fourthPlaylistImageStandin" style={{backgroundImage: `url(${playlist.albumImages[3]})`}}></div>
                        </>) :
                        (<div className="onethPlaylistImageStandin" style={playlist?.imageUrl || playlist?.albumImages && playlist.albumImages.length > 0 ?
                        {backgroundImage: `url(${playlist.imageUrl ? playlist.imageUrl : playlist.albumImages[0]})`} :
                        {backgroundColor: `#282828`}}>{playlist?.imageUrl || playlist?.albumImages && playlist.albumImages.length > 0 ? (<></>) : zeroImageMusicSymb()}</div>)}
                    </div>
            </li>
            <li  key={playlist.id} className="playlistTitle">{playlist.title}</li>
            <li  key={playlist.id} className="playlistUserName">{playlist.userName}</li>
        </ul>
    )
}
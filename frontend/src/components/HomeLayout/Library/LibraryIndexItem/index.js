import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const zeroImageMusicSymb = () => {
    return <i class="fa-solid fa-music" style={{color: "#7F7F7F"}}></i>
}

export default function LibraryIndexItem({playlist, album, currentSong}) {
    const history = useHistory();

    const [fourImages,setFourImages] = useState(!playlist?.imageUrl && playlist?.albumImages && playlist.albumImages.length >= 4);

    useEffect(() => {
        if (!playlist?.imageUrl && playlist?.albumImages && playlist.albumImages.length >= 4) {
            setFourImages(true);
        } else if (playlist?.imageUrl) {
            setFourImages(false)
        }
    }, [])

    const isCurrentlyPlaying = (playlist && currentSong?.song?.playlistId === playlist.id || album && currentSong?.song?.albumId === album.id)

    return (
        <>
            { (playlist || album) && (
                <li onClick={() => {
                    if (playlist) {
                        history.push(`/playlists/${playlist.id}`)
                    } else {
                        history.push(`/albums/${album.id}`)
                    }}}>
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
                    <div className="albumInfo">
                        <h3 style={isCurrentlyPlaying ? {color: "#1ED760"} : {}}>{playlist ? playlist.title : album.title}</h3>
                        <h4>{playlist ? "Playlist" : "Album"} · { playlist ? playlist.userName : album.artistName}</h4>
                    </div>
                    {isCurrentlyPlaying && currentSong?.isPlaying &&
                    (
                        <i class="fa-solid fa-volume-high" style={{color: "#1ED760"}}></i>
                    )}
                </li>
            )}
        </>
    )
}
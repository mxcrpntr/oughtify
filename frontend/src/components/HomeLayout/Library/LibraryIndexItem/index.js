import { useState,useEffect, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { createPlaylistSong } from "../../../../store/playlistSongs";
import { useDispatch } from "react-redux";

const zeroImageMusicSymb = () => {
    return <i class="fa-solid fa-music" style={{color: "#7F7F7F"}}></i>
}

export default function LibraryIndexItem({playlist, album, currentSong, whatIsDragging, setWhatIsDragging, sessionUser}) {
    const history = useHistory();

    const [fourImages,setFourImages] = useState(!playlist?.imageUrl && playlist?.albumImages && playlist.albumImages.length >= 4);
    const [cannotAddTo,setCannotAddTo] = useState(false);
    const [greenBorder,setGreenBorder] = useState(false);
    const [memoryOfDraggedThings,setMemoryOfDraggedThings] = useState(null)
    const libraryItemRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!playlist?.imageUrl && playlist?.albumImages && playlist.albumImages.length >= 4) {
            setFourImages(true);
        } else if (playlist?.imageUrl) {
            setFourImages(false)
        }
    }, [])

    useEffect(() => {
        if (whatIsDragging?.draggedThings && (album || (playlist && sessionUser?.id !== playlist.userId))) {
            setCannotAddTo(true)
        } else if (whatIsDragging?.draggedThings) {
            const xPos = whatIsDragging.xPos
            const yPos = whatIsDragging.yPos  
            const rect = libraryItemRef.current.getBoundingClientRect();
            if (xPos >= rect.left && xPos <= rect.right && yPos >= rect.top && yPos <= rect.bottom) {
                setGreenBorder(true)
                setMemoryOfDraggedThings(whatIsDragging)
            } else if (greenBorder) {
                setGreenBorder(false)
                setMemoryOfDraggedThings(null)
            }
        }
        if (!whatIsDragging?.draggedThings) {
            if (greenBorder) {
                if (playlist && memoryOfDraggedThings?.playlistSongIds && memoryOfDraggedThings.playlistSongIds.length > 0) {
                    dispatch(createPlaylistSong({playlist_song: {playlist_id: playlist.id, playlist_song_ids: memoryOfDraggedThings.playlistSongIds}}))
                } else if (playlist && memoryOfDraggedThings?.albumSongIds && memoryOfDraggedThings.albumSongIds.length > 0) {
                    dispatch(createPlaylistSong({playlist_song: {playlist_id: playlist.id, album_song_ids: memoryOfDraggedThings.albumSongIds}}))
                }
            }
            setGreenBorder(false)
            setCannotAddTo(false)
        }
    },[whatIsDragging])

    const isCurrentlyPlaying = (playlist && currentSong?.song?.playlistId === playlist.id || album && currentSong?.song?.albumId === album.id)

    return (
        <>
            { (playlist || album) && (
                <li
                    ref={libraryItemRef}
                    className={cannotAddTo ? "cannotAddTo" : `${greenBorder ? "greenBorder" : ""}` }
                    onClick={() => {
                    if (playlist) {
                        history.push(`/playlists/${playlist.id}`)
                    } else {
                        history.push(`/albums/${album.id}`)
                    }}}
                    onMouseOver={() => {
                        if (whatIsDragging?.draggedThings && !cannotAddTo) setGreenBorder(true)
                    }}
                    onMouseLeave={() => {
                        if (greenBorder) setGreenBorder(false)
                    }}
                    >
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
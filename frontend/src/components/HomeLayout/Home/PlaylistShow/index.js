import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min"
import './PlaylistShow.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylist, fetchPlaylists, getPlaylist, getPlaylists } from "../../../../store/playlists";
import { useEffect, useRef, useState } from "react";
import { getSongs } from "../../../../store/songs";
import { getArtist } from "../../../../store/artists";
import PlaylistTrackListItem from "./PlaylistTrackListItem";
import { invisibleEllipsisSymbol } from "../AlbumShow/TrackListItem";
import { getPlaylistSongs } from "../../../../store/playlistSongs";


const zeroImageMusicSymb = () => {
    return <i class="fa-solid fa-music" style={{color: "#7F7F7F"}}></i>
}
const changePhotoHoverSymbText = () => {
    return (
        <>
        <i class="fa-solid fa-pen" style={{fontSize: "75px"}}></i>
        <br></br>
        <h4>Choose photo</h4>
        </>
    )
}

export default function PlaylistShow() {

    const dispatch = useDispatch();

    const {playlistId} = useParams();

    const playlists = useSelector(getPlaylists);

    const sessionUser = useSelector(state => state.session.user);

    const [rowWidth,setRowWidth] = useState();

    const tableRowRef = useRef();

    const [isLiked, setIsLiked] = useState(false);

    const [zeroSymbol, setZeroSymbol] = useState(zeroImageMusicSymb())

    const [songsUpdated, setSongsUpdated] = useState(true);

    useEffect(() => {
        const getRowWidth = () => {
            if (tableRowRef.current) {
                const {width} = tableRowRef.current.getBoundingClientRect();
                setRowWidth(width);
            }
        };
        getRowWidth();
        window.addEventListener('resize', getRowWidth);
        return () => window.removeEventListener('resize', getRowWidth);
    }, [])


    
    let currentSong = sessionUser?.queue[0]?.[0]

    useEffect(() => {
        currentSong = sessionUser?.queue[0]?.[0]
    }, [sessionUser])

    const playlist = useSelector(getPlaylist(playlistId));
    const playlistSongs = useSelector(getPlaylistSongs);

    let opaqueBkgdStyle = {};


    useEffect(() => {
        if (playlist) {
            opaqueBkgdStyle = {
                backgroundImage: `linear-gradient(to bottom, ${playlist.color}, rgba(18, 18, 18, 1))`
            }
        }
    }, [playlist,playlistSongs])


    let runtime = 0;

    Object.values(playlistSongs).forEach(playlistSong => runtime += playlistSong.length)

    const formatRuntime = (runtime) => {
        const min = Math.floor(runtime / 60);
        const sec = runtime % 60;
        return `${min} min ${sec} sec`
    }

    useEffect(()=> {
        dispatch(fetchPlaylist(playlistId));
    },[playlistId,songsUpdated])

    useEffect(()=> {
        dispatch(fetchPlaylists);
    },[])

    const songsForTracklist = Object.values(playlistSongs)
        .sort((a,b) => a.songNumber - b.songNumber)

    const songsForQueue = songsForTracklist
        .map(song => [song,0])

    const songsForReverseQueue = [...songsForQueue]
        .sort((a,b) => b[0].songNumber - a[0].songNumber)

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    }


    const oneImageCallback = (playlistSongArray) => {
        if (Object.values(playlistSongArray).length > 0) {
            return ({backgroundImage: `url("${Object.values(playlistSongArray)[0].imageUrl}")`})
        }
        else {
            return ({})
        }
    }

    
    return (
        <>
            {playlist && Object.keys(playlist).length > 0 && playlistSongs
                && (
            <>
            <div className="playlistShowTop">
                <div className="playlistImage">
                    {[...new Set(Object.values(playlistSongs).map(song => song.imageUrl))].length >= 4 ?
                    (<div className="fourPlaylistImages">
                        {[...new Set(Object.values(playlistSongs).map(song => song.imageUrl))].slice(0,4).map(imageUrl => {
                            return (
                                <div className="fourthImage" style={{backgroundImage: `url("${imageUrl}")`}}></div>
                            )
                        })}
                    </div>) :
                    (<div className="onePlaylistImage"><div className="onethImage" style={oneImageCallback(playlistSongs)}>
                        {Object.values(playlistSongs).length === 0 && (
                            <div className="centerOfOne">{zeroImageMusicSymb()}</div>
                        )}
                    </div></div>)}
                    <div className="changePhotoOverlay">{changePhotoHoverSymbText()}</div>
                </div>
                <div className='playlistHeaders'>
                    <h4>Playlist</h4>
                    <h1>{playlist.title}</h1>

                    <h5>
                        <Link to="" onClick={(e) => {e.preventDefault()}}>{playlist.userName}</Link>
                        &nbsp;· {Object.values(playlistSongs)?.length > 0 ? Object.values(playlistSongs).length : 0} song{ Object.values(playlistSongs).length === 1 ? "" : "s" },
                        &nbsp; <span className="playlistLength">{formatRuntime(runtime)}</span>

                    </h5>
                </div>
            </div>
            <div className='opaqueBkgd-2' style={{
                backgroundImage: `linear-gradient(to bottom, ${playlist.color}, rgba(18, 18, 18, 1))`
            }}>
                <div className='playlistTrackList'>
                <span className="bigButtons">
                    <button className="bigPlay" onClick={() => {
                    if (sessionUser) {
                        const audio = document.querySelector("audio")
                        if (sessionUser.queue?.[0] && playlistSongs && !Object.values(playlistSongs).map(pSong => pSong.id).includes(sessionUser.queue[0][0].id)) {
                            sessionUser.queue = [...songsForQueue]
                            audio.currentTime = sessionUser.queue?.[0]?.[1] ? sessionUser.queue[0][1] : 0
                            if (audio.paused) document.querySelector(".playPause").click()
                        }
                        else {
                            document.querySelector(".playPause").click()
                        }
                    }
                    }}>{ sessionUser.queue?.[0] && playlistSongs && Object.values(playlistSongs).map(pSong => pSong.id).includes(sessionUser.queue[0][0].id) && !document.querySelector("audio").paused ?
                    (<i class="fa-solid fa-pause"></i>) :
                    (<i class="fa-solid fa-play"></i>)}</button>
                    <span className="bigHeart" onClick={handleLikeClick}>{isLiked ?
                    (<i class="fa-solid fa-heart"style={{color: "#1ED760"}}></i>) :
                    (<i class="fa-regular fa-heart"></i>)}</span>
                    <span className="bigDots"><i class="fa-solid fa-ellipsis"></i></span>
                </span>

                    <table>
                        <tr ref={tableRowRef}>
                            <td>#</td>
                            <td className="titleColumn">
                                Title
                            </td>
                            <td className="albumColumn"  hidden={ rowWidth < 500 ? "hidden" : ""} >
                                Album
                            </td>
                            <td className="dateAddedColumn" hidden={ rowWidth < 710 ? "hidden" : ""} >
                                Date added
                            </td>
                            <td></td>
                            <td><i class="fa-regular fa-clock"></i></td>
                            <td>{invisibleEllipsisSymbol()}</td>
                        </tr>
                        <hr></hr>
                        {songsForTracklist.map(song => {
                            return (
                                <PlaylistTrackListItem
                                    song={song}
                                    key={song.id}
                                    songsForQueue={songsForQueue.filter(entry => entry[0].songNumber >= song.songNumber)}
                                    songsForReverseQueue={songsForReverseQueue.filter(entry => entry[0].songNumber < song.songNumber)}
                                    playlist={playlist}
                                    userPlaylists={Object.values(playlists).filter((pList) => sessionUser.playlistIds.includes(pList.id))}
                                    setSongsUpdated={setSongsUpdated}
                                    songsUpdated={songsUpdated}/>
                            )
                        })}

                    </table>

                </div>
            </div>
            </>

            )}
        </>
    )
}
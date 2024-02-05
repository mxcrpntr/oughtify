

import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatTime } from "../../ArtistShow";
import { createPlaylistSong, deletePlaylistSong } from "../../../../../store/playlistSongs";
import { fetchPlaylist } from "../../../../../store/playlists";


const playSymbol = () => {
    return <i class="fa-solid fa-play" style={{color: "#FFFFFF"}}></i>;
}
const heartSymbol = () => {
    return <i class="fa-regular fa-heart" style={{fontSize: "16px"}}></i>;
}
const heartSymbolFilled = () => {
    return <i class="fa-solid fa-heart"style={{fontSize: "16px", color: "#1ED760"}}></i>;
}
const pauseSymbol = () => {
    return <i class="fa-solid fa-pause" style={{color: "#FFFFFF"}}></i>;
}
const spinningDiscSymbol = () => {
    return <i class="fa-solid fa-compact-disc fa-spin"></i>;
}
const ellipsisSymbol = () => {
    return <i class="fa-solid fa-ellipsis" style={{color: "#FFFFFF"}}></i>;
}
const invisibleEllipsisSymbol = () => {
    return <i class="fa-solid fa-ellipsis" style={{opacity: 0}}></i>;
}



export default function PlaylistTrackListItem({song,songsForQueue,songsForReverseQueue,playlist,userPlaylists,setSongsUpdated,songsUpdated}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const [numberPlay, setNumberPlay] = useState(song.songNumber);
    const [heart, setHeart] = useState("");
    const [isLiked,setIsLiked] = useState(false);
    const [ellipsis,setEllipsis] = useState(invisibleEllipsisSymbol());
    const sessionUser = useSelector(state => state.session.user);
    // const [greenText,setGreenText] = useState({color: "#FFFFFF"});
    const [currentSong, setCurrentSong] = useState(sessionUser?.queue?.[0]?.[0]);
    const [isCurrentSong, setIsCurrentSong] = useState(false);
    const [hiddenUlHidden, setHiddenUlHidden] = useState(true);
    const [hiddenPlaylistUlHidden, setHiddenPlaylistUlHidden] = useState(true);
    const [isPlaying,setIsPlaying] = useState(!document.querySelector("audio")?.paused);
    const [numOrDisc, setNumOrDisc] = useState(song.songNumber);
    const [isOver,setIsOver] = useState(false);
    const [selected,setSelected] = useState(false);

    const [userPlaylistId, setUserPlaylistId] = useState(0);
    const [newPlaylistSong,setNewPlaylistSong] = useState(false);
    const [removePlaylistSong,setRemovePlaylistSong] = useState(false);


    const [rowWidth,setRowWidth] = useState();

    const tableRowRef = useRef();
    const hiddenUlRef = useRef();
    const ellipsisRef = useRef();


    useEffect(()=> {
        if(userPlaylistId !== 0) {
            setSongsUpdated(!songsUpdated)
        }
    },[userPlaylistId])


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

    // let currentSong = sessionUser?.queue?.[0]?.[0]

    useEffect(() => {
        const audio = document.querySelector("audio");
        if (audio) {
            const handleAudioChange = (e) => {
                setIsPlaying(!audio.paused)
                setCurrentSong(sessionUser?.queue?.[0]?.[0])
                if (song.id === sessionUser?.queue?.[0]?.[0]?.id) {
                    !audio.paused ? setNumOrDisc(spinningDiscSymbol()) : setNumOrDisc(song.songNumber)
                } else {
                    setNumOrDisc(song.songNumber)
                }
            }
            audio.addEventListener("play", handleAudioChange)
            audio.addEventListener("playing", handleAudioChange)
            audio.addEventListener("pause", handleAudioChange)
            audio.addEventListener("timeUpdate", handleAudioChange)
            return () => {
                audio.removeEventListener('play', handleAudioChange);
                audio.removeEventListener('playing', handleAudioChange);
                audio.removeEventListener('pause', handleAudioChange);
                audio.removeEventListener('timeUpdate', handleAudioChange);
            };
        }
    }, [])

    useEffect(() => {
        if (tableRowRef.current) {
            const handleOutsideClick = (e) => {
                if (hiddenUlRef?.current && !hiddenUlRef.current.contains(e.target)) {
                    setHiddenUlHidden(true);
                }
                if (tableRowRef?.current && !tableRowRef.current.contains(e.target)) {
                    setSelected(false);
                    if (!isLiked) setHeart("");
                    setEllipsis(invisibleEllipsisSymbol());
                }
            }
            document.addEventListener('click', handleOutsideClick)
            return () => {
                document.removeEventListener('click', handleOutsideClick)
            }
        }
    })

    useEffect(() => {
        setCurrentSong(sessionUser?.queue?.[0]?.[0])
        if (song.id === currentSong?.id) {
            setIsCurrentSong(true)
        } else {
            setIsCurrentSong(false)
        }
    }, [sessionUser?.queue?.[0]?.[0],document.querySelector("audio")?.paused])

    const colorTextStyle = {
        color: isCurrentSong ? "#1ED760" : "#FFFFFF"
    }

    useEffect(() => {}, [hiddenUlHidden])

    const handleTrackClick = (e) => {
        e.stopPropagation()
        if (sessionUser) {
            if (song.id !== currentSong?.id) {
                sessionUser.queue = [...songsForQueue];
                sessionUser.reverseQueue = [...songsForReverseQueue];
                const audio = document.querySelector("audio");
                audio.currentTime = sessionUser.queue?.[0]?.[1] ? sessionUser.queue[0][1] : 0;
            }
            document.querySelector(".playPause").click()
        }
    }

    const handleLikeClick = (e) => {
        e.stopPropagation()
        if (sessionUser) {
            if (!isLiked) setHeart(heartSymbolFilled());
            else setHeart(heartSymbol());
            setIsLiked(!isLiked);
        }
    }

    const handleSelectionClick = (e) => {
        setSelected(!selected);
        if (ellipsisRef?.current && ellipsisRef.current.contains(e.target)) {
            setHiddenUlHidden(!hiddenUlHidden);
        }
    }

    const hiddenUl = () => {
        return (
            <ul className="hiddenUl" ref={hiddenUlRef}>
                <li className="barUnder" onClick={() => {sessionUser.queue.push([song,0])}}><span className="hiddenUlSpan1"><i class="fa-solid fa-list" style={{"fontSize": "16px"}}></i> <span>Add to queue</span></span></li>
                <li onClick={()=> {history.push(`/artists/${song.artistId}`)}}><span className="hiddenUlSpan1"><i class="fa-solid fa-user-astronaut" style={{"fontSize": "16px"}}></i> <span>Go to artist</span></span></li>
                <li onClick={()=> {history.push(`/albums/${song.albumId}`)}} className="barUnder"><span className="hiddenUlSpan1"><i class="fa-solid fa-compact-disc" style={{"fontSize": "16px"}}></i> <span>Go to album</span></span></li>
                {sessionUser.id === playlist.userId &&
                (<li onClick={() => {setRemovePlaylistSong(true)}}><span className="hiddenUlSpan1"><i class="fa-regular fa-trash-can" style={{"fontSize": "16px"}}></i> <span>Remove from this playlist</span></span></li>)}
                <li onMouseOver={() => {setHiddenPlaylistUlHidden(false)}}
                    onMouseLeave={() => {setHiddenPlaylistUlHidden(true)}}><span className="hiddenUlSpan1"><i class="fa-solid fa-plus" style={{"fontSize": "16px"}}></i> <span>Add to playlist</span></span>
                    {!hiddenPlaylistUlHidden && (hiddenPlaylistUl())}
                </li>
            </ul>
        )
    }

    const hiddenPlaylistUl = () => {
        // let userPlaylists = []
        // if (playlists && userPlaylistIds) {
        //     userPlaylists = Object.values(playlists).filter((pList) => userPlaylistIds.includes(pList.id))
        // }
        console.log(userPlaylists)
        return (
            <ul className="hiddenPlaylistUl ">
            {userPlaylists.map((userPlaylist, index) => {
                return (
                    <li key={index} onClick={() => {setUserPlaylistId(userPlaylist.id)}}>{userPlaylist.title}</li>
                )
            })}
        </ul>
        )
    }

    useEffect(() => {
        if (userPlaylistId !== 0) {
            dispatch(createPlaylistSong({playlist_song: {playlist_id: userPlaylistId, song_id: song.songId}}))
            setUserPlaylistId(0)
        }
    },[userPlaylistId])

    useEffect(() => {
        if (removePlaylistSong) {
            dispatch(deletePlaylistSong(song))
            setRemovePlaylistSong(false)
            setSongsUpdated(!songsUpdated)
        }
    },[removePlaylistSong])

    return (
        <>
        {song.id &&  song.id !== currentSong?.id && (
            <tr ref={tableRowRef}
                className={selected ? ("selectedTrack") : ("")}
                onClick={handleSelectionClick}
                onMouseOver={() => {
                    setIsOver(true);
                    setNumberPlay(playSymbol());
                    if (!isLiked) setHeart(heartSymbol());
                    setEllipsis(ellipsisSymbol());
                }}
                onMouseLeave={() => {
                    setIsOver(false);
                    setNumberPlay(numOrDisc);
                    if (!isLiked && !selected) setHeart("");
                    if (!selected) setEllipsis(invisibleEllipsisSymbol());
                }}>
                <td style={{color: "#FFFFFF"}} onClick={handleTrackClick}>
                    {isOver ? numberPlay : numOrDisc}
                </td>
                <td>
                    <div className="playlistImageColumn">
                            <img src={song.imageUrl}></img>
                        <ul>
                            <li style={{color: "#FFFFFF"}}>{song.title}</li>
                            <li><Link to={`/artists/${song.artistId}`}>{song.artistName}</Link></li>
                        </ul>
                    </div>
                </td>
                <td hidden={ rowWidth < 500 ? "hidden" : ""} ><Link to={`/albums/${song.albumId}`}>{song.albumTitle}</Link></td>
                <td hidden={ rowWidth < 710 ? "hidden" : ""} >
                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format((new Date(song.createdAt)))}</td>
                <td onClick={handleLikeClick}>{heart}</td>
                <td>{formatTime(song.length)}</td>
                <td ref={ellipsisRef}  onClick={(e) => {
                        setHiddenUlHidden(!hiddenUlHidden);
                        if(selected) e.stopPropagation();
                    }}>{ellipsis}{ hiddenUlHidden ? "" : hiddenUl()}</td>
            </tr>
        )}
        {song.id && song.id === currentSong?.id && (
            <tr ref={tableRowRef}
                className={selected ? ("selectedTrack") : ("")}
                onClick={handleSelectionClick}
                onMouseOver={() => {
                    const audio = document.querySelector("audio");
                    let actionSymbol = pauseSymbol
                    if (audio?.paused) {
                        actionSymbol = playSymbol
                    }
                    setIsOver(true);
                    setNumberPlay(actionSymbol());
                    if (!isLiked) setHeart(heartSymbol());
                    setEllipsis(ellipsisSymbol());
                }}
                onMouseLeave={() => {
                    setIsOver(false);
                    setNumberPlay(numOrDisc);
                    if (!isLiked && !selected) setHeart("");
                    if (!selected) setEllipsis(invisibleEllipsisSymbol());
                }}>
                <td style={{color: "#1ED760"}} onClick={() => {
                        document.querySelector(".playPause").click()
                    }}>{isOver ? numberPlay : numOrDisc}</td>
                <td>
                    <div className="playlistImageColumn">
                        <img src={song.imageUrl}></img>
                    <ul>
                        <li style={{color: "#1ED760"}}>{song.title}</li>
                        <li><Link to={`/artists/${song.artistId}`}>{song.artistName}</Link></li>
                    </ul>
                    </div>
                </td>
                <td hidden={ rowWidth < 500 ? "hidden" : ""} ><Link to={`/albums/${song.albumId}`}>{song.albumTitle}</Link></td>
                <td hidden={ rowWidth < 710 ? "hidden" : ""} >
{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format((new Date(song.createdAt)))}</td>
                <td onClick={handleLikeClick}>{heart}</td>
                <td>{formatTime(song.length)}</td>
                <td ref={ellipsisRef} onClick={(e) => {
                        setHiddenUlHidden(!hiddenUlHidden);
                        if(selected) e.stopPropagation();
                }}>{ellipsis}{ hiddenUlHidden ? "" : hiddenUl()}</td>
            </tr>
        )}
        </>
    )
}
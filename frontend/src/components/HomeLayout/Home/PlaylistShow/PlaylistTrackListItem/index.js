

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



export default function PlaylistTrackListItem({song,songsForQueue,songsForReverseQueue,playlist,userPlaylists,setSongsUpdated,songsUpdated,selectedTracks,lastClickedTrack,setLastClickedTrack,whatIsDragging,setWhatIsDragging,shiftPressed,ctrlPressed,setUpdateSongNumbers,currentSong}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const [numberPlay, setNumberPlay] = useState(song.songNumber);
    const [heart, setHeart] = useState("");
    const [isLiked,setIsLiked] = useState(false);
    const [ellipsis,setEllipsis] = useState(invisibleEllipsisSymbol());
    const sessionUser = useSelector(state => state.session.user);
    // const [greenText,setGreenText] = useState({color: "#FFFFFF"});
    // const [currentSong, setCurrentSong] = useState(sessionUser?.queue?.[0]?.[0]);
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

    const [greenBorder,setGreenBorder] = useState(null);
    const [isDragging,setIsDragging] = useState(false);


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
        if (song.id === currentSong?.song?.id) {
            currentSong.isPlaying ? setNumOrDisc(spinningDiscSymbol()) : setNumOrDisc(song.songNumber)
        } else {
            setNumOrDisc(song.songNumber)
        }
    }, [currentSong?.song,currentSong?.isPlaying,song?.songNumber])

    useEffect(() => {
        if (lastClickedTrack?.clickedTrack !== song.id) {
            setHiddenUlHidden(true);
            setEllipsis(invisibleEllipsisSymbol())
            if (!isLiked) setHeart("")
        }
    },[lastClickedTrack])

    useEffect(() => {
        if (song.id === currentSong?.song?.id) {
            setIsCurrentSong(true)
        } else {
            setIsCurrentSong(false)
        }
    }, [sessionUser?.queue?.[0]?.[0]])

    const colorTextStyle = {
        color: isCurrentSong ? "#1ED760" : "#FFFFFF"
    }

    useEffect(() => {}, [hiddenUlHidden])

    const handleTrackClick = (e) => {
        e.stopPropagation()
        if (sessionUser) {
            if (song.id !== currentSong?.song?.id) {
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
        const pSongId = song.id
        setLastClickedTrack({clickedTrack: pSongId,clickBoolean: !lastClickedTrack.clickBoolean})
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

    const trGridTemplate = (width) => {
        if (width >= 710) {
            return {gridTemplateColumns: ".5fr 6fr 5fr 5fr .5fr 1fr .35fr"}
        }
        else if (width >= 500) {
            return {gridTemplateColumns: ".5fr 6fr 5fr .5fr 1fr .35fr"}
        }
        else {
            return {gridTemplateColumns: ".5fr 6fr .5fr 1fr .35fr"}
        }
    }
    const invisibleImageUrl = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";


    const handleTrackDragStart = (e) => {
        if (!selectedTracks?.[song.id]) tableRowRef.current.click()
        setIsDragging(true);
        tableRowRef.current.style.cursor = 'copy'
        const selectedTrackIds = Object.values(selectedTracks).some(el => el) ? Object.keys(selectedTracks).filter(trackId => selectedTracks[trackId] === true).map(trackId => parseInt(trackId)) : [song.id]
        setWhatIsDragging({draggedThings: 'playlistSongs', playlistSongIds: selectedTrackIds, xPos: e.clientX, yPos: e.clientY});
        const dragImage = new Image();
        dragImage.src = invisibleImageUrl;    
        e.dataTransfer.setDragImage(dragImage, 0, 0);
    }

    const handleTrackDrag = (e) => {
        e.preventDefault();
        if (!(tableRowRef.current.style.cursor === 'copy')) tableRowRef.current.style.cursor = 'copy'
        if (e.clientX !== 0 && e.clientY !== 0) {
            if (whatIsDragging?.draggedThings === 'playlistSongs') {
                setWhatIsDragging({...whatIsDragging, xPos: e.clientX, yPos: e.clientY})
            } else {
                const selectedTrackIds = Object.values(selectedTracks).some(el => el) ? Object.keys(selectedTracks).filter(trackId => selectedTracks[trackId] === true).map(trackId => parseInt(trackId)) : [song.id]
                setWhatIsDragging({draggedThings: 'playlistSongs', playlistSongIds: selectedTrackIds, xPos: e.clientX, yPos: e.clientY});
            }
        }
    }

    const handleTrackDragEnd = (e) => {
        setIsDragging(false);
        tableRowRef.current.style.cursor = 'auto'
        setWhatIsDragging({draggedThings: null, xPos: null, yPos: null});
    }

    useEffect(() => {
        if (sessionUser && sessionUser.id === playlist.userId) {
            if (whatIsDragging?.draggedThings) {
                if (whatIsDragging.draggedThings === 'playlistSongs' || whatIsDragging.draggedThings === 'albumSongs' ) {
                    const xPos = whatIsDragging.xPos
                    const yPos = whatIsDragging.yPos
                    const rect = tableRowRef.current.getBoundingClientRect();
                    const trackMiddle = (rect.top + rect.bottom) / 2
                    if (xPos >= rect.left && xPos <= rect.right) {                  
                        if (yPos > rect.top && yPos <= rect.bottom) {
                            if (yPos <= trackMiddle) {
                                setGreenBorder('greenBorderTop')
                            }
                            if (yPos > trackMiddle) {
                                setGreenBorder('greenBorderBottom')
                            }
                        } else {
                            if (greenBorder) setGreenBorder(null)
                        }
                    } else {
                        if (greenBorder) setGreenBorder(null)
                    }
                }
            } else if (whatIsDragging && whatIsDragging?.draggedThings === null) {
                if (greenBorder && greenBorder === 'greenBorderTop') {
                    setUpdateSongNumbers({aboveOrBelow: 'above', songNumber: song.songNumber})
                } else if (greenBorder && greenBorder === 'greenBorderBottom') {
                    setUpdateSongNumbers({aboveOrBelow: 'below', songNumber: song.songNumber})
                }
                setGreenBorder(null)
            }
        }
    },[whatIsDragging])


    useEffect(() => {
        if (sessionUser && song && currentSong?.song?.id === song.id) {
            sessionUser.reverseQueue = [...songsForReverseQueue]
            sessionUser.queue = [sessionUser.queue[0]].concat([...songsForQueue].slice(1))
        }
    }, [songsForQueue,songsForReverseQueue])


    useEffect(() => {
        if (isOver) {
            if (currentSong?.song?.id === song.id && currentSong?.isPlaying) {
                setNumberPlay(pauseSymbol())
            } else {
                setNumberPlay(playSymbol());
            }
            if (!isLiked) setHeart(heartSymbol());
            setEllipsis(ellipsisSymbol());
        }
        else {
            setNumberPlay(numOrDisc);
            if (!isLiked && !selectedTracks?.[song.id]) setHeart("");
            if (!selectedTracks?.[song.id]) setEllipsis(invisibleEllipsisSymbol());
        }
    },[isOver,currentSong?.song?.id === song.id, currentSong?.song?.id === song.id && currentSong?.isPlaying])

    return (
        <>
            <tr style={trGridTemplate(rowWidth)}
                draggable={!shiftPressed && !ctrlPressed ? "true" : "false"}
                ref={tableRowRef}
                className={selectedTracks?.[song.id] ? (`selectedTrack ${greenBorder ? greenBorder : ""} ${isDragging ? "dragging" : ""}`) : (`${greenBorder ? greenBorder : ""} ${isDragging ? "dragging" : ""}`)}
                onClick={handleSelectionClick}
                onDragStart={handleTrackDragStart}
                onDrag={handleTrackDrag}
                onDragEnd={handleTrackDragEnd}
                onMouseOver={() => {
                    setIsOver(true);
                }}
                onMouseLeave={() => {
                    setIsOver(false);
                }}>
                <td style={{color: song.id === currentSong?.song?.id ? "#1ED760" : "#FFFFFF"}} onClick={handleTrackClick}>
                    {isOver ? numberPlay : numOrDisc}
                </td>
                <td className="playlistImageColumnColumn">
                    <div className="playlistImageColumn">
                            <img src={song.imageUrl}></img>
                        <ul>
                            <li style={{color: song.id === currentSong?.song?.id ? "#1ED760" : "#FFFFFF"}}>{song.title}</li>
                            <li><Link to={`/artists/${song.artistId}`}>{song.artistName}</Link></li>
                        </ul>
                    </div>
                </td>
                <td hidden={ rowWidth < 500 ? "hidden" : ""} ><Link to={`/albums/${song.albumId}`}>{song.albumTitle}</Link></td>
                <td hidden={ rowWidth < 710 ? "hidden" : ""} >
                {song?.createdAt && new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format((new Date(song.createdAt)))}</td>
                <td onClick={handleLikeClick}>{heart}</td>
                <td>{formatTime(song.length)}</td>
                <td ref={ellipsisRef}  onClick={(e) => {
                        setHiddenUlHidden(!hiddenUlHidden);
                        // if(selectedTracks?.[song.id]) e.stopPropagation();
                    }}>{ellipsis}{ hiddenUlHidden ? "" : hiddenUl()}</td>
            </tr>
        </>
    )
}
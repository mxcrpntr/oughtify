import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { formatTime } from "../../ArtistShow";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylistSong } from "../../../../../store/playlistSongs";


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
export const invisibleEllipsisSymbol = () => {
    return <i class="fa-solid fa-ellipsis" style={{opacity: 0}}></i>;
}

export default function TrackListItem({song,artist,songsForQueue,songsForReverseQueue,whatIsDragging,setWhatIsDragging,currentSong,shiftPressed,ctrlPressed,selectedTracks,lastClickedTrack,setLastClickedTrack,userPlaylists}) {
    const [numberPlay, setNumberPlay] = useState(song.number);
    const [heart, setHeart] = useState("");
    const [ellipsis,setEllipsis] = useState(invisibleEllipsisSymbol());
    const sessionUser = useSelector(state => state.session.user);
    const [greenText,setGreenText] = useState({color: "#FFFFFF"});
    const [isLiked,setIsLiked] = useState(false);
    const [isCurrentSong, setIsCurrentSong] = useState(false);
    const [hiddenUlHidden, setHiddenUlHidden] = useState(true);
    const [hiddenPlaylistUlHidden, setHiddenPlaylistUlHidden] = useState(true);
    const [isPlaying,setIsPlaying] = useState(!document.querySelector("audio")?.paused)
    const [numOrDisc, setNumOrDisc] = useState(song.number)
    const [isOver,setIsOver] = useState(false)

    const [rowWidth,setRowWidth] = useState();

    const tableRowRef = useRef();
    const hiddenUlRef = useRef();
    const ellipsisRef = useRef();

    const [isDragging,setIsDragging] = useState(false);

    const history = useHistory()

    const [userPlaylistId, setUserPlaylistId] = useState(0);

    const dispatch = useDispatch()

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

    useEffect(() => {
        if (song.id === currentSong?.song?.id) {
            currentSong.isPlaying ? setNumOrDisc(spinningDiscSymbol()) : setNumOrDisc(song.number)
        } else {
            setNumOrDisc(song.number)
        }
    }, [currentSong?.song,currentSong?.isPlaying])

    useEffect(() => {
        if (lastClickedTrack?.clickedTrack !== song.id) {
            setHiddenUlHidden(true);
            setEllipsis(invisibleEllipsisSymbol())
            if (!isLiked) setHeart("")
        }
    },[lastClickedTrack])

    // useEffect(() => {
    //     const audio = document.querySelector("audio");
    //     currentSong = sessionUser?.queue?.[0]?.[0]
    //     if (song.id === currentSong?.id) {
    //         setGreenText({color: "#1ED760"})
    //     } else {
    //         setGreenText({color: "#FFFFFF"})
    //     }
    // }, [sessionUser?.queue?.[0]])

    useEffect(() => {
        // setCurrentSong(sessionUser?.queue?.[0]?.[0])
        if (song.id === currentSong?.song?.id) {
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
        const songId = song.id
        setLastClickedTrack({clickedTrack: songId,clickBoolean: !lastClickedTrack.clickBoolean})
        if (ellipsisRef?.current && ellipsisRef.current.contains(e.target)) {
            setHiddenUlHidden(!hiddenUlHidden);
        }
    }

    // const displayNumberPlay = () => {
    //     if (song.id === currentSong?.id) {
    //         const audio = document.querySelector("audio");
    //         if (audio.paused) {
    //             return numberPlay;
    //         } else {
    //             return spinningDiscSymbol();
    //         }
    //     } else {
    //         return numberPlay;
    //     }
    // }

    // const hiddenUl = () => {
    //     return (
    //         <ul className="hiddenUl">
    //             <li>Add to queue</li>
    //             <hr />
    //             <li>Go to artist</li>
    //             <li>Go to album</li>
    //             <hr />
    //             <li>Remove from this playlist</li>
    //             <li>Add to playlist</li>
    //         </ul>
    //     )
    // }

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
            dispatch(createPlaylistSong({playlist_song: {playlist_id: userPlaylistId, song_id: song.id}}))
            setUserPlaylistId(0)
        }
    },[userPlaylistId])

    const hiddenUl = () => {
        return (
            <ul className="hiddenUl" ref={hiddenUlRef}>
                <li className="barUnder" onClick={() => {sessionUser.queue.push([song,0])}}><span className="hiddenUlSpan1"><i class="fa-solid fa-list" style={{"fontSize": "16px"}}></i> <span>Add to queue</span></span></li>
                <li onClick={()=> {history.push(`/artists/${song.artistId}`)}} className="barUnder"><span className="hiddenUlSpan1"><i class="fa-solid fa-user-astronaut" style={{"fontSize": "16px"}}></i> <span>Go to artist</span></span></li>
                <li onMouseOver={() => {setHiddenPlaylistUlHidden(false)}}
                    onMouseLeave={() => {setHiddenPlaylistUlHidden(true)}}><span className="hiddenUlSpan1"><i class="fa-solid fa-plus" style={{"fontSize": "16px"}}></i> <span>Add to playlist</span></span>
                    {!hiddenPlaylistUlHidden && (hiddenPlaylistUl())}
                </li>
            </ul>
        )
    }

    // const trGridTemplate = (width) => {
    //     if (width >= 710) {
    //         return {gridTemplateColumns: ".5fr 6fr 5fr 5fr .5fr 1fr .35fr"}
    //     }
    //     else if (width >= 500) {
    //         return {gridTemplateColumns: ".5fr 6fr 5fr .5fr 1fr .35fr"}
    //     }
    //     else {
    //         return {gridTemplateColumns: ".5fr 6fr .5fr 1fr .35fr"}
    //     }
    // }
    const invisibleImageUrl = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

    const handleTrackDragStart = (e) => {
        if (!selectedTracks?.[song.id]) tableRowRef.current.click()
        setIsDragging(true);
        tableRowRef.current.style.cursor = 'copy'
        const selectedTrackIds = Object.values(selectedTracks).some(el => el) ? Object.keys(selectedTracks).filter(trackId => selectedTracks[trackId] === true).map(trackId => parseInt(trackId)) : [song.id]
        setWhatIsDragging({draggedThings: 'albumSongs', albumSongIds: selectedTrackIds, xPos: e.clientX, yPos: e.clientY});
        const dragImage = new Image();
        dragImage.src = invisibleImageUrl;    
        e.dataTransfer.setDragImage(dragImage, 0, 0);
    }

    const handleTrackDrag = (e) => {
        e.preventDefault();
        if (!(tableRowRef.current.style.cursor === 'copy')) tableRowRef.current.style.cursor = 'copy'
        if (e.clientX !== 0 && e.clientY !== 0) {
            if (whatIsDragging?.draggedThings === 'albumSongs') {
                setWhatIsDragging({...whatIsDragging, xPos: e.clientX, yPos: e.clientY})
            } else {
                const selectedTrackIds = Object.values(selectedTracks).some(el => el) ? Object.keys(selectedTracks).filter(trackId => selectedTracks[trackId] === true).map(trackId => parseInt(trackId)) : [song.id]
                setWhatIsDragging({draggedThings: 'albumSongs', albumSongIds: selectedTrackIds, xPos: e.clientX, yPos: e.clientY});
            }
        }
    }


    const handleTrackDragEnd = (e) => {
        setIsDragging(false);
        tableRowRef.current.style.cursor = 'auto'
        setWhatIsDragging({draggedThings: null, xPos: null, yPos: null});
    }

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
            <tr
                ref={tableRowRef}
                draggable={!shiftPressed && !ctrlPressed ? "true" : "false"}
                className={selectedTracks?.[song.id] ? (`selectedTrack ${isDragging ? "dragging" : ""}`) : (`${isDragging ? "dragging" : ""}`)}
                onMouseOver={() => {
                    setIsOver(true);
                }}
                onMouseLeave={() => {
                    setIsOver(false);
                }}
                onClick={handleSelectionClick}
                onDragStart={handleTrackDragStart}
                onDrag={handleTrackDrag}
                onDragEnd={handleTrackDragEnd}>
                <td style={{color: song.id === currentSong?.song?.id ? "#1ED760" : "#FFFFFF"}} onClick={handleTrackClick}>
                    {isOver ? numberPlay : numOrDisc}
                </td>
                <td>
                    <ul>
                        <li style={{color: song.id === currentSong?.song?.id ? "#1ED760" : "#FFFFFF"}}>{song.title}</li>
                        <li><Link to={`/artists/${artist.id}`}>{artist.name}</Link></li>
                    </ul>
                </td>
                <td onClick={handleLikeClick}>{heart}</td>
                <td>{formatTime(song.length)}</td>
                <td ref={ellipsisRef}  onClick={(e) => {
                        setHiddenUlHidden(!hiddenUlHidden);
                    }}>{ellipsis}{ hiddenUlHidden ? "" : hiddenUl()}</td>            </tr>
    )
}
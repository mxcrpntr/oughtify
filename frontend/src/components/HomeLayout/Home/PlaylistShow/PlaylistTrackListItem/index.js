

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { formatTime } from "../../ArtistShow";


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



export default function PlaylistTrackListItem({song,songsForQueue}) {
    const [numberPlay, setNumberPlay] = useState(song.songNumber);
    const [heart, setHeart] = useState("");
    const [isLiked,setIsLiked] = useState(false);
    const [ellipsis,setEllipsis] = useState(invisibleEllipsisSymbol());
    const sessionUser = useSelector(state => state.session.user);
    // const [greenText,setGreenText] = useState({color: "#FFFFFF"});
    const [currentSong, setCurrentSong] = useState(sessionUser?.queue?.[0]?.[0]);
    const [isCurrentSong, setIsCurrentSong] = useState(false);
    const [hiddenUlHidden, setHiddenUlHidden] = useState(true);
    const [isPlaying,setIsPlaying] = useState(!document.querySelector("audio")?.paused)
    const [numOrDisc, setNumOrDisc] = useState(song.songNumber)
    const [isOver,setIsOver] = useState(false)


    const [rowWidth,setRowWidth] = useState();

    const tableRowRef = useRef();

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

    const handleTrackClick = () => {
        if (sessionUser) {
            if (song.id !== currentSong?.id) {
                sessionUser.queue = [...songsForQueue];
                const audio = document.querySelector("audio");
                audio.currentTime = sessionUser.queue?.[0]?.[1] ? sessionUser.queue[0][1] : 0;
            }
            document.querySelector(".playPause").click()
        }
    }

    const handleLikeClick = () => {
        if (sessionUser) {
            if (!isLiked) setHeart(heartSymbolFilled());
            else setHeart(heartSymbol());
            setIsLiked(!isLiked);
        }
    }

    const hiddenUl = () => {
        return (
            <ul className="hiddenUl">
                <li>Add to queue</li>
                <hr />
                <li>Go to artist</li>
                <li>Go to album</li>
                <hr />
                <li>Remove from this playlist</li>
                <li>Add to playlist</li>
            </ul>
        )
    }


    return (
        <>
        { song.id !== currentSong?.id && (
            <tr ref={tableRowRef}
                onMouseOver={() => {
                    setIsOver(true);
                    setNumberPlay(playSymbol());
                    if (!isLiked) setHeart(heartSymbol());
                    setEllipsis(ellipsisSymbol());
                }}
                onMouseLeave={() => {
                    setIsOver(false);
                    setNumberPlay(numOrDisc);
                    if (!isLiked) setHeart("");
                    setEllipsis(invisibleEllipsisSymbol());
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
                <td onClick={() => {setHiddenUlHidden(!hiddenUlHidden)}}>{ellipsis}{ hiddenUlHidden ? "" : hiddenUl()}</td>
            </tr>
        )}
        {song.id === currentSong?.id && (
            <tr ref={tableRowRef}
                onMouseOver={() => {
                    const audio = document.querySelector("audio");
                    let actionSymbol = pauseSymbol
                    if (audio?.paused) {
                        actionSymbol = playSymbol
                    }
                    setIsOver(true);
                    setNumberPlay(actionSymbol());
                    setHeart(heartSymbol());
                    setEllipsis(ellipsisSymbol());
                }}
                onMouseLeave={() => {
                    setIsOver(false);
                    setNumberPlay(numOrDisc);
                    if (!isLiked) setHeart("");
                    setEllipsis(invisibleEllipsisSymbol());
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
                <td>{ellipsis}</td>
            </tr>
        )}
        </>
    )
}
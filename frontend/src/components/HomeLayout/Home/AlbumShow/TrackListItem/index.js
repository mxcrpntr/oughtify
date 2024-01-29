import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { formatTime } from "../../ArtistShow";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


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

export default function TrackListItem({song,artist,songsForQueue,songsForReverseQueue}) {
    const [numberPlay, setNumberPlay] = useState(song.number);
    const [heart, setHeart] = useState("");
    const [ellipsis,setEllipsis] = useState(invisibleEllipsisSymbol());
    const sessionUser = useSelector(state => state.session.user);
    const [greenText,setGreenText] = useState({color: "#FFFFFF"});
    const [isLiked,setIsLiked] = useState(false);
    const [currentSong, setCurrentSong] = useState(sessionUser?.queue?.[0]?.[0]);
    const [isCurrentSong, setIsCurrentSong] = useState(false);
    const [hiddenUlHidden, setHiddenUlHidden] = useState(true);
    const [isPlaying,setIsPlaying] = useState(!document.querySelector("audio")?.paused)
    const [numOrDisc, setNumOrDisc] = useState(song.number)
    const [isOver,setIsOver] = useState(false)

    // let currentSong = sessionUser?.queue?.[0]?.[0]

    useEffect(() => {
        const audio = document.querySelector("audio");
        if (audio) {
            const handleAudioChange = (e) => {
                setIsPlaying(!audio.paused)
                setCurrentSong(sessionUser?.queue?.[0]?.[0])
                if (song.id === sessionUser?.queue?.[0]?.[0]?.id) {
                    !audio.paused ? setNumOrDisc(spinningDiscSymbol()) : setNumOrDisc(song.number)
                } else {
                    setNumOrDisc(song.number)
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
        setCurrentSong(sessionUser?.queue?.[0]?.[0])
        if (song.id === currentSong?.id) {
            setIsCurrentSong(true)
        } else {
            setIsCurrentSong(false)
        }
    }, [sessionUser?.queue?.[0]?.[0],document.querySelector("audio")?.paused])


    const handleTrackClick = () => {
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

    const handleLikeClick = () => {
        if (sessionUser) {
            if (!isLiked) setHeart(heartSymbolFilled());
            else setHeart(heartSymbol());
            setIsLiked(!isLiked);
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
            <tr
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
                    <ul>
                        <li style={{color: "#FFFFFF"}}>{song.title}</li>
                        <li><Link to={`/artists/${artist.id}`}>{artist.name}</Link></li>
                    </ul>
                </td>
                <td onClick={handleLikeClick}>{heart}</td>
                <td>{formatTime(song.length)}</td>
                <td>{ellipsis}</td>
            </tr>
        )}
        {song.id === currentSong?.id && (
            <tr
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
                    if (!isLiked) setHeart("");
                    setEllipsis(invisibleEllipsisSymbol());
                }}>
                <td style={{color: "#1ED760"}} onClick={() => {
                        document.querySelector(".playPause").click()
                    }}>{isOver ? numberPlay : numOrDisc}</td>
                <td>
                    <ul>
                        <li style={{color: "#1ED760"}}>{song.title}</li>
                        <li><Link to={`/artists/${artist.id}`}>{artist.name}</Link></li>
                    </ul>
                </td>
                <td onClick={handleLikeClick}>{heart}</td>
                <td>{formatTime(song.length)}</td>
                <td>{ellipsis}</td>
            </tr>
        )}
        </>
    )
}
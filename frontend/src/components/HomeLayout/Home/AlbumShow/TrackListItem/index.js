import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { formatTime } from "../../ArtistShow";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const playSymbol = () => {
    return <i class="fa-solid fa-play" style={{color: "#FFFFFF"}}></i>;
}
const heartSymbol = () => {
    return <Link to="/"><i class="fa-regular fa-heart" style={{fontSize: "16px"}}></i></Link>;
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

export default function TrackListItem({song,artist,songsForQueue}) {
    const [numberPlay, setNumberPlay] = useState(song.number);
    const [heart, setHeart] = useState("");
    const [ellipsis,setEllipsis] = useState(invisibleEllipsisSymbol());
    const sessionUser = useSelector(state => state.session.user);
    const [greenText,setGreenText] = useState({color: "#FFFFFF"});

    let currentSong = sessionUser?.queue?.[0]?.[0]

    useEffect(() => {
        const audio = document.querySelector("audio");
        currentSong = sessionUser?.queue?.[0]?.[0]
        if (song.id === currentSong?.id) {
            setGreenText({color: "#1ED760"})
        } else {
            setGreenText({color: "#FFFFFF"})
        }
    }, [sessionUser?.queue?.[0]])

    const handleTrackClick = () => {
        if (sessionUser) {
            if (song.id !== currentSong?.id) {
                sessionUser.queue = songsForQueue;
                const audio = document.querySelector("audio");
                audio.currentTime = sessionUser.queue?.[0]?.[1] ? sessionUser.queue[0][1] : 0;
            }
            document.querySelector(".playPause").click()
        }
    }

    const displayNumberPlay = () => {
        if (song.id === currentSong?.id) {
            const audio = document.querySelector("audio");
            if (audio.paused) {
                return numberPlay;
            } else {
                return spinningDiscSymbol();
            }
        } else {
            return numberPlay;
        }
    }

    return (
        <>
        { song.id !== currentSong?.id && (
            <tr
                onMouseEnter={() => {
                    setNumberPlay(playSymbol());
                    setHeart(heartSymbol());
                    setEllipsis(ellipsisSymbol());
                }}
                onMouseLeave={() => {
                    setNumberPlay(song.number);
                    setHeart("");
                    setEllipsis(invisibleEllipsisSymbol());
                }}>
                <td style={greenText} onClick={handleTrackClick}>
                    {numberPlay}
                </td>
                <td>
                    <ul>
                        <li style={greenText}>{song.title}</li>
                        <li><Link to={`/artists/${artist.id}`}>{artist.name}</Link></li>
                    </ul>
                </td>
                <td>{heart}</td>
                <td>{formatTime(song.length)}</td>
                <td>{ellipsis}</td>
            </tr>
        )}
        {song.id === currentSong?.id && (
            <tr
                onMouseEnter={() => {
                    setNumberPlay(pauseSymbol());
                    setHeart(heartSymbol());
                    setEllipsis(ellipsisSymbol());
                }}
                onMouseLeave={() => {
                    setNumberPlay(spinningDiscSymbol());
                    setHeart("");
                    setEllipsis(invisibleEllipsisSymbol());
                }}>
                <td style={greenText} onClick={() => {
                        document.querySelector(".playPause").click()
                    }}>{numberPlay}</td>
                <td>
                    <ul>
                        <li style={greenText}>{song.title}</li>
                        <li><Link to={`/artists/${artist.id}`}>{artist.name}</Link></li>
                    </ul>
                </td>
                <td>{heart}</td>
                <td>{formatTime(song.length)}</td>
                <td>{ellipsis}</td>
            </tr>
        )}
        </>
    )
}
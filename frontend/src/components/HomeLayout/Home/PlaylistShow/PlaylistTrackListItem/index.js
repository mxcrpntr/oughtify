

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { formatTime } from "../../ArtistShow";


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
const invisibleEllipsisSymbol = () => {
    return <i class="fa-solid fa-ellipsis" style={{opacity: 0}}></i>;
}



export default function PlaylistTrackListItem({song,songsForQueue}) {
    const [numberPlay, setNumberPlay] = useState(song.songNumber);
    const [heart, setHeart] = useState("");
    const [ellipsis,setEllipsis] = useState(invisibleEllipsisSymbol());
    const sessionUser = useSelector(state => state.session.user);
    const [greenText,setGreenText] = useState({color: "#FFFFFF"});
    const [hiddenUlHidden, setHiddenUlHidden] = useState(true);



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

    useEffect(() => {}, [hiddenUlHidden])

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


    return (
        <>
        { song.id !== currentSong?.id && (
            <tr ref={tableRowRef}
                onMouseEnter={() => {
                    setNumberPlay(playSymbol());
                    setHeart(heartSymbol());
                    setEllipsis(ellipsisSymbol());
                }}
                onMouseLeave={() => {
                    setNumberPlay(song.songNumber);
                    setHeart("");
                    setEllipsis(invisibleEllipsisSymbol());
                }}>
                <td style={greenText} onClick={handleTrackClick}>
                    {numberPlay}
                </td>
                <td>
                    <div className="playlistImageColumn">
                            <img src={song.imageUrl}></img>
                        <ul>
                            <li style={greenText}>{song.title}</li>
                            <li><Link to={`/artists/${song.artistId}`}>{song.artistName}</Link></li>
                        </ul>
                    </div>
                </td>
                <td hidden={ rowWidth < 500 ? "hidden" : ""} ><Link to={`/albums/${song.albumId}`}>{song.albumTitle}</Link></td>
                <td hidden={ rowWidth < 710 ? "hidden" : ""} >
{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format((new Date(song.createdAt)))}</td>
                <td>{heart}</td>
                <td>{formatTime(song.length)}</td>
                <td onClick={() => {setHiddenUlHidden(!hiddenUlHidden)}}>{ellipsis}{ hiddenUlHidden ? "" : hiddenUl()}</td>
            </tr>
        )}
        {song.id === currentSong?.id && (
            <tr ref={tableRowRef}
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
                    <div className="playlistImageColumn">
                        <img src={song.imageUrl}></img>
                    <ul>
                        <li style={greenText}>{song.title}</li>
                        <li><Link to={`/artists/${song.artistId}`}>{song.artistName}</Link></li>
                    </ul>
                    </div>
                </td>
                <td hidden={ rowWidth < 500 ? "hidden" : ""} ><Link to={`/albums/${song.albumId}`}>{song.albumTitle}</Link></td>
                <td hidden={ rowWidth < 710 ? "hidden" : ""} >
{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format((new Date(song.createdAt)))}</td>
                <td>{heart}</td>
                <td>{formatTime(song.length)}</td>
                <td>{ellipsis}</td>
            </tr>
        )}
        </>
    )
}
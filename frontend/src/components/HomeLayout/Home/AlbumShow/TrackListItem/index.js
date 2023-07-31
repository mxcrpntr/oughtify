import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { formatTime } from "../../ArtistShow";
import { useState } from "react";


const playSymbol = () => {
    return <i class="fa-solid fa-play" style={{color: "#FFFFFF"}}></i>;
}
const heartSymbol = () => {
    return <Link to="/"><i class="fa-regular fa-heart" style={{"font-size": "16px"}}></i></Link>;
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

export default function TrackListItem({song,artist}) {
    const [numberPlay, setNumberPlay] = useState(song.number);
    const [heart, setHeart] = useState("");
    const [ellipsis,setEllipsis] = useState("");



    return (
        <>
        { song.id !== 1 && (
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
                <td>{numberPlay}</td>
                <td>
                    <ul>
                        <li>{song.title}</li>
                        <li><Link to={`/artists/${artist.id}`}>{artist.name}</Link></li>
                    </ul>
                </td>
                <td>{heart}</td>
                <td>{formatTime(song.length)}</td>
                <td>{ellipsis}</td>
            </tr>
        )}
        {song.id === 1 && (
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
                <td style={{color: "#1ED760"}}>{numberPlay}</td>
                <td>
                    <ul>
                        <li style={{"font-family": "CircularSpotifyBook","font-size": "16px", color: "#1ED760"}}>{song.title}</li>
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
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { formatTime } from "../../ArtistShow";
import { useState } from "react";

export default function TrackListItem({song,artist}) {
    const [numberPlay, setNumberPlay] = useState(song.number);
    const [heart, setHeart] = useState("");

    const playSymbol = () => {
        return <i class="fa-solid fa-play"></i>;
    }
    const heartSymbol = () => {
        return <i class="fa-regular fa-heart"></i>;
    }

    return (
        <tr
            onMouseEnter={() => {
                setNumberPlay(playSymbol());
                setHeart(heartSymbol());
            }}
            onMouseLeave={() => {
                setNumberPlay(song.number);
                setHeart("");
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
        </tr>
    )
}
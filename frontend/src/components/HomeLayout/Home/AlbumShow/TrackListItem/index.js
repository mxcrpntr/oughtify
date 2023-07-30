import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { formatTime } from "../../ArtistShow";
import { useState } from "react";

export default function TrackListItem({song,artist}) {
    const [numberPlay, setNumberPlay] = useState(song.number);

    const playSymbol = () => {
        return <i class="fa-solid fa-play"></i>;
    }

    return (
        <tr
            onMouseEnter={() => setNumberPlay(playSymbol())}
            onMouseLeave={() => setNumberPlay(song.number)}>
            <td>{numberPlay}</td>
            <td>
                <ul>
                    <li>{song.title}</li>
                    <li><Link to={`/artists/${artist.id}`}>{artist.name}</Link></li>
                </ul>
            </td>
            <td>{formatTime(song.length)}</td>
        </tr>
    )
}
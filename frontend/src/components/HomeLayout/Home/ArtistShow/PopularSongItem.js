import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { formatTime } from ".";


export default function PopularSongItem({i,songs,albums}) {

    return (
        <tr>
            <td className='col1'>{i}</td>
            <td className='col2'> <img src={albums[songs?.[i]?.albumId]?.imageUrl}></img></td>
            <td className='col3'><Link to={`/albums/${songs?.[i]?.albumId}`}>{songs?.[i]?.title}</Link></td>
            <td className='col4'>{songs?.[i]?.plays}</td>
            <td className='col5'>{songs?.[i]?.length ? formatTime(songs[i].length) : '0:00'}</td>
        </tr>
    )
}
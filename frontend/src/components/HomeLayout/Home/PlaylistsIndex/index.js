import { useDispatch, useSelector } from "react-redux"
import { fetchPlaylists, getPlaylists } from "../../../../store/playlists";
import { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PlaylistsIndexItem from "./PlaylistsIndexItem";
import './PlaylistsIndex.css'


export default function PlaylistsIndex({currentSong}) {
    const dispatch = useDispatch();
    const playlists = useSelector(getPlaylists);

    useEffect(() => {
        dispatch(fetchPlaylists());
    }, [])



    return (
        <>
            {playlists && (
                <>
                <h2 class="playlistGridHeader"><Link to="/home">Playlists</Link></h2>
                <div className="playlistGrid">
                    {
                    Object.values(playlists).map(playlist => {
                        return <PlaylistsIndexItem playlist={playlist} key={playlist.id} currentSong={currentSong}/>
                    })
                    }
                </div>
                </>
            )}
        </>
    )
}
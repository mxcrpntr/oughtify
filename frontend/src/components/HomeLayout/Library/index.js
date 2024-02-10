import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./Library.css"
import LibraryIndexItem from "./LibraryIndexItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylists, getPlaylists } from "../../../store/playlists";
import { useEffect } from "react";

export default function Library({whatIsDragging, setWhatIsDragging}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const playlists = useSelector(getPlaylists);

    useEffect(() => {
        dispatch(fetchPlaylists());
    },[Object.values(playlists).length])

    return (
        <div className="library">
            <ul>
                { playlists && (
                    <>
                    { [...Object.values(playlists)].sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt)).map(playlist => {
                       return <LibraryIndexItem playlist={playlist} album={null} key={playlist.id + 66600} />
                    }) }
                    </>
                )}
            </ul>
        </div>
    )
}
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./Library.css"
import LibraryIndexItem from "./LibraryIndexItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylists, getPlaylists } from "../../../store/playlists";
import { useEffect } from "react";

export default function Library() {
    const history = useHistory();
    const dispatch = useDispatch();

    const {playlists} = useSelector(getPlaylists);

    useEffect(() => {
        dispatch(fetchPlaylists());
    },[])

    return (
        <div className="library">
            <ul>
                { playlists && (
                    <>
                    { Object.values(playlists).map(playlist => {
                       return <LibraryIndexItem playlist={playlist} album={null} />
                    }) }
                    </>
                )}
               
                
                <li onClick={() => {history.push(`/albums/${1}`)}}>
                    <div className="albumImage">
                        <img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img>
                    </div>
                    <div className="albumInfo">
                        <h3>Court and Spark</h3>
                        <h4>Joni Mitchell</h4>
                    </div>
                </li>
                <li onClick={() => {history.push(`/albums/${1}`)}}>
                    <div className="albumImage">
                        <img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img>
                    </div>
                    <div className="albumInfo">
                        <h3>Court and Spark</h3>
                        <h4>Joni Mitchell</h4>
                    </div>
                </li>
                <li onClick={() => {history.push(`/albums/${1}`)}}>
                    <div className="albumImage">
                        <img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img>
                    </div>
                    <div className="albumInfo">
                        <h3>Court and Spark</h3>
                        <h4>Joni Mitchell</h4>
                    </div>
                </li>
                <li onClick={() => {history.push(`/albums/${1}`)}}>
                    <div className="albumImage">
                        <img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img>
                    </div>
                    <div className="albumInfo">
                        <h3>Court and Spark</h3>
                        <h4>Joni Mitchell</h4>
                    </div>
                </li>
                <li onClick={() => {history.push(`/albums/${1}`)}}>
                    <div className="albumImage">
                        <img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img>
                    </div>
                    <div className="albumInfo">
                        <h3>Court and Spark</h3>
                        <h4>Joni Mitchell</h4>
                    </div>
                </li>
                <li onClick={() => {history.push(`/albums/${1}`)}}>
                    <div className="albumImage">
                        <img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img>
                    </div>
                    <div className="albumInfo">
                        <h3>Court and Spark</h3>
                        <h4>Joni Mitchell</h4>
                    </div>
                </li>
            </ul>
        </div>
    )
}
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import './LibraryNavigation.css'
import { createPlaylist } from '../../../store/playlists'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";


export default function LibraryNavigation() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [newPlaylist, setNewPlaylist] = useState(false);
    const handleClick = (e) => {
        e.preventDefault();
        if (sessionUser) setNewPlaylist(true);
    }
    useEffect(() => {
        if (newPlaylist) {
            dispatch(createPlaylist({title: "Untitled Playlist",user_id: sessionUser.id,public: true,color: "#FFFFFF"}));
            setNewPlaylist(false);
            console.log("hey fucker")
        }
    }, [newPlaylist])

    return (
        <div className="libraryNavigation">
            <div className='firstLine'>
                <span>
                    <NavLink to="">
                        <span className='fa-solid'><i class="fa-solid fa-lines-leaning"></i></span>
                        <span className='yourLibrary'> Your Library</span>
                    </NavLink>
                </span>
                <span>
                    <NavLink to="" onClick={handleClick}><span className='fa-solid circle'><i class="fa-solid fa-plus"></i></span></NavLink>
                    <NavLink to=""><span className='fa-solid circle'><i class="fa-solid fa-arrow-right"></i></span></NavLink>
                </span>
            </div>
        </div>
    )
}
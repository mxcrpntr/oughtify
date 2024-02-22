import Divider from "./Divider";
import Home from "./Home";
import HomeAndSearch from "./HomeAndSearch";
import HomeNavigation from "./HomeNavigation";
import Library from "./Library";
import Playbar from "./Playbar";
import "./HomeLayout.css"
import LibraryNavigation from "./LibraryNavigation";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function HomeLayout({searching,shiftPressed,ctrlPressed,whatIsDragging,setWhatIsDragging}) {
    const sessionUser = useSelector(state => state.session.user);
    const [currentSong,setCurrentSong] = useState({song: sessionUser?.queue?.[0]?.[0], isPlaying: false})
 
    return (
        <div className="homeLayout">
            <div className="homeTop">
                <section className="left">
                    <HomeAndSearch />
                    <LibraryNavigation />
                    <Library whatIsDragging={whatIsDragging} setWhatIsDragging={setWhatIsDragging} currentSong={currentSong}/>
                </section>
                <Divider />
                <section className="right">
                    <Home searching={searching} shiftPressed={shiftPressed} ctrlPressed={ctrlPressed} whatIsDragging={whatIsDragging} setWhatIsDragging={setWhatIsDragging} currentSong={currentSong}/>
                    <HomeNavigation searching={searching} />
                </section>
            </div>
            <Playbar currentSong={currentSong} setCurrentSong={setCurrentSong} />
        </div>
    )
}
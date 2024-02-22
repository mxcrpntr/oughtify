import { Link, Route, Switch, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import "./Home.css"
import ArtistsIndex from "./ArtistsIndex";
import ArtistShow from "./ArtistShow";
import AlbumShow from "./AlbumShow";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtists, getArtist, getArtists } from "../../../store/artists";
import { getAlbum } from "../../../store/albums";
import { useEffect } from "react";
import PlaylistsIndex from "./PlaylistsIndex";
import PlaylistShow from "./PlaylistShow";
import SearchIndex from "./SearchIndex";
import WelcomeMessage from "./WelcomeMessage";

export default function Home({searching, shiftPressed, ctrlPressed, whatIsDragging, setWhatIsDragging, currentSong}) {
    const history = useHistory();


    return (
        <div className="home">
            <Switch>
                <Route path="/home">
                    <ArtistsIndex  />
                    <PlaylistsIndex currentSong={currentSong}/>
                </Route>
                <Route path="/artists/:artistId">
                    <ArtistShow shiftPressed={shiftPressed} ctrlPressed={ctrlPressed} whatIsDragging={whatIsDragging} setWhatIsDragging={setWhatIsDragging} currentSong={currentSong}/>
                </Route>
                <Route path="/albums/:albumId">
                    <AlbumShow shiftPressed={shiftPressed} ctrlPressed={ctrlPressed} whatIsDragging={whatIsDragging} setWhatIsDragging={setWhatIsDragging} currentSong={currentSong}/>
                </Route>
                <Route path="/playlists/:playlistId">
                    <PlaylistShow shiftPressed={shiftPressed} ctrlPressed={ctrlPressed} whatIsDragging={whatIsDragging} setWhatIsDragging={setWhatIsDragging} currentSong={currentSong}/>
                </Route>
                <Route path="/search">
                    <SearchIndex shiftPressed={shiftPressed} ctrlPressed={ctrlPressed} whatIsDragging={whatIsDragging} setWhatIsDragging={setWhatIsDragging} currentSong={currentSong}/>
                </Route>
                <Route path="">
                    <WelcomeMessage />
                </Route>
            </Switch>
  
        </div>
    )
}
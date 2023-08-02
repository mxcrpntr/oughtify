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

export default function Home() {
    const history = useHistory();


    return (
        <div className="home">
            <Switch>
                <Route path="/home">
                    <ArtistsIndex  />
                    <PlaylistsIndex />
                </Route>
                <Route path="/artists/:artistId">
                    <ArtistShow  />
                </Route>
                <Route path="/albums/:albumId">
                    <AlbumShow  />
                </Route>
                <Route path="/playlists/:playlistId">
                    <PlaylistShow  />
                </Route>
            </Switch>
  
        </div>
    )
}
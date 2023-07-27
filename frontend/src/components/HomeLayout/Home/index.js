import { Link, Route, Switch, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./Home.css"
import ArtistsIndex from "./ArtistsIndex";
import ArtistShow from "./ArtistShow";
import AlbumShow from "./AlbumShow";

export default function Home() {
    const history = useHistory();

    return (
        <div className="home">
            <Switch>
                <Route path="/home">
                    <ArtistsIndex />
                </Route>
                <Route path="/artists">
                    <ArtistShow />
                </Route>
                <Route path="/albums">
                    <AlbumShow />
                </Route>
            </Switch>
  
        </div>
    )
}
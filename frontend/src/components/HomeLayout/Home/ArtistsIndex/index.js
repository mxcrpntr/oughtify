import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import ArtistsIndexItem from "./ArtistsIndexItem"
import './ArtistsIndex.css'

export default function ArtistsIndex() {
    const topPadding = {
        paddingTop: `66px`,
    }


    return (
        <>
            <h2 style={topPadding}><Link to="/home">Artists</Link></h2>
            <div className="artistGrid">
                <ArtistsIndexItem />
                <ArtistsIndexItem />
                <ArtistsIndexItem />
                <ArtistsIndexItem />
                <ArtistsIndexItem />
                <ArtistsIndexItem />
                <ArtistsIndexItem />
                <ArtistsIndexItem />
                <ArtistsIndexItem />
                <ArtistsIndexItem />
                <ArtistsIndexItem />
                <ArtistsIndexItem />
            </div>
        </>
    )
}
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import ArtistsIndexItem from "./ArtistsIndexItem"
import './ArtistsIndex.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchArtists, getArtists } from "../../../../store/artists"

export default function ArtistsIndex() {

    const dispatch = useDispatch();
    const {artists} = useSelector(getArtists);
    console.log(useSelector(getArtists))

    const topPadding = {
        paddingTop: `66px`,
    }

    useEffect(() => {
        dispatch(fetchArtists());
    },[])

    return (

        <>
        {artists && (
            <>
            <h2 style={topPadding}><Link to="/home">Artists</Link></h2>
            <div className="artistGrid">
                {
                Object.values(artists).map(artist => {
                    return <ArtistsIndexItem artist={artist} />
                })
                }
            </div>
            </>
        )}
        </>
    )
}
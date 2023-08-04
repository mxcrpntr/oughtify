import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import ArtistsIndexItem from "./ArtistsIndexItem"
import './ArtistsIndex.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchArtists, getArtists } from "../../../../store/artists"

export default function ArtistsIndex() {

    const dispatch = useDispatch();
    const artists = useSelector(getArtists);

    const sessionUser = useSelector(state => state.session.user);

    const topPadding = {
        paddingTop: `66px`,
    }

    useEffect(() => {
        dispatch(fetchArtists());
    },[])

    const generateGreeting = (user) => {
        const today = new Date();
        const currentHour = today.getHours();
        if (currentHour < 12) {
            return user ? `Good morning, ${user.name}` : "Good morning"
        } else if (currentHour < 18) {
            return user ? `Good afternoon, ${user.name}` : "Good afternoon"
        } else {
            return user ? `Good evening, ${user.name}` : "Good evening"
        }
    }

    return (

        <>
            <h2 style={topPadding} className="userGreeting">{generateGreeting(sessionUser)}</h2>
        {artists && (
            <>
            <h2 style={topPadding} class="artistGridHeader"><Link to="/home">Artists</Link></h2>
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
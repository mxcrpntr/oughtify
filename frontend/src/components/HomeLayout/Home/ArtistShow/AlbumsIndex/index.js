import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import AlbumsIndexItem from "./AlbumsIndexItem"
// import './AlbumsIndex.css'

export default function AlbumsIndex() {
    // const topPadding = {
    //     paddingTop: `66px`,
    // }


    return (
        <>
            {/* <h2 style={topPadding}><Link to="">Artists</Link></h2> */}
            <div className="albumGrid">
                <AlbumsIndexItem />
                <AlbumsIndexItem />
                <AlbumsIndexItem />
                <AlbumsIndexItem />
                <AlbumsIndexItem />
                <AlbumsIndexItem />
                <AlbumsIndexItem />
                <AlbumsIndexItem />
                <AlbumsIndexItem />
                <AlbumsIndexItem />
                <AlbumsIndexItem />
            </div>
        </>
    )
}
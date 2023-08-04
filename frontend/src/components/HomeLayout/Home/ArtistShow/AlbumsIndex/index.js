import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import AlbumsIndexItem from "./AlbumsIndexItem"
// import './AlbumsIndex.css'

export default function AlbumsIndex({albums}) {
    // const topPadding = {
    //     paddingTop: `66px`,
    // }
    // if (albums) {
    //     debugger;
    // }
    


    return (
        <>
            {/* <h2 style={topPadding}><Link to="">Artists</Link></h2> */}
            {albums && (
                <div className="albumGrid">
                    {albums.map(album => {
                        return <AlbumsIndexItem album={album} />
                    })}
                </div>
            )}
        </>
    )
}
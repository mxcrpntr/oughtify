import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import AlbumsIndexItem from "./AlbumsIndexItem"
// import './AlbumsIndex.css'

export default function AlbumsIndex({albums}) {
    // const topPadding = {
    //     paddingTop: `66px`,
    // }
    console.log(albums)
    Object.values(albums).map(album => {
        console.log(album)
    })

    return (
        <>
            {/* <h2 style={topPadding}><Link to="">Artists</Link></h2> */}
            <div className="albumGrid">
                {Object.values(albums).map(album => {
                    return <AlbumsIndexItem album={album} />
                })}
                {Object.values(albums).map(album => {
                    return <AlbumsIndexItem album={album} />
                })}
                {Object.values(albums).map(album => {
                    return <AlbumsIndexItem album={album} />
                })}
                {Object.values(albums).map(album => {
                    return <AlbumsIndexItem album={album} />
                })}
                {Object.values(albums).map(album => {
                    return <AlbumsIndexItem album={album} />
                })}
                {Object.values(albums).map(album => {
                    return <AlbumsIndexItem album={album} />
                })}
            </div>
        </>
    )
}
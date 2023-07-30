import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min"
import AlbumsIndex from "../ArtistShow/AlbumsIndex"
import './AlbumShow.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbum, getAlbum, getAlbums } from "../../../../store/albums";
import { useEffect } from "react";
import { getSongs } from "../../../../store/songs";
import { getArtist } from "../../../../store/artists";
import TrackListItem from "./TrackListItem";

export default function AlbumShow() {

    const dispatch = useDispatch();

    const {albumId} = useParams();

    const album = useSelector(getAlbum(albumId));
    const artist = useSelector(getArtist(album.artistId))
    const songs = useSelector(getSongs);
    const albums = useSelector(getAlbums);

    const moreAlbums = {};
    
    Object.values(albums)
        .filter(album => album.id != albumId)
        .forEach(album => moreAlbums[album.id] = album);

    let runtime = 0;

    Object.values(songs).forEach(song => runtime += song.length)

    const formatRuntime = (runtime) => {
        const min = Math.floor(runtime / 60);
        const sec = runtime % 60;
        return `${min} min ${sec} sec`
    }

    useEffect(()=> {
        dispatch(fetchAlbum(albumId));
    },[])

    
    return (
        <>
            {Object.keys(album).length > 0
                && Object.keys(songs).length > 0
                && Object.keys(artist).length > 0
                && (
            <>
            <div className="albumShowTop">
                <div className="albumImage">
                    <img src={album.imageUrl}></img>
                </div>
                <div className='albumHeaders'>
                    <h4>Album</h4>
                    <h1>{album.title}</h1>

                    <h5>
                        <img src={artist.imageUrl}></img>
                        <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
                        &nbsp;· {album.date.substr(0,4)}
                        &nbsp;· {album.songIds.length} song{ album.songIds.length === 1 ? "" : "s" },
                        &nbsp; <span className="albumLength">{formatRuntime(runtime)}</span>

                    </h5>
                </div>
            </div>
            <div className='opaqueBkgd-2'>
                <div className='trackList'>
                <span className="bigButtons">
                    <button className="bigPlay"><i class="fa-solid fa-play"></i></button>
                    <span className="bigHeart"><i class="fa-regular fa-heart"></i></span>
                    <span className="bigDots"><i class="fa-solid fa-ellipsis"></i></span>
                </span>

                    <table>
                        <tr>
                            <td>#</td>
                            <td>
                                Title
                            </td>
                            <td><i class="fa-regular fa-clock"></i></td>
                        </tr>
                        <hr></hr>
                        {Object.values(songs).map(song => {
                            return (
                                // <tr>
                                // <td>{song.number}</td>
                                // <td>
                                //     <ul>
                                //         <li>{song.title}</li>
                                //         <li><Link to={`/artists/${artist.id}`}>{artist.name}</Link></li>
                                //     </ul>
                                // </td>
                                //     <td>{song.lenth}</td>
                                // </tr>
                                <TrackListItem song={song} artist={artist} />
                            )
                        })}

                    </table>
                </div>
                <div className='moreBy'>
                    {Object.keys(moreAlbums).length > 0 && (
                        <>
                            <h2>More by {artist.name}</h2>
                            <AlbumsIndex albums={moreAlbums} />
                        </>
                    )}
                </div>
            </div>
            </>

            )}
        </>
    )
}
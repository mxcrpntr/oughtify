import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min"
import AlbumsIndex from "../ArtistShow/AlbumsIndex"
import './AlbumShow.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbum, getAlbum, getAlbums } from "../../../../store/albums";
import { useEffect } from "react";
import { getSongs } from "../../../../store/songs";
import { getArtist } from "../../../../store/artists";
import TrackListItem, { invisibleEllipsisSymbol } from "./TrackListItem";

export default function AlbumShow() {

    const dispatch = useDispatch();

    const {albumId} = useParams();

    const sessionUser = useSelector(state => state.session.user);

    
    let currentSong = sessionUser?.queue[0]?.[0]

    useEffect(() => {
        currentSong = sessionUser?.queue[0]?.[0]
    }, [sessionUser])

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
    },[albumId])

    const songsForTracklist = Object.values(songs)
        .sort((a,b) => a.number - b.number)

    const songsForQueue = songsForTracklist
        .map(song => [song,0])

    for (let i = 0; i < songsForQueue.length; i++) {
        songsForQueue[i][0].artistName = artist.name;
        songsForQueue[i][0].artistId = artist.id;
        songsForQueue[i][0].imageUrl = album.imageUrl;
    }
    
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
                    <button className="bigPlay" onClick={() => {
                    if (sessionUser) {
                        sessionUser.queue = songsForQueue
                        const audio = document.querySelector("audio")
                        audio.currentTime = sessionUser.queue?.[0]?.[1] ? sessionUser.queue[0][1] : 0
                        if (audio.paused) {
                            document.querySelector(".playPause").click()
                        }
                    }
                    }}>{ currentSong?.albumId === albumId
                        // && !document.querySelector("audio")?.paused
                        ?
                    (<i class="fa-solid fa-pause"></i>) :
                    (<i class="fa-solid fa-play"></i>)}</button>
                    <span className="bigHeart"><i class="fa-regular fa-heart"></i></span>
                    <span className="bigDots"><i class="fa-solid fa-ellipsis"></i></span>
                </span>

                    <table>
                        <tr>
                            <td>#</td>
                            <td>
                                Title
                            </td>
                            <td></td>
                            <td><i class="fa-regular fa-clock"></i></td>
                            <td>{invisibleEllipsisSymbol()}</td>
                        </tr>
                        <hr></hr>
                        {songsForTracklist.map(song => {
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
                                <TrackListItem
                                    song={song}
                                    artist={artist}
                                    songsForQueue={songsForQueue.filter(entry => entry[0].number >= song.number)} />
                            )
                        })}

                    </table>
                <div className='moreBy'>
                    {Object.keys(moreAlbums).length > 0 && (
                        <>
                            <h2>More by {artist.name}</h2>
                            <AlbumsIndex albums={moreAlbums} />
                        </>
                    )}
                </div>
                </div>
            </div>
            </>

            )}
        </>
    )
}
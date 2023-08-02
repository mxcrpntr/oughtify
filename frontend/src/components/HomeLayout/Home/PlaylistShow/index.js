import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min"
import './PlaylistShow.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylist, getPlaylist, getPlaylists } from "../../../../store/playlists";
import { useEffect } from "react";
import { getSongs } from "../../../../store/songs";
import { getArtist } from "../../../../store/artists";
import PlaylistTrackListItem from "./PlaylistTrackListItem";
import { invisibleEllipsisSymbol } from "../AlbumShow/TrackListItem";
import { getPlaylistSongs } from "../../../../store/playlistSongs";

export default function PlaylistShow() {

    const dispatch = useDispatch();

    const {playlistId} = useParams();

    const sessionUser = useSelector(state => state.session.user);

    
    let currentSong = sessionUser?.queue[0]?.[0]

    useEffect(() => {
        currentSong = sessionUser?.queue[0]?.[0]
    }, [sessionUser])

    const playlist = useSelector(getPlaylist(playlistId));
    const playlistSongs = useSelector(getPlaylistSongs);
    console.log(useSelector(getPlaylist(playlistId)))

    let opaqueBkgdStyle = {};

    useEffect(() => {
        if (playlist) {
            opaqueBkgdStyle = {
                backgroundImage: `linear-gradient(to bottom, ${playlist.color}, rgba(18, 18, 18, 1))`
            }
        }
    }, [playlist])


    let runtime = 0;

    Object.values(playlistSongs).forEach(playlistSong => runtime += playlistSong.length)

    const formatRuntime = (runtime) => {
        const min = Math.floor(runtime / 60);
        const sec = runtime % 60;
        return `${min} min ${sec} sec`
    }

    useEffect(()=> {
        dispatch(fetchPlaylist(playlistId));
    },[playlistId])

    const songsForTracklist = Object.values(playlistSongs)
        .sort((a,b) => a.number - b.number)

    const songsForQueue = songsForTracklist
        .map(song => [song,0])

    // for (let i = 0; i < songsForQueue.length; i++) {
    //     songsForQueue[i][0].artistName = artist.name;
    //     songsForQueue[i][0].artistId = artist.id;
    //     songsForQueue[i][0].imageUrl = album.imageUrl;
    // }
    
    return (
        <>
            {playlist && Object.keys(playlist).length > 0
                && (
            <>
            <div className="playlistShowTop">
                <div className="playlistImage">
                    <img src={playlist.imageUrl}></img>
                </div>
                <div className='playlistHeaders'>
                    <h4>Playlist</h4>
                    <h1>{playlist.title}</h1>

                    <h5>
                        <img src={playlist.imageUrl}></img>
                        <Link to="">{playlist.userName}</Link>
                        {/* &nbsp;· {album.date.substr(0,4)} */}
                        &nbsp;· {playlist.playlistSongIds.length} song{ playlist.playlistSongIds.length === 1 ? "" : "s" },
                        &nbsp; <span className="playlistLength">{formatRuntime(runtime)}</span>

                    </h5>
                </div>
            </div>
            <div className='opaqueBkgd-2' style={opaqueBkgdStyle}>
                <div className='playlistTrackList'>
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
                    }}>{ currentSong?.playlistId === playlistId ?
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
                            <td>
                                Album
                            </td>
                            <td>
                                Date added
                            </td>
                            <td></td>
                            <td><i class="fa-regular fa-clock"></i></td>
                            <td>{invisibleEllipsisSymbol()}</td>
                        </tr>
                        <hr></hr>
                        {songsForTracklist.map(song => {
                            return (
                                <PlaylistTrackListItem
                                    song={song}
                                    songsForQueue={songsForQueue.filter(entry => entry[0].number >= song.number)} />
                            )
                        })}

                    </table>

                </div>
            </div>
            </>

            )}
        </>
    )
}
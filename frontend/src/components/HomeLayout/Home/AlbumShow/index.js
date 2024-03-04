import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min"
import AlbumsIndex from "../ArtistShow/AlbumsIndex"
import './AlbumShow.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbum, getAlbum, getAlbums } from "../../../../store/albums";
import { useEffect, useRef, useState } from "react";
import { getSongs } from "../../../../store/songs";
import { getArtist } from "../../../../store/artists";
import TrackListItem, { invisibleEllipsisSymbol } from "./TrackListItem";
import { fetchPlaylists, getPlaylists } from "../../../../store/playlists";

export default function AlbumShow({shiftPressed, ctrlPressed, whatIsDragging, setWhatIsDragging, currentSong}) {

    const dispatch = useDispatch();

    const {albumId} = useParams();

    const sessionUser = useSelector(state => state.session.user);

    const [rowWidth,setRowWidth] = useState();
    const tableRef = useRef();
    const tableRowRef = useRef();
    const [isLiked,setIsLiked] = useState(false);

    const album = useSelector(getAlbum(albumId));
    const artist = useSelector(getArtist(album.artistId))
    const songs = useSelector(getSongs);
    const albums = useSelector(getAlbums);
    const playlists = useSelector(getPlaylists);

    useEffect(()=> {
        dispatch(fetchPlaylists);
    },[])


    const moreAlbums = Object.values(albums).filter(album => album.id !== Number(albumId) && album.artistId === artist.id);
    
    // Object.values(albums)
    //     .filter(album => album.id != albumId)
    //     .forEach(album => moreAlbums[album.id] = album);

    let runtime = 0;

    useEffect(() => {
        const getRowWidth = () => {
            if (tableRowRef.current) {
                const {width} = tableRowRef.current.getBoundingClientRect();
                setRowWidth(width);
            }
        };
        getRowWidth();
        window.addEventListener('resize', getRowWidth);
        return () => window.removeEventListener('resize', getRowWidth);
    }, [tableRowRef.current])

    Object.values(songs).forEach(song => runtime += song.length)

    const formatRuntime = (runtime) => {
        const min = Math.floor(runtime / 60);
        const sec = runtime % 60;
        return `${min} min ${sec} sec`
    }

    useEffect(()=> {
        dispatch(fetchAlbum(albumId));
    },[albumId])

    const selectedTracksObj = {...songs,lastSelectedTrack: null}
    const [selectedTracks, setSelectedTracks] = useState(selectedTracksObj)
    const [lastClickedTrack,setLastClickedTrack] = useState({clickedTrack: null, clickBoolean: false})


    useEffect(() => {
        const handleNonTrackClick = (e) => {
            if (tableRef.current && !tableRef.current.contains(e.target)) {
                setLastClickedTrack({clickedTrack: null, shift: shiftPressed, ctrl: ctrlPressed})
            }
        };
        document.addEventListener('click', handleNonTrackClick);
        return () => document.removeEventListener('click', handleNonTrackClick);
    }, [])

    useEffect(() => {
        if (lastClickedTrack && songs && selectedTracks) {
            const clickedTrack = lastClickedTrack.clickedTrack
            if (clickedTrack === null) {
                const noSelectedTracksObj = {...songs,lastSelectedTrack: null}
                Object.keys(songs).forEach((songId) => noSelectedTracksObj[songId] = false)
                setSelectedTracks(noSelectedTracksObj)
            }
            else {
                const newSelectedTracksObj = {...selectedTracks}
                const clickedSongNumber = songs[clickedTrack].number
                if (shiftPressed && !(selectedTracks.lastSelectedTrack === null)) {
                    const previousSelectedSongNumber = songs[selectedTracks.lastSelectedTrack].number
                    const maxSongNumber = Math.max(clickedSongNumber,previousSelectedSongNumber)
                    const minSongNumber = Math.min(clickedSongNumber,previousSelectedSongNumber)
                    const songsBetween = Object
                        .values(songs)
                        .filter((song) => song.number >= minSongNumber && song.number <= maxSongNumber)
                        .map(song => song.id)
                    songsBetween.forEach((songId) => newSelectedTracksObj[songId] = true);
                    newSelectedTracksObj.lastSelectedTrack = clickedTrack;
                    setSelectedTracks(newSelectedTracksObj)
                }
                else if (ctrlPressed) {
                    newSelectedTracksObj[clickedTrack] = !selectedTracks[clickedTrack]
                    newSelectedTracksObj.lastSelectedTrack = clickedTrack;
                    setSelectedTracks(newSelectedTracksObj)
                }
                else {
                    console.log(selectedTracks.lastSelectedTrack)
                    Object.keys(songs).forEach(songId => newSelectedTracksObj[songId] = false);
                    newSelectedTracksObj[clickedTrack] = true;
                    newSelectedTracksObj.lastSelectedTrack = clickedTrack;
                    setSelectedTracks(newSelectedTracksObj)
                }
            }
        }
    }, [lastClickedTrack])

    const songsForTracklist = Object.values(songs)
        .sort((a,b) => a.number - b.number)

    const songsForQueue = songsForTracklist
        .map(song => [song,0])

    for (let i = 0; i < songsForQueue.length; i++) {
        songsForQueue[i][0].artistName = artist.name;
        songsForQueue[i][0].artistId = artist.id;
        songsForQueue[i][0].imageUrl = album.imageUrl;
    }

    const songsForReverseQueue = [...songsForQueue]
        .sort((a,b) => b[0].number - a[0].number)

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    }

    let opaqueBkgdStyle = {};

    useEffect(() => {
        if (album) {
            opaqueBkgdStyle = {
                backgroundImage: `linear-gradient(to bottom, ${album.color}, rgba(18, 18, 18, 1))`
            }
        }
    }, [album,songs])

    // const trGridTemplate = (width) => {
    //     if (width >= 710) {
    //         return {gridTemplateColumns: ".5fr 6fr 5fr 5fr .5fr 1fr .35fr"}
    //     }
    //     else if (width >= 500) {
    //         return {gridTemplateColumns: ".5fr 6fr 5fr .5fr 1fr .35fr"}
    //     }
    //     else {
    //         return {gridTemplateColumns: ".5fr 6fr .5fr 1fr .35fr"}
    //     }
    // }

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
                        &nbsp;• {album.date.substr(0,4)}
                        &nbsp;• {album.songIds.length} song{ album.songIds.length === 1 ? "" : "s" },
                        &nbsp; <span className="albumLength">{formatRuntime(runtime)}</span>

                    </h5>
                </div>
            </div>
            <div className='opaqueBkgd-2' style={{
                backgroundImage: `linear-gradient(to bottom, ${album.color}, rgba(18, 18, 18, 1))`
            }}>
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
                    }}>{ currentSong?.song?.albumId === albumId ?
                    (<i class="fa-solid fa-pause"></i>) :
                    (<i class="fa-solid fa-play"></i>)}</button>
                    <span className="bigHeart" onClick={handleLikeClick}>{isLiked ?
                    (<i class="fa-solid fa-heart"style={{color: "#1ED760"}}></i>) :
                    (<i class="fa-regular fa-heart"></i>)}</span>
                    <span className="bigDots"><i class="fa-solid fa-ellipsis"></i></span>
                </span>

                    <table ref={tableRef}>
                        <tr ref={tableRowRef}>
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
                                <TrackListItem
                                    key={song.id}
                                    song={song}
                                    artist={artist}
                                    songsForQueue={songsForQueue.filter(entry => entry[0].number >= song.number)}
                                    songsForReverseQueue={songsForReverseQueue.filter(entry => entry[0].number < song.number)}
                                    whatIsDragging={whatIsDragging}
                                    setWhatIsDragging={setWhatIsDragging}
                                    currentSong={currentSong}
                                    shiftPressed={shiftPressed}
                                    ctrlPressed={ctrlPressed}
                                    selectedTracks={selectedTracks}
                                    lastClickedTrack={lastClickedTrack}
                                    setLastClickedTrack={setLastClickedTrack}
                                    userPlaylists={Object.values(playlists).filter((pList) => sessionUser.playlistIds.includes(pList.id))}/>
                            )
                        })}

                    </table>
                <div className='moreBy'>
                    {moreAlbums.length > 0 && (
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
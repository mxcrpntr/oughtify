import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min"
import './PlaylistShow.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylist, fetchPlaylists, getPlaylist, getPlaylists } from "../../../../store/playlists";
import { useEffect, useRef, useState } from "react";
import { getSongs } from "../../../../store/songs";
import { getArtist } from "../../../../store/artists";
import PlaylistTrackListItem from "./PlaylistTrackListItem";
import { invisibleEllipsisSymbol } from "../AlbumShow/TrackListItem";
import { getPlaylistSongs, updatePlaylistSong } from "../../../../store/playlistSongs";
import EditPlaylistModal from "./EditPlaylistModal";
import PlaylistImage from "./PlaylistImage";


const zeroImageMusicSymb = () => {
    return <i class="fa-solid fa-music" style={{color: "#7F7F7F"}}></i>
}
const changePhotoHoverSymbText = () => {
    return (
        <>
        <i class="fa-solid fa-pen" style={{fontSize: "75px"}}></i>
        <br></br>
        <h4>Choose photo</h4>
        </>
    )
}

export default function PlaylistShow({shiftPressed, ctrlPressed, whatIsDragging, setWhatIsDragging, currentSong}) {

    const dispatch = useDispatch();

    const {playlistId} = useParams();

    const playlists = useSelector(getPlaylists);

    const sessionUser = useSelector(state => state.session.user);

    const [rowWidth,setRowWidth] = useState();

    const tableRef = useRef();
    const tableRowRef = useRef();

    const [isLiked, setIsLiked] = useState(false);

    const [zeroSymbol, setZeroSymbol] = useState(zeroImageMusicSymb());

    const [songsUpdated, setSongsUpdated] = useState(true);

    const [updateSongNumbers,setUpdateSongNumbers] = useState({aboveOrBelow: null, songNumber: null});

    const playlistTracksRef = useRef();

    const [editModalHidden,setEditModalHidden] = useState(true)

    useEffect(() => {
        const getRowWidth = () => {
            if (tableRowRef.current) {
                console.log('table is real')
                const {width} = tableRowRef.current.getBoundingClientRect();
                setRowWidth(width);
            }
        };
        getRowWidth();
        window.addEventListener('resize', getRowWidth);
        return () => window.removeEventListener('resize', getRowWidth);
    }, [tableRowRef.current])

    useEffect(()=> {
        dispatch(fetchPlaylist(playlistId));
    },[playlistId,songsUpdated])

    const playlist = useSelector(getPlaylist(playlistId));
    const playlistSongs = useSelector(getPlaylistSongs);


    const selectedTracksObj = {...playlistSongs,lastSelectedTrack: null}
    // Object.keys(playlistSongs).forEach((pSongId) => selectedTracksObj[pSongId] = {...playlistSongs[pSongId], 'selected': false})
    
    const [selectedTracks, setSelectedTracks] = useState(selectedTracksObj)
    // setSelectedTracks(selectedTracksObj)

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
        if (lastClickedTrack && playlistSongs && selectedTracks) {
            const clickedTrack = lastClickedTrack.clickedTrack
            if (clickedTrack === null) {
                const noSelectedTracksObj = {...playlistSongs,lastSelectedTrack: null}
                Object.keys(playlistSongs).forEach((pSongId) => noSelectedTracksObj[pSongId] = false)
                setSelectedTracks(noSelectedTracksObj)
            }
            else {
                const newSelectedTracksObj = {...selectedTracks}
                const clickedSongNumber = playlistSongs[clickedTrack].songNumber
                if (shiftPressed && !(selectedTracks.lastSelectedTrack === null)) {
                    const previousSelectedSongNumber = playlistSongs[selectedTracks.lastSelectedTrack].songNumber
                    const maxSongNumber = Math.max(clickedSongNumber,previousSelectedSongNumber)
                    const minSongNumber = Math.min(clickedSongNumber,previousSelectedSongNumber)
                    const playlistSongsBetween = Object
                        .values(playlistSongs)
                        .filter((pSong) => pSong.songNumber >= minSongNumber && pSong.songNumber <= maxSongNumber)
                        .map(pSong => pSong.id)
                    playlistSongsBetween.forEach((pSongId) => newSelectedTracksObj[pSongId] = true);
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
                    Object.keys(playlistSongs).forEach(pSongId => newSelectedTracksObj[pSongId] = false);
                    newSelectedTracksObj[clickedTrack] = true;
                    newSelectedTracksObj.lastSelectedTrack = clickedTrack;
                    setSelectedTracks(newSelectedTracksObj)
                }
            }
        }
    }, [lastClickedTrack])
    
    // let currentSong = sessionUser?.queue[0]?.[0]

    // useEffect(() => {
    //     currentSong = sessionUser?.queue[0]?.[0]
    // }, [sessionUser])


    let opaqueBkgdStyle = {};


    useEffect(() => {
        if (playlist) {
            opaqueBkgdStyle = {
                backgroundImage: `linear-gradient(to bottom, ${playlist.color}, rgba(18, 18, 18, 1))`
            }
        }
    }, [playlist,playlistSongs])


    let runtime = 0;

    Object.values(playlistSongs).forEach(playlistSong => runtime += playlistSong.length)

    const formatRuntime = (runtime) => {
        const min = Math.floor(runtime / 60);
        const sec = runtime % 60;
        return `${min} min ${sec} sec`
    }

    useEffect(()=> {
        dispatch(fetchPlaylists);
    },[])


    const songsForTracklist = Object.values(playlistSongs)
        .sort((a,b) => a.songNumber - b.songNumber)

    const songsForQueue = songsForTracklist
        .map(song => [song,0])

    const songsForReverseQueue = [...songsForQueue]
        .sort((a,b) => b[0].songNumber - a[0].songNumber)

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    }


    const oneImageCallback = (playlistSongArray) => {
        if (Object.values(playlistSongArray).length > 0) {
            return ({backgroundImage: `url("${Object.values(playlistSongArray)[0].imageUrl}")`})
        }
        else {
            return ({})
        }
    }

    const trGridTemplate = (width) => {
        if (width >= 710) {
            return {gridTemplateColumns: ".5fr 6fr 5fr 5fr .5fr 1fr .35fr"}
        }
        else if (width >= 500) {
            return {gridTemplateColumns: ".5fr 6fr 5fr .5fr 1fr .35fr"}
        }
        else {
            return {gridTemplateColumns: ".5fr 6fr .5fr 1fr .35fr"}
        }
    }

    useEffect(() => {
        const updatePlaylistSongs = async () => {
            const targetSongNumber = updateSongNumbers.songNumber
            const selectedTrackIds = Object.keys(selectedTracks).filter(trackId => selectedTracks[trackId] === true).map(trackId => parseInt(trackId))
            const selectedSongsInOrder = [...songsForTracklist].filter(pSong => selectedTrackIds.includes(pSong.id))
            const minSelectedSongNumber = selectedSongsInOrder[0]?.songNumber
            const maxSelectedSongNumber = selectedSongsInOrder[selectedSongsInOrder.length-1]?.songNumber
            console.log([...songsForTracklist].filter(pSong => pSong.id > 130))
            if (targetSongNumber < minSelectedSongNumber) {
                const actualTargetSongNumber = updateSongNumbers.aboveOrBelow === 'above' ? targetSongNumber : targetSongNumber + 1
                if (actualTargetSongNumber < minSelectedSongNumber) {
                    for (let i = 0; i < selectedSongsInOrder.length; i++) {
                        console.log(`hey we're here and target song number is ${actualTargetSongNumber}`)
                        const selectedSong = selectedSongsInOrder[i]
                        await dispatch(updatePlaylistSong({id: selectedSong.id, playlist_song: {song_id: selectedSong.id, songNumber: actualTargetSongNumber + i}}))
                    }
                }
            } else if (targetSongNumber > maxSelectedSongNumber) {
                const actualTargetSongNumber = updateSongNumbers.aboveOrBelow === 'above' ? (targetSongNumber - 1) : targetSongNumber
                if (actualTargetSongNumber > maxSelectedSongNumber) {
                    for (let i = 0; i < selectedSongsInOrder.length; i++) {
                        const selectedSong = selectedSongsInOrder[i]
                        await dispatch(updatePlaylistSong({id: selectedSong.id, playlist_song: {song_id: selectedSong.id, songNumber: actualTargetSongNumber}}))
                    }
                } 
            }
            setUpdateSongNumbers({aboveOrBelow: null, songId: null});
            const noSelectedTracksObj = {...playlistSongs,lastSelectedTrack: null};
            Object.keys(playlistSongs).forEach((pSongId) => noSelectedTracksObj[pSongId] = false);
            setSelectedTracks(noSelectedTracksObj);
            setSongsUpdated(!songsUpdated)
        }
        if (updateSongNumbers && updateSongNumbers?.songNumber && updateSongNumbers?.aboveOrBelow) {
            updatePlaylistSongs();
        }
    }, [updateSongNumbers])

    return (
        <>
            {playlist && Object.keys(playlist).length > 0 && playlistSongs
                && (
            <>
            {!editModalHidden && (<EditPlaylistModal
                playlist={playlist}
                setEditModalHidden={setEditModalHidden}
                sessionUser={sessionUser}
                playlistSongs={playlistSongs}
                zeroImageMusicSymb={zeroImageMusicSymb}
                changePhotoHoverSymbText={changePhotoHoverSymbText}
                oneImageCallback={oneImageCallback}/>)}
            <div className="playlistShowTop">
                <PlaylistImage
                    playlistSongs={playlistSongs}
                    setEditModalHidden={setEditModalHidden}
                    photoClickFunction={() => {setEditModalHidden(false)}}
                    zeroImageMusicSymb={zeroImageMusicSymb}
                    changePhotoHoverSymbText={changePhotoHoverSymbText}
                    oneImageCallback={oneImageCallback}
                    workingImageUrl={playlist.imageUrl}/>
                <div className='playlistHeaders'>
                    <h4>Playlist</h4>
                    <h1 onClick={() => {setEditModalHidden(false)}}>{playlist.title}</h1>

                    <h5>
                        <Link to="" onClick={(e) => {e.preventDefault()}}>{playlist.userName}</Link>
                        &nbsp;• {Object.values(playlistSongs)?.length > 0 ? Object.values(playlistSongs).length : 0} song{ Object.values(playlistSongs).length === 1 ? "" : "s" },
                        &nbsp; <span className="playlistLength">{formatRuntime(runtime)}</span>

                    </h5>
                </div>
            </div>
            <div className='opaqueBkgd-2' style={{
                backgroundImage: `linear-gradient(to bottom, ${playlist.color}, rgba(18, 18, 18, 1))`
            }}>
                <div className='playlistTrackList'>
                <span className="bigButtons">
                    <button className="bigPlay" onClick={() => {
                    if (sessionUser) {
                        const audio = document.querySelector("audio")
                        if (sessionUser.queue?.[0] && playlistSongs && !Object.values(playlistSongs).map(pSong => pSong.id).includes(sessionUser.queue[0][0].id)) {
                            sessionUser.queue = [...songsForQueue]
                            audio.currentTime = sessionUser.queue?.[0]?.[1] ? sessionUser.queue[0][1] : 0
                            if (audio.paused) document.querySelector(".playPause").click()
                        }
                        else {
                            document.querySelector(".playPause").click()
                        }
                    }
                    }}>{ sessionUser.queue?.[0] && playlistSongs && Object.values(playlistSongs).map(pSong => pSong.id).includes(sessionUser.queue[0][0].id) && currentSong?.isPlaying ?
                    (<i class="fa-solid fa-pause"></i>) :
                    (<i class="fa-solid fa-play"></i>)}</button>
                    <span className="bigHeart" onClick={handleLikeClick}>{isLiked ?
                    (<i class="fa-solid fa-heart"style={{color: "#1ED760"}}></i>) :
                    (<i class="fa-regular fa-heart"></i>)}</span>
                    <span className="bigDots"><i class="fa-solid fa-ellipsis"></i></span>
                </span>

                    <table ref={tableRef}>
                        <tr ref={tableRowRef}
                            style={trGridTemplate(rowWidth)}>
                            <td>#</td>
                            <td className="titleColumn">
                                Title
                            </td>
                            <td className="albumColumn"  hidden={ rowWidth < 500 ? "hidden" : ""} >
                                Album
                            </td>
                            <td className="dateAddedColumn" hidden={ rowWidth < 710 ? "hidden" : ""} >
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
                                    key={song.id}
                                    songsForQueue={songsForQueue.filter(entry => entry[0].songNumber >= song.songNumber)}
                                    songsForReverseQueue={songsForReverseQueue.filter(entry => entry[0].songNumber < song.songNumber)}
                                    playlist={playlist}
                                    userPlaylists={Object.values(playlists).filter((pList) => sessionUser.playlistIds.includes(pList.id))}
                                    setSongsUpdated={setSongsUpdated}
                                    songsUpdated={songsUpdated}
                                    selectedTracks={selectedTracks}
                                    lastClickedTrack={lastClickedTrack}
                                    setLastClickedTrack={setLastClickedTrack}
                                    whatIsDragging={whatIsDragging}
                                    setWhatIsDragging={setWhatIsDragging}
                                    shiftPressed={shiftPressed}
                                    ctrlPressed={ctrlPressed}
                                    setUpdateSongNumbers={setUpdateSongNumbers}
                                    currentSong={currentSong}/>
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
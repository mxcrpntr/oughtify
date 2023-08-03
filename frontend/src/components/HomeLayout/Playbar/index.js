import { useEffect, useRef, useState } from "react"
import "./Playbar.css"
import { formatTime } from "../Home/ArtistShow"
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums, getAlbums } from "../../../store/albums";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchArtists, getArtists } from "../../../store/artists";
import { updateUser } from "../../../store/users";

export default function Playbar() {
    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    const history = useHistory();

    const [paused, setPaused] = useState(true);
    const [durationOrRemainder, setDurationOrRemainder] = useState(true);
    const [currentSong, setCurrentSong] = useState(sessionUser?.queue?.[0]?.[0]);
    const [currentSongTime, setCurrentSongTime] = useState(sessionUser?.queue?.[0]?.[1] ? sessionUser?.queue[0][1] : 0);

    const [knobStyle,setKnobStyle] = useState({
        left: 0
    });
    const [rangeStyle,setRangeStyle] = useState({
        width: 0
    });
    const [showKnob,setShowKnob] = useState(false);

    const [volumeKnobStyle,setVolumeKnobStyle] = useState({
        left: "100%"
    });
    const [volumeRangeStyle,setVolumeRangeStyle] = useState({
        width: "100%"
    });
    const [showVolumeKnob,setShowVolumeKnob] = useState(false);

    const [previousVolume,setPreviousVolume] = useState(1);

    const [isDragging,setIsDragging] = useState(false);

    const audioRef = useRef();

    const trackRef = useRef();
    const trackContainerRef = useRef();

    const volumeTrackRef = useRef();
    const volumeTrackContainerRef = useRef();

    const counter = useRef(0);

    const volumeOffSymbol = () => {
        return <i class="fa-solid fa-volume-xmark"></i>;
    }
    const volumeLowSymbol = () => {
        return <i class="fa-solid fa-volume-off"></i>;
    }
    const volumeMidSymbol = () => {
        return <i class="fa-solid fa-volume-low"></i>;
    }
    const volumeHighSymbol = () => {
        return <i class="fa-solid fa-volume-high"></i>;
    }

    const [volumeSymbol,setVolumeSymbol] = useState(volumeHighSymbol());

    let percent = 0;
    let volPercent = 100;

    const [audioSrc,setAudioSrc] = useState(currentSong?.fileUrl ? currentSong.fileUrl : "");

    useEffect(() => {
        if (audioRef.current && currentSongTime) {
            audioRef.current.currentTime = currentSongTime
            percent = 100 * (currentSongTime / audioRef.current.duration);
            setKnobStyle({left: `${percent}%`});
            setRangeStyle({...rangeStyle, width: `${percent}%`});
            if (!audioRef.current.paused) audioRef.current.pause();
        }

        const handleLoadedMetadata = () => {
            if (audioRef.current && !audioRef.current.paused) {
              audioRef.current.pause();
            }
          };
        if (audioRef.current) {
            audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
        }
        
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
        };
    }, [])


    useEffect(() => {
        if (sessionUser?.queue?.[0]) {
            setCurrentSong(sessionUser?.queue?.[0]?.[0]);
            setAudioSrc(sessionUser?.queue?.[0]?.[0]?.fileUrl);
            setKnobStyle({...rangeStyle, left: 0});
            setRangeStyle({...rangeStyle, width: 0});
            setPaused(!paused);
        }
    }, [sessionUser?.queue?.[0]])

    const toggleDurationView = () => {
        setDurationOrRemainder(!durationOrRemainder);
    }

    useEffect(() => {
        const updateTime = () => {
            if (!isDragging && audioRef.current) {
                const currentTime = audioRef.current.currentTime;
                setCurrentSongTime(currentTime);
                if (sessionUser?.queue?.[0]) {
                    sessionUser.queue[0][1] = currentTime;
                }
                percent = 100 * (currentTime / audioRef.current.duration);
                setKnobStyle({left: `${percent}%`});
                setRangeStyle({...rangeStyle, width: `${percent}%`});
            }
        }

        const saveUserQueue = async () => {
            if (sessionUser) {
                counter.current++;
                if (counter.current % 20 === 0) {
                    console.log(counter.current);
                    dispatch(updateUser(sessionUser));
                }
            }
        }

        if (audioRef.current) {
            // debugger;
            audioRef.current.addEventListener("timeupdate", updateTime)
            audioRef.current.addEventListener("timeupdate", saveUserQueue)
           return () => {
            if (audioRef.current) {
                // debugger;
                audioRef.current.removeEventListener("timeupdate", updateTime);
                audioRef.current.removeEventListener("timeupdate", saveUserQueue);
            }
          }
        }
    })

    useEffect(() => {
        const goToNextSong = async () => {
            sessionUser.queue.shift();
            setAudioSrc(sessionUser?.queue?.[0]?.[0]?.fileUrl);
        }
        if (audioRef.current) {
            audioRef.current.addEventListener("ended",goToNextSong)
            return () => {
                if (audioRef.current) {
                    audioRef.current.removeEventListener("ended",goToNextSong)
                }
            }
        }
    })

    useEffect(() => {
        const togglePlay = async () => {
            if(audioRef?.current?.paused) {
                if (audioRef.current.readyState < 1) {
                    await new Promise((resolve) => {
                        const handleCanPlayThrough = () => {
                          resolve();
                          audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
                        };
                        audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough, { once: true });
                    });
                }
                audioRef.current.play().catch((error) => {
                    console.log('Error playing audio:', error);
                });;
            } else {
                if (audioRef.current) audioRef.current.pause();    
            }
        }
        togglePlay();
    }, [paused])

    const playCirc = () => {
        return <i class="fa-solid fa-circle-play"></i>;
    }

    const pauseCirc = () => {
        return <i class="fa-solid fa-circle-pause"></i>;
    }

    const invisibleImageUrl = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";


    const handleDragStart = (e) => {
        // e.preventDefault()
        e.dataTransfer.effectAllowed = "move";
        const dragImage = new Image();
        dragImage.src = invisibleImageUrl;    
        e.dataTransfer.setDragImage(dragImage, 0, 0);
    }

    const handleVolumeDragStart = (e) => {
        // e.preventDefault()
        e.dataTransfer.effectAllowed = "move";
        const dragImage = new Image();
        dragImage.src = invisibleImageUrl;    
        e.dataTransfer.setDragImage(dragImage, 0, 0);
    }

    const handleDrag = (e) => {
        e.preventDefault()
        if (e.screenX !== 0) {
            setIsDragging(true);
            const rect = trackRef.current.getBoundingClientRect();
            const trackLength = rect.right - rect.left;
            percent = 0;
            const xPos = e.screenX
            if (xPos > rect.right) {
                percent = 100;
            } else if (xPos > rect.left) {
                percent = 100 * ((xPos - rect.left) / trackLength)
            }
            setCurrentSongTime(audioRef.current.duration * (percent / 100));
            if (sessionUser?.queue?.[0]) sessionUser.queue[0][1] = audioRef.current.duration * (percent / 100);
            setKnobStyle({left: `${percent}%`, transition: "none"});
            setRangeStyle({...rangeStyle,backgroundColor: `#5FBA56`, width: `${percent}%`, transition: "none"})
        }
    }

    const handleVolumeDrag = (e) => {
        e.preventDefault()
        if (e.screenX !== 0) {
            // setIsDragging(true);
            const rect = volumeTrackRef.current.getBoundingClientRect();
            const trackLength = rect.right - rect.left;
            volPercent = 0;
            const xPos = e.screenX
            if (xPos > rect.right) {
                volPercent = 100;
            } else if (xPos > rect.left) {
                volPercent = 100 * ((xPos - rect.left) / trackLength)
            }
            audioRef.current.volume = volPercent / 100;
            setVolumeKnobStyle({left: `${volPercent}%`, transition: "none"});
            setVolumeRangeStyle({...volumeRangeStyle,backgroundColor: `#5FBA56`, width: `${volPercent}%`, transition: "none"});
            if (volPercent > 66) {
                setVolumeSymbol(volumeHighSymbol());
                setPreviousVolume(volPercent / 100);
            } else if (volPercent > 15) {
                setVolumeSymbol(volumeMidSymbol());
                setPreviousVolume(volPercent / 100);
            } else if (volPercent > 0) {
                setVolumeSymbol(volumeLowSymbol());
                setPreviousVolume(volPercent / 100);
            } else {
                setVolumeSymbol(volumeOffSymbol());
            }
        }
    }

    const handleDragEnd = (e) => {
        const rect = trackRef.current.getBoundingClientRect();
        const trackLength = rect.right - rect.left;
        percent = 0;
        const xPos = e.screenX
        const yPos = e.screenY
        if (xPos > rect.right) {
            percent = 100;
        } else if (xPos > rect.left) {
            percent = 100 * ((xPos - rect.left) / trackLength)
        }
        setKnobStyle({left: `${percent}%`, transition: "none"});
        if (yPos <= rect.bottom && yPos >= rect.top) {
            setRangeStyle({...rangeStyle, width: `${percent}%`,backgroundColor: `#5FBA56`});
        } else {
            setRangeStyle({...rangeStyle, width: `${percent}%`,backgroundColor: `#FFFFFF`});
        }
        audioRef.current.currentTime = audioRef.current.duration * (percent / 100);
        if (sessionUser?.queue?.[0]) sessionUser.queue[0][1] = audioRef.current.duration * (percent / 100);
        setIsDragging(false);
    }

    const handleVolumeDragEnd = (e) => {
        const rect = volumeTrackRef.current.getBoundingClientRect();
        const trackLength = rect.right - rect.left;
        volPercent = 0;
        const xPos = e.screenX
        const yPos = e.screenY
        if (xPos > rect.right) {
            volPercent = 100;
        } else if (xPos > rect.left) {
            volPercent = 100 * ((xPos - rect.left) / trackLength)
        }
        setVolumeKnobStyle({left: `${volPercent}%`, transition: "none"});
        if (yPos <= rect.bottom && yPos >= rect.top) {
            setVolumeRangeStyle({...volumeRangeStyle, width: `${volPercent}%`,backgroundColor: `#5FBA56`});
        } else {
            setVolumeRangeStyle({...volumeRangeStyle, width: `${volPercent}%`,backgroundColor: `#FFFFFF`});
        }
        audioRef.current.volume = volPercent / 100;
        if (volPercent > 66) {
            setVolumeSymbol(volumeHighSymbol());
            setPreviousVolume(volPercent / 100);
        } else if (volPercent > 15) {
            setVolumeSymbol(volumeMidSymbol());
            setPreviousVolume(volPercent / 100);
        } else if (volPercent > 0) {
            setVolumeSymbol(volumeLowSymbol());
            setPreviousVolume(volPercent / 100);
        } else {
            setVolumeSymbol(volumeOffSymbol());
        }
    }

    const handleClick = (e) => {
        const rect = trackRef.current.getBoundingClientRect();
        const trackLength = rect.right - rect.left;
        percent = 0;
        const xPos = e.screenX
        if (xPos > rect.right) {
            percent = 100;
        } else if (xPos > rect.left) {
            percent = 100 * ((xPos - rect.left) / trackLength)
        }
        setKnobStyle({left: `${percent}%`, transition: "none"});
        setRangeStyle({...rangeStyle, width: `${percent}%`});
        audioRef.current.currentTime = audioRef.current.duration * (percent / 100);
    }

    const handleVolumeClick = (e) => {
        const rect = volumeTrackRef.current.getBoundingClientRect();
        const trackLength = rect.right - rect.left;
        volPercent = 0;
        const xPos = e.screenX
        if (xPos > rect.right) {
            volPercent = 100;
        } else if (xPos > rect.left) {
            volPercent = 100 * ((xPos - rect.left) / trackLength)
        }
        setVolumeKnobStyle({left: `${volPercent}%`, transition: "none"});
        setVolumeRangeStyle({...volumeRangeStyle, width: `${volPercent}%`});
        audioRef.current.volume = volPercent / 100;
        if (volPercent > 66) {
            setVolumeSymbol(volumeHighSymbol());
            setPreviousVolume(volPercent / 100);
        } else if (volPercent > 15) {
            setVolumeSymbol(volumeMidSymbol());
            setPreviousVolume(volPercent / 100);
        } else if (volPercent > 0) {
            setVolumeSymbol(volumeLowSymbol());
            setPreviousVolume(volPercent / 100);
        } else {
            setVolumeSymbol(volumeOffSymbol());
        }
    }

    return (
        <div className="playbar">
            {sessionUser && (
            <>
                <section className="leftSide">
                    {currentSong && (
                        <>
                            <div className="trackImage">
                                <img src={currentSong?.imageUrl}></img>
                            </div>
                            <div className="trackInfo">
                                <h3 onClick={() => {history.push(`/albums/${currentSong?.albumId}`)}}>{currentSong?.title ? currentSong.title : ""}</h3>
                                <h4 onClick={() => {history.push(`/artists/${currentSong?.artistId}`)}}>{currentSong?.artistName ? currentSong.artistName : ""}</h4>
                            </div>
                            <div>
                            <i class="fa-regular fa-heart"></i>
                            </div>
                            <div>

                            </div>
                        </>
                    )}
                </section>
                <section className="middle">
                    <div className="middleTop">
                        <i class="fa-solid fa-shuffle"></i>
                        <i class="fa-solid fa-backward-step"
                            onClick={() => {audioRef.current.currentTime = 0}}>
                        </i>
                        <div className="playPause" onClick={() => {setPaused(!paused)}}>
                            {audioRef?.current?.paused ? playCirc() : pauseCirc() }
                        </div>
                        <i class="fa-solid fa-forward-step"
                            onClick={() => {
                                if (sessionUser.queue.length === 1) {
                                    audioRef.current.currentTime = audioRef.current.duration;
                                } else {
                                    sessionUser.queue.shift();
                                }
                            }}>
                        </i>
                        <i class="fa-solid fa-repeat"></i>
                        <audio src={audioSrc} ref={audioRef} preload="auto" />
                    </div>
                    <div className="middleBottom">
                        <div>{formatTime(currentSongTime)}</div>
                        <div className="trackContainer" draggable="true" ref={trackContainerRef}
                                onMouseEnter={() => {
                                    setShowKnob(true);
                                    setRangeStyle({...rangeStyle,backgroundColor: `#5FBA56`});
                                }}
                                onMouseLeave={() => {
                                    setShowKnob(false);
                                    setRangeStyle({...rangeStyle,backgroundColor: `#FFFFFF`});
                                }}
                                onDragStart={handleDragStart}
                                onDrag={handleDrag}
                                onDragEnd={handleDragEnd}
                                onClick={handleClick}>
                            <div className="track" ref={trackRef}>
                                <div className="knob" style={knobStyle} hidden={showKnob ? "" : "hidden"}></div>
                                <div className="range" style={rangeStyle}></div>
                            </div>
                        </div>
                        <div onClick={toggleDurationView}>
                            {durationOrRemainder ?
                                formatTime(audioRef?.current?.duration) :
                                "-" + formatTime(audioRef?.current?.duration - currentSongTime)}
                        </div>
                        
                    </div>
                </section>
                <section className="rightSide">
                <div className="queueSymbol"><i class="fa-solid fa-list-ul"></i></div>
                <div className="volumeSymbol"
                    onClick={() => {
                        if (audioRef.current.volume !== 0) {
                            audioRef.current.volume = 0;
                            setVolumeKnobStyle({...volumeKnobStyle, "left": 0});
                            setVolumeRangeStyle({...volumeRangeStyle, "width": 0});
                            setVolumeSymbol(volumeOffSymbol());
                        } else {
                            audioRef.current.volume = previousVolume;
                            setVolumeKnobStyle({...volumeKnobStyle, "left": `${previousVolume * 100}%`});
                            setVolumeRangeStyle({...volumeRangeStyle, "width": `${previousVolume * 100}%`});
                            if (previousVolume <= .15) {
                                setVolumeSymbol(volumeLowSymbol());
                            } else if (previousVolume <= .66) {
                                setVolumeSymbol(volumeMidSymbol());
                            } else {
                                setVolumeSymbol(volumeHighSymbol());
                            }
                        }
                        }}>{volumeSymbol}</div>
                <div className="volumeTrackContainer" draggable="true" ref={volumeTrackContainerRef}
                                onMouseEnter={() => {
                                    setShowVolumeKnob(true);
                                    setVolumeRangeStyle({...volumeRangeStyle,backgroundColor: `#5FBA56`});
                                }}
                                onMouseLeave={() => {
                                    setShowVolumeKnob(false);
                                    setVolumeRangeStyle({...volumeRangeStyle,backgroundColor: `#FFFFFF`});
                                }}
                                onDragStart={handleVolumeDragStart}
                                onDrag={handleVolumeDrag}
                                onDragEnd={handleVolumeDragEnd}
                                onClick={handleVolumeClick}>
                            <div className="volumeTrack" ref={volumeTrackRef}>
                                <div className="volumeKnob" style={volumeKnobStyle} hidden={showVolumeKnob ? "" : "hidden"}></div>
                                <div className="volumeRange" style={volumeRangeStyle}></div>
                            </div>
                </div>
                <div className="fullScreenSymbol"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></div>
                </section>
            </>
            )}
            {!sessionUser && (
                <section className="signUpBar" onClick={()=>{history.push("/signup")}}>
                    <div className="signUpBarText">
                        <h7>PREVIEW OF OUGHTIFY</h7>
                        <h6>Sign up to get unlimited songs with no ads. No credit card needed.</h6>
                    </div>
                    <div className="barButtonContainer">
                        <button className="signUpBarButton">Sign up free</button>
                    </div>
                </section>
            )}
        </div>
    )
}
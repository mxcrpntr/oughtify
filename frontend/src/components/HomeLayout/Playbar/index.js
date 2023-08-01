import { useEffect, useRef, useState } from "react"
import "./Playbar.css"
import { formatTime } from "../Home/ArtistShow"
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums, getAlbums } from "../../../store/albums";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchArtists, getArtists } from "../../../store/artists";

export default function Playbar() {
    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    const history = useHistory();

    const [paused, setPaused] = useState(true);
    const [durationOrRemainder, setDurationOrRemainder] = useState(true);
    const [currentSongTime, setCurrentSongTime] = useState(0);
    const [currentSong, setCurrentSong] = useState(sessionUser?.queue[0]?.[0]);

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


    const [isDragging,setIsDragging] = useState(false);

    const audioRef = useRef();

    const trackRef = useRef();
    const trackContainerRef = useRef();

    const volumeTrackRef = useRef();
    const volumeTrackContainerRef = useRef();

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
            if (!isDragging) {
                const currentTime = audioRef.current.currentTime;
                setCurrentSongTime(currentTime);
                if (sessionUser?.queue?.[0]) sessionUser.queue[0][1] = currentTime;
                percent = 100 * (currentTime / audioRef.current.duration);
                setKnobStyle({left: `${percent}%`});
                setRangeStyle({...rangeStyle, width: `${percent}%`});
            }
       }

        if (audioRef.current) {
            audioRef.current.addEventListener("timeupdate", updateTime)
           return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener("timeupdate", updateTime);
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
                audioRef.current.pause();    
            }
        }
        togglePlay();
    }, [paused])

    // const togglePlay = async () => {
    //     // setPaused(!paused);
    //     if(audioRef?.current?.paused || paused) {
    //         if (audioRef.current.readyState < 1) {
    //             await new Promise((resolve) => {
    //                 const handleCanPlayThrough = () => {
    //                   resolve();
    //                   audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
    //                 };
    //                 audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough, { once: true });
    //             });
    //         }
    //         audioRef.current.play().catch((error) => {
    //             console.log('Error playing audio:', error);
    //         });;
    //         setPaused(false);
    //     } else {

    //             audioRef.current.pause();
    //             setPaused(true);

    //     }
    // }

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
            } else if (volPercent > 15) {
                setVolumeSymbol(volumeMidSymbol());
            } else if (volPercent > 0) {
                setVolumeSymbol(volumeLowSymbol());
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
        } else if (volPercent > 15) {
            setVolumeSymbol(volumeMidSymbol());
        } else if (volPercent > 0) {
            setVolumeSymbol(volumeLowSymbol());
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
        } else if (volPercent > 15) {
            setVolumeSymbol(volumeMidSymbol());
        } else if (volPercent > 0) {
            setVolumeSymbol(volumeLowSymbol());
        } else {
            setVolumeSymbol(volumeOffSymbol());
        }
    }

    return (
        <div className="playbar">
            <section className="leftSide">
                <div className="trackImage">
                    <img src={currentSong?.imageUrl}></img>
                </div>
                <div className="trackInfo">
                    <h3 onClick={() => {history.push(`/albums/${currentSong?.albumId}`)}}>{currentSong?.title ? currentSong.title : ""}</h3>
                    <h4 onClick={() => {history.push(`/artists/${currentSong?.artistId}`)}}>{currentSong?.artistName ? currentSong.artistName : ""}</h4>
                </div>
                <div>

                </div>
                <div>

                </div>
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
                    <audio onTimeUpdate={() => {}} src={audioSrc} ref={audioRef} preload="auto" />
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
            <div className="volumeSymbol"
                onClick={() => {audioRef.current.volume = 0; setVolumeKnobStyle({...volumeKnobStyle, "left": 0}); setVolumeRangeStyle({...volumeRangeStyle, "width": 0})}}>{volumeSymbol}</div>
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
            </section>
        </div>
    )
}
import { useEffect, useRef, useState } from "react"
import "./Playbar.css"
import { formatTime } from "../Home/ArtistShow"

export default function Playbar() {
    const song = new Audio('http://donkeypuzzletree.com/ether.mp3')

    // song.ontimeupdate(() => {
    //     console.log(song.currentTime)
    // })
    

    const [paused, setPaused] = useState(true);
    const [durationOrRemainder, setDurationOrRemainder] = useState(true);
    const [currentSongTime, setCurrentSongTime] = useState(0);
    const [knobStyle,setKnobStyle] = useState({
        left: 0
    });
    const [rangeStyle,setRangeStyle] = useState({
        width: 0
    });
    const [showKnob,setShowKnob] = useState(false);
    const [isDragging,setIsDragging] = useState(false);

    const audioRef = useRef();
    const trackRef = useRef();
    const trackContainerRef = useRef();
    let percent = 0;

    const toggleDurationView = () => {
        setDurationOrRemainder(!durationOrRemainder);
    }

    useEffect(() => {
        const updateTime = () => {
            if (!isDragging) {
                const currentTime = audioRef.current.currentTime;
                console.log(currentTime)
                setCurrentSongTime(currentTime);
                percent = 100 * (currentTime / audioRef.current.duration);
                setKnobStyle({left: `${percent}%`});
                setRangeStyle({...rangeStyle, width: `${percent}%`});
            }
       }

        if (audioRef.current) {
            audioRef.current.addEventListener("timeupdate", updateTime)
           return () => {
            audioRef.current.removeEventListener("timeupdate", updateTime);
          }
        }
    })

    const togglePlay = () => {
        if(paused) {

                audioRef.current.play();
                setPaused(false);

        } else {

                audioRef.current.pause();
                setPaused(true);

        }
    }

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

    const handleDrag = (e) => {
        e.preventDefault()
        if (e.screenX !== 0) {
            console.log("dragggg")
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
            setKnobStyle({left: `${percent}%`, transition: "none"});
            setRangeStyle({...rangeStyle,backgroundColor: `#5FBA56`, width: `${percent}%`, transition: "none"})
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
        setIsDragging(false);
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

    

    return (
        <div className="playbar">
            <section className="leftSide">

            </section>
            <section className="middle">
                <div className="middleTop">
                    <i class="fa-solid fa-shuffle"></i>
                    <i class="fa-solid fa-backward-step"></i>
                    <div className="playPause" onClick={togglePlay}>
                        {paused ? playCirc() : pauseCirc() }
                    </div>
                    <i class="fa-solid fa-forward-step"></i>
                    <i class="fa-solid fa-repeat"></i>
                    <audio onTimeUpdate={() => {}} src={`http://donkeypuzzletree.com/ether.mp3`} ref={audioRef} />
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

            </section>
        </div>
    )
}
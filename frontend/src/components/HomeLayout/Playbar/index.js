import "./Playbar.css"

export default function Playbar() {
    return (
        <div className="playbar">
            <section className="leftSide">

            </section>
            <section className="middle">
                <div className="middleTop">
                    <i class="fa-solid fa-shuffle"></i>
                    <i class="fa-solid fa-backward-step"></i>
                    <i class="fa-solid fa-circle-play"></i>
                    <i class="fa-solid fa-forward-step"></i>
                    <i class="fa-solid fa-repeat"></i>
                </div>
                <div className="middleBottom">
                    <div className="track">
                        <div className="knob"></div>
                    </div>
                </div>
            </section>
            <section className="rightSide">

            </section>
        </div>
    )
}
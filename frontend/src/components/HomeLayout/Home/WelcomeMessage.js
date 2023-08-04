import { useSelector } from "react-redux"

export default function WelcomeMessage() {
    const sessionUser = useSelector(state => state.session.user)

    return (
        <div className="welcomeMessage" style={{paddingTop: "66px"}}>
            <h2>
                Welcome to Oughtify, the platform that features songs that <i>ought to</i> be on Spotify.
            </h2>
            {!sessionUser && (
                <h3  style={{paddingTop: "32px"}}>
                    Sign up or log in to explore.
                </h3>
            )}
        </div>
    )
}
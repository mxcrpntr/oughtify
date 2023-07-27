import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import AlbumsIndex from './AlbumsIndex'
import './ArtistShow.css'

export default function ArtistShow() {

    const artistBannerStyle = {
        backgroundImage: `url(https://americansongwriter.com/wp-content/uploads/2022/07/Joni-Mitchell-by-Norman-Seeff.jpg?fit=2000%2C800)`
    }
    const topPadding = {
        paddingTop: `88px`,
    }

    return (
        <>
            <div className="artistBanner" style={artistBannerStyle}>
            </div>
            <div className='artistHeaders' style={topPadding}>
                <h5><i class="fa-solid fa-circle-check" color="#3D91F4"></i> Verified Artist</h5>
                <h1>Joni Mitchell</h1>

                <h4>5,090,991,345 monthly listeners</h4>
            </div>
            <div className='opaqueBkgd'>
                <div className='popularSongs'>
                    <h2>Popular</h2>
                    <table>
                        <tr>
                            <td><span className='songInfoSpan'><span className='number'>1</span>
                            <img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img>
                            <Link to="/artists">Song Title Number one</Link></span></td>
                            <td>5,436,444</td>
                            <td>5:01</td>
                        </tr>

                        <tr>
                            <td><span className='songInfoSpan'>2
                            <img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img>
                            <Link to="/artists">Song Title Number one</Link></span></td>
                            <td>4,444</td>
                            <td>5:01</td>
                        </tr>

                        <tr>
                            <td><span className='songInfoSpan'>3
                            <img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img>
                            <Link to="/artists">Song Title 88329849248294 one</Link></span></td>
                            <td>5,436,444</td>
                            <td>5:01</td>
                        </tr>

                        <tr>
                            <td><span className='songInfoSpan'>4
                            <img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img>
                            <Link to="/artists">Song  Number 2</Link></span></td>
                            <td>5,436,444</td>
                            <td>5:01</td>
                        </tr>

                        <tr>
                            <td><span className='songInfoSpan'>5
                            <img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img>
                            <Link to="/artists">Song Title Number one</Link></span></td>
                            <td>5,436,444</td>
                            <td>5:01</td>
                        </tr>
                    </table>
                </div>
                <div className='discog'>
                    <h2>Discography</h2>
                    <AlbumsIndex />
                </div>
            </div>

        </>
    )
}
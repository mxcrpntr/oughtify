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

                <span className="bigButtons">
                    <button className="bigPlay"><i class="fa-solid fa-play"></i></button>
                    <span className="bigHeart"><i class="fa-regular fa-heart"></i></span>
                    <span className="bigDots"><i class="fa-solid fa-ellipsis"></i></span>
                </span>
                    <h2>Popular</h2>
                    <table>
                        <tr>
                                {/* <span className='songInfoSpan'> */}
                            <td className='col1'>1</td>
                            <td className='col2'> <img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img></td>
                            <td className='col3'><Link to="/albums">Song Title Number one</Link></td>

                                {/* </span> */}
                            <td className='col4'>5,436,444</td>
                            <td className='col5'>5:01</td>
                        </tr>

                        <tr>
                                {/* <span className='songInfoSpan'> */}
                            <td className='col1'>2</td>
                            <td className='col2'> <img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img></td>
                            <td className='col3'><Link to="/albums">Song Title Number one</Link></td>

                                {/* </span> */}
                            <td className='col4'>5,436,444</td>
                            <td className='col5'>5:01</td>
                        </tr>

                        <tr>
                                {/* <span className='songInfoSpan'> */}
                            <td className='col1'>3</td>
                            <td className='col2'> <img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img></td>
                            <td className='col3'><Link to="/albums">Song Title Number one</Link></td>

                                {/* </span> */}
                            <td className='col4'>5,436,444</td>
                            <td className='col5'>5:01</td>
                        </tr>
                        <tr>
                                {/* <span className='songInfoSpan'> */}
                            <td className='col1'>4</td>
                            <td className='col2'> <img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img></td>
                            <td className='col3'><Link to="/albums">Song Title Number one</Link></td>

                                {/* </span> */}
                            <td className='col4'>5,436,444</td>
                            <td className='col5'>5:01</td>
                        </tr>


                        <tr>
                                {/* <span className='songInfoSpan'> */}
                            <td className='col1'>5</td>
                            <td className='col2'> <img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img></td>
                            <td className='col3'><Link to="/albums">Song Title Number one</Link></td>

                                {/* </span> */}
                            <td className='col4'>5,436,444</td>
                            <td className='col5'>5:01</td>
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
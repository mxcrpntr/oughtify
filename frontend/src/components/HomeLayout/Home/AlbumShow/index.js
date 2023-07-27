import { Link } from "react-router-dom/cjs/react-router-dom.min"
import AlbumsIndex from "../ArtistShow/AlbumsIndex"
import './AlbumShow.css'

export default function AlbumShow() {

    // const topPadding = {
    //     paddingTop: `88px`,
    // }
    return (
        <>
            <div className="albumShowTop">
                <div className="albumImage">
                    <img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img>
                </div>
                <div className='albumHeaders'>
                    <h4>Album</h4>
                    <h1>Court and Spark</h1>

                    <h5>
                        <img src="https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg"></img>
                        <Link to="/artists">Joni Mitchell</Link> &nbsp;· 1974 · 5 songs, <span className="albumLength">54 min 57 sec</span>

                    </h5>
                </div>
            </div>
            <div className=''>
                <div className='trackList'>
                
                    <table>
                    <tr>
                            <td>#</td>
                            <td>
                                Title
                            </td>
                            <td><i class="fa-regular fa-clock"></i></td>
                        </tr>
                        <hr></hr>
                        <tr>
                            <td>1</td>
                            <td>
                                <ul>
                                    <li>SOoooogODOong 1111111</li>
                                    <li>Joni Mitcell</li>
                                </ul>
                            </td>
                            <td>5:01</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>
                                <ul>
                                    <li>son twotw</li>
                                    <li>Joni Mitcell</li>
                                </ul>
                            </td>
                            <td>5:01</td>
                        </tr>

                        <tr>
                            <td>3</td>
                            <td>
                                <ul>
                                    <li>Threee221333333actiallythird</li>
                                    <li>Joni Mitcell</li>
                                </ul>
                            </td>
                            <td>5:01</td>
                        </tr>

                        <tr>
                            <td>4</td>
                            <td>
                                <ul>
                                    <li>fort song for</li>
                                    <li>Joni Mitcell</li>
                                </ul>
                            </td>
                            <td>5:01</td>
                        </tr>


                        <tr>
                            <td>5</td>
                            <td>
                                <ul>
                                    <li>it;s the last * fivfth song</li>
                                    <li>Joni Mitcell</li>
                                </ul>
                            </td>
                            <td>5:01</td>
                        </tr>
                    </table>
                </div>
                <div className='moreBy'>
                    <h2>More by Joni Mitchell</h2>
                    <AlbumsIndex />
                </div>
            </div>

        </>
    )
}
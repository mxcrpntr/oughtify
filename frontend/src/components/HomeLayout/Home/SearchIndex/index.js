import { useHistory, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchResults, fetchSearchResults } from "../../../../store/search";
import './SearchIndex.css'
export default function SearchIndex() {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const params = new URLSearchParams(location.search);
    const [query,setQuery] = useState(params.get("query"));
    const searchResults = useSelector(state => state.search)



    return (
        <div className="searchGrid" style={{paddingTop: '66px'}}>
                {searchResults.songs && Object.values(searchResults.songs).map(song => {
                    return (
                        <ul onClick={()=> {history.push(`/albums/${song.albumId}`)}}>
                            <div>

                            <li>{ song.imageUrl ? (
                                <img src={`${song.imageUrl}`}></img>
                            ) : (
                                <div className="imageStandIn" style={{backgroundColor: "#121212"}}></div>
                            )}
                            </li>
                            <li className="songTitle">{song.title}</li>

                            </div>
                            <div>

                            <li className="songArtistName">Song</li>
                            <li className="songArtistName fourth">{song.artistName}</li>
                            </div>
                        </ul>
                    )
                })}

                {searchResults.albums && Object.values(searchResults.albums).map(album => {
                    return (
                        <ul onClick={()=> {history.push(`/albums/${album.id}`)}}>
                            <div>
                            <li>{ album.imageUrl ? (
                                <img src={`${album.imageUrl}`}></img>
                            ) : (
                                <div className="imageStandIn" style={{backgroundColor: `${album.color}`}}></div>
                            )}
                            </li>
                            <li className="albumTitle">{album.title}</li>
                            </div>
                            <div>
                            <li className="albumArtistName">Album</li>
                            <li className="albumArtistName fourth">{album.artistName}</li>
                            </div>
                        </ul>
                    )
                })}

                {searchResults.artists && Object.values(searchResults.artists).map(artist => {
                    return (
                        <ul onClick={()=> {history.push(`/artists/${artist.id}`)}}>
                            <div>
                            <li>{ artist.imageUrl ? (
                                <img src={`${artist.imageUrl}`}></img>
                            ) : (
                                <div className="imageStandIn" style={{backgroundColor: "#121212"}}></div>
                            )}
                            </li>
                            <li className="artistName">{artist.name}</li>
                            </div>
                            <div></div>
                            {/* <li className="playlistUserName">{playlist.userName}</li> */}
                        </ul>
                        )
                })}

                {searchResults.playlists && Object.values(searchResults.playlists).map(playlist => {
                    return (
                    <ul onClick={()=> {history.push(`/playlists/${playlist.id}`)}}>
                        <div>
                        <li>{ playlist.imageUrl ? (
                            <img src={`${playlist.imageUrl}`}></img>
                        ) : (
                            <div className="imageStandIn" style={{backgroundColor: playlist.color}}></div>
                        )}
                        </li>
                        <li className="playlistTitle">{playlist.title}</li>
                        </div>
                        <div>
                        <li className="playlistUserName">Playlist</li>
                        <li className="playlistUserName fourth">{playlist.userName}</li>
                        </div>
                    </ul>
                    )
                })}
        </div>
    )
}
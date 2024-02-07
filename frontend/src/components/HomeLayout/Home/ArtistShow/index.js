import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import AlbumsIndex from './AlbumsIndex'
import './ArtistShow.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchArtist, getArtist, getArtistWithExtras } from '../../../../store/artists';
import { useEffect } from 'react';
import PopularSongItem from './PopularSongItem';


export const formatTime = (seconds) => {
    if (seconds && !isNaN(seconds)) {
        return new Date(seconds * 1000)
            .toISOString()
            .slice(11, 19)
            .replace(/^0(?:0:0?)?/, '');
    } else if (seconds === 0) {
        return '0:00';
    } else {
        return '-:--';
    }
} 


export default function ArtistShow({shiftPressed,ctrlPressed}) {

    const dispatch = useDispatch();
    const { artistId } = useParams();
    const { artist, albums, songs } = useSelector(getArtistWithExtras(artistId));


    

    useEffect(() => {
        dispatch(fetchArtist(artistId));
    }, [])

    let artistBannerStyle = {}

    if (artist?.bannerUrl) {
        artistBannerStyle = {
            backgroundImage: `url(${artist.bannerUrl})`
        }
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
                <h1>{artist?.name}</h1>

                <h4>1,234,567,890 monthly listeners</h4>
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
                        {[1,2,3,4,5].map(i=>{
                            return <PopularSongItem i={i} songs={
                                Object.values(songs)
                                    .sort((a,b) => b.plays - a.plays)
                            } albums={albums}/>
                        })}

                    </table>
                </div>
                <div className='discog'>
                    <h2>Discography</h2>
                    <AlbumsIndex albums={albums}/>
                </div>
            </div>

        </>
    )
}
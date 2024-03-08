export default function PlaylistImage({playlistSongs,setEditModalHidden,photoClickFunction,zeroImageMusicSymb,changePhotoHoverSymbText,oneImageCallback,workingImageUrl,playlist,sessionUser}) {
  return (
    <div className="playlistImage">
      {workingImageUrl ? (
        <div className="workingImageUrl" style={{backgroundImage: `url(${workingImageUrl})`}}></div>
      ) :
      ( <>
      {[...new Set(Object.values(playlistSongs).map(song => song.imageUrl))].length >= 4 ?
      (<div className="fourPlaylistImages" onClick={() => {if (sessionUser && sessionUser.id === playlist.userId) setEditModalHidden(false)}}>
          {[...new Set(Object.values(playlistSongs).map(song => song.imageUrl))].slice(0,4).map(imageUrl => {
              return (
                  <div className="fourthImage" style={{backgroundImage: `url("${imageUrl}")`}}></div>
              )
          })}
      </div>) :
      (<div className="onePlaylistImage"><div className="onethImage" style={oneImageCallback(playlistSongs)}>
          {Object.values(playlistSongs).length === 0 && (
              <div className="centerOfOne">{zeroImageMusicSymb()}</div>
          )}
      </div></div>)}
      </>
      )}
      {sessionUser && sessionUser.id === playlist.userId && (<div className="changePhotoOverlay" onClick={photoClickFunction}>{changePhotoHoverSymbText()}</div>)}
    </div>
  )
}
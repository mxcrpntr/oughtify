import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux"
import { updatePlaylist } from "../../../../store/playlists";
import PlaylistImage from "./PlaylistImage";


export default function EditPlaylistModal({playlist,setEditModalHidden,sessionUser,playlistSongs,zeroImageMusicSymb,changePhotoHoverSymbText,oneImageCallback}) {
  const dispatch = useDispatch();
  const [attemptPlaylistUpdate,setAttemptPlaylistUpdate] = useState(false);
  const [playlistTitle,setPlaylistTitle] = useState(playlist.title)
  const [localImageFile,setLocalImageFile] = useState();
  const [localImageFileSrc,setLocalImageFileSrc] = useState();
  const hiddenFileInputRef = useRef();

  const simulateFileInputClick = () => {
    if (hiddenFileInputRef.current) {
      hiddenFileInputRef.current.click();
    }
  }

  const handFileInputChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLocalImageFileSrc(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  useEffect(() => {
    console.log(localImageFileSrc)
  }, [localImageFileSrc])
  
  useEffect(() => {
    if (attemptPlaylistUpdate) {
      dispatch(updatePlaylist({id: playlist.id, playlist: {playlist_id: playlist.id, title: playlistTitle, user_id: sessionUser.id}}));
      setAttemptPlaylistUpdate(false);
      setEditModalHidden(true);
    }
  },[attemptPlaylistUpdate])

  return (
    <>
      <div className="editPlaylistModal">
        <div><h3>Edit details</h3><i class="fa-solid fa-x" onClick={() => {setEditModalHidden(true)}}></i></div>
        <div className="editModalInputs">
          <PlaylistImage
                playlistSongs={playlistSongs}
                setEditModalHidden={setEditModalHidden}
                photoClickFunction={simulateFileInputClick}
                zeroImageMusicSymb={zeroImageMusicSymb}
                changePhotoHoverSymbText={changePhotoHoverSymbText}
                oneImageCallback={oneImageCallback}
                workingImageUrl={localImageFileSrc}/>
          <div className="editModalTitle">
            <input type="text"
                   id="playlistTitle"
                   name="playlistTitle"
                   value={playlistTitle} 
                   onChange={(e)=> setPlaylistTitle(e.target.value)}></input>
            <input type="text"
                   id="playlistDescription"
                   name="playlistDescription"
                   value=""></input>
          </div>
        </div>
        <div className="editModalSave">
          <button onClick={() => {setAttemptPlaylistUpdate(true)}}>Save</button>
        </div>
        <div>
        </div>
        <input ref={hiddenFileInputRef} className="hiddenFileInput" type="file" accept="image/*" onChange={handFileInputChange} />
        <div>By proceeding, you agree to give Oughtify access to the image you choose to upload. Please make sure you have the right to upload the image.</div>
      </div>
      <div className="d"></div>
    </>
  )
}
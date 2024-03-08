import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux"
import { updatePlaylistTitle, updatePlaylistImage } from "../../../../store/playlists";
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
      setLocalImageFile(e.target.files[0])
      const reader = new FileReader();
      reader.onload = (e) => {
        setLocalImageFileSrc(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  
  useEffect(() => {
    if (attemptPlaylistUpdate) {
      if (playlistTitle !== playlist.title) {
        const updatePlaylistTitleParams = {title: playlistTitle, user_id: sessionUser.id}
        dispatch(updatePlaylistTitle({id: playlist.id, playlist: updatePlaylistTitleParams}));
      }
      if (localImageFile) {
        const updatePlaylistImageParams = {image_file: localImageFile, user_id: sessionUser.id}
        dispatch(updatePlaylistImage({id: playlist.id, playlist: updatePlaylistImageParams}))
      }
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
                workingImageUrl={localImageFileSrc ? localImageFileSrc : playlist.imageUrl}/>
          <div className="editModalTitle">
            <input type="text"
                   id="playlistTitle"
                   name="playlistTitle"
                   value={playlistTitle} 
                   onChange={(e)=> setPlaylistTitle(e.target.value)}
                   onKeyDown={(e) => {
                    if (e.keyCode === 32) {
                        e.stopPropagation();
                    }
                }}></input>
            <input type="text"
                   id="playlistDescription"
                   name="playlistDescription"
                   value=""
                   onKeyDown={(e) => {
                    if (e.keyCode === 32) {
                        e.stopPropagation();
                    }
                }}></input>
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
      <div className="editPlaylistModalBkgd"></div>
    </>
  )
}
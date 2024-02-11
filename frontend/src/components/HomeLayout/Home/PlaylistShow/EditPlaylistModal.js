

export default function EditPlaylistModal({playlist,setEditModalHidden}) {

  return (
    <div className="editPlaylistModal">
      <div><h3>Edit details</h3><i class="fa-solid fa-x" onClick={() => {setEditModalHidden(true)}}></i></div>
      <div className="editModalInputs">
        <div className="editModalImage">

        </div>
        <div className="editModalTitle">
          <input type="text" id="playlistTitle" name="playlistTitle" value={playlist.title}></input>
          <input type="text" id="playlistDescription" name="playlistDescription" value=""></input>
        </div>
      </div>
      <div className="editModalSave">
        <button value="Save"></button>
      </div>
      <div>By proceeding, you agree to give Oughtify access to the image you choose to upload. Please make sure you have the right to upload the image.</div>
    </div>
  )
}
# Oughtify

## [Oughtify Live](https://oughtify.onrender.com/)

# Description
Oughtify is a Spotify clone featuring artists and songs that are not currently (as of August 2023) on the official Spotify app. Users can play songs, albums, and playlists via a fully-interactive playbar, and will be able to create, update, and delete playlists, as well as like songs, albums, and playlists and follow users and artists. Further, the users will be able to add and delete songs from the song queue.

# Technology
## React Redux
The Oughtify stack uses `React Redux` on the frontend to render components and receive data and interact with clients.

## Ruby on Rails
Oughtify stores its seed data and any updates from the frontend it wants to store via `Ruby on Rails`.

## PostgreSQL
A `PostgreSQL` database is utilized to store the user, artist, album, song, playlist, likes, follows, etc., data.

# Features
## User Authentication
Users can sign up and log into and log out of Oughtify with password encryption and frontend and backend error handling.

## Artists, Albums, and Songs
Oughtify displays and allows users to interact with artist, album, and song data.

## Playbar (and Queue)
A fully interactive playbar allows users to play, pause, restart, drag into different times of, and—in the case of albums and playlists—jump next through songs, as well as change (depending on the song playing) the user's associated queue of songs to be played, which persists on the back end.

## Search
A searchbar and search index page allows users to get live updates of songs, albums, artists, and playlists that match simple regular-expression versions of input text.

## Playlists (TBD)
A user can create, update, delete and add/remove songs to/from (their own) playlists.

## Likes / Follows (TBD)
A user can like albums, songs, and playlists and follow artists and users.

## User Profiles (TBD)
Users can visit their own and other users' profiles and follow them, as well as edit their own info.

# Code Snippets
## Playbar onDrag functions
```javascript

    const handleDrag = (e) => {
        e.preventDefault()
        if (e.screenX !== 0) {
            setIsDragging(true);
            const rect = trackRef.current.getBoundingClientRect();
            const trackLength = rect.right - rect.left;
            percent = 0;
            const xPos = e.screenX
            if (xPos > rect.right) {
                percent = 100;
            } else if (xPos > rect.left) {
                percent = 100 * ((xPos - rect.left) / trackLength)
            }
            setCurrentSongTime(audioRef.current.duration * (percent / 100));
            if (sessionUser?.queue?.[0]) sessionUser.queue[0][1] = audioRef.current.duration * (percent / 100);
            setKnobStyle({left: `${percent}%`, transition: "none"});
            setRangeStyle({...rangeStyle,backgroundColor: `#5FBA56`, width: `${percent}%`, transition: "none"})
        }
    }

```

## JSON: Preparing album info and other entity info for Album Show page

```ruby
songs = []

json.album do
  json.extract! @album, :id, :title, :date, :song_ids, :artist_id, :length, :color
  json.set! :image_url, @album.image.url
  @album.song_ids.each { |song_id| songs << song_id }
end


json.songs do
    songs.each do |song_id|
        json.set! song_id do
            song = Song.find(song_id)
            json.extract! song, :id, :title, :length, :album_id, :plays, :number
            json.set! :file_url, song.file.url
        end
    end
end

artist = Artist.find(@album.artist_id)

json.artist do
    json.extract! artist, :id, :name, :bio, :album_ids
    json.set! :image_url, artist.image.url
end

more_albums = artist.album_ids.select { |album_id| album_id != @album.id }

json.more_albums do
    more_albums.each do |album_id|
        json.set! album_id do
            album = Album.find(album_id)
            json.extract! album, :id, :title, :date, :artist_id, :song_ids, :color
            json.image_url album.image.url
        end
    end
end
```

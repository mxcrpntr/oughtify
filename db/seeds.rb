# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    Artist.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating demo user..."
    # Create one user with an easy to remember username, email, and password:
    demo_user = User.create!({
      name: 'Demo-lition', 
      email: 'demo@user.io', 
      password: 'password',
      birth_date: Date.new(2020,2,2),
      queue: [""]
    })
    # demo_user.queue = []
    # demo_user.save!
    # More users

    puts "Creating dummy users..."

    10.times do 
      fake_user = User.create!({
        name: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password',
        birth_date: Date.new(2020,2,2),
        queue: [""]
      })
      # fake_user.queue = []
      # fake_user.save!
    end

    puts "Creating artists..."

    joni_mitchell = Artist.create!({
      name: 'Joni Mitchell',
      bio: 'Roberta Joan "Joni" Mitchell (née Anderson; born November 7, 1943) is a Canadian-American singer-songwriter and painter. As one of the most influential singer-songwriters to emerge from the 1960s folk music circuit, Mitchell became known for her starkly personal lyrics and unconventional compositions which grew to incorporate pop and jazz elements. She has received many accolades, including ten Grammy Awards and induction into the Rock and Roll Hall of Fame in 1997. Rolling Stone called her "one of the greatest songwriters ever", and AllMusic has stated, "When the dust settles, Joni Mitchell may stand as the most important and influential female recording artist of the late 20th century".'
    })

    require "open-uri"
  
    joni_image = URI.open("https://www.pbs.org/newshour/app/uploads/2015/04/3207326-1024x1015.jpg")
    joni_mitchell.image.attach(io: joni_image, filename: 'joni_image.jpg')

    joni_banner = URI.open("https://americansongwriter.com/wp-content/uploads/2022/07/Joni-Mitchell-by-Norman-Seeff.jpg?fit=2000%2C800")
    joni_mitchell.banner_image.attach(io: joni_banner, filename: 'joni_banner.jpg')

    puts "Creating albums and songs..."

    seagull = Album.create!({
      title: 'Song to a Seagull',
      artist_id: joni_mitchell.id,
      year: 1968
    })

    seagull_image = URI.open("https://m.media-amazon.com/images/I/A1ta1FmU1OL._UF1000,1000_QL80_.jpg")
    seagull.image.attach(io: seagull_image, filename: 'seagull.jpg')

    seagull_array = [
      ["I Had a King",217,"/Users/aa_student/Documents/Joni Mitchell. mp3@320/1968 - Song To A Seagull/01. I Had A King.mp3"],
      ["Michael from Mountains",221,"/Users/aa_student/Documents/Joni Mitchell. mp3@320/1968 - Song To A Seagull/02. Michael From Mountains.mp3"],
      ["Night in the City",149,"/Users/aa_student/Documents/Joni Mitchell. mp3@320/1968 - Song To A Seagull/03. Night In The City.mp3"],
      ["Marcie",275,"/Users/aa_student/Documents/Joni Mitchell. mp3@320/1968 - Song To A Seagull/04. Marcie.mp3"],
      ["Nathan La Franeer",200,"/Users/aa_student/Documents/Joni Mitchell. mp3@320/1968 - Song To A Seagull/05. Nathan La Franeer.mp3"],
      ["Sisotowbell Lane",245,"/Users/aa_student/Documents/Joni Mitchell. mp3@320/1968 - Song To A Seagull/06. Sisotowbell Lane.mp3"],
      ["The Dawntreader",304,"/Users/aa_student/Documents/Joni Mitchell. mp3@320/1968 - Song To A Seagull/07. The Dawntreader.mp3"],
      ["The Pirate of Penance",164,"/Users/aa_student/Documents/Joni Mitchell. mp3@320/1968 - Song To A Seagull/08. The Pirate Of Penance.mp3"],
      ["Song to a Seagull",231,"/Users/aa_student/Documents/Joni Mitchell. mp3@320/1968 - Song To A Seagull/09. Song To A Seagull.mp3"],
      ["Cactus Tree",278,"/Users/aa_student/Documents/Joni Mitchell. mp3@320/1968 - Song To A Seagull/10. Cactus Tree.mp3"]
    ]

    seagull_array.each_with_index do |song_info,i|
      seagull_song = Song.create!({
        title: song_info[0],
        album_id: seagull.id,
        number: i + 1,
        length: song_info[1]
      })

      seagull_song_file = File.open(song_info[2])
      seagull_song.file.attach(io: seagull_song_file, filename: "seagull_#{i+1}.mp3")
    end

    court_and_spark = Album.create!({
      title: 'Court and Spark',
      artist_id: joni_mitchell.id,
      year: 1974
    })

    court_image = URI.open("https://m.media-amazon.com/images/I/81oSoxCQKeL._UF1000,1000_QL80_.jpg")
    court_and_spark.image.attach(io: court_image, filename: 'court_and_spark.jpg')

    court_array = [
      ["Court and Spark",166,"/Users/aa_student/Documents/Joni\ Mitchell.\ mp3@320/1974\ -\ Court\ And\ Spark/01.\ Court\ And\ Spark.mp3"],
      ["Help Me",222,"/Users/aa_student/Documents/Joni\ Mitchell.\ mp3@320/1974\ -\ Court\ And\ Spark/02.\ Help\ Me.mp3"],
      ["Free Man in Paris",183,"/Users/aa_student/Documents/Joni\ Mitchell.\ mp3@320/1974\ -\ Court\ And\ Spark/03.\ Free\ Man\ In\ Paris.mp3"],
      ["People's Parties",135,"/Users/aa_student/Documents/Joni\ Mitchell.\ mp3@320/1974\ -\ Court\ And\ Spark/04.\ People\'s\ Parties.mp3"],
      ["Same Situation",177,"/Users/aa_student/Documents/Joni\ Mitchell.\ mp3@320/1974\ -\ Court\ And\ Spark/05.\ Same\ Situation.mp3"],
      ["Car on a Hill",182,"/Users/aa_student/Documents/Joni\ Mitchell.\ mp3@320/1974\ -\ Court\ And\ Spark/06.\ Car\ On\ A\ Hill.mp3"],
      ["Down to You",338,"/Users/aa_student/Documents/Joni\ Mitchell.\ mp3@320/1974\ -\ Court\ And\ Spark/07.\ Down\ To\ You.mp3"],
      ["Just Like This Train",264,"/Users/aa_student/Documents/Joni\ Mitchell.\ mp3@320/1974\ -\ Court\ And\ Spark/08.\ Just\ Like\ This\ Train.mp3"],
      ["Raised on Robbery",186,"/Users/aa_student/Documents/Joni\ Mitchell.\ mp3@320/1974\ -\ Court\ And\ Spark/09.\ Raised\ On\ Robbery.mp3"],
      ["Trouble Child",240,"/Users/aa_student/Documents/Joni\ Mitchell.\ mp3@320/1974\ -\ Court\ And\ Spark/10.\ Trouble\ Child.mp3"],
      ["Twisted",141,"/Users/aa_student/Documents/Joni\ Mitchell.\ mp3@320/1974\ -\ Court\ And\ Spark/11.\ Twisted.mp3"]
    ]

    court_array.each_with_index do |song_info,i|
      court_song = Song.create!({
        title: song_info[0],
        album_id: court_and_spark.id,
        number: i + 1,
        length: song_info[1]
      })

      court_song_file = File.open(song_info[2])
      court_song.file.attach(io: court_song_file, filename: "court_and_spark_#{i+1}.mp3")
    end

    puts "Creating five dummy playlists..."

    all_users = User.all
    all_songs = Song.all

    5.times do
      random_user = all_users.sample
      test_playlist = Playlist.create({
        title: "Untitled Playlist",
        user_id: random_user.id,
        public: true
      })
      i = 1
      while i <= 5 do
        test_playlist_song = PlaylistSong.create({
          playlist_id: test_playlist.id,
          song_id: all_songs.sample.id,
          song_number: i
        })
        # if i == 1
        #   first_song = Song.find(test_playlist_song.song_id)
        #   first_song_album = Album.find(first_song.album_id)
        #   test_playlist_image = URI.open(first_song_album.image.url)
        #   test_playlist.image.attach(io: test_playlist_image, filename: "test_playlist_#{SecureRandom.hex}.jpg")
        # end
        i += 1
      end
    end

    puts "Done!"
  end
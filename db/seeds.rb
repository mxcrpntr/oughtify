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
      queue: ""
    })
    # More users

    puts "Creating dummy users..."

    10.times do 
      fake_user = User.create!({
        name: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password',
        birth_date: Date.new(2020,2,2),
        queue: ""
      })
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
      ["I Had a King",217,"https://oughtify-seed.s3.amazonaws.com/01.+I+Had+A+King.mp3"],
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
      if i == 0
        seagull_song_file = URI.open(song_info[2])
        seagull_song.file.attach(io: seagull_song_file, filename: "seagull_#{i+1}.mp3")
      else
        seagull_song_file = File.open(song_info[2])
        seagull_song.file.attach(io: seagull_song_file, filename: "seagull_#{i+1}.mp3")
      end
    end

    clouds = Album.create!({
      title: 'Clouds',
      artist_id: joni_mitchell.id,
      year: 1969
    })


    clouds_array = [
      ['Tin Angel',249,],
      ['Chelsea Morning',155,],
      ["I Don't Know Where I Stand",193,],
      ['That Song About the Midway',177,],
      ['Roses Blue',232,],
      ['The Gallery',252,],
      ['I Think I Understand',267,],
      ['Songs to Aging Children Come',190,],
      ['The Fiddle and the Drum',169,],
      ['Both Sides, Now',274,]
    ]

    ladies_of_the_canyon = Album.create!({
      title: 'Ladies of the Canyon',
      artist_id: joni_mitchell.id,
      year: 1970
    })


    ladies_array = [
      ['Morning Morgantown',193,],
      ['For Free',271,],
      ['Conversation',447,],
      ['Ladies of the Canyon',213,],
      ['Willy',180,],
      ['The Arrangement',214,],
      ['Rainy Night House',204,],
      ['The Priest',220,],
      ['Blue Boy',174,],
      ['Big Yellow Taxi',135,],
      ['Woodstock',329,],
      ['The Circle Game',295,]
    ]

    blue = Album.create!({
      title: 'Blue',
      artist_id: joni_mitchell.id,
      year: 1971
    })

    blue_array = [
      ['All I Want',214,],
      ['My Old Man',214,],
      ['Little Green',207,],
      ['Carey',183,],
      ['Blue',185,],
      ['California',230,],
      ['This Flight Tonight',172,],
      ['River',245,],
      ['A Case of You',263,],
      ['The Last Time I Saw Richard',256,]
    ]

    for_the_roses = Album.create!({
      title: 'For the Roses',
      artist_id: joni_mitchell.id,
      year: 1972
    })

    roses_array = [
      ['Banquet',182,],
      ['Cold Blue Steel and Sweet Fire',257,],
      ['Barangrill',172,],
      ['Lesson in Survival',191,],
      ['Let the Wind Carry Me',236,],
      ['For the Roses',228,],
      ['See You Sometime',176,],
      ['Electricity',181,],
      ["You Turn Me On, I'm a Radio",159,],
      ['Blonde on the Bleachers',162,],
      ['Woman of Heart and Mind',158,],
      ["Judgement of the Moon and Stars (Ludwig's Tune)",319,]
    ]

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

    hissing_of_summer = Album.create!({
      title: 'The Hissing of Summer Lawns',
      artist_id: joni_mitchell.id,
      year: 1975
    })

    hissing_array = [
      ['In France They Kiss on Main Street',199,],
      ['The Jungle Line',266,],
      ['Edith and the Kingpin',217,],
      ["Don't Interrupt the Sorrow",245,],
      ['Shades of Scarlett Conquering',299,],
      ['The Hissing of Summer Lawns',181,],
      ['The Boho Dance',230,],
      ["Harry's House / Centerpiece",408,],
      ['Sweet Bird',252,],
      ['Shadows and Light',257,]
    ]

    hejira = Album.create!({
      title: 'Hejira',
      artist_id: joni_mitchell.id,
      year: 1976
    })

    hejira_array = [
      ['Coyote',301,],
      ['Amelia',361,],
      ['Furry Sings the Blues',307,],
      ['A Strange Boy',259,],
      ['Hejira',401,],
      ['Song for Sharon',518,],
      ['Black Crow',462,],
      ['Blue Motel Room',304,],
      ['Refuge of the Roads',398,]
    ]

    neil_young = Artist.create!({
      name: 'Neil Young',
      bio: 'Neil Percival Young (November 12, 1945) is a Canadian and American singer and songwriter. After embarking on a music career in Winnipeg in the 1960s, Young moved to Los Angeles, joining the folk-rock group Buffalo Springfield. Since the beginning of his solo career, often with backing by the band Crazy Horse, he has released critically acclaimed albums such as Everybody Knows This Is Nowhere (1969), After the Gold Rush (1970), Harvest (1972), On the Beach (1974), and Rust Never Sleeps (1979). He was also a part-time member of Crosby, Stills, Nash & Young, with whom he recorded the chart-topping 1970 album Déjà Vu.'
    })

    neil_young_album = Album.create!({
      title: 'Neil Young',
      artist_id: neil_young.id,
      year: 1968
    })

    young_album_array = [
      ['The Emperor of Wyoming',140,],
      ['The Loner',233,],
      ['If I Could Have Her Tonight',142,],
      ["I've Been Waiting for You",155,],
      ['The Old Laughing Lady',358,],
      ['String Quartet from Whiskey Boot Hill',58,],
      ['Here We Are in the Years',207,],
      ['What Did You Do to My Life?',148,],
      ["I've Loved Her So Long",161,],
      ['The Last Trip to Tulsa',567,]
    ]

    everybody_knows = Album.create!({
      title: 'Everybody Knows This Is Nowhere',
      artist_id: neil_young.id,
      year: 1969
    })

    everybody_array = [
      ['Cinnamon Girl',180,],
      ['Everybody Knows This Is Nowhere',148,],
      ["Round & Round (It Won't Be Long)",353,],
      ['Down by the River',556,],
      ["The Losing End (When You're On)",247,],
      ['Running Dry (Requiem for the Rockets)',336,],
      ['Cowgirl in the Sand',607,]
    ]

    after_the_gold_rush = Album.create!({
      title: 'After the Gold Rush',
      artist_id: neil_young.id,
      year: 1970
    })

    gold_rush_array = [
      ['Tell Me Why',178,],
      ['After the Gold Rush',226,],
      ['Only Love Can Break Your Heart',188,],
      ['Southern Man',332,],
      ['Till the Morning Comes',80,],
      ['Oh, Lonesome Me',230,],
      ["Don't Let It Bring You Down",177,],
      ['Birds',153,],
      ['When You Dance I Can Really Love',245,],
      ['I Believe in You',207,],
      ['Cripple Creek Ferry',93,]
    ]

    harvest = Album.create!({
      title: 'Harvest',
      artist_id: neil_young.id,
      year: 1972
    })

    harvest_array = [
      ['Out on the Weekend',274,],
      ['Harvest',191,],
      ['A Man Needs a Maid',245,],
      ['Heart of Gold',187,],
      ['Are You Ready for the Country?',203,],
      ['Old Man',204,],
      ["There's a World",179,],
      ['Alabama',242,],
      ['The Needle and the Damage Done',123,],
      ['Words (Between the Lines of Age)',400,]
    ]

    on_the_beach = Album.create!({
      title: 'On the Beach',
      artist_id: neil_young.id,
      year: 1974
    })


    beach_array = [
      ['Walk On',162,],
      ['See the Sky About to Rain',302,],
      ['Revolution Blues',243,],
      ['For the Turnstiles',195,],
      ['Vampire Blues',254,],
      ['On the Beach',419,],
      ['Motion Pictures',263,],
      ['Ambulance Blues',446,]
    ]

    joanna_newsom = Artist.create!({
      name: 'Joanna Newsom',
      bio: 'Joanna Caroline Newsom (born January 18, 1982) is an American singer-songwriter and actress. Born and raised in Northern California, Newsom was classically trained on the harp in her youth and began her musical career as a keyboardist in the San Francisco-based indie band the Pleased. After recording and self-releasing two EPs in 2002, Newsom was signed to the independent label Drag City. Her debut album, The Milk-Eyed Mender, was released in 2004 to critical acclaim and garnered Newsom an underground following. She would receive wider exposure with the release of Ys (2006), which charted at number 134 on the Billboard 200 and was nominated for a 2007 Shortlist Music Prize. She released two further albums: Have One on Me (2010), and Divers (2015), the latter of which outsold all of her previous albums. Newsom has been noted by critics for her unique musical style, sometimes characterized as progressive folk, and for her prominent use of harp instrumentation. She has also appeared as an actress with roles in the television series Portlandia and in the 2014 film Inherent Vice.'
    })

    milk_eyed_mender = Album.create!({
      title: 'The Milk-Eyed Mender',
      artist_id: joanna_newsom.id,
      year: 2004
    })

    milk_eyed_array = [
      ['Bridges and Balloons',222,],
      ['Sprout and the Bean',272,],
      ['The Book of Right-On',269,],
      ['Sadie',362,],
      ['Inflammatory Writ',170,],
      ['This Side of the Blue',321,],
      [`"En Gallop"`,307,],
      ['Cassiopeia',200,],
      ['Peach, Plum, Pear',214,],
      ['Swansea',305,],
      ['Three Little Babes',222,],
      ['Clam, Crab, Cockle, Cowrie',261,]
    ]

    ys = Album.create!({
      title: 'Ys',
      artist_id: joanna_newsom.id,
      year: 2006
    })

    ys_array = [
      ['Emily',728,],
      ['Monkey & Bear',568,],
      ['Sawdust & Diamonds',595,],
      ['Only Skin',1013,],
      ["Cosmia",437,]
    ]

    have_one_on_me = Album.create!({
      title: 'Have One on Me',
      artist_id: joanna_newsom.id,
      year: 2010
    })

    have_one_array = [
      ["Easy",364,],
      ["Have One on Me",662,],
      ["'81",231,],
      ["Good Intentions Paving Co.",422,],
      ["No Provenance",385,],
      ["Baby Birch",570,],
      ["On a Good Day",108,],
      ["You and Me, Bess",432,],
      ["In California",521,],
      ["Jackrabbits",263,],
      ["Go Long",482,],
      ["Occident",331,],
      ["Soft as Chalk",389,],
      ["Esme",476,],
      ["Autumn",481,],
      ["Ribbon Bows",370,],
      ["Kingfisher",551,],
      ["Does Not Suffice",404,]
    ]

    jeff_mills = Artist.create!({
      name: 'Jeff Mills',
      bio: 'Jeff Mills is a leading figure in the history of electronic music. Born in Detroit in 1963, he was not even twenty when he started airing six radio shows a week in his hometown. At that time he mixed New Wave, Industrial Music, Electro-Pop, Detroit Techno and Chicago House. In 1988, he entered into music production when, together with Tony Srock, he founded Final Cut. He left in 1990 and along with Mike Banks – another leading figure on the Detroit scene- set up the mythic label and collective: Underground Resistance. However wanting to go in his own direction and develop a more personal esthetic experience, he created his own label Axis Records in 1992 and also collaborated with Tresor in Berlin.'
    })

    waveform_one = Album.create!({
      title: 'Waveform Transmission Vol. 1',
      artist_id: jeff_mills.id,
      year: 1993
    })

    wave_one_array = [
      ['Phase 4',287,],
      ['Jerical',327,],
      ['Changes of Life',291,],
      ['Berlin',355,],
      ['The Hacker',261,],
      ['Late Night',286,],
      ['DNA',248,],
      ['Man-Like',289,]
    ]

    waveform_three = Album.create!({
      title: 'Waveform Transmission Vol. 3',
      artist_id: jeff_mills.id,
      year: 1994
    })

    wave_three_array = [
      ['The Extremist',255,],
      ['Solid Sleep',227,],
      ['Life Cycle',233,],
      ['Workers',198,],
      ['Wrath of the Punisher',229,],
      ['DNA',218,],
      ['Condor to Mallorca',340,],
      ['Basic Human Design',352,]
    ]

    fred_frith = Artist.create!({
      name: 'Fred Frith',
      bio: 'Jeremy Webster "Fred" Frith (born 17 February 1949) is an English multi-instrumentalist, composer, and improviser. Probably best known for his guitar work, Frith first came to attention as one of the founding members of the English avant-rock group Henry Cow. He was also a member of the groups Art Bears, Massacre, and Skeleton Crew. He has collaborated with a number of prominent musicians, including Robert Wyatt, Derek Bailey, the Residents, Lol Coxhill, John Zorn, Brian Eno, Mike Patton, Lars Hollmer, Bill Laswell, Iva Bittová, Jad Fair, Kramer, the ARTE Quartett, and Bob Ostertag. He has also composed several long works, including Traffic Continues (1996, performed 1998 by Frith and Ensemble Modern) and Freedom in Fragments (1993, performed 1999 by Rova Saxophone Quartet). Frith produces most of his own music, and has also produced many albums by other musicians, including Curlew, the Muffins, Etron Fou Leloublan, and Orthotonics.'
    })

    guitar_solos = Album.create!({
      title: 'Guitar Solos',
      artist_id: fred_frith.id,
      year: 1974
    })


    
    gravity = Album.create!({
      title: 'Gravity',
      artist_id: fred_frith.id,
      year: 1980
    })

    speechless = Album.create!({
      title: 'Speechless',
      artist_id: fred_frith.id,
      year: 1981
    })

    puts "Creating five dummy playlists..."

    all_users = User.all
    all_songs = Song.all

    5.times do
      random_user = all_users.sample
      test_playlist = Playlist.create({
        title: "Untitled Playlist",
        user_id: random_user.id,
        public: true,
        color: "##{SecureRandom.hex(3)}"
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
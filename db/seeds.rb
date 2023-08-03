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
  
    joni_image = URI.open("https://oughtify-seed.s3.amazonaws.com/joni/joni_image.jpeg")
    joni_mitchell.image.attach(io: joni_image, filename: 'joni_image.jpeg')

    joni_banner = URI.open("https://oughtify-seed.s3.amazonaws.com/joni/joni_banner.png")
    joni_mitchell.banner_image.attach(io: joni_banner, filename: 'joni_banner.png')

    puts "Creating albums and songs..."

    seagull = Album.create!({
      title: 'Song to a Seagull',
      artist_id: joni_mitchell.id,
      year: 1968
    })

    seagull_image = URI.open("https://oughtify-seed.s3.amazonaws.com/joni/1968+-+Song+To+A+Seagull/seagull.jpg")
    seagull.image.attach(io: seagull_image, filename: 'seagull.jpg')

    seagull_array = [
      ["I Had a King",217,"https://oughtify-seed.s3.amazonaws.com/joni/1968+-+Song+To+A+Seagull/01.+I+Had+A+King.mp3"],
      ["Michael from Mountains",221,"https://oughtify-seed.s3.amazonaws.com/joni/1968+-+Song+To+A+Seagull/02.+Michael+From+Mountains.mp3"],
      ["Night in the City",149,"https://oughtify-seed.s3.amazonaws.com/joni/1968+-+Song+To+A+Seagull/03.+Night+In+The+City.mp3"],
      ["Marcie",275,"https://oughtify-seed.s3.amazonaws.com/joni/1968+-+Song+To+A+Seagull/04.+Marcie.mp3"],
      ["Nathan La Franeer",200,"https://oughtify-seed.s3.amazonaws.com/joni/1968+-+Song+To+A+Seagull/05.+Nathan+La+Franeer.mp3"],
      ["Sisotowbell Lane",245,"https://oughtify-seed.s3.amazonaws.com/joni/1968+-+Song+To+A+Seagull/06.+Sisotowbell+Lane.mp3"],
      ["The Dawntreader",304,"https://oughtify-seed.s3.amazonaws.com/joni/1968+-+Song+To+A+Seagull/07.+The+Dawntreader.mp3"],
      ["The Pirate of Penance",164,"https://oughtify-seed.s3.amazonaws.com/joni/1968+-+Song+To+A+Seagull/08.+The+Pirate+Of+Penance.mp3"],
      ["Song to a Seagull",231,"https://oughtify-seed.s3.amazonaws.com/joni/1968+-+Song+To+A+Seagull/09.+Song+To+A+Seagull.mp3"],
      ["Cactus Tree",278,"https://oughtify-seed.s3.amazonaws.com/joni/1968+-+Song+To+A+Seagull/10.+Cactus+Tree.mp3"]
    ]

    seagull_array.each_with_index do |song_info,i|
      seagull_song = Song.create!({
        title: song_info[0],
        album_id: seagull.id,
        number: i + 1,
        length: song_info[1]
      })
      seagull_song_file = URI.open(song_info[2])
      seagull_song.file.attach(io: seagull_song_file, filename: "seagull_#{i+1}.mp3")
    end

    clouds = Album.create!({
      title: 'Clouds',
      artist_id: joni_mitchell.id,
      year: 1969
    })

    clouds_image = URI.open("https://oughtify-seed.s3.amazonaws.com/joni/1969+-+Clouds/clouds.jpg")
    clouds.image.attach(io: clouds_image, filename: 'clouds.jpg')

    clouds_array = [
      ['Tin Angel',249,"https://oughtify-seed.s3.amazonaws.com/joni/1969+-+Clouds/01.+Tin+Angel.mp3"],
      ['Chelsea Morning',155,"https://oughtify-seed.s3.amazonaws.com/joni/1969+-+Clouds/02.+Chelsea+Morning.mp3"],
      ["I Don't Know Where I Stand",193,"https://oughtify-seed.s3.amazonaws.com/joni/1969+-+Clouds/03.+I+Don't+Know+Where+I+Stand.mp3"],
      ['That Song About the Midway',177,"https://oughtify-seed.s3.amazonaws.com/joni/1969+-+Clouds/04.+That+Song+About+The+Midway.mp3"],
      ['Roses Blue',232,"https://oughtify-seed.s3.amazonaws.com/joni/1969+-+Clouds/05.+Roses+Blue.mp3"],
      ['The Gallery',252,"https://oughtify-seed.s3.amazonaws.com/joni/1969+-+Clouds/06.+The+Gallery.mp3"],
      ['I Think I Understand',267,"https://oughtify-seed.s3.amazonaws.com/joni/1969+-+Clouds/07.+I+Think+I+Understand.mp3"],
      ['Songs to Aging Children Come',190,"https://oughtify-seed.s3.amazonaws.com/joni/1969+-+Clouds/08.+Songs+To+Aging+Children+Come.mp3"],
      ['The Fiddle and the Drum',169,"https://oughtify-seed.s3.amazonaws.com/joni/1969+-+Clouds/09.+The+Fiddle+And+The+Drum.mp3"],
      ['Both Sides, Now',274,"https://oughtify-seed.s3.amazonaws.com/joni/1969+-+Clouds/10.+Both+Sides%2C+Now.mp3"]
    ]

    clouds_array.each_with_index do |song_info,i|
      clouds_song = Song.create!({
        title: song_info[0],
        album_id: clouds.id,
        number: i + 1,
        length: song_info[1]
      })
      clouds_song_file = URI.open(song_info[2])
      clouds_song.file.attach(io: clouds_song_file, filename: "clouds_#{i+1}.mp3")
    end

    ladies_of_the_canyon = Album.create!({
      title: 'Ladies of the Canyon',
      artist_id: joni_mitchell.id,
      year: 1970
    })

    ladies_image = URI.open("https://oughtify-seed.s3.amazonaws.com/joni/1970+-+Ladies+Of+The+Canyon/canyon.jpg")
    ladies_of_the_canyon.image.attach(io: ladies_image, filename: 'ladies.jpg')

    ladies_array = [
      ['Morning Morgantown',193,"https://oughtify-seed.s3.amazonaws.com/joni/1970+-+Ladies+Of+The+Canyon/01.+Morning+Morgantown.mp3"],
      ['For Free',271,"https://oughtify-seed.s3.amazonaws.com/joni/1970+-+Ladies+Of+The+Canyon/02.+For+Free.mp3"],
      ['Conversation',447,"https://oughtify-seed.s3.amazonaws.com/joni/1970+-+Ladies+Of+The+Canyon/03.+Conversation.mp3"],
      ['Ladies of the Canyon',213,"https://oughtify-seed.s3.amazonaws.com/joni/1970+-+Ladies+Of+The+Canyon/04.+Ladies+Of+The+Canyon.mp3"],
      ['Willy',180,"https://oughtify-seed.s3.amazonaws.com/joni/1970+-+Ladies+Of+The+Canyon/05.+Willy.mp3"],
      ['The Arrangement',214,"https://oughtify-seed.s3.amazonaws.com/joni/1970+-+Ladies+Of+The+Canyon/06.+The+Arrangement.mp3"],
      ['Rainy Night House',204,"https://oughtify-seed.s3.amazonaws.com/joni/1970+-+Ladies+Of+The+Canyon/07.+Rainy+Night+House.mp3"],
      ['The Priest',220,"https://oughtify-seed.s3.amazonaws.com/joni/1970+-+Ladies+Of+The+Canyon/08.+The+Priest.mp3"],
      ['Blue Boy',174,"https://oughtify-seed.s3.amazonaws.com/joni/1970+-+Ladies+Of+The+Canyon/09.+Blue+Boy.mp3"],
      ['Big Yellow Taxi',135,"https://oughtify-seed.s3.amazonaws.com/joni/1970+-+Ladies+Of+The+Canyon/10.+Big+Yellow+Taxi.mp3"],
      ['Woodstock',329,"https://oughtify-seed.s3.amazonaws.com/joni/1970+-+Ladies+Of+The+Canyon/11.+Woodstock.mp3"],
      ['The Circle Game',295,"https://oughtify-seed.s3.amazonaws.com/joni/1970+-+Ladies+Of+The+Canyon/12.+The+Circle+Game.mp3"]
    ]

    ladies_array.each_with_index do |song_info,i|
      ladies_song = Song.create!({
        title: song_info[0],
        album_id: ladies_of_the_canyon.id,
        number: i + 1,
        length: song_info[1]
      })
      ladies_song_file = URI.open(song_info[2])
      ladies_song.file.attach(io: ladies_song_file, filename: "ladies_#{i+1}.mp3")
    end


    blue = Album.create!({
      title: 'Blue',
      artist_id: joni_mitchell.id,
      year: 1971
    })

    blue_image = URI.open("https://oughtify-seed.s3.amazonaws.com/joni/1971+-+Blue/blue.jpg")
    blue.image.attach(io: blue_image, filename: 'blue.jpg')

    blue_array = [
      ['All I Want',214,"https://oughtify-seed.s3.amazonaws.com/joni/1971+-+Blue/01.+All+I+Want.mp3"],
      ['My Old Man',214,"https://oughtify-seed.s3.amazonaws.com/joni/1971+-+Blue/02.+My+Old+Man.mp3"],
      ['Little Green',207,"https://oughtify-seed.s3.amazonaws.com/joni/1971+-+Blue/03.+Little+Green.mp3"],
      ['Carey',183,"https://oughtify-seed.s3.amazonaws.com/joni/1971+-+Blue/04.+Carey.mp3"],
      ['Blue',185,"https://oughtify-seed.s3.amazonaws.com/joni/1971+-+Blue/05.+Blue.mp3"],
      ['California',230,"https://oughtify-seed.s3.amazonaws.com/joni/1971+-+Blue/06.+California.mp3"],
      ['This Flight Tonight',172,"https://oughtify-seed.s3.amazonaws.com/joni/1971+-+Blue/07.+This+Flight+Tonight.mp3"],
      ['River',245,"https://oughtify-seed.s3.amazonaws.com/joni/1971+-+Blue/08.+River.mp3"],
      ['A Case of You',263,"https://oughtify-seed.s3.amazonaws.com/joni/1971+-+Blue/09.+A+Case+Of+You.mp3"],
      ['The Last Time I Saw Richard',256,"https://oughtify-seed.s3.amazonaws.com/joni/1971+-+Blue/10.+The+Last+Time+I+Saw+Richard.mp3"]
    ]

    blue_array.each_with_index do |song_info,i|
      blue_song = Song.create!({
        title: song_info[0],
        album_id: blue.id,
        number: i + 1,
        length: song_info[1]
      })
      blue_song_file = URI.open(song_info[2])
      blue_song.file.attach(io: blue_song_file, filename: "blue_#{i+1}.mp3")
    end

    for_the_roses = Album.create!({
      title: 'For the Roses',
      artist_id: joni_mitchell.id,
      year: 1972
    })


    roses_image = URI.open("https://oughtify-seed.s3.amazonaws.com/joni/1972+-+For+The+Roses/roses.jpg")
    for_the_roses.image.attach(io: roses_image, filename: 'roses.jpg')

    roses_array = [
      ['Banquet',182,"https://oughtify-seed.s3.amazonaws.com/joni/1972+-+For+The+Roses/01.+Banquet.mp3"],
      ['Cold Blue Steel and Sweet Fire',257,"https://oughtify-seed.s3.amazonaws.com/joni/1972+-+For+The+Roses/02.+Cold+Blue+Steel+And+Sweet+Fire.mp3"],
      ['Barangrill',172,"https://oughtify-seed.s3.amazonaws.com/joni/1972+-+For+The+Roses/03.+Barangrill.mp3"],
      ['Lesson in Survival',191,"https://oughtify-seed.s3.amazonaws.com/joni/1972+-+For+The+Roses/04.+Lesson+In+Survival.mp3"],
      ['Let the Wind Carry Me',236,"https://oughtify-seed.s3.amazonaws.com/joni/1972+-+For+The+Roses/05.+Let+The+Wind+Carry+Me.mp3"],
      ['For the Roses',228,"https://oughtify-seed.s3.amazonaws.com/joni/1972+-+For+The+Roses/06.+For+The+Roses.mp3"],
      ['See You Sometime',176,"https://oughtify-seed.s3.amazonaws.com/joni/1972+-+For+The+Roses/07.+See+You+Sometime.mp3"],
      ['Electricity',181,"https://oughtify-seed.s3.amazonaws.com/joni/1972+-+For+The+Roses/08.+Electricity.mp3"],
      ["You Turn Me On, I'm a Radio",159,"https://oughtify-seed.s3.amazonaws.com/joni/1972+-+For+The+Roses/09.+You+Turn+Me+On+I'm+A+Radio.mp3"],
      ['Blonde on the Bleachers',162,"https://oughtify-seed.s3.amazonaws.com/joni/1972+-+For+The+Roses/10.+Blonde+In+The+Bleachers.mp3"],
      ['Woman of Heart and Mind',158,"https://oughtify-seed.s3.amazonaws.com/joni/1972+-+For+The+Roses/11.+Woman+Of+Heart+And+Mind.mp3"],
      ["Judgement of the Moon and Stars (Ludwig's Tune)",319,"https://oughtify-seed.s3.amazonaws.com/joni/1972+-+For+The+Roses/12.+Judgement+Of+The+Moon+And+Stars+(Ludwig's+Tune).mp3"]
    ]

    roses_array.each_with_index do |song_info,i|
      roses_song = Song.create!({
        title: song_info[0],
        album_id: for_the_roses.id,
        number: i + 1,
        length: song_info[1]
      })
      roses_song_file = URI.open(song_info[2])
      roses_song.file.attach(io: roses_song_file, filename: "roses_#{i+1}.mp3")
    end

    court_and_spark = Album.create!({
      title: 'Court and Spark',
      artist_id: joni_mitchell.id,
      year: 1974
    })

    court_image = URI.open("https://oughtify-seed.s3.amazonaws.com/joni/1974+-+Court+And+Spark/court.jpg")
    court_and_spark.image.attach(io: court_image, filename: 'court_and_spark.jpg')

    court_array = [
      ["Court and Spark",166,"https://oughtify-seed.s3.amazonaws.com/joni/1974+-+Court+And+Spark/01.+Court+And+Spark.mp3"],
      ["Help Me",222,"https://oughtify-seed.s3.amazonaws.com/joni/1974+-+Court+And+Spark/02.+Help+Me.mp3"],
      ["Free Man in Paris",183,"https://oughtify-seed.s3.amazonaws.com/joni/1974+-+Court+And+Spark/03.+Free+Man+In+Paris.mp3"],
      ["People's Parties",135,"https://oughtify-seed.s3.amazonaws.com/joni/1974+-+Court+And+Spark/04.+People's+Parties.mp3"],
      ["Same Situation",177,"https://oughtify-seed.s3.amazonaws.com/joni/1974+-+Court+And+Spark/05.+Same+Situation.mp3"],
      ["Car on a Hill",182,"https://oughtify-seed.s3.amazonaws.com/joni/1974+-+Court+And+Spark/06.+Car+On+A+Hill.mp3"],
      ["Down to You",338,"https://oughtify-seed.s3.amazonaws.com/joni/1974+-+Court+And+Spark/07.+Down+To+You.mp3"],
      ["Just Like This Train",264,"https://oughtify-seed.s3.amazonaws.com/joni/1974+-+Court+And+Spark/08.+Just+Like+This+Train.mp3"],
      ["Raised on Robbery",186,"https://oughtify-seed.s3.amazonaws.com/joni/1974+-+Court+And+Spark/09.+Raised+On+Robbery.mp3"],
      ["Trouble Child",240,"https://oughtify-seed.s3.amazonaws.com/joni/1974+-+Court+And+Spark/10.+Trouble+Child.mp3"],
      ["Twisted",141,"https://oughtify-seed.s3.amazonaws.com/joni/1974+-+Court+And+Spark/11.+Twisted.mp3"]
    ]

    court_array.each_with_index do |song_info,i|
      court_song = Song.create!({
        title: song_info[0],
        album_id: court_and_spark.id,
        number: i + 1,
        length: song_info[1]
      })

      court_song_file = URI.open(song_info[2])
      court_song.file.attach(io: court_song_file, filename: "court_and_spark_#{i+1}.mp3")
    end

    hissing_of_summer = Album.create!({
      title: 'The Hissing of Summer Lawns',
      artist_id: joni_mitchell.id,
      year: 1975
    })

    hissing_image = URI.open("https://oughtify-seed.s3.amazonaws.com/joni/1975+-+The+Hissing+Of+Summer+Lawns/hissing.jpg")
    hissing_of_summer.image.attach(io: hissing_image, filename: 'hissing.jpg')

    hissing_array = [
      ['In France They Kiss on Main Street',199,"https://oughtify-seed.s3.amazonaws.com/joni/1975+-+The+Hissing+Of+Summer+Lawns/01.+In+France+They+Kiss+On+Main+Street.mp3"],
      ['The Jungle Line',266,"https://oughtify-seed.s3.amazonaws.com/joni/1975+-+The+Hissing+Of+Summer+Lawns/02.+The+Jungle+Line.mp3"],
      ['Edith and the Kingpin',217,"https://oughtify-seed.s3.amazonaws.com/joni/1975+-+The+Hissing+Of+Summer+Lawns/03.+Edith+And+The+Kingpin.mp3"],
      ["Don't Interrupt the Sorrow",245,"https://oughtify-seed.s3.amazonaws.com/joni/1975+-+The+Hissing+Of+Summer+Lawns/04.+Don't+Interrupt+The+Sorrow.mp3"],
      ['Shades of Scarlett Conquering',299,"https://oughtify-seed.s3.amazonaws.com/joni/1975+-+The+Hissing+Of+Summer+Lawns/05.+Shades+Of+Scarlett+Conquering.mp3"],
      ['The Hissing of Summer Lawns',181,"https://oughtify-seed.s3.amazonaws.com/joni/1975+-+The+Hissing+Of+Summer+Lawns/06.+The+Hissing+Of+Summer+Lawns.mp3"],
      ['The Boho Dance',230,"https://oughtify-seed.s3.amazonaws.com/joni/1975+-+The+Hissing+Of+Summer+Lawns/07.+The+Boho+Dance.mp3"],
      ["Harry's House / Centerpiece",408,"https://oughtify-seed.s3.amazonaws.com/joni/1975+-+The+Hissing+Of+Summer+Lawns/08.+Harry's+House+-+Centerpiece.mp3"],
      ['Sweet Bird',252,"https://oughtify-seed.s3.amazonaws.com/joni/1975+-+The+Hissing+Of+Summer+Lawns/09.+Sweet+Bird.mp3"],
      ['Shadows and Light',257,"https://oughtify-seed.s3.amazonaws.com/joni/1975+-+The+Hissing+Of+Summer+Lawns/10.+Shadows+And+Light.mp3"]
    ]

    hissing_array.each_with_index do |song_info,i|
      hissing_song = Song.create!({
        title: song_info[0],
        album_id: hissing_of_summer.id,
        number: i + 1,
        length: song_info[1]
      })

      hissing_song_file = URI.open(song_info[2])
      hissing_song.file.attach(io: hissing_song_file, filename: "hissing_#{i+1}.mp3")
    end

    hejira = Album.create!({
      title: 'Hejira',
      artist_id: joni_mitchell.id,
      year: 1976
    })

    hejira_image = URI.open("https://oughtify-seed.s3.amazonaws.com/joni/1976+-+Hejira/hejira.jpg")
    hejira.image.attach(io: hejira_image, filename: 'hejira.jpg')

    hejira_array = [
      ['Coyote',301,"https://oughtify-seed.s3.amazonaws.com/joni/1976+-+Hejira/01.+Coyote.mp3"],
      ['Amelia',361,"https://oughtify-seed.s3.amazonaws.com/joni/1976+-+Hejira/02.+Amelia.mp3"],
      ['Furry Sings the Blues',307,"https://oughtify-seed.s3.amazonaws.com/joni/1976+-+Hejira/03.+Furry+Sings+The+Blues.mp3"],
      ['A Strange Boy',259,"https://oughtify-seed.s3.amazonaws.com/joni/1976+-+Hejira/04.+A+Strange+Boy.mp3"],
      ['Hejira',401,"https://oughtify-seed.s3.amazonaws.com/joni/1976+-+Hejira/05.+Hejira.mp3"],
      ['Song for Sharon',518,"https://oughtify-seed.s3.amazonaws.com/joni/1976+-+Hejira/06.+Song+For+Sharon.mp3"],
      ['Black Crow',462,"https://oughtify-seed.s3.amazonaws.com/joni/1976+-+Hejira/07.+Black+Crow.mp3"],
      ['Blue Motel Room',304,"https://oughtify-seed.s3.amazonaws.com/joni/1976+-+Hejira/08.+Blue+Motel+Room.mp3"],
      ['Refuge of the Roads',398,"https://oughtify-seed.s3.amazonaws.com/joni/1976+-+Hejira/09.+Refuge+Of+The+Roads.mp3"]
    ]

    hejira_array.each_with_index do |song_info,i|
      hejira_song = Song.create!({
        title: song_info[0],
        album_id: hejira.id,
        number: i + 1,
        length: song_info[1]
      })

      hejira_song_file = URI.open(song_info[2])
      hejira_song.file.attach(io: hejira_song_file, filename: "hejira_#{i+1}.mp3")
    end

    neil_young = Artist.create!({
      name: 'Neil Young',
      bio: 'Neil Percival Young (November 12, 1945) is a Canadian and American singer and songwriter. After embarking on a music career in Winnipeg in the 1960s, Young moved to Los Angeles, joining the folk-rock group Buffalo Springfield. Since the beginning of his solo career, often with backing by the band Crazy Horse, he has released critically acclaimed albums such as Everybody Knows This Is Nowhere (1969), After the Gold Rush (1970), Harvest (1972), On the Beach (1974), and Rust Never Sleeps (1979). He was also a part-time member of Crosby, Stills, Nash & Young, with whom he recorded the chart-topping 1970 album Déjà Vu.'
    })

    neil_image = URI.open("https://oughtify-seed.s3.amazonaws.com/neil/neil_image.jpeg")
    neil_young.image.attach(io: neil_image, filename: 'neil_image.jpeg')

    neil_banner = URI.open("https://oughtify-seed.s3.amazonaws.com/neil/neil_banner.jpeg")
    neil_young.banner_image.attach(io: neil_banner, filename: 'neil_banner.jpeg')

    neil_young_album = Album.create!({
      title: 'Neil Young',
      artist_id: neil_young.id,
      year: 1968
    })

    young_album_image = URI.open("https://oughtify-seed.s3.amazonaws.com/neil/1968+-+Neil+Young/young_album.jpeg")
    neil_young_album.image.attach(io: young_album_image, filename: 'young_album.jpeg')

    young_album_array = [
      ['The Emperor of Wyoming',140,"https://oughtify-seed.s3.amazonaws.com/neil/1968+-+Neil+Young/01+-+The+Emperor+Of+Wyoming.mp3"],
      ['The Loner',233,"https://oughtify-seed.s3.amazonaws.com/neil/1968+-+Neil+Young/02+-+The+Loner.mp3"],
      ['If I Could Have Her Tonight',142,"https://oughtify-seed.s3.amazonaws.com/neil/1968+-+Neil+Young/03+-+If+I+Could+Have+Her+Tonight.mp3"],
      ["I've Been Waiting for You",155,"https://oughtify-seed.s3.amazonaws.com/neil/1968+-+Neil+Young/04+-+I've+Been+Waiting+For+You.mp3"],
      ['The Old Laughing Lady',358,"https://oughtify-seed.s3.amazonaws.com/neil/1968+-+Neil+Young/05+-+The+Old+Laughing+Lady.mp3"],
      ['String Quartet from Whiskey Boot Hill',58,"https://oughtify-seed.s3.amazonaws.com/neil/1968+-+Neil+Young/06+-+String+Quartet+From+Whiskey+Boot+Hill.mp3"],
      ['Here We Are in the Years',207,"https://oughtify-seed.s3.amazonaws.com/neil/1968+-+Neil+Young/07+-+Here+We+Are+In+The+Years.mp3"],
      ['What Did You Do to My Life?',148,"https://oughtify-seed.s3.amazonaws.com/neil/1968+-+Neil+Young/08+-+What+Did+You+Do+To+My+Life.mp3"],
      ["I've Loved Her So Long",161,"https://oughtify-seed.s3.amazonaws.com/neil/1968+-+Neil+Young/09+-+I've+Loved+Her+So+Long.mp3"],
      ['The Last Trip to Tulsa',567,"https://oughtify-seed.s3.amazonaws.com/neil/1968+-+Neil+Young/10+-+The+Last+Trip+To+Tulsa.mp3"]
    ]


    young_album_array.each_with_index do |song_info,i|
      young_song = Song.create!({
        title: song_info[0],
        album_id: neil_young_album.id,
        number: i + 1,
        length: song_info[1]
      })

      young_song_file = URI.open(song_info[2])
      young_song.file.attach(io: young_song_file, filename: "young_#{i+1}.mp3")
    end

    everybody_knows = Album.create!({
      title: 'Everybody Knows This Is Nowhere',
      artist_id: neil_young.id,
      year: 1969
    })


    everybody_image = URI.open("https://oughtify-seed.s3.amazonaws.com/neil/1968+-+Neil+Young/young_album.jpeg")
    everybody_knows.image.attach(io: everybody_image, filename: 'everybody.jpeg')

    everybody_array = [
      ['Cinnamon Girl',180,"https://oughtify-seed.s3.amazonaws.com/neil/1969+-+Everybody+Knows+This+Is+Nowhere/01+-+Cinnamon+Girl.mp3"],
      ['Everybody Knows This Is Nowhere',148,"https://oughtify-seed.s3.amazonaws.com/neil/1969+-+Everybody+Knows+This+Is+Nowhere/02+-+Everybody+Knows+This+Is+Nowhere.mp3"],
      ["Round & Round (It Won't Be Long)",353,"https://oughtify-seed.s3.amazonaws.com/neil/1969+-+Everybody+Knows+This+Is+Nowhere/03+-+Round+%26+Round+(It+Won't+Be+Long).mp3"],
      ['Down by the River',556,"https://oughtify-seed.s3.amazonaws.com/neil/1969+-+Everybody+Knows+This+Is+Nowhere/04+-+Down+By+The+River.mp3"],
      ["The Losing End (When You're On)",247,"https://oughtify-seed.s3.amazonaws.com/neil/1969+-+Everybody+Knows+This+Is+Nowhere/05+-+The+Losing+End+(When+You're+On).mp3"],
      ['Running Dry (Requiem for the Rockets)',336,"https://oughtify-seed.s3.amazonaws.com/neil/1969+-+Everybody+Knows+This+Is+Nowhere/06+-+Running+Dry+(Requiem+For+The+Rockets).mp3"],
      ['Cowgirl in the Sand',607,"https://oughtify-seed.s3.amazonaws.com/neil/1969+-+Everybody+Knows+This+Is+Nowhere/07+-+Cowgirl+In+The+Sand.mp3"]
    ]

    everybody_array.each_with_index do |song_info,i|
      everybody_song = Song.create!({
        title: song_info[0],
        album_id: everybody_knows.id,
        number: i + 1,
        length: song_info[1]
      })

      everybody_song_file = URI.open(song_info[2])
      everybody_song.file.attach(io: everybody_song_file, filename: "everybody_#{i+1}.mp3")
    end

    after_the_gold_rush = Album.create!({
      title: 'After the Gold Rush',
      artist_id: neil_young.id,
      year: 1970
    })

    gold_rush_image = URI.open("https://oughtify-seed.s3.amazonaws.com/neil/1970+-+After+the+Gold+Rush/after_gold.jpg")
    after_the_gold_rush.image.attach(io: gold_rush_image, filename: 'gold_rush.jpg')

    gold_rush_array = [
      ['Tell Me Why',178,"https://oughtify-seed.s3.amazonaws.com/neil/1970+-+After+the+Gold+Rush/01+-+Tell+Me+Why.mp3"],
      ['After the Gold Rush',226,"https://oughtify-seed.s3.amazonaws.com/neil/1970+-+After+the+Gold+Rush/02+-+After+the+Gold+Rush.mp3"],
      ['Only Love Can Break Your Heart',188,"https://oughtify-seed.s3.amazonaws.com/neil/1970+-+After+the+Gold+Rush/03+-+Only+Love+Can+Break+Your+Heart.mp3"],
      ['Southern Man',332,"https://oughtify-seed.s3.amazonaws.com/neil/1970+-+After+the+Gold+Rush/04+-+Southern+Man.mp3"],
      ['Till the Morning Comes',80,"https://oughtify-seed.s3.amazonaws.com/neil/1970+-+After+the+Gold+Rush/05+-+Till+the+Morning+Comes.mp3"],
      ['Oh, Lonesome Me',230,"https://oughtify-seed.s3.amazonaws.com/neil/1970+-+After+the+Gold+Rush/06+-+Oh%2C+Lonesome+Me.mp3"],
      ["Don't Let It Bring You Down",177,"https://oughtify-seed.s3.amazonaws.com/neil/1970+-+After+the+Gold+Rush/07+-+Don't+Let+it+Bring+You+Down.mp3"],
      ['Birds',153,"https://oughtify-seed.s3.amazonaws.com/neil/1970+-+After+the+Gold+Rush/08+-+Birds.mp3"],
      ['When You Dance I Can Really Love',245,"https://oughtify-seed.s3.amazonaws.com/neil/1970+-+After+the+Gold+Rush/09+-+When+You+Dance+You+Can+Really+Love.mp3"],
      ['I Believe in You',207,"https://oughtify-seed.s3.amazonaws.com/neil/1970+-+After+the+Gold+Rush/10+-+I+Believe+in+You.mp3"],
      ['Cripple Creek Ferry',93,"https://oughtify-seed.s3.amazonaws.com/neil/1970+-+After+the+Gold+Rush/11+-+Cripple+Creek+Ferry.mp3"]
    ]

    gold_rush_array.each_with_index do |song_info,i|
      gold_rush_song = Song.create!({
        title: song_info[0],
        album_id: after_the_gold_rush.id,
        number: i + 1,
        length: song_info[1]
      })

      gold_rush_song_file = URI.open(song_info[2])
      gold_rush_song.file.attach(io: gold_rush_song_file, filename: "gold_rush_#{i+1}.mp3")
    end

    harvest = Album.create!({
      title: 'Harvest',
      artist_id: neil_young.id,
      year: 1972
    })

    harvest_image = URI.open("https://oughtify-seed.s3.amazonaws.com/neil/1972+-+Harvest/harvest.jpg")
    harvest.image.attach(io: harvest_image, filename: 'harvest.jpg')

  
    harvest_array = [
      ['Out on the Weekend',274,"https://oughtify-seed.s3.amazonaws.com/neil/1972+-+Harvest/01+-+Out+On+The+Weekend.mp3"],
      ['Harvest',191,"https://oughtify-seed.s3.amazonaws.com/neil/1972+-+Harvest/02+-+Harvest.mp3"],
      ['A Man Needs a Maid',245,"https://oughtify-seed.s3.amazonaws.com/neil/1972+-+Harvest/03+-+A+Man+Needs+A+Maid.mp3"],
      ['Heart of Gold',187,"https://oughtify-seed.s3.amazonaws.com/neil/1972+-+Harvest/04+-+Heart+Of+Gold.mp3"],
      ['Are You Ready for the Country?',203,"https://oughtify-seed.s3.amazonaws.com/neil/1972+-+Harvest/05+-+Are+You+Ready+For+The+Country.mp3"],
      ['Old Man',204,"https://oughtify-seed.s3.amazonaws.com/neil/1972+-+Harvest/06+-+Old+Man.mp3"],
      ["There's a World",179,"https://oughtify-seed.s3.amazonaws.com/neil/1972+-+Harvest/07+-+There's+A+World.mp3"],
      ['Alabama',242,"https://oughtify-seed.s3.amazonaws.com/neil/1972+-+Harvest/08+-+Alabama.mp3"],
      ['The Needle and the Damage Done',123,"https://oughtify-seed.s3.amazonaws.com/neil/1972+-+Harvest/09+-+The+Needle+And+The+Damage+Done.mp3"],
      ['Words (Between the Lines of Age)',400,"https://oughtify-seed.s3.amazonaws.com/neil/1972+-+Harvest/10+-+Words+(Between+The+Lines+Of+Age).mp3"]
    ]

    harvest_array.each_with_index do |song_info,i|
      harvest_song = Song.create!({
        title: song_info[0],
        album_id: harvest.id,
        number: i + 1,
        length: song_info[1]
      })

      harvest_song_file = URI.open(song_info[2])
      harvest_song.file.attach(io: harvest_song_file, filename: "harvest_#{i+1}.mp3")
    end

    on_the_beach = Album.create!({
      title: 'On the Beach',
      artist_id: neil_young.id,
      year: 1974
    })

    on_the_beach_image = URI.open("https://oughtify-seed.s3.amazonaws.com/neil/1974+-+On+The+Beach/on_the_beach.jpg")
    on_the_beach.image.attach(io: on_the_beach_image, filename: 'beach.jpg')

    beach_array = [
      ['Walk On',162,"https://oughtify-seed.s3.amazonaws.com/neil/1974+-+On+The+Beach/01+-+Walk+On.mp3"],
      ['See the Sky About to Rain',302,"https://oughtify-seed.s3.amazonaws.com/neil/1974+-+On+The+Beach/02+-+See+The+Sky+About+To+Rain.mp3"],
      ['Revolution Blues',243,"https://oughtify-seed.s3.amazonaws.com/neil/1974+-+On+The+Beach/03+-+Revolution+Blues.mp3"],
      ['For the Turnstiles',195,"https://oughtify-seed.s3.amazonaws.com/neil/1974+-+On+The+Beach/04+-+For+The+Turnstiles.mp3"],
      ['Vampire Blues',254,"https://oughtify-seed.s3.amazonaws.com/neil/1974+-+On+The+Beach/05+-+Vampire+Blues.mp3"],
      ['On the Beach',419,"https://oughtify-seed.s3.amazonaws.com/neil/1974+-+On+The+Beach/06+-+On+The+Beach.mp3"],
      ['Motion Pictures',263,"https://oughtify-seed.s3.amazonaws.com/neil/1974+-+On+The+Beach/07+-+Motion+Pictures.mp3"],
      ['Ambulance Blues',446,"https://oughtify-seed.s3.amazonaws.com/neil/1974+-+On+The+Beach/08+-+Ambulance+Blues.mp3"]
    ]

    beach_array.each_with_index do |song_info,i|
      beach_song = Song.create!({
        title: song_info[0],
        album_id: on_the_beach.id,
        number: i + 1,
        length: song_info[1]
      })

      beach_song_file = URI.open(song_info[2])
      beach_song.file.attach(io: beach_song_file, filename: "beach_#{i+1}.mp3")
    end

    joanna_newsom = Artist.create!({
      name: 'Joanna Newsom',
      bio: 'Joanna Caroline Newsom (born January 18, 1982) is an American singer-songwriter and actress. Born and raised in Northern California, Newsom was classically trained on the harp in her youth and began her musical career as a keyboardist in the San Francisco-based indie band the Pleased. After recording and self-releasing two EPs in 2002, Newsom was signed to the independent label Drag City. Her debut album, The Milk-Eyed Mender, was released in 2004 to critical acclaim and garnered Newsom an underground following. She would receive wider exposure with the release of Ys (2006), which charted at number 134 on the Billboard 200 and was nominated for a 2007 Shortlist Music Prize. She released two further albums: Have One on Me (2010), and Divers (2015), the latter of which outsold all of her previous albums. Newsom has been noted by critics for her unique musical style, sometimes characterized as progressive folk, and for her prominent use of harp instrumentation. She has also appeared as an actress with roles in the television series Portlandia and in the 2014 film Inherent Vice.'
    })

    joanna_image = URI.open("https://oughtify-seed.s3.amazonaws.com/joanna/joanna_image.png")
    joanna_newsom.image.attach(io: joanna_image, filename: 'joanna_image.png')

    joanna_banner = URI.open("https://oughtify-seed.s3.amazonaws.com/joanna/joanna_banner.jpeg")
    joanna_newsom.banner_image.attach(io: joanna_banner, filename: 'joanna_banner.jpeg')

    milk_eyed_mender = Album.create!({
      title: 'The Milk-Eyed Mender',
      artist_id: joanna_newsom.id,
      year: 2004
    })

    milk_eyed_image = URI.open("https://oughtify-seed.s3.amazonaws.com/joanna/2004+-+The+Milk-Eyed+Mender/milkeyed.jpg")
    milk_eyed_mender.image.attach(io: milk_eyed_image, filename: 'milk_eyed.jpg')

    milk_eyed_array = [
      ['Bridges and Balloons',222,"https://oughtify-seed.s3.amazonaws.com/joanna/2004+-+The+Milk-Eyed+Mender/01+-+Bridges+And+Balloons.mp3"],
      ['Sprout and the Bean',272,"https://oughtify-seed.s3.amazonaws.com/joanna/2004+-+The+Milk-Eyed+Mender/02+-+Sprout+And+The+Bean.mp3"],
      ['The Book of Right-On',269,"https://oughtify-seed.s3.amazonaws.com/joanna/2004+-+The+Milk-Eyed+Mender/03+-+The+Book+Of+Right-On.mp3"],
      ['Sadie',362,"https://oughtify-seed.s3.amazonaws.com/joanna/2004+-+The+Milk-Eyed+Mender/04+-+Sadie.mp3"],
      ['Inflammatory Writ',170,"https://oughtify-seed.s3.amazonaws.com/joanna/2004+-+The+Milk-Eyed+Mender/05+-+Inflammatory+Writ.mp3"],
      ['This Side of the Blue',321,"https://oughtify-seed.s3.amazonaws.com/joanna/2004+-+The+Milk-Eyed+Mender/06+-+This+Side+Of+The+Blue.mp3"],
      [`"En Gallop"`,307,"https://oughtify-seed.s3.amazonaws.com/joanna/2004+-+The+Milk-Eyed+Mender/07+-+'En+Gallop'.mp3"],
      ['Cassiopeia',200,"https://oughtify-seed.s3.amazonaws.com/joanna/2004+-+The+Milk-Eyed+Mender/08+-+Cassiopeia.mp3"],
      ['Peach, Plum, Pear',214,"https://oughtify-seed.s3.amazonaws.com/joanna/2004+-+The+Milk-Eyed+Mender/09+-+Peach%2C+Plum%2C+Pear.mp3"],
      ['Swansea',305,"https://oughtify-seed.s3.amazonaws.com/joanna/2004+-+The+Milk-Eyed+Mender/10+-+Swansea.mp3"],
      ['Three Little Babes',222,"https://oughtify-seed.s3.amazonaws.com/joanna/2004+-+The+Milk-Eyed+Mender/11+-+Three+Little+Babes.mp3"],
      ['Clam, Crab, Cockle, Cowrie',261,"https://oughtify-seed.s3.amazonaws.com/joanna/2004+-+The+Milk-Eyed+Mender/12+-+Clam%2C+Crab%2C+Cockle%2C+Cowrie.mp3"]
    ]


    milk_eyed_array.each_with_index do |song_info,i|
      milk_eyed_song = Song.create!({
        title: song_info[0],
        album_id: milk_eyed_mender.id,
        number: i + 1,
        length: song_info[1]
      })

      milk_eyed_song_file = URI.open(song_info[2])
      milk_eyed_song.file.attach(io: milk_eyed_song_file, filename: "milk_eyed_#{i+1}.mp3")
    end

    ys = Album.create!({
      title: 'Ys',
      artist_id: joanna_newsom.id,
      year: 2006
    })

    ys_image = URI.open("https://oughtify-seed.s3.amazonaws.com/joanna/2006+-+Ys/ys.jpeg")
    ys.image.attach(io: ys_image, filename: 'ys.jpeg')

    ys_array = [
      ['Emily',728,"https://oughtify-seed.s3.amazonaws.com/joanna/2006+-+Ys/01+-+Emily.mp3"],
      ['Monkey & Bear',568,"https://oughtify-seed.s3.amazonaws.com/joanna/2006+-+Ys/02+-+Monkey+%26+Bear.mp3"],
      ['Sawdust & Diamonds',595,"https://oughtify-seed.s3.amazonaws.com/joanna/2006+-+Ys/03+-+Sawdust+%26+Diamonds.mp3"],
      ['Only Skin',1013,"https://oughtify-seed.s3.amazonaws.com/joanna/2006+-+Ys/04+-+Only+Skin.mp3"],
      ["Cosmia",437,"https://oughtify-seed.s3.amazonaws.com/joanna/2006+-+Ys/05+-+Cosmia.mp3"]
    ]


    ys_array.each_with_index do |song_info,i|
      ys_song = Song.create!({
        title: song_info[0],
        album_id: ys.id,
        number: i + 1,
        length: song_info[1]
      })

      ys_song_file = URI.open(song_info[2])
      ys_song.file.attach(io: ys_song_file, filename: "ys_#{i+1}.mp3")
    end

    have_one_on_me = Album.create!({
      title: 'Have One on Me',
      artist_id: joanna_newsom.id,
      year: 2010
    })

    have_one_image = URI.open("https://oughtify-seed.s3.amazonaws.com/joanna/2010+-+Have+One+On+Me/have_one.jpg")
    have_one_on_me.image.attach(io: have_one_image, filename: 'have_one.jpg')

    have_one_array = [
      ["Easy",364,"https://oughtify-seed.s3.amazonaws.com/joanna/2010+-+Have+One+On+Me/01+-+Easy.mp3"],
      ["Have One on Me",662,"https://oughtify-seed.s3.amazonaws.com/joanna/2010+-+Have+One+On+Me/02+-+Have+One+On+Me.mp3"],
      ["'81",231,"https://oughtify-seed.s3.amazonaws.com/joanna/2010+-+Have+One+On+Me/03+-+'81.mp3"],
      ["Good Intentions Paving Co.",422,"https://oughtify-seed.s3.amazonaws.com/joanna/2010+-+Have+One+On+Me/04+-+Good+Intentions+Paving+Company.mp3"],
      ["No Provenance",385,"https://oughtify-seed.s3.amazonaws.com/joanna/2010+-+Have+One+On+Me/05+-+No+Provenance.mp3"],
      ["Baby Birch",570,"https://oughtify-seed.s3.amazonaws.com/joanna/2010+-+Have+One+On+Me/06+-+Baby+Birch.mp3"],
      ["On a Good Day",108,"https://oughtify-seed.s3.amazonaws.com/joanna/2010+-+Have+One+On+Me/07+-+On+A+Good+Day.mp3"],
      ["You and Me, Bess",432,"https://oughtify-seed.s3.amazonaws.com/joanna/2010+-+Have+One+On+Me/08+-+You+And+Me%2C+Bess.mp3"],
      ["In California",521,"https://oughtify-seed.s3.amazonaws.com/joanna/2010+-+Have+One+On+Me/09+-+In+California.mp3"],
      ["Jackrabbits",263,"https://oughtify-seed.s3.amazonaws.com/joanna/2010+-+Have+One+On+Me/10+-+Jackrabbits.mp3"],
      ["Go Long",482,"https://oughtify-seed.s3.amazonaws.com/joanna/2010+-+Have+One+On+Me/11+-+Go+Long.mp3"],
      ["Occident",331,"https://oughtify-seed.s3.amazonaws.com/joanna/2010+-+Have+One+On+Me/12+-+Occident.mp3"],
      ["Soft as Chalk",389,"https://oughtify-seed.s3.amazonaws.com/joanna/2010+-+Have+One+On+Me/13+-+Soft+As+Chalk.mp3"],
      ["Esme",476,"https://oughtify-seed.s3.amazonaws.com/joanna/2010+-+Have+One+On+Me/14+-+Esme.mp3"],
      ["Autumn",481,"https://oughtify-seed.s3.amazonaws.com/joanna/2010+-+Have+One+On+Me/15+-+Autumn.mp3"],
      ["Ribbon Bows",370,"https://oughtify-seed.s3.amazonaws.com/joanna/2010+-+Have+One+On+Me/16+-+Ribbon+Bows.mp3"],
      ["Kingfisher",551,"https://oughtify-seed.s3.amazonaws.com/joanna/2010+-+Have+One+On+Me/17+-+Kingfisher.mp3"],
      ["Does Not Suffice",404,"https://oughtify-seed.s3.amazonaws.com/joanna/2010+-+Have+One+On+Me/18+-+Does+Not+Suffice.mp3"]
    ]

    have_one_array.each_with_index do |song_info,i|
      have_one_song = Song.create!({
        title: song_info[0],
        album_id: have_one_on_me.id,
        number: i + 1,
        length: song_info[1]
      })

      have_one_song_file = URI.open(song_info[2])
      have_one_song.file.attach(io: have_one_song_file, filename: "have_one_#{i+1}.mp3")
    end

    jeff_mills = Artist.create!({
      name: 'Jeff Mills',
      bio: 'Jeff Mills is a leading figure in the history of electronic music. Born in Detroit in 1963, he was not even twenty when he started airing six radio shows a week in his hometown. At that time he mixed New Wave, Industrial Music, Electro-Pop, Detroit Techno and Chicago House. In 1988, he entered into music production when, together with Tony Srock, he founded Final Cut. He left in 1990 and along with Mike Banks – another leading figure on the Detroit scene- set up the mythic label and collective: Underground Resistance. However wanting to go in his own direction and develop a more personal esthetic experience, he created his own label Axis Records in 1992 and also collaborated with Tresor in Berlin.'
    })

    jeff_image = URI.open("https://oughtify-seed.s3.amazonaws.com/jeff/jeff_image.jpg")
    jeff_mills.image.attach(io: jeff_image, filename: 'jeff_image.jpg')

    jeff_banner = URI.open("https://oughtify-seed.s3.amazonaws.com/jeff/jeff_banner.jpeg")
    jeff_mills.banner_image.attach(io: jeff_banner, filename: 'jeff_banner.jpeg')

    waveform_one = Album.create!({
      title: 'Waveform Transmission Vol. 1',
      artist_id: jeff_mills.id,
      year: 1993
    })

    wave_one_image = URI.open("https://oughtify-seed.s3.amazonaws.com/jeff/1992+Jeff+Mills+-+Waveform+Transmission+Vol.+1+%5BTresor+11%5D+CD/waveform_one.jpg")
    waveform_one.image.attach(io: wave_one_image, filename: 'wave_one.jpg')

    wave_one_array = [
      ['Phase 4',287,"https://oughtify-seed.s3.amazonaws.com/jeff/1992+Jeff+Mills+-+Waveform+Transmission+Vol.+1+%5BTresor+11%5D+CD/01+Jeff+Mills+-+Phase+4.mp3"],
      ['Jerical',327,"https://oughtify-seed.s3.amazonaws.com/jeff/1992+Jeff+Mills+-+Waveform+Transmission+Vol.+1+%5BTresor+11%5D+CD/02+Jeff+Mills+-+Jerical.mp3"],
      ['Changes of Life',291,"https://oughtify-seed.s3.amazonaws.com/jeff/1992+Jeff+Mills+-+Waveform+Transmission+Vol.+1+%5BTresor+11%5D+CD/03+Jeff+Mills+-+Changes+Of+Life.mp3"],
      ['Berlin',355,"https://oughtify-seed.s3.amazonaws.com/jeff/1992+Jeff+Mills+-+Waveform+Transmission+Vol.+1+%5BTresor+11%5D+CD/04+Jeff+Mills+-+Berlin.mp3"],
      ['The Hacker',261,"https://oughtify-seed.s3.amazonaws.com/jeff/1992+Jeff+Mills+-+Waveform+Transmission+Vol.+1+%5BTresor+11%5D+CD/05+Jeff+Mills+-+The+Hacker.mp3"],
      ['Late Night',286,"https://oughtify-seed.s3.amazonaws.com/jeff/1992+Jeff+Mills+-+Waveform+Transmission+Vol.+1+%5BTresor+11%5D+CD/06+Jeff+Mills+-+Late+Night.mp3"],
      ['DNA',248,"https://oughtify-seed.s3.amazonaws.com/jeff/1992+Jeff+Mills+-+Waveform+Transmission+Vol.+1+%5BTresor+11%5D+CD/07+Jeff+Mills+-+DNA.mp3"],
      ['Man-Like',289,"https://oughtify-seed.s3.amazonaws.com/jeff/1992+Jeff+Mills+-+Waveform+Transmission+Vol.+1+%5BTresor+11%5D+CD/08+Jeff+Mills+-+Man-Like.mp3"]
    ]


    wave_one_array.each_with_index do |song_info,i|
      wave_one_song = Song.create!({
        title: song_info[0],
        album_id: waveform_one.id,
        number: i + 1,
        length: song_info[1]
      })

      wave_one_song_file = URI.open(song_info[2])
      wave_one_song.file.attach(io: wave_one_song_file, filename: "wave_one_#{i+1}.mp3")
    end

    waveform_three = Album.create!({
      title: 'Waveform Transmission Vol. 3',
      artist_id: jeff_mills.id,
      year: 1994
    })

    wave_three_image = URI.open("https://oughtify-seed.s3.amazonaws.com/jeff/1994+Jeff+Mills+-+Waveform+Transmission+Vol.+3+%5BTresor+25%5D+CD/waveform_three.jpg")
    waveform_three.image.attach(io: wave_three_image, filename: 'wave_three.jpg')

    wave_three_array = [
      ['The Extremist',255,"https://oughtify-seed.s3.amazonaws.com/jeff/1994+Jeff+Mills+-+Waveform+Transmission+Vol.+3+%5BTresor+25%5D+CD/01+Jeff+Mills+-+The+Extremist.mp3"],
      ['Solid Sleep',227,"https://oughtify-seed.s3.amazonaws.com/jeff/1994+Jeff+Mills+-+Waveform+Transmission+Vol.+3+%5BTresor+25%5D+CD/02+Jeff+Mills+-+Solid+Sleep.mp3"],
      ['Life Cycle',233,"https://oughtify-seed.s3.amazonaws.com/jeff/1994+Jeff+Mills+-+Waveform+Transmission+Vol.+3+%5BTresor+25%5D+CD/03+Jeff+Mills+-+Life+Cycle.mp3"],
      ['Workers',198,"https://oughtify-seed.s3.amazonaws.com/jeff/1994+Jeff+Mills+-+Waveform+Transmission+Vol.+3+%5BTresor+25%5D+CD/04+Jeff+Mills+-+Workers.mp3"],
      ['Wrath of the Punisher',229,"https://oughtify-seed.s3.amazonaws.com/jeff/1994+Jeff+Mills+-+Waveform+Transmission+Vol.+3+%5BTresor+25%5D+CD/05+Jeff+Mills+-+Wrath+Of+The+Punisher.mp3"],
      ['DNA',218,"https://oughtify-seed.s3.amazonaws.com/jeff/1994+Jeff+Mills+-+Waveform+Transmission+Vol.+3+%5BTresor+25%5D+CD/06+Jeff+Mills+-+DNA.mp3"],
      ['Condor to Mallorca',340,"https://oughtify-seed.s3.amazonaws.com/jeff/1994+Jeff+Mills+-+Waveform+Transmission+Vol.+3+%5BTresor+25%5D+CD/07+Jeff+Mills+-+Condor+To+Mallorca.mp3"],
      ['Basic Human Design',352,"https://oughtify-seed.s3.amazonaws.com/jeff/1994+Jeff+Mills+-+Waveform+Transmission+Vol.+3+%5BTresor+25%5D+CD/08+Jeff+Mills+-+Basic+Human+Design.mp3"]
    ]

    wave_three_array.each_with_index do |song_info,i|
      wave_three_song = Song.create!({
        title: song_info[0],
        album_id: waveform_three.id,
        number: i + 1,
        length: song_info[1]
      })

      wave_three_song_file = URI.open(song_info[2])
      wave_three_song.file.attach(io: wave_three_song_file, filename: "wave_three_#{i+1}.mp3")
    end


    fred_frith = Artist.create!({
      name: 'Fred Frith',
      bio: 'Jeremy Webster "Fred" Frith (born 17 February 1949) is an English multi-instrumentalist, composer, and improviser. Probably best known for his guitar work, Frith first came to attention as one of the founding members of the English avant-rock group Henry Cow. He was also a member of the groups Art Bears, Massacre, and Skeleton Crew. He has collaborated with a number of prominent musicians, including Robert Wyatt, Derek Bailey, the Residents, Lol Coxhill, John Zorn, Brian Eno, Mike Patton, Lars Hollmer, Bill Laswell, Iva Bittová, Jad Fair, Kramer, the ARTE Quartett, and Bob Ostertag. He has also composed several long works, including Traffic Continues (1996, performed 1998 by Frith and Ensemble Modern) and Freedom in Fragments (1993, performed 1999 by Rova Saxophone Quartet). Frith produces most of his own music, and has also produced many albums by other musicians, including Curlew, the Muffins, Etron Fou Leloublan, and Orthotonics.'
    })

    fred_image = URI.open("https://oughtify-seed.s3.amazonaws.com/fred/fred_image.jpeg")
    fred_frith.image.attach(io: fred_image, filename: 'fred_image.jpeg')

    fred_banner = URI.open("https://oughtify-seed.s3.amazonaws.com/fred/fred_banner.jpeg")
    fred_frith.banner_image.attach(io: fred_banner, filename: 'fred_banner.jpeg')

    guitar_solos = Album.create!({
      title: 'Guitar Solos',
      artist_id: fred_frith.id,
      year: 1974
    })

    guitar_image = URI.open("https://oughtify-seed.s3.amazonaws.com/fred/1974+-+1988+-+Guitar+Solos+-+224/guitar.jpg")
    guitar_solos.image.attach(io: guitar_image, filename: 'guitar.jpg')

    guitar_array = [
      ['Hello Music',90,"https://oughtify-seed.s3.amazonaws.com/fred/1974+-+1988+-+Guitar+Solos+-+224/01.+Hello+Music.mp3"],
      ["Glass c/w Steel",334,"https://oughtify-seed.s3.amazonaws.com/fred/1974+-+1988+-+Guitar+Solos+-+224/02.+Glass+c-w+Steel.mp3"],
      ["Ghosts",192,"https://oughtify-seed.s3.amazonaws.com/fred/1974+-+1988+-+Guitar+Solos+-+224/03.+Ghosts.mp3"],
      ["Out of Their Heads (On Locoweed)",503,"https://oughtify-seed.s3.amazonaws.com/fred/1974+-+1988+-+Guitar+Solos+-+224/04.+Out+Of+Their+Heads+(On+Locoweed).mp3"],
      ["Not Forgotten",115,"https://oughtify-seed.s3.amazonaws.com/fred/1974+-+1988+-+Guitar+Solos+-+224/05.+Not+Forgotten.mp3"],
      ["Hollow Music",163,"https://oughtify-seed.s3.amazonaws.com/fred/1974+-+1988+-+Guitar+Solos+-+224/06.+Hollow+Music.mp3"],
      ["Heat c/w Moment",103,"https://oughtify-seed.s3.amazonaws.com/fred/1974+-+1988+-+Guitar+Solos+-+224/07.+Heat+c-w+Moment.mp3"],
      ["No Birds",766,"https://oughtify-seed.s3.amazonaws.com/fred/1974+-+1988+-+Guitar+Solos+-+224/08.+No+Birds.mp3"]
    ]

    guitar_array.each_with_index do |song_info,i|
      guitar_song = Song.create!({
        title: song_info[0],
        album_id: guitar_solos.id,
        number: i + 1,
        length: song_info[1]
      })

      guitar_song_file = URI.open(song_info[2])
      guitar_song.file.attach(io: guitar_song_file, filename: "guitar_#{i+1}.mp3")
    end

    gravity = Album.create!({
      title: 'Gravity',
      artist_id: fred_frith.id,
      year: 1980
    })

    gravity_image = URI.open("https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/gravity.jpg")
    gravity.image.attach(io: gravity_image, filename: 'gravity.jpg')

    gravity_array = [
      ["The Boy Beats the Rams",294,"https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/01+-+The+Boy+Beats+the+Rams.mp3"],
      ["Spring Any Day Now",184,"https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/02+-+Spring+Any+Day+Now.mp3"],
      ["Don't Cry for Me",208,"https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/03+-+Don't+Cry+For+Me.mp3"],
      ["Hands of the Juggler",331,"https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/04+-+Hands+of+the+Juggler.mp3"],
      ["Norrgarden Nyvla",174,"https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/05+-+Norrgarden+Nyvla.mp3"],
      ["Year of the Monkey",245,"https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/06+-+Year+of+the+Monkey.mp3"],
      ["What a Dilemma",190,"https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/07+-+What+a+Dilemma.mp3"],
      ["Crack in the Concrete",84,"https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/08+-+Crack+in+the+Concrete.mp3"],
      ["Come Across",167,"https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/09+-+Come+Across.mp3"],
      ["Dancing in the Street / My Enemy is a Bad Man",279,"https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/10+-+Dancing+in+the+Street+-+My+Enemy+Is+a+Bad+Man.mp3"],
      ["Slap Dance",150,"https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/11+-+Slap+Dance.mp3"],
      ["A Career in Real Estate",280,"https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/12+-+A+Career+in+Real+Estate.mp3"],
      ["Dancing in Rockville, Maryland",170,"https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/13+-+Dancing+in+Rockville%2C+Maryland.mp3"],
      ["Waking Against Sleep",124,"https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/14+-+Waking+Against+Sleep.mp3"],
      ["Terrain",228,"https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/15+-+Terrain.mp3"],
      ["Moeris Dancing",299,"https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/16+-+Moeris+Dancing.mp3"],
      ["Geistige Nacht",316,"https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/17+-+Geistige+Nacht.mp3"],
      ["Life at the Top",100,"https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/18+-+Life+at+the+Top.mp3"],
      ["Oh Wie Schön Ist Panama!",302,"https://oughtify-seed.s3.amazonaws.com/fred/1980+-+Gravity/19+-+Oh+Wie+Schon+Ist+Panama!.mp3"]
    ]

    gravity_array.each_with_index do |song_info,i|
      gravity_song = Song.create!({
        title: song_info[0],
        album_id: gravity.id,
        number: i + 1,
        length: song_info[1]
      })

      gravity_song_file = URI.open(song_info[2])
      gravity_song.file.attach(io: gravity_song_file, filename: "gravity_#{i+1}.mp3")
    end

    speechless = Album.create!({
      title: 'Speechless',
      artist_id: fred_frith.id,
      year: 1981
    })

    speechless_image = URI.open("https://oughtify-seed.s3.amazonaws.com/fred/1981+-+Speechless+-+VBR/speechless.jpg")
    speechless.image.attach(io: speechless_image, filename: 'speechless.jpg')

    speechless_array = [
      ["Kick the Can (Part 1)",142,"https://oughtify-seed.s3.amazonaws.com/fred/1981+-+Speechless+-+VBR/01.+Kick+the+Can+(part+1).mp3"],
      ["Carnival on Wall Street",172,"https://oughtify-seed.s3.amazonaws.com/fred/1981+-+Speechless+-+VBR/02.+Carnival+On+Wall+Street.mp3"],
      ["Ahead in the Sand",197,"https://oughtify-seed.s3.amazonaws.com/fred/1981+-+Speechless+-+VBR/03.+Ahead+In+The+Sand.mp3"],
      ["Laughing Matter / Esperanza",466,"https://oughtify-seed.s3.amazonaws.com/fred/1981+-+Speechless+-+VBR/04.+Laughing+Matter+-+Esperanza.mp3"],
      ["Women Speak to Men; Men Speak to Women",343,"https://oughtify-seed.s3.amazonaws.com/fred/1981+-+Speechless+-+VBR/05.+Women+Speak+To+Men+-+Men+Speak+To+Women.mp3"],
      ["A Spit in the Ocean",137,"https://oughtify-seed.s3.amazonaws.com/fred/1981+-+Speechless+-+VBR/06.+A+Spit+In+The+Ocean.mp3"],
      ["Navajo",184,"https://oughtify-seed.s3.amazonaws.com/fred/1981+-+Speechless+-+VBR/07.+Navajo.mp3"],
      ["Balance",307,"https://oughtify-seed.s3.amazonaws.com/fred/1981+-+Speechless+-+VBR/08.+Balance.mp3"],
      ["Saving Grace",116,"https://oughtify-seed.s3.amazonaws.com/fred/1981+-+Speechless+-+VBR/09.+Saving+Grace.mp3"],
      ["Speechless",187,"https://oughtify-seed.s3.amazonaws.com/fred/1981+-+Speechless+-+VBR/10.+Speechless.mp3"],
      ["Conversations with White Arc",75,"https://oughtify-seed.s3.amazonaws.com/fred/1981+-+Speechless+-+VBR/11.+Conversations+With+White+Arc.mp3"],
      ["Domaine de Planousset",181,"https://oughtify-seed.s3.amazonaws.com/fred/1981+-+Speechless+-+VBR/12.+Domaine+De+Planousset.mp3"],
      ["Kick the Can (Part 2)",140,"https://oughtify-seed.s3.amazonaws.com/fred/1981+-+Speechless+-+VBR/13.+Kick+The+Can+(Part+2).mp3"]
    ]

    speechless_array.each_with_index do |song_info,i|
      speechless_song = Song.create!({
        title: song_info[0],
        album_id: speechless.id,
        number: i + 1,
        length: song_info[1]
      })

      speechless_song_file = URI.open(song_info[2])
      speechless_song.file.attach(io: speechless_song_file, filename: "speechless_#{i+1}.mp3")
    end

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
      num = rand(3..18)
      while i <= num do
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
<?php
    if (isset($_POST['search'])) {

        //Citites and towns of new zealand
        $citiesAndTowns = array(
        'Ahaura',
        'Ahipara',
        'Ahititi',
        'Ahuroa',
        'Akaroa',
        'Albert Town',
        'Albury',
        'Alexandra',
        'Amberley',
        'Aranga',
        'Arapohue',
        'Arrowtown',
        'Ashburton',
        'Ashhurst',
        'Auckland',
        'Auroa',
        'Awanui',
        'Balclutha',
        'Balfour',
        'Barrytown',
        'Beachlands',
        'Beaumont',
        'Bell Block',
        'Blackball',
        'Blenheim',
        'Bluff',
        'Brighton',
        'Brightwater',
        'Broadwood',
        'Bulls',
        'Bunnythorpe',
        'Cambridge',
        'Canvastown',
        'Carterton',
        'Cheviot',
        'Christchurch',
        'Clarksville',
        'Clive',
        'Coatesville',
        'Colville',
        'Coroglen',
        'Coromandel',
        'Cromwell',
        'Dairy Flat',
        'Dannevirke',
        'Darfield',
        'Dargaville',
        'Dobson',
        'Drury',
        'Dunedin',
        'Duntroon',
        'Eastbourne',
        'Edgecumbe',
        'Egmont Village',
        'Eketahuna',
        'Eltham',
        'Fairhall',
        'Fairlie',
        'Featherston',
        'Feilding',
        'Flaxmere',
        'Fox Glacier',
        'Foxton',
        'Foxton Beach',
        'Frankton',
        'Frankton',
        'Franz Josef',
        'Geraldine',
        'Gisborne',
        'Glenorchy',
        'Gore',
        'Granity',
        'Greymouth',
        'Greytown',
        'Grovetown',
        'Haast',
        'Hakataramea',
        'Hamilton',
        'Hanmer Springs',
        'Hari Hari',
        'Hastings',
        'Haupiri',
        'Havelock',
        'Havelock North',
        'Hawea',
        'Hawera',
        'Helensville',
        'Henley',
        'Herekino',
        'Hikuai',
        'Hikurangi',
        'Hikutaia',
        'Hinuera',
        'Hokitika',
        'Horeke',
        'Houhora',
        'Howick',
        'Huapai',
        'Huiakama',
        'Huirangi',
        'Hukerenui',
        'Huntly',
        'Hurleyville',
        'Inangahua Junction',
        'Inglewood',
        'Invercargill',
        'Jacobs River',
        'Kaiapoi',
        'Kaihu',
        'Kaikohe',
        'Kaikoura',
        'Kaimata',
        'Kaingaroa',
        'Kaipara Flats',
        'Kaitaia',
        'Kaitangata',
        'Kaiwaka',
        'Kakaramea',
        'Kaniere',
        'Kaponga',
        'Karamea',
        'Karetu',
        'Katikati',
        'Kaukapakapa',
        'Kauri',
        'Kawakawa',
        'Kawerau',
        'Kennedy Bay',
        'Kerikeri',
        'Kihikihi',
        'Kinloch',
        'Kokatahi',
        'Kokopu',
        'Koromiko',
        'Kumara',
        'Kumeu',
        'Kurow',
        'Kawhia',
        'Lawrence',
        'Leeston',
        'Leigh',
        'Lepperton',
        'Levin',
        'Lincoln',
        'Linkwater',
        'Little River',
        'Lower Hutt',
        'Lumsden',
        'Lyttelton',
        'Makahu',
        'Manaia',
        'Manaia',
        'Manakau',
        'Mangakino',
        'Mangamuka',
        'Mangatoki',
        'Mangawhai',
        'Manukau',
        'Manurewa',
        'Maraetai',
        'Marco',
        'Maromaku',
        'Marsden Bay',
        'Martinborough',
        'Marton',
        'Maruia',
        'Masterton',
        'Matakana',
        'Matakohe',
        'Matamata',
        'Matapu',
        'Matarau',
        'Matihetihe',
        'Maungakaramea',
        'Maungatapere',
        'Maungaturoto',
        'Mayfield',
        'Methven',
        'Middlemarch',
        'Midhirst',
        'Millers Flat',
        'Milton',
        'Mimi',
        'Moana',
        'Moenui',
        'Moeraki',
        'Moerewa',
        'Mokau',
        'Mokoia',
        'Morrinsville',
        'Mosgiel',
        'Mossburn',
        'Motatau',
        'Motueka',
        'Mount Maunganui',
        'Mount Somers',
        'Murchison',
        'Murupara',
        'Napier',
        'Naseby',
        'Nelson',
        'New Brighton',
        'New Plymouth',
        'Normanby',
        'Ngaere',
        'Ngamatapouri',
        'Ngapara',
        'Ngaruawahia',
        'Ngataki',
        'Ngongotaha',
        'Ngunguru',
        'Norfolk',
        'North Shore City',
        'Oakura',
        'Oamaru',
        'Oban',
        'Ohakune',
        'Ohaeawai',
        'Ohangai',
        'Ohoka',
        'Ohope Beach',
        'Ohura',
        'Okaihau',
        'Okato',
        'Omanaia',
        'Omarama',
        'Omata',
        'Omokoroa',
        'Opononi',
        'Opotiki',
        'Opua',
        'Opunake',
        'Oratia',
        'Orewa',
        'Oromahoe',
        'Oruaiti',
        'Otaika',
        'Otaki',
        'Otakou',
        'Otautau',
        'Otiria',
        'Otorohanga',
        'Oxford',
        'Paekakariki',
        'Paeroa',
        'Pahiatua',
        'Paihia',
        'Pakaraka',
        'Pakiri',
        'Pakotai',
        'Palmerston',
        'Palmerston North',
        'Pamapuria',
        'Panguru',
        'Papakura',
        'Papamoa',
        'Paparoa',
        'Papatoetoe',
        'Parakai',
        'Paraparaumu',
        'Paroa',
        'Parua Bay',
        'Patea',
        'Pauanui',
        'Pauatahanui',
        'Peka Peka',
        'Pembroke',
        'Peria',
        'Petone',
        'Picton',
        'Piopio',
        'Pipiwai',
        'Pirongia',
        'Pleasant Point',
        'Plimmerton',
        'Porirua',
        'Portland',
        'Poroti',
        'Port Chalmers',
        'Portobello',
        'Pukekohe',
        'Pukerua Bay',
        'Pukeuri',
        'Pukepoto',
        'Purua',
        'Putaruru',
        'Queenstown',
        'Raetihi',
        'Raglan',
        'Rahotu',
        'Rai Valley',
        'Ramarama',
        'Ranfurly',
        'Rangiora',
        'Rapaura',
        'Ratapiko',
        'Raumati',
        'Rawene',
        'Rawhitiroa',
        'Reefton',
        'Renwick',
        'Richmond',
        'Riverhead',
        'Riverlands',
        'Riversdale Beach',
        'Riverton',
        'Rolleston',
        'Ross',
        'Rotorua',
        'Roxburgh',
        'Ruatoria',
        'Ruawai',
        'Runanga',
        'Russell',
        'Sanson',
        'Seddon',
        'Sheffield and Waddington',
        'Shannon',
        'Snells Beach',
        'Springfield',
        'Stratford',
        'Silverdale',
        'Spring Creek',
        'Taharoa',
        'Taihape',
        'Taipa-Mangonui',
        'Tairua',
        'Takaka',
        'Tangiteroria',
        'Tapanui',
        'Tapu',
        'Tangowahine',
        'Tapora',
        'Taradale',
        'Tauhoa',
        'Taumarunui',
        'Taupaki',
        'Taupo',
        'Tauranga',
        'Tauraroa',
        'Tautoro',
        'Te Anau',
        'Te Arai',
        'Te Aroha',
        'Te Awamutu',
        'Te Hapua',
        'Te Horo',
        'Te Kao',
        'Te Kopuru',
        'Te Kuiti',
        'Te Puke',
        'Te Puru',
        'Temuka',
        'Te Rerenga',
        'Thames',
        'Tikorangi?',
        'Timaru',
        'Tinopai',
        'Tinwald',
        'Tirau',
        'Titoki',
        'Tokarahi',
        'Toko',
        'Tokoroa',
        'Tolaga Bay',
        'Tomarata',
        'Towai',
        'Tuakau',
        'Tuamarina',
        'Turangi',
        'Twizel',
        'Umawera',
        'Upper Hutt',
        'Urenui',
        'Uruti',
        'Waiheke Island',
        'Waharoa',
        'Waiharara',
        'Waihi',
        'Waihi Beach',
        'Waihola',
        'Waikanae',
        'Waikawa',
        'Waikawa',
        'Waima',
        'Waimangaroa',
        'Waimate',
        'Waimate North',
        'Waimauku',
        'Wainui',
        'Wainuiomata',
        'Waioneke',
        'Waiouru',
        'Waiotira',
        'Waipawa',
        'Waipukurau',
        'Wairakei',
        'Wairau Valley',
        'Wairoa',
        'Waitahuna',
        'Waikouaiti',
        'Waikuku',
        'Waitakere',
        'Waitara',
        'Waitaria Bay',
        'Waitoa',
        'Waitoki',
        'Waitoriki',
        'Waitotara',
        'Waiuku',
        'Wakefield',
        'Wallacetown',
        'Walton',
        'Waverley',
        'Wanaka',
        'Wanganui',
        'Ward',
        'Wardville',
        'Warkworth',
        'Wellington',
        'Wellsford',
        'Westport',
        'Whakatane',
        'Whakamaru',
        'Whananaki',
        'Whangamata',
        'Whangamomona',
        'Whangarei',
        'Whangarei Heads',
        'Whangaruru',
        'Whataroa',
        'Whatuwhiwhi',
        'Whenuakite',
        'Whenuakura',
        'Whiritoa',
        'Whitford',
        'Whitby',
        'Whitianga',
        'Willowby',
        'Wimbledon',
        'Winscombe',
        'Winton',
        'Woodend',
        'Woodhill',
        'Woodville',
        'Wyndham'
        );

        //TODO: Mary, please read through http://www.php.net/manual/en/book.array.php and http://php.net/manual/en/function.strcmp.php to made array search
        echo json_encode(array('aaa','bbb','ccc'));
        exit();
    }
?><!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="js/kSearchHint.js"></script>
    <style>
        /* live search hints */
        .hintable {
            position: relative;
            width: 150px;
        }
        .hintable input{
            width: 100%;
            margin: 0;
            border: 1px solid gray;
            background: #FFA;
        }
        .hintWrapper {
            width: 100%;
            position: absolute;
            left: 0px; top: 100%;
            background: white;
            color: blue;
            border: 1px solid gray;
            margin: 0;
        }
        .hintContainer{
            margin: 0; padding: 0;
        }
        .hintItem, .hintsSpinner{
            list-style: none;
            padding: 5px 3px !important;
            margin: 0;
        }
        .hintsSpinner {
            background: url(images/ajax-loader.gif) no-repeat center center;
            height: 20px;
        }
        .hintItemHovered{
            background: #eeeeff;
        }
    </style>
</head>
<body>

<div class="hintable">
    <input type="text" id="search"/>
</div>
<script>
    kSearchHint({
        input: '#search',
        url: '',
        textName: 'search'
    });
</script>

</body>
</html>
let $personnagesPage = $("#personnages-page");
let $episodesPage = $("#episodes-page");
let $citationsPage = $("#citations-page");

let $linkPersonnages = $("#link-personnages");
let $linkEpisodes = $("#link-episodes");
let $linkCitations = $("#link-citations");

let $searchBarPersonnage = $("#search-bar-personnage");
let $searchBarEpisode = $("#search-bar-episodes");
let $selectCitation = $("#citation-characters-list");

let $cardContainer = $("#personnages-cards-container");
let $episodeContainer = $("#episodes-cards-container");
let $randomCitation = $("#random-citation");
let $citationContainer = $("#citations-container");
let $characterProfile = $("#character-profile");

let $characterInputValue;
let $episodeInputValue;
let $charName;
let $charPseudo;

let $characterList = [];
let $episodeList = [];

let $arrayCharacterList = [];
let $arrayCitationList = [];
let $thisCharArray = [];


// Ecouteurs sur la nav bar
$linkPersonnages.click(function() {
    $episodesPage.addClass( "hidden" );
    $citationsPage.addClass( "hidden" );
    $characterProfile.addClass( "hidden" );
    $personnagesPage.removeClass( "hidden" );

    $linkPersonnages.html("PERSONNAGES");
    $linkEpisodes.html("Episodes");
    $linkCitations.html("Citations");

    $cardContainer.html("");
    loadCharactersList();
})

$linkEpisodes.click(function() {
    $personnagesPage.addClass( "hidden" );
    $citationsPage.addClass( "hidden" );
    $characterProfile.addClass( "hidden" );
    $episodesPage.removeClass( "hidden" );

    $linkPersonnages.html("Personnages");
    $linkEpisodes.html("EPISODES");
    $linkCitations.html("Citations");

    $episodeContainer.html("");
    loadEpisodesList();
})

$linkCitations.click(function() {
    $episodesPage.addClass( "hidden" );
    $personnagesPage.addClass( "hidden" );
    $characterProfile.addClass( "hidden" );
    $citationsPage.removeClass( "hidden" );

    $linkPersonnages.html("Personnages");
    $linkEpisodes.html("Episodes");
    $linkCitations.html("CITATIONS");

    $citationContainer.html("");
    $selectCitation.val("Sélectionnez un personnage");

    searchCitationChars();
    loadRandomCitation();
})

loadCharactersList();

// Fonction qui appelle la requête
function loadCharactersList() {

    // Requête, vers la cible choisie
    $.get("https://www.breakingbadapi.com/api/characters", function() {

    // Condition de retour de la requête (ici data) (des données intérogées sur l'API)
    })  .always(function(data) {
        // On manipule le retour, ici data, comme on le souhaite dans nos fonctions ou variables
        showCharacterList(data);
        $arrayCharacterList.push(data);
  });
}

function showCharacterList(characters) {

    characters.forEach(character => {

        const characterElement = $('<div/>',{
                                    id: character.char_id,
                                    class: 'character-card'
        }).appendTo($cardContainer);
        

        const characterImage = $('<img/>',{
                                    src:character.img,
                                    class:'character-image'
        }).appendTo(characterElement);
        

        const characterName = $('<p/>',{
                                    html: character.name,
                                    class:'character-name'
        }).appendTo(characterElement);


        const characterPseudo = $('<p/>',{
                                    html:"‘ " + character.nickname + " ’",
                                    class:'character-pseudo'
        }).appendTo(characterElement);

        characterElement.click(function() {

            $personnagesPage.addClass('hidden');
            $characterProfile.removeClass('hidden');

            $characterProfile.html("");

            const charContainer = $('<div/>',{
                                        class:'char-profile-container'
            }).appendTo($characterProfile);


            const button = $('<input/>',{
                                        type:'button',
                                        class:'return-button',
                                        value:'RETOUR'
            }).appendTo(charContainer);

            button.click(function() {
                $characterProfile.addClass('hidden');
                $personnagesPage.removeClass('hidden');
            })

                const charImg = $('<img/>',{
                                        src: character.img,
                                        class: 'char-profile-image'
                }).appendTo(charContainer);
               
                $charName = character.name;
                $charPseudo = character.nickname;

            const charNamePseudo = $('<div/>',{
                                    html: $charName + " (" + $charPseudo + ")",
                                    class: 'char-profile-name'
            }).appendTo(charContainer);

            const birthDate = $('<p/>',{
                                    html: character.birthday,
                                    class:'character-profile-date'
            }).appendTo(charContainer);

            const charOccupation = $('<p/>',{
                                    html:character.occupation,
                                    class:'char-profile-occupation'
            }).appendTo(charContainer);

        })
    })
}

function characterSearch() {

    $characterInputValue = $searchBarPersonnage.val().toLowerCase();

    $characterList = $('.character-card');

    $characterList.each(function() {
        
        let checkName = $('.character-name', this).html().toLowerCase();

        if (!checkName.includes($characterInputValue)) {
                    $(this).addClass('hidden');
                }
                else {
                    $(this).removeClass('hidden');
                }
    })
}

$searchBarPersonnage.keyup(function() {
    characterSearch();
});

loadEpisodesList();

function loadEpisodesList() {
    $.get("https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad", function() {

    })  .always(function(data) {
        showEpisodesList(data);
  });
}

function showEpisodesList(episodes) {

    episodes.forEach(episode => {

        const episodeTotal = $('<div/>',{
                            id: episode.episode_id,
                            class: 'episode-card'
        }).appendTo($episodeContainer);

        
        const episodeLeftPart = $('<div/>',{
                                class:'episode-card-left'
        }).appendTo(episodeTotal);


        const episodeTitle = $('<h3/>',{
                                html:episode.title,
                                class:'episode-title'
        }).appendTo(episodeLeftPart);

        const episodeNumber = $('<p/>',{
                                html:"Episode: " + episode.episode,
                                class:'episode-number'
        }).appendTo(episodeLeftPart);

        const episodeSeason = $('<p/>',{
                                html:"Saison: " + episode.season,
                                class:'episode-season'
        }).appendTo(episodeLeftPart);


        const episodeRightPart = $('<div/>',{
                                class:'episode-card-right'
        }).appendTo(episodeTotal);

        const episodeH3 = $('<h3/>',{
                                html:"PERSONNAGES",
                                class:'episode-personnage-title'
        }).appendTo(episodeRightPart);


        const episodeCharList = $('<ul/>',{
        }).appendTo(episodeRightPart);

        for (i= 0;i<3;i++) {

            const episodeCharItem = $('<li/>',{
                                    html:episode.characters[i],
                                    class:'episode-char-item'
            }).appendTo(episodeCharList);
    

            episodeCharItem.click(function(e) {

                $episodesPage.addClass('hidden');
                $characterProfile.removeClass('hidden');

                $characterProfile.html("");

                const charContainer = $('<div/>', {
                                        class:'char-profile-container'
                }).appendTo($characterProfile);


                const button = $('<input/>',{
                                        type:'button',
                                        class:'return-button',
                                        value:'RETOUR'
                }).appendTo(charContainer);

                button.click(function() {
                    $characterProfile.addClass('hidden');
                    $episodesPage.removeClass('hidden');
                })

                for (i=0;i<$arrayCharacterList[0].length; i++) {
                    if (e.target.innerHTML == $arrayCharacterList[0][i].name) {
                        $thisCharArray = [];
                        $thisCharArray.push($arrayCharacterList[0][i]);
                    }
                }

                const charImg = $('<img/>',{
                                        src:$thisCharArray[0].img,
                                        class:'char-profile-image'
                }).appendTo(charContainer);


                let charName = $thisCharArray[0].name;
                let charPseudo = $thisCharArray[0].nickname;


                const charNamePseudo = $('<div/>',{
                                        html:charName + " (" + charPseudo + ")",
                                        class:'char-profile-name'
                }).appendTo(charContainer);


                const birthDate = $('<p/>',{
                                        html:$thisCharArray[0].birthday,
                                        class:'character-profile-date'
                }).appendTo(charContainer);
 

                const charOccupation = $('<p/>',{
                                        html:$thisCharArray[0].occupation,
                                        class:'char-profile-occupation'
                }).appendTo(charContainer);
            })
        }
    }
    )
}   

function episodeSearch() {

    $episodeInputValue = $searchBarEpisode.val().toLowerCase();

    $episodeList = $('.episode-card');

    $episodeList.each(function() {
        
        let checkEpisode = $('.episode-title', this).html().toLowerCase();

        if (!checkEpisode.includes($episodeInputValue)) {
            $(this).addClass('hidden');
            }
        else {
            $(this).removeClass('hidden');
            }
    })
}

$searchBarEpisode.keyup(function () {
    episodeSearch();
});

function loadRandomCitation() {
    $.get("https://www.breakingbadapi.com/api/quote/random", function() {

    })  .always(function(data) {
        showRandomCitation(data);
  });
}

function showRandomCitation(quote) {

    $randomCitation.html("");

    let randomQuoteElement = $('<div/>',{
                            class:'random-quote-element'
    }).appendTo($randomCitation);


    let randomQuoteText = $('<p/>',{
                            html:"« " + quote[0].quote + " »",
                            class:'random-quote-text'
    }).appendTo(randomQuoteElement);


    let randomQuoteAuthor = $('<p/>',{
                            html:quote[0].author,
                            class:'random-quote-author'
    }).appendTo(randomQuoteElement);


    randomQuoteAuthor.click(function(e) {

        $citationsPage.addClass('hidden');
        $characterProfile.removeClass('hidden');

        $characterProfile.html("");


        const charContainer = $('<div/>',{
                                class:'char-profile-container'
        }).appendTo($characterProfile);


        const button = $('<input/>',{
                                type:'button',
                                class:'return-button',
                                value:'RETOUR'
        }).appendTo(charContainer);


        button.click(function() {
            $characterProfile.addClass('hidden');
            $citationsPage.removeClass('hidden');
        })

        for (i=0;i<$arrayCharacterList[0].length; i++) {
            if (e.target.innerHTML == $arrayCharacterList[0][i].name) {
                $thisCharArray = [];
                $thisCharArray.push($arrayCharacterList[0][i]);
            }
        }

        const charImg = $('<img/>',{
                                src:$thisCharArray[0].img,
                                class:'char-profile-image'
        }).appendTo(charContainer);


        let charName = $thisCharArray[0].name;
        let charPseudo = $thisCharArray[0].nickname;


        const charNamePseudo = $('<div/>',{
                                html:charName + " (" + charPseudo + ")",
                                class:'char-profile-name'
        }).appendTo(charContainer);
 

        const birthDate = $('<p/>',{
                                html:$thisCharArray[0].birthday,
                                class:'character-profile-date'
        }).appendTo(charContainer);


        const charOccupation = $('<p/>',{
                                html:$thisCharArray[0].occupation,
                                class:'char-profile-occupation'
        }).appendTo(charContainer);
    })
}

loadCitationsList();

function loadCitationsList() {
    $.get("https://www.breakingbadapi.com/api/quotes", function(data) {

    })  .always(function(data) {
        $arrayCitationList.push(data);
  });
}

function searchCitationChars() {

    $arrayCharacterList[0].forEach(character => {


        const newOption = $('<option/>',{
                            class: 'citation-select-option',
                            html: character.name
        }).appendTo($selectCitation);

        newOption.click(function(e) {

            $citationContainer.html("");

            for (i = 0; i < $arrayCitationList[0].length; i++) {

                if (e.target.innerHTML == $arrayCitationList[0][i].author) {


                    const citationElement = $('<div/>',{
                                            id:$arrayCitationList[0][i].quote_id,
                                            class:'citation-card'
                    }).appendTo($citationContainer);


                    const citationText = $('<p/>',{
                                            html:"« " + $arrayCitationList[0][i].quote + " »",
                                            class:'citation-text'
                    }).appendTo(citationElement);


                    const citationSerie = $('<p/>',{
                                            html:$arrayCitationList[0][i].series,
                                            class:'citation-serie'
                    }).appendTo(citationElement);
                }
            }

            if ($citationContainer.html() == "") {

                const citationElement = $('<div/>',{
                                        class: 'citation-card',
                                        html: "Ce personnage n'a aucune citation."
                }).appendTo($citationContainer);   
            }
        })
    })
}
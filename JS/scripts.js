// Déclaration des variables générales
let personnagesPage = $("#personnages-page");
let episodesPage = $("#episodes-page");
let citationsPage = $("#citations-page");

let linkPersonnages = $("#link-personnages");
let linkEpisodes = $("#link-episodes");
let linkCitations = $("#link-citations");

let searchBarPersonnage = $("#search-bar-personnage");
let searchBarEpisode = $("#search-bar-episodes");
let selectCitation = $("#citation-characters-list");

let cardContainer = $("#personnages-cards-container");
let episodeContainer = $("#episodes-cards-container");
let randomCitation = $("#random-citation");
let citationContainer = $("#citations-container");
let characterProfile = $("#character-profile");


// console.log($('#personnages-page'));
// $('#personnages-page').css({'background':'pink'});

let characterInputValue;
let episodeInputValue;
let charName;
let charPseudo;

let characterList = [];
let episodeList = [];

let arrayCharacterList = [];
let arrayCitationList = [];
let thisCharArray = [];



// Ecouteurs sur la nav bar
linkPersonnages.click(function() {
    episodesPage.addClass( "hidden" );
    citationsPage.addClass( "hidden" );
    characterProfile.addClass( "hidden" );
    personnagesPage.removeClass ( "hidden" );

    linkPersonnages.html("PERSONNAGES");
    linkEpisodes.html("Episodes");
    linkCitations.html("Citations");

    loadCharactersList();
})

linkEpisodes.click(function() {
    personnagesPage.addClass( "hidden" );
    citationsPage.addClass( "hidden" );
    characterProfile.addClass( "hidden" );
    episodesPage.removeClass( "hidden" );

    linkPersonnages.html("Personnages");
    linkEpisodes.html("EPISODES");
    linkCitations.html("Citations");
})

linkCitations.click(function() {
    episodesPage.addClass( "hidden" );
    personnagesPage.addClass( "hidden" );
    characterProfile.addClass( "hidden" );
    citationsPage.removeClass( "hidden" );

    linkPersonnages.html("Personnages");
    linkEpisodes.html("Episodes");
    linkCitations.html("CITATIONS");

    citationContainer.html("");
    selectCitation.val("Sélectionnez un personnage");

    searchCitationChars();
    loadRandomCitation();
})

// partie pour les personages


// function loadCharactersList() {

//     let request = new XMLHttpRequest();

//     request.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             showCharacterList(JSON.parse(this.responseText));
//             arrayCharacterList.push(JSON.parse(this.responseText));
//         }
//     }
//     request.open("GET", "https://www.breakingbadapi.com/api/characters", true);
//     request.send();
// }

loadCharactersList();

// Fonction qui appelle la requête
function loadCharactersList() {

    // Requête, vers la cible choisie
    $.get("https://www.breakingbadapi.com/api/characters", function() {

    // Condition de retour de la requête (ici data) (des données intérogées sur l'API)
    })  .always(function(data) {
        // On manipule le retour, ici data, comme on le souhaite dans nos fonctions ou variables
        showCharacterList(data);
        arrayCharacterList.push(data);
  });
}


function showCharacterList(characters) {

    characters.forEach(character => {



        const characterElement = $('<div/>',{
                                    id: character.char_id,
                                    class: 'character-card'
        }).appendTo(cardContainer);
        

        const characterImage = document.createElement('img');
        characterImage.src = character.img;
        characterImage.classList.add('character-image');

        characterElement.append(characterImage);

        const characterName = document.createElement('p');
        characterName.innerHTML = character.name;
        characterName.classList.add('character-name');

        characterElement.append(characterName);

        const characterPseudo = document.createElement('p');
        characterPseudo.innerHTML = "‘ " + character.nickname + " ’";
        characterPseudo.classList.add('character-pseudo');

        characterElement.append(characterPseudo);


        //cardContainer.append(characterElement);

        characterElement.click(function(e) {

            personnagesPage.addClass('hidden');
            characterProfile.removeClass('hidden');

            characterProfile.html("");

            const charContainer = document.createElement('div');
            charContainer.classList.add('char-profile-container');

            const button = document.createElement('input');
            button.type = 'button';
            button.classList.add('return-button');
            button.value = 'RETOUR';
            charContainer.appendChild(button);
            button.addEventListener('click', ()=> {
                characterProfile.addClass('hidden');
                personnagesPage.removeClass('hidden');
            })

            if (e.target.classList.contains('character-card')) {

                const charImg = document.createElement('img');
                charImg.src = e.target.querySelector('img').src;
                charImg.classList.add('char-profile-image');
                charContainer.appendChild(charImg);

                charName = character.name;
                charPseudo = e.target.querySelector('.character-pseudo').innerHTML;

            } else {

                const charImg = document.createElement('img');
                charImg.src = e.composedPath()[1].querySelector('img').src;
                charImg.classList.add('char-profile-image');
                charContainer.appendChild(charImg);

                charName = e.composedPath()[1].querySelector('.character-name').innerHTML;
                charPseudo = e.composedPath()[1].querySelector('.character-pseudo').innerHTML;
            }

            const charNamePseudo = document.createElement('div');
            charNamePseudo.innerHTML = charName + " (" + charPseudo + ")";
            charNamePseudo.classList.add('char-profile-name');
            charContainer.appendChild(charNamePseudo);

            const birthDate = document.createElement('p');
            birthDate.innerHTML = character.birthday;
            birthDate.classList.add('character-profile-date');
            charContainer.appendChild(birthDate);

            const charOccupation = document.createElement('p');
            charOccupation.innerHTML = character.occupation;
            charOccupation.classList.add('char-profile-occupation');
            charContainer.appendChild(charOccupation);

            characterProfile.append(charContainer);
        })
    })
}



function characterSearch() {

    characterInputValue = searchBarPersonnage.val();
    characterInputValue = characterInputValue.toLowerCase();

    characterList = $('.character-card');

    for (i = 0; i < characterList.length; i++) {

        let checkName = characterList[i].querySelector('.character-name').innerHTML.toLowerCase();

        if (!checkName.includes(characterInputValue)) {
            characterList[i].classList.add('hidden');
        }
        else {
            characterList[i].classList.remove('hidden');
        }
    }
}

searchBarPersonnage.keyup(function() {
    characterSearch();
});




// partie pour les épisodes


loadEpisodesList();



function loadEpisodesList() {
    $.get("https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad", function(data) {

    })  .always(function(data) {
        showEpisodesList(data);
  });
}



// function loadEpisodesList() {

//     let request = new XMLHttpRequest();

//     request.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             showEpisodesList(JSON.parse(this.responseText));
//         }
//     }
//     request.open("GET", "https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad", true);
//     request.send();
// }



function showEpisodesList(episodes) {

    episodes.forEach(episode => {

        const episodeTotal = $('<div/>',{
            id: episode.episode_id,
            class: 'episode-card'
}).appendTo(episodeContainer);

        // création du container final
        // const episodeTotal = document.createElement('div');
        // episodeTotal.id = episode.episode_id;
        // episodeTotal.classList.add('episode-card');


        // création de la partie gauche de la carte
        const episodeLeftPart = document.createElement('div');
        episodeLeftPart.classList.add('episode-card-left');

        const episodeTitle = document.createElement('h3');
        episodeTitle.innerHTML = episode.title;
        episodeTitle.classList.add('episode-title');
        episodeLeftPart.appendChild(episodeTitle);

        const episodeNumber = document.createElement('p');
        episodeNumber.innerHTML = "Episode: " + episode.episode;
        episodeNumber.classList.add('episode-number');
        episodeLeftPart.appendChild(episodeNumber);

        const episodeSeason = document.createElement('p');
        episodeSeason.innerHTML = "Saison: " + episode.season;
        episodeSeason.classList.add('episode-season');
        episodeLeftPart.appendChild(episodeSeason);


        // Création de la partie droite de la carte
        const episodeRightPart = document.createElement('div');
        episodeRightPart.classList.add('episode-card-right');

        const episodeH3 = document.createElement('h3');
        episodeH3.innerHTML = "PERSONNAGES";
        episodeH3.classList.add('episode-personnage-title');
        episodeRightPart.appendChild(episodeH3);

        const episodeCharList = document.createElement('ui');
        for (i = 0; i < 3; i++) {
            const episodeCharItem = document.createElement('li');
            episodeCharItem.innerHTML = episode.characters[i];
            episodeCharItem.classList.add('episode-char-item');





            episodeCharItem.addEventListener('click', (e)=> {

                episodesPage.addClass('hidden');
                characterProfile.removeClass('hidden');

                characterProfile.html("");

                const charContainer = document.createElement('div');
                charContainer.classList.add('char-profile-container');

                const button = document.createElement('input');
                button.type = 'button';
                button.classList.add('return-button');
                button.value = 'RETOUR';
                charContainer.appendChild(button);

                button.addEventListener('click', () => {
                    characterProfile.addClass('hidden');
                    episodesPage.removeClass('hidden');
                })

                for (i = 0; i < arrayCharacterList[0].length; i++) {
                    if (e.target.innerHTML == arrayCharacterList[0][i].name) {
                        thisCharArray = [];
                        thisCharArray.push(arrayCharacterList[0][i]);
                    }
                }

                const charImg = document.createElement('img');

                // e cible le nom du personnage. Itération dans le tableau de perso, pour récupérer les données?

                charImg.src = thisCharArray[0].img;
                charImg.classList.add('char-profile-image');
                charContainer.appendChild(charImg);


                let charName = thisCharArray[0].name;
                let charPseudo = thisCharArray[0].nickname;

                const charNamePseudo = document.createElement('div');
                charNamePseudo.innerHTML = charName + " (" + charPseudo + ")";
                charNamePseudo.classList.add('char-profile-name');
                charContainer.appendChild(charNamePseudo);

                const birthDate = document.createElement('p');
                birthDate.innerHTML = thisCharArray[0].birthday;
                birthDate.classList.add('character-profile-date');
                charContainer.appendChild(birthDate);

                const charOccupation = document.createElement('p');
                charOccupation.innerHTML = thisCharArray[0].occupation;
                charOccupation.classList.add('char-profile-occupation');
                charContainer.appendChild(charOccupation);


                characterProfile.append(charContainer);
            })







            episodeCharList.appendChild(episodeCharItem);
        }
        episodeRightPart.appendChild(episodeCharList);


        // concatenation des deux colones des cartes épisodes
        episodeTotal.append(episodeLeftPart);
        episodeTotal.append(episodeRightPart);

        //episodeContainer.append(episodeTotal);
    }
    )
}


function episodeSearch() {


    episodeInputValue = searchBarEpisode.val();
    episodeInputValue = episodeInputValue.toLowerCase();


    episodeList = $('.episode-card');


    for (i = 0; i < episodeList.length; i++) {


        let checkEpisode = episodeList[i].querySelector('.episode-title').innerHTML.toLowerCase();


        if (!checkEpisode.includes(episodeInputValue)) {
            episodeList[i].classList.add('hidden');
        }
        else {
            episodeList[i].classList.remove('hidden');
        }

    }

}

searchBarEpisode.keyup(function () {
    episodeSearch();
});





// Partie citations

function loadRandomCitation() {
    $.get("https://www.breakingbadapi.com/api/quote/random", function(data) {

    })  .always(function(data) {
        showRandomCitation(data);
  });
}


// function loadRandomCitation() {

//     let request = new XMLHttpRequest();

//     request.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             showRandomCitation(JSON.parse(this.responseText));
//         }
//     }
//     request.open("GET", "https://www.breakingbadapi.com/api/quote/random", true);
//     request.send();
// }

function showRandomCitation(quote) {

    randomCitation.html("");

    let randomQuoteElement = document.createElement('div');
    randomQuoteElement.classList.add('random-quote-element');

    let randomQuoteText = document.createElement('p');
    randomQuoteText.innerHTML = "« " + quote[0].quote + " »";
    randomQuoteText.classList.add('random-quote-text');
    randomQuoteElement.append(randomQuoteText);

    let randomQuoteAuthor = document.createElement('p');
    randomQuoteAuthor.innerHTML = quote[0].author;
    randomQuoteAuthor.classList.add('random-quote-author');
    randomQuoteElement.appendChild(randomQuoteAuthor);




    randomQuoteAuthor.addEventListener('click', (e)=> {

        citationsPage.addClass('hidden');
        characterProfile.removeClass('hidden');

        characterProfile.html("");

        const charContainer = document.createElement('div');
        charContainer.classList.add('char-profile-container');

        const button = document.createElement('input');
        button.type = 'button';
        button.classList.add('return-button');
        button.value = 'RETOUR';
        charContainer.appendChild(button);

        button.addEventListener('click', ()=> {
            characterProfile.addClass('hidden');
            citationsPage.removeClass('hidden');
        })

        for (i = 0; i < arrayCharacterList[0].length; i++) {

            if (e.target.innerHTML == arrayCharacterList[0][i].name) {
                thisCharArray = [];
                thisCharArray.push(arrayCharacterList[0][i]);
            }
        }

        const charImg = document.createElement('img');

        // e cible le nom du personnage. Itération dans le tableau de perso, pour récupérer les données?

        charImg.src = thisCharArray[0].img;
        charImg.classList.add('char-profile-image');
        charContainer.appendChild(charImg);


        let charName = thisCharArray[0].name;
        let charPseudo = thisCharArray[0].nickname;

        const charNamePseudo = document.createElement('div');
        charNamePseudo.innerHTML = charName + " (" + charPseudo + ")";
        charNamePseudo.classList.add('char-profile-name');
        charContainer.appendChild(charNamePseudo);

        const birthDate = document.createElement('p');
        birthDate.innerHTML = thisCharArray[0].birthday;
        birthDate.classList.add('character-profile-date');
        charContainer.appendChild(birthDate);

        const charOccupation = document.createElement('p');
        charOccupation.innerHTML = thisCharArray[0].occupation;
        charOccupation.classList.add('char-profile-occupation');
        charContainer.appendChild(charOccupation);


        characterProfile.append(charContainer);
    })




    randomCitation.append(randomQuoteElement);
}











loadCitationsList();

function loadCitationsList() {

    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //showCitationsList(JSON.parse(this.responseText));
            arrayCitationList.push(JSON.parse(this.responseText));
        }
    }
    request.open("GET", "https://www.breakingbadapi.com/api/quotes", true);
    request.send();
}



function searchCitationChars() {
    arrayCharacterList[0].forEach(character => {


        const newOption = $('<option/>',{
            class: 'citation-select-option',
            html: character.name
}).appendTo(selectCitation);

        // const newOption = document.createElement('option');
        // newOption.innerHTML = character.name;
        // newOption.classList.add('citation-select-option');


        newOption.click(function(e) {

            citationContainer.html("");

            for (i = 0; i < arrayCitationList[0].length; i++) {
                if (e.target.innerHTML == arrayCitationList[0][i].author) {

                    const citationElement = document.createElement('div');
                    citationElement.id = arrayCitationList[0][i].quote_id;
                    citationElement.classList.add('citation-card');

                    const citationText = document.createElement('p');
                    citationText.innerHTML = "« " + arrayCitationList[0][i].quote + " »";
                    citationText.classList.add('citation-text');
                    citationElement.appendChild(citationText);

                    const citationSerie = document.createElement('p');
                    citationSerie.innerHTML = arrayCitationList[0][i].series;
                    citationSerie.classList.add('citation-serie');
                    citationElement.appendChild(citationSerie);


                    citationContainer.append(citationElement);

                }
            }


            if (citationContainer.html() == "") {


                const citationElement = $('<div/>',{
                    class: 'citation-card',
                    html: "Ce personnage n'a aucune citation."
        }).appendTo(citationContainer);

                
            }



        })


        //selectCitation.append(newOption);
    })
}

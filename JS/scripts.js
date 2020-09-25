// Déclaration des variables générales
let personnagesPage = document.getElementById('personnages-page');
let episodesPage = document.getElementById('episodes-page');
let citationsPage = document.getElementById('citations-page');

let linkPersonnages = document.getElementById('link-personnages');
let linkEpisodes = document.getElementById('link-episodes');
let linkCitations = document.getElementById('link-citations');

let searchBarPersonnage = document.getElementById('search-bar-personnage');
let searchBarEpisode = document.getElementById('search-bar-episodes');

let cardContainer = document.getElementById('personnages-cards-container');
let episodeContainer = document.getElementById('episodes-cards-container');
let randomCitation = document.getElementById('random-citation');
let citationContainer = document.getElementById('citations-container');
let characterProfile = document.getElementById('character-profile');

let characterInputValue;
let episodeInputValue;

let characterList = [];
let episodeList = [];

let arrayCharacterList = [];
let thisCharArray = [];


// Ecouteurs sur la nav bar
linkPersonnages.addEventListener('click', () => {
    episodesPage.classList.add('hidden');
    citationsPage.classList.add('hidden');
    characterProfile.classList.add('hidden');
    personnagesPage.classList.remove('hidden');

    loadCharactersList()
})

linkEpisodes.addEventListener('click', () => {
    personnagesPage.classList.add('hidden');
    citationsPage.classList.add('hidden');
    characterProfile.classList.add('hidden');
    episodesPage.classList.remove('hidden');
})

linkCitations.addEventListener('click', () => {
    episodesPage.classList.add('hidden');
    personnagesPage.classList.add('hidden');
    characterProfile.classList.add('hidden');
    citationsPage.classList.remove('hidden');

    loadRandomCitation();
})



// partie pour les personages

loadCharactersList();

function loadCharactersList() {

    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            showCharacterList(JSON.parse(this.responseText));
            arrayCharacterList.push(JSON.parse(this.responseText));
        }
    }
    request.open("GET", "https://www.breakingbadapi.com/api/characters", true);
    request.send();
}

function showCharacterList(characters) {

    characters.forEach(character => {
        const characterElement = document.createElement('div');
        characterElement.id = character.char_id;
        characterElement.classList.add('character-card');


        const characterImage = document.createElement('img');
        characterImage.src = character.img;
        characterImage.classList.add('character-image');
        characterElement.appendChild(characterImage);

        const characterName = document.createElement('p');
        characterName.innerHTML = character.name;
        characterName.classList.add('character-name');
        characterElement.appendChild(characterName);

        const characterPseudo = document.createElement('p');
        characterPseudo.innerHTML = "‘ " + character.nickname + " ’";
        characterPseudo.classList.add('character-pseudo');
        characterElement.appendChild(characterPseudo);


        cardContainer.appendChild(characterElement);

        characterName.addEventListener('click', (e) => {

            personnagesPage.classList.add('hidden');
            characterProfile.classList.remove('hidden');

            characterProfile.innerHTML = "";

            const charContainer = document.createElement('div');
            charContainer.classList.add('char-profile-container');

            const button = document.createElement('input');
            button.type = 'button';
            button.classList.add('return-button');
            button.value = 'RETOUR';
            charContainer.appendChild(button);
            button.addEventListener('click', () => {
                characterProfile.classList.add('hidden');
                personnagesPage.classList.remove('hidden');
            })


            const charImg = document.createElement('img');
            charImg.src = e.composedPath()[1].querySelector('img').src;
            charImg.classList.add('char-profile-image');
            charContainer.appendChild(charImg);


            let charName = e.composedPath()[1].querySelector('.character-name').innerHTML;
            let charPseudo = e.composedPath()[1].querySelector('.character-pseudo').innerHTML;

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


            characterProfile.appendChild(charContainer);
        })


    })
}



function characterSearch() {


    characterInputValue = searchBarPersonnage.value;
    characterInputValue = characterInputValue.toLowerCase();


    characterList = cardContainer.querySelectorAll('.character-card');

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

searchBarPersonnage.addEventListener('keyup', () => {
    characterSearch();
});




// partie pour les épisodes


loadEpisodesList();

function loadEpisodesList() {

    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            showEpisodesList(JSON.parse(this.responseText));
        }
    }
    request.open("GET", "https://www.breakingbadapi.com/api/episodes", true);
    request.send();
}



function showEpisodesList(episodes) {

    episodes.forEach(episode => {

        // création du container final
        const episodeTotal = document.createElement('div');
        episodeTotal.id = episode.episode_id;
        episodeTotal.classList.add('episode-card');


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

            



            episodeCharItem.addEventListener('click', (e) => {

                episodesPage.classList.add('hidden');
                characterProfile.classList.remove('hidden');
    
                characterProfile.innerHTML = "";
    
                const charContainer = document.createElement('div');
                charContainer.classList.add('char-profile-container');
    
                const button = document.createElement('input');
                button.type = 'button';
                button.classList.add('return-button');
                button.value = 'RETOUR';
                charContainer.appendChild(button);

                button.addEventListener('click', () => {
                    characterProfile.classList.add('hidden');
                    episodesPage.classList.remove('hidden');
                })
    
                for (i=0;i<arrayCharacterList[0].length;i++) {
                    console.log('arrayCharacterList[i].name');
                    console.log(arrayCharacterList[0][i].name);
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
    
    
                characterProfile.appendChild(charContainer);
            })







            episodeCharList.appendChild(episodeCharItem);
        }
        episodeRightPart.appendChild(episodeCharList);


        // concatenation des deux colones des cartes épisodes
        episodeTotal.appendChild(episodeLeftPart);
        episodeTotal.appendChild(episodeRightPart);

        episodeContainer.appendChild(episodeTotal);
    }
    )
}


function episodeSearch() {


    episodeInputValue = searchBarEpisode.value;
    episodeInputValue = episodeInputValue.toLowerCase();


    episodeList = episodeContainer.querySelectorAll('.episode-card');


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

searchBarEpisode.addEventListener('keyup', () => {
    episodeSearch();
});





// Partie citations



function loadRandomCitation() {

    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            showRandomCitation(JSON.parse(this.responseText));
        }
    }
    request.open("GET", "https://www.breakingbadapi.com/api/quote/random", true);
    request.send();
}

function showRandomCitation(quote) {

    randomCitation.innerHTML = "";

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




    randomQuoteAuthor.addEventListener('click', (e) => {

        citationsPage.classList.add('hidden');
        characterProfile.classList.remove('hidden');

        characterProfile.innerHTML = "";

        const charContainer = document.createElement('div');
        charContainer.classList.add('char-profile-container');

        const button = document.createElement('input');
        button.type = 'button';
        button.classList.add('return-button');
        button.value = 'RETOUR';
        charContainer.appendChild(button);

        button.addEventListener('click', () => {
            characterProfile.classList.add('hidden');
            citationsPage.classList.remove('hidden');
        })

        for (i=0;i<arrayCharacterList[0].length;i++) {
            
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


        characterProfile.appendChild(charContainer);
    })




    randomCitation.appendChild(randomQuoteElement);
}











loadCitationsList();

function loadCitationsList() {

    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            showCitationsList(JSON.parse(this.responseText));
        }
    }
    request.open("GET", "https://www.breakingbadapi.com/api/quotes", true);
    request.send();
}

function showCitationsList(citations) {

    citations.forEach(citation => {
        const citationElement = document.createElement('div');
        citationElement.id = citation.quote_id;
        citationElement.classList.add('citation-card');

        const citationText = document.createElement('p');
        citationText.innerHTML = "« " + citation.quote + " »";
        citationText.classList.add('citation-text');
        citationElement.appendChild(citationText);

        const citationAuthor = document.createElement('p');
        citationAuthor.innerHTML = citation.author;
        citationAuthor.classList.add('citation-author');
        citationElement.appendChild(citationAuthor);


        citationContainer.appendChild(citationElement);
    }
    )
}





// function citationSearch() { 


//     characterInputValue = searchBarPersonnage.value;
//     characterInputValue = characterInputValue.toLowerCase(); 


//     characterList = cardContainer.querySelectorAll('.character-card'); 

//     for (i = 0; i < characterList.length; i++) {



//         let checkName = characterList[i].querySelector('.character-name').innerHTML.toLowerCase();


//         if (!checkName.includes(characterInputValue)) { 
//             characterList[i].classList.add('hidden'); 
//         } 
//         else { 
//             characterList[i].classList.remove('hidden');                  
//         }

//     }

// } 

// searchBarCitation.addEventListener('keyup', () => {
//     citationSearch();  
// });
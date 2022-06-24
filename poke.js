let currPoke = 0;

async function getPokemon(num) {

    try {
        let data = await fetchWithTimeout('https://pokeapi.co/api/v2/pokemon/' + num, {timeout: 10000});
        let main = await data.json();
    
        let icon = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + num + '.png';
    
        if(currPoke === 4) {
            icon = 'easter.png';
        }
    
        let name = main.name;
        let cat = main.types[0].type.name;
        let height = main.height;
        let weight = main.weight;
        let blurb = await makeBlurb();
        console.log(blurb);
    
        document.getElementById('sprite').src = icon;
        document.getElementById('pokeName').innerHTML = name.toUpperCase();
        document.getElementById('number').innerHTML = "ID: " + num;
        document.getElementById('category').innerHTML = "Category: " + cat;
        document.getElementById('height').innerHTML = "Height" + height;
        document.getElementById('height').innerHTML = "Weight: " + weight;
        document.getElementById('blurb').innerHTML = blurb;
    }
    catch(e) {
        document.getElementById("sprite").src = "sad_squirt.png";
        document.getElementById("pokedex").style.display='none';
        document.getElementsByClassName("info").display='none';
        document.getElementById("previous").style.display = "none";
        document.getElementById("next").style.display = "none";
        document.getElementById("num").style.display = "none";
        document.getElementById("lab").style.display = "none";
        document.getElementById("pokeName").innerHTML="Oh no! The request timed out.";
        document.getElementById("cssfile").href = "timeout.css";
    }
}

async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 5000 } = options;
    
    const abortController = new AbortController();
    const id = setTimeout(() => abortController.abort(), timeout);
    const response = await fetch(resource, {
      ...options,
      signal: abortController.signal  
    });
    clearTimeout(id);
    return response;
  }

async function moveForward() {
    if(currPoke+1 === 898) {
        alert("You have reached the last Pokemon!");
    }
    else {
        currPoke++;
        getPokemon(currPoke);
    }

}

async function moveBack() {
    if(currPoke-1 === 0) {
        alert("You have reached the first Pokemon!");
    }
    else {
        currPoke--;
        getPokemon(currPoke);
    }

}

async function makeBlurb() {

    try {
        let data = await fetch('https://pokeapi.co/api/v2/nature/' + currPoke);
        let main = await data.json();

        let personality;
        let likes;
        let hates;

        try {
            personality = main.name;
        }
        catch(e) {
            personality = "indeterminate";
        }

        try {
            likes = main.likes_flavor.name;
        } catch(e) {
            likes = "nothing";
        }

        try {
            hates = main.hates_flavor.name;
        } catch(e) {
            hates = "nothing";
        }

        let blurb = "This pokemon has a " + personality + " personality. It likes " + likes + " and hates " + hates + ".";

        console.log(typeof(blurb));
        return blurb;
        }
    catch(e) {
        return "This pokemon has no notable traits.";
    }
    
}

async function numBar() {
    currPoke = document.getElementById('num').value;
    await getPokemon(currPoke);
}
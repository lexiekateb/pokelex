async function getPokemon() {
    let data = await fetch('https://pokeapi.co/api/v2/pokemon/butterfree');
    let main = await data.json();

    let icon = main.sprites.front_default;
    document.getElementById('sprite').src = icon;
}

getPokemon();
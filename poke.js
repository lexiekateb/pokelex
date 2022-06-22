async function getPokemon() {
    let name = pokenames.options[pokenames.selectedIndex].text;
    let data = await fetch('https://pokeapi.co/api/v2/pokemon/' + name);
    let main = await data.json();
    let icon = main.sprites.front_default;
    document.getElementById('sprite').src = icon;
}

getPokemon();
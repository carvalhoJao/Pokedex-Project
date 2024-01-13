const pokemonCount = 151;
var pokedex = {};
const limit = 10

class Pokemon {
    number;
    name;
    Description;
    types = [];
    img;
}

window.onload = async function(){
    for (let index = 1; index <= limit; index++) {
        await getPokemon(index);
    }

    console.log(pokedex);
}

async function getPokemon(numero) {
    const pokemon = new Pokemon();
    let url = "https://pokeapi.co/api/v2/pokemon/" + numero.toString();

    let response = await fetch(url);
    let result = await response.json();
    
    pokemon.name = result["name"];
    pokemon.types = result["types"];
    pokemon.img = result["sprites"]["other"]["home"];

    response = await fetch(result["species"]["url"]);
    result = await response.json();

    pokemon.Description = result["flavor_text_entries"][4]["flavor_text"];

    // console.log(pokemonDesc);

    pokedex[numero] = {
        "name" : pokemon.name,
        "img" : pokemon.img,
        "types" : pokemon.types,
        "Description" : pokemon.Description
    }
    // console.log(pokemon);
}

// function convertPokemonToLi(pokemon) {
//     return `
//         <li class="pokemon ${pokemon.type}">
//             <span class="number">#${pokemon.number}</span>
//             <span class="name">${pokemon.name}</span>

//             <div class="detail">
//                 <ol class="types">
//                     ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
//                 </ol>

//                 <img src="${pokemon.photo}"
//                      alt="${pokemon.name}">
//             </div>
//         </li>
//     `
// }
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

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
        pokemonList.innerHTML = initialLoad(index)
    
        // console.log(pokedex[index]["types"])
    }
    console.log(pokedex);
}

function initialLoad(num){
    
    return `
        <li class="pokemon ${pokedex[num]["types"][0]}">
            <span class="number">#${num}</span>
            <span class="name">${pokedex[num]["name"]}</span>

            <div class="detail">
                <ol class="types">
                    ${pokedex[num]["types"].map(type => `<li class="type ${type}">${type}</li>`).join(" ")}
                </ol>

                <img src="${pokedex[num]["img"]}">
            </div>
        </li>
    `
}

async function getPokemon(numero) {
    const pokemon = new Pokemon();
    let url = "https://pokeapi.co/api/v2/pokemon/" + numero.toString();

    let response = await fetch(url);
    let result = await response.json();
    
    for (let index = 0; index < result["types"].length; index++) {
        pokemon.types.push(result["types"][index]["type"]["name"])    
    }

    pokemon.name = result["name"];
    pokemon.img = result["sprites"]["other"]["home"]["front_default"];
    
    response = await fetch(result["species"]["url"]);
    result = await response.json();

    pokemon.Description = result["flavor_text_entries"][4]["flavor_text"];

    // console.log(pokemon.img);

    pokedex[numero] = {
        "name" : pokemon.name,
        "img" : pokemon.img,
        "types" : pokemon.types,
        "Description" : pokemon.Description
    }
    // console.log(pokedex[numero]["img"]);
}
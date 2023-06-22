const allPokemons = document.querySelector("#all-pokemons");
const SelectPoke = document.querySelectorAll(".btn-select-poke");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then((data) => MostrarPokemon(data))
};

function MostrarPokemon(pokemon){

    let types = pokemon.types.map((type) => `<p class="type right ${type.type.name}">${type.type.name}</p>`);
    types = types.join("");

    let pokemonId = pokemon.id.toString();

    if (pokemonId.length === 1) {
        pokemonId = "00" + pokemonId;
    } else if (pokemonId.length === 2) {
        pokemonId = "0" + pokemonId;
    };

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML =`
        <p class="pokemon-number-back" id="pokemon-number-back">#${pokemonId}</p>
        <div class="pokemon-back">
            <img class="pokemon-img" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
            <div class="pokemon-info">
                <div class="pokemon-name-wrapper flex">
                    <p class="pokemon-number-id right">#${pokemonId}</p>
                    <p class="pokemon-name-id">${pokemon.name}</p>
                </div>
                <div class="pokemon-types flex">
                    ${types}
                </div>
                <div class="pokemon-stats flex">
                    <p class="height right">${pokemon.height}m</p>
                    <p class="weight">${pokemon.weight}kg</p>
                </div>
            </div>
        </div>
    `;

    allPokemons.append(div);

};

SelectPoke.forEach(btn => btn.addEventListener("click",(e) => {
    const btnId = e.currentTarget.id;

    allPokemons.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then((data) => {

                if (btnId === "todos") {
                    MostrarPokemon(data);
                } else {
                    const types = (data.types.map(types => types.type.name));
    
                    if (types.some(type => type.includes(btnId))) {
                        MostrarPokemon(data);
                    };
                }
            });
    };
}));


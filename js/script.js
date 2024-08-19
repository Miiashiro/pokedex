const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemonNumber = 1

const fetchPokemon = async (pokemon) => {
    const apiPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (apiPokemon.status === 200) {
        const data = await apiPokemon.json();

        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Carregando...";
    
    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']
        ['front_default'];
        searchPokemonNumber = data.id;
    } else {
        pokemonName.innerHTML = 'Pokemon não encontrado';
        pokemonNumber.innerHTML = '';
        pokemonName.style.fontSize = '21px';
        pokemonImage.style.display = 'none';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

    input.innerHTML = '';
})

buttonPrev.addEventListener('click', () => {    
    if(searchPokemonNumber > 1){
        searchPokemonNumber -= 1;
        renderPokemon(searchPokemonNumber);
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemonNumber += 1;
    renderPokemon(searchPokemonNumber);
})

renderPokemon(searchPokemonNumber)
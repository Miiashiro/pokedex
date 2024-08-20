const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const typePokemon = document.querySelector('.type_pokemon');
const typePokemonTwo = document.querySelector('.type_pokemon_two');

let searchPokemonNumber = 1;

const sla = null

// Busca o pokemon na api
const fetchPokemon = async (pokemon) => {
    const apiPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (apiPokemon.status === 200) {
        const data = await apiPokemon.json();

        return data;
    }
}

// Busca na api a imagem do primeiro tipo do pokemon
const fetchFirstType = async (typeUrl) => {
    const apiType = await fetch(typeUrl);

    return await apiType.json();
}

// Busca na api a imagem do segundo tipo do pokemon
const fetchSecondType = async (typeUrlTwo, data) => {
    const apiType = await fetch(typeUrlTwo);

    if (data.types[1]) {
        return await apiType.json();
    } else {
        return "";
    }
}

// renderiza o pokemon
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Carregando...";

    const data = await fetchPokemon(pokemon);

    if (data) {
        const typeUrlOne = data.types[0].type.url;
        const typeData = await fetchFirstType(typeUrlOne);

        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        searchPokemonNumber = data.id;
        
        // Troca para uma imagem se o pokemon nao tiver um gif
        if(data['sprites']['versions']['generation-v']['black-white']['animated']
        ['front_default'] === null)
        {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['front_default'];
        } 
        else 
        {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']
            ['front_default'];
        }

        // Chama os metodos de busca das imagens dos tipos
        if(data.types[1]){
            const typeUrlTwo = data.types[1].type.url;
            const secondTypeData = await fetchSecondType(typeUrlTwo, data);

            typePokemon.src = typeData['sprites']['generation-viii']['sword-shield']['name_icon'];
            typePokemonTwo.src = secondTypeData['sprites']['generation-viii']['sword-shield']['name_icon'];
        } else {
            typePokemon.src = typeData['sprites']['generation-viii']['sword-shield']['name_icon'];
            typePokemonTwo.src = "";
        }
    } else {
        pokemonName.innerHTML = 'Pokemon não encontrado';
        pokemonNumber.innerHTML = '';
        pokemonName.style.fontSize = '21px';
        pokemonImage.style.display = 'none';
        typePokemon.src = "";
        typePokemonTwo.src = "";
    }
}

// Busca pelo nome
form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

    input.innerHTML = '';
})

// Botao de anterior
buttonPrev.addEventListener('click', () => {
    if (searchPokemonNumber > 1) {
        searchPokemonNumber -= 1;
        renderPokemon(searchPokemonNumber);
    }
})

// Botao de proximo
buttonNext.addEventListener('click', () => {
    searchPokemonNumber += 1;
    renderPokemon(searchPokemonNumber);
})

renderPokemon(searchPokemonNumber);
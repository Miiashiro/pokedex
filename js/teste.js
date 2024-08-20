const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const typePokemon = document.querySelector('.type_pokemon');

let searchPokemonNumber = 1;

// Função para buscar detalhes do Pokémon
const fetchPokemon = async (pokemon) => {
    const apiPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (apiPokemon.status === 200) {
        return await apiPokemon.json();
    } else {
        throw new Error('Pokémon não encontrado');
    }
}

// Função para buscar detalhes do tipo
const fetchTypeDetails = async (typeUrl) => {
    const apiType = await fetch(typeUrl);
    if (apiType.status === 200) {
        return await apiType.json();
    } else {
        throw new Error('Tipo não encontrado');
    }
}

// Função para renderizar informações do Pokémon e do tipo
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Carregando...";
    typePokemon.innerHTML = '';

    try {
        const data = await fetchPokemon(pokemon);

        // Exibindo a imagem e dados do Pokémon
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data.sprites.versions['generation-v']['black-white']['animated']['front_default'];
        searchPokemonNumber = data.id;

        // Pegando a URL do tipo e buscando detalhes do tipo
        const typeUrl = data.types[0].type.url;
        const typeData = await fetchTypeDetails(typeUrl);

        // Renderizando detalhes do tipo
        typePokemon.innerHTML = `
            <h3>Detalhes do Tipo ${typeData.name}</h3>
            <p><strong>Movimentos associados:</strong> ${typeData.moves.map(move => move.name).join(', ')}</p>
            <p><strong>Pokémons que possuem este tipo:</strong> ${typeData.pokemon.map(pokemonEntry => pokemonEntry.pokemon.name).join(', ')}</p>
            <p><strong>Tipos que causam dano duplo a este tipo:</strong> ${typeData.damage_relations.double_damage_to.map(damageType => damageType.name).join(', ')}</p>
            <p><strong>Tipos que causam metade do dano a este tipo:</strong> ${typeData.damage_relations.half_damage_from.map(damageType => damageType.name).join(', ')}</p>
            <p><strong>Tipos que não causam dano a este tipo:</strong> ${typeData.damage_relations.no_damage_from.map(damageType => damageType.name).join(', ')}</p>
        `;
    } catch (error) {
        pokemonName.innerHTML = 'Pokémon não encontrado';
        pokemonNumber.innerHTML = '';
        pokemonName.style.fontSize = '21px';
        pokemonImage.style.display = 'none';
        typePokemon.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
})

buttonPrev.addEventListener('click', () => {    
    if (searchPokemonNumber > 1) {
        searchPokemonNumber -= 1;
        renderPokemon(searchPokemonNumber);
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemonNumber += 1;
    renderPokemon(searchPokemonNumber);
})

// Inicializa com o Pokémon de número 1
renderPokemon(searchPokemonNumber);

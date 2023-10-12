console.log('Pokedex API');

const form = document.querySelector('form');
const pokemonInfo = document.getElementById('pokemonInfo');

async function fetchPokemonData(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
      throw new Error('Pokemon not found');
    }
    const data = await response.json();

    const name = data.name;
    const imageUrl = data.sprites.front_default;
    const abilities = data.abilities.map((ability) => ability.ability.name);

    const htmlContent = `
      <h3>${name}</h3>
      <img src="${imageUrl}" alt="${name}">
      <h4>Abilities:</h4>
      <ul>
        ${abilities.map((ability) => `<li>${ability}</li>`).join('')}
      </ul>
    `;

    pokemonInfo.innerHTML = htmlContent;
  } catch (error) {
    pokemonInfo.textContent = 'Pokemon not found';
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
  fetchPokemonData(pokemonName);
});

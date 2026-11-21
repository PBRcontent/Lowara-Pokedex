
const list = document.getElementById("pokemon-list");
const search = document.getElementById("search");

let pokemon = [];

async function loadPokemon() {
  list.innerHTML = "Pokémon laden...";

  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );

  const data = await response.json();

  pokemon = await Promise.all(
    data.results.map(async (item) => {
      const res = await fetch(item.url);
      return await res.json();
    })
  );

  showPokemon(pokemon);
}

function showPokemon(items) {
  list.innerHTML = "";

  items.forEach(p => {
    list.innerHTML += `
      <div class="card">
        <h3>${p.name.toUpperCase()}</h3>
        <img src="${p.sprites.front_default}">
        <p>Nummer: ${p.id}</p>
        <p>Type: ${p.types.map(t => t.type.name).join(", ")}</p>
      </div>
    `;
  });
}

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();

  showPokemon(
    pokemon.filter(p => p.name.includes(value))
  );
});

loadPokemon();

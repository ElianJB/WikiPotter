const harryAPI = async (numPagina = 1, filter = '') => {
    
        const response = await fetch(`https://api.potterdb.com/v1/characters?page[number]=${numPagina}&${filter}`);
        const data = await response.json();
        return data;
    };

const mostrarCharacters = async (numPagina = 1, filter = '') => {
    
        const charactersLista = document.getElementById('characters-list');
        charactersLista.innerHTML = '';

        const charactersData = await harryAPI(numPagina, filter);
        const characters = charactersData.data;

        if (!characters || characters.length === 0) {
            console.error('Nenhum personagem encontrado.');
            return;
        }

        characters.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.classList.add('character');

            // Adicione um event listener ao cartão de personagem
            characterCard.addEventListener('click', () => {
                // Redirecionar para a página do personagem com o ID do personagem na URL
                window.location.href = `personagem.html?id=${character.id}`;
            });

            const characterNome = document.createElement('h3');
            characterNome.textContent = character.attributes.name;

            characterCard.appendChild(characterNome);

            if (character.attributes.image) {
                const characterImagem = document.createElement('img');
                characterImagem.src = character.attributes.image;
                characterCard.appendChild(characterImagem);
            } else {
                const placeholderImagem = document.createElement('img');
                placeholderImagem.src = '/img/vazio.png';
                characterCard.appendChild(placeholderImagem);
            }

            const characterInfo = document.createElement('p');
            characterInfo.textContent = `Sexo: ${character.attributes.gender} / Raça: ${character.attributes.species}`;
            characterCard.appendChild(characterInfo);
            charactersLista.appendChild(characterCard);
        });
    };

// Função para buscar personagem pelo nome
const characterId = document.getElementById('characterId');
characterId.addEventListener('input', () => {
    const valorBusca = characterId.value.trim();
    const filter = valorBusca ? `filter[name_cont]=${valorBusca}` : '';
    mostrarCharacters(1, filter);
   
});

// Função para buscar e renderizar os personagens ao submeter o formulário
const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário

    const valorBusca = characterId.value.trim();
    const filter = valorBusca ? `filter[name_cont]=${valorBusca}` : ''; 
    mostrarCharacters(1, filter);
});

// Função para buscar e renderizar os personagens ao iniciar
window.onload = () => {
    mostrarCharacters();
};

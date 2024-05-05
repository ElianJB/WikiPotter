const obterDetalhesPersonagem = async (personagemId) => {
    
        const response = await fetch(`https://api.potterdb.com/v1/characters/${personagemId}`);
        const data = await response.json();
        return data;
    
};

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const personagemId = urlParams.get('id');

    if (personagemId) {
        const characterInfo = document.getElementById('infoPersonagens');

        const detalhesPersonagem = await obterDetalhesPersonagem(personagemId);

        if (detalhesPersonagem) {
            const characterNome = document.createElement('h2');
            characterNome.textContent = detalhesPersonagem.data.attributes.name;

            const characterImage = document.createElement('img');
            characterImage.src = detalhesPersonagem.data.attributes.image || '/img/vazio.png';
            characterImage.alt = detalhesPersonagem.data.attributes.name;

            const characterSpecies = document.createElement('p');
            characterSpecies.textContent = `Espécie: ${detalhesPersonagem.data.attributes.species}`;

            const characterGender = document.createElement('p');
            characterGender.textContent = `Gênero: ${detalhesPersonagem.data.attributes.gender}`;

            characterInfo.appendChild(characterNome);
            characterInfo.appendChild(characterImage);
            characterInfo.appendChild(characterSpecies);
            characterInfo.appendChild(characterGender);
        } else {
            const mensagemErro = document.createElement('p');
            mensagemErro.textContent = 'Erro ao carregar os detalhes do personagem.';
            characterInfo.appendChild(mensagemErro);
        }
    } else {
        console.error('ID do personagem não encontrado na URL.');
    }
};

$(document).ready(() => {
  // É chamado quando o conteúdo é inserido
  buscaFrases()
    .then(montaTexto)
})

function buscaFrases() {
  return new Promise((res, rej) => {
    $.ajax({
      url: 'https://type.fit/api/quotes',
      type: "GET",
      dataType: "json",
      success: function (data) {
        res(data);
      },
      error: function (data) {
        rej(data);
      }
    });
  })
}

function buscaGif() {
  return new Promise((res, rej) => {
    $.ajax({
      url: 'https://dog.ceo/api/breeds/image/random',
      type: "GET",
      dataType: "json",
      success: function (data) {
        res(data);
      },
      error: function (data) {
        rej(data);
      }
    });
  })
}

function montaTexto(frases) {
  const obtemNumeroAleatorio = (maximo) => {
    const min = 0, max = maximo - 1
    return Math.floor(Math.random() * (max - min) + min)
  }

  const inserirNovoCard = () => {
    const indice = obtemNumeroAleatorio(frases.length);
    const frase = frases[indice];
    const { text, author } = frase;
    const idElemento = (author || 'Ze').replaceAll(' ', '').replaceAll('.', '').replaceAll(',', '');

    buscaGif()
      .then(({message: gif}) => {
        const card = $(`
          <div class="card m-2 col-6" id="${idElemento}">
            <img class="card-img-top" src="${gif}" alt="Gif Aleatorio">
            <div class="card-body">
              <h3 class="card-title">${author || 'Irineu'}</h3>
              <p class="card-text"><cite>${text}</cite></p>
            </div>
          </div>
        `);
    
        $('#conteudo').append(card);

        $(`#${idElemento}`).on('click', () => {
          const audiosLatidos = [
            '0000991.mp3',
            '0000995.mp3',
            '0000996.mp3',
            '0000997.mp3',
            '0000998.mp3'
          ];
          const indiceAudios = obtemNumeroAleatorio(audiosLatidos.length);
          const audio = new Audio(`../assets/latidos/${audiosLatidos[indiceAudios]}`);
          audio.play();
          const timeout = setTimeout(() => {
            audio.pause();
            clearTimeout(timeout);
          }, 5000)
        });
      })
  }

  const quantidadeCards = 10

  for (let index = 0; index < quantidadeCards; index++)
    inserirNovoCard();

}
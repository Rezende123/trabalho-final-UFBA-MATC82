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
  const obtemNumeroAleatorio = () => {
    const min = 0, max = frases.length - 1
    return Math.floor(Math.random() * (max - min) + min)
  }

  const inserirNovoCard = () => {
    const indice = obtemNumeroAleatorio();
    const frase = frases[indice];
    const { text, author } = frase;

    buscaGif()
      .then(({message: gif}) => {
        const card = $(`
          <div class="card m-3 col-4">
          <img class="card-img-top" src="${gif}" alt="Gif Aleatorio">
            <div class="card-body">
              <h5 class="card-title">${author || 'Irineu'}</h5>
              <p class="card-text">${text}</p>
            </div>
          </div>
        `);
    
        $('#conteudo').append(card);
      })
  }

  const quantidadeCards = 10

  for (let index = 0; index < quantidadeCards; index++)
    inserirNovoCard();

}
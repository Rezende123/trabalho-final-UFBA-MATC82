$(document).ready(() => {
  $('#conteudo').on('DOMNodeInserted', '#Pag1', () => {
    // É chamado quando o conteúdo é inserido
    console.log('Pagina 1')
  })
})
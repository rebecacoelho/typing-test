$("#btn-change").click(randomPhrase);
$("#btn-phrase-id").click(searchPhrase);

function randomPhrase() {
  $("#spinner").toggle();

  $.get("http://localhost:3000/frases", changeRandomPhrase)
  .fail(function() {
    $("#error").toggle();
   setTimeout(function() {
    $("#error").toggle();
   }, 2000)
  })
  .always(function() {
    $("#spinner").toggle();
  });
}

function changeRandomPhrase(data) {
  let phrase = $(".text")
  let randomNumber = Math.floor(Math.random() * data.length);
  phrase.text(data[randomNumber].texto);

  lengthPhrase();
  changeInitialTimer(data[randomNumber].tempo)
};

function searchPhrase() {
  $("#spinner").toggle();
  let phraseID = $("#phrase-id").val();
  let dados = { id: phraseID }

  $.get("http://localhost:3000/frases", dados, changePhrase)
  .fail(function() {
    $("#error").toggle();
   setTimeout(function() {
    $("#error").toggle();
   }, 2000)
  })
  .always(function() {
    $("#spinner").toggle();
  });
}

function changePhrase(data) {
  let phrase = $(".text");
  phrase.text(data.texto);
  lengthPhrase();
  changeInitialTimer(data.tempo);
}
let initialTimer = $("#timer").text();
let textarea = $(".textarea");

/*
$(document).ready(function() {
  lengthPhrase();
  startCont();
  startTimer();
  $("#btn-reload").click(reloadGame);
});
*/

$(function() {
  lengthPhrase();
  startCont();
  startTimer();
  isTextRightOrWrong();
  $("#btn-reload").click(reloadGame);
  updatePoints();

  $("#users").selectize({
    create: true,
    sortField: 'text'
  });

  $('.tooltip#btn-sync').tooltipster({
    trigger: "custom"
  });

  
  $('.tooltip#btn-sync').tooltipster({
    trigger: "hover"
  });
});

function changeInitialTimer(tempo) {
  initialTimer = tempo;
  $("#timer").text(tempo)
}

function lengthPhrase() {
  let phrase = $(".text").text();
  let numWords = phrase.split(" ").length;
  let lengthPhrase = $("#text-length");
  lengthPhrase.text(numWords);
}

function startCont() {
  textarea.on("input", function() {
    let valueTextArea = textarea.val();

    let numWordsTextArea = valueTextArea.split(/\S+/).length - 1;
    $("#cont-words").text(numWordsTextArea);
  
    let numCaracters = valueTextArea.length;
    $("#cont-caracteres").text(numCaracters);
  });
}

function startTimer() {
  textarea.one("focus", function() {
    let timer = $("#timer").text();
    let intervalID = setInterval(function() {
      timer--;
      $("#timer").text(timer);
      if(timer < 1) {
        clearInterval(intervalID); // impedir que contagem desça ao negativo
        // textarea.css("background-color", "lightgray");
        endGame();
      }
    }, 1000);

    $("#btn-reload").attr("disabled", true);
  });
}

function endGame() {
  textarea.attr("disabled", true);
  textarea.toggleClass("textarea-disabled");
  $("#btn-reload").attr("disabled", false);
  insertPoints();
}

function isTextRightOrWrong() {
  textarea.on("input", function() {
  let text = $(".text").text();
  let content = textarea.val();
  let compare = text.substr(0, content.length); // comparar frase até aonde já foi digitado

  if (content == compare) {
    textarea.addClass("border-correct")
    textarea.removeClass("border-wrong")
  } else {
    textarea.addClass("border-wrong")
    textarea.removeClass("border-correct")
  }
});

}

function reloadGame() {
  textarea.attr("disabled", false);
  textarea.val("");
  $("#cont-words").text("0");
  $("#cont-caracteres").text("0");
  $("#timer").text(initialTimer); 
  startTimer();
  textarea.toggleClass("textarea-disabled");
  textarea.removeClass("border-wrong");
  textarea.removeClass("border-correct");
}
$("#btn-points").click(showPoints);
$("#btn-sync").click(syncPoints);

function insertPoints() {
  let tableBody = $(".points").find("tbody");
  let user = $("#users").val();
  let numWords = $("#cont-words").text();

  let line = newLine(user, numWords);
  line.find(".btn-remove").click(removeLine);

  tableBody.prepend(line);

  $(".points").slideDown(500);
  scrollPoints();
}

function scrollPoints() {
  let positionPoints = $(".points").offset().top;
  $("body").animate(
    { 
      scrollTop: positionPoints+"px" 
    }, 1000);
}

function newLine(user, numWords) {
  let line = $("<tr>")
  let columnUser = $("<td>").text(user);
  let columnWords = $("<td>").text(numWords)
  let columnRemove = $("<td>");

  let link = $("<a>").addClass("btn-remove").attr("href", "#")
  let icon = $("<i>").addClass("small").addClass("material-icons").text("delete");

  link.append(icon);
  columnRemove.append(link)
  line.append(columnUser);
  line.append(columnWords);
  line.append(columnRemove);

  return line;
}

function removeLine(event) {
    event.preventDefault();
    let line = $(this).parent().parent();
    line.fadeOut(1000); 
    setTimeout(function() {
      line.remove();
    }, 1000)
}

function showPoints() {
  // $(".points").toggle(); // show or hide
  $(".points").stop().slideToggle(600);
}

function syncPoints() {
  let points = [];
  let lines = $("tbody>tr");
  lines.each(function() {
    let user = $(this).find("td:nth-child(1)").text();
    let words = $(this).find("td:nth-child(2)").text();
    
    let score = {
      usuarios: user,
      pontos: words
    };

    points.push(score);
  });

  let dados = {
    placar: points
  }
  $.post("http://localhost:3000/placar", dados, function() {
    console.log("Salvou o placar no servidor")
    $(".tooltip").tooltipster("open").tooltipster("content", "Sucesso ao sicronizar")
  }).fail(function() {
    $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sicronizar")
  }).always(function(){
    setTimeout(function() {
      $(".tooltip").tooltipster("close");
    }, 1200);
  })
}

function updatePoints() {
  $.get("http://localhost:3000/placar", function(data) {
    $(data).each(function() {
      let line = newLine(this.usuarios, this.pontos);
      line.find(".btn-remove").click(removeLine);
      $("tbody").append(line);
    })
  })
}
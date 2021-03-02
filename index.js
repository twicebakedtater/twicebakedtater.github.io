import jquery from "https://cdn.skypack.dev/jquery@3.5.1";

var ranks = [4, 4, 4, 6, 6, 6, 6, 7, 7,7 , 9, 9];

var deck = [];

$(init);

function init() {
  makeDeck();
  
  $("#drawbtn").click( function() {
   
    var myCard = drawCard();
    var myCard2 = drawCard();
    
    if( myCard ) {
      makeCard( myCard.rank, myCard2.rank );
    } else {
      alert("No more cards in the deck.");
    }
    
  });
  
  $("#resetbtn").click( function() {
    resetDeck();
    makeDeck();
  });
  
  $("#submitarray").click( function() {
    //error validation
    if(/^[0-9]{1,2}(,[0-9]{1,2}){11}$/.test($("input[name=cardArray]").val())) {
    $('.error').html("")
    submitArray();
    //shuffle deck with new array
    resetDeck()
    makeDeck();
     $('.submit').html("New Array submitted successfully.")
     $('.error').empty();
    } else {
      $('.error').html("Incorrect Syntax, please try again.")
      $('.submit').empty();
    }
  });
  
}

function resetDeck() {
  $(".card").remove();
  $(".total").remove();
  $(".template").remove();
  $("body").append("<div class='card template'><span class='rank'></span></div><div class='total template'><span class='stat'></span></div>");
}

function submitArray() {
  //empty ranks array;
  ranks = []
  //grab text field value and separate values dilineated by commas
  var x = $("#cardarray").val();
   x.replace(/"/g, "");
  var list = x.split(',').map(x=>+x);
  //iterate through entries and push them into ranks array
  for (var i=0; i < list.length; i++) {
    var c = list[i];
    ranks.push(c);
  }
  
  return ranks;
}

function makeDeck() {
  
  deck = [];

    //and for each rank
    for( var j = 0; j < ranks.length; j++ ) {
      
      //make a card
      var card = {};
      card.rank = ranks[j];
      
      deck.push(card);
    }
  
}

function drawCard() {
  
  var card;
  
  if( deck.length > 0 ) {
    
    var randIndex = Math.floor( Math.random() * deck.length );
    card = deck.splice( randIndex, 1 )[0];
  }
  
  return card;
}

function makeCard( rank, rank2 ) {
  var card = $(".card.template").clone();
  var card2 = $(".card.template").clone();
  var total = rank + rank2;
  var cardTotal = $(".total.template").clone();
  
  card.removeClass("template");
  card2.removeClass("template");
  cardTotal.removeClass("template");
  
  card.find(".rank").html(rank);
  card2.find(".rank").html(rank2);
  cardTotal.find(".stat").html(total);
  
  $(".cardHolder").append(card, card2);
  $(".cardTotal").append(cardTotal);
}



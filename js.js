$(document).ready(function() {
  const words = [
    { en: "obsession", uk: "одержимість" },
    { en: "silent", uk: "мовчазний" },
    { en: "eternity", uk: "вічність" },
    { en: "talkative", uk: "говіркий" },
    { en: "freedom", uk: "свобода" },
    { en: "adventure", uk: "пригода" },
    { en: "loyalty", uk: "вірність" },
    { en: "wisdom", uk: "мудрість" },
    { en: "courage", uk: "відвага" },
    { en: "happiness", uk: "щастя" }
  ];

  let array = words.sort(() => 0.7 - Math.random()); // Shuffle the words
  let Ind = 0;
  let right = 0;
  let incorrect = 0;

  // Function to update the word and stats
  function updating() {
    console.log(array[Ind]); // Debugging log to check the word
    $("#word").text(array[Ind].en); // Update the word on the page
    $("#number").text(Ind + 1); // Update the current step number
    $("#all").text(words.length); // Update the total number of words
    $("#correctly").text(right); // Update the correct answers count
    $("#wrongly").text(incorrect); // Update the incorrect answers count
    $("#write").val(""); // Clear the input field
  }

  // Check the answer when the "Check your answer" button is clicked
  $("#check").click(function() {
    const answer = $("#write").val().trim().toLowerCase();
    const correct = array[Ind].uk.toLowerCase();
    if (answer === correct) {
      right++;
    } else {
      incorrect++;
    }
    Ind++;
    if (Ind < words.length) {
      updating();
    } else {
      result();
    }
  });

  // Check the answer when the Enter key is pressed
  $("#write").keypress(function(event) {
    if (event.which === 13) { 
      $("#check").click(); 
    }
  });

  // Show result and modal display
  function result() {
    const score = (right / words.length) * 100;
    let sms = `Your level is: ${score.toFixed(1)}%`;
    if (score >= 85) {
      sms += " C1 level";
    } else if (score >= 60) {
      sms += " B2 level";
    } else {
      sms += " B1 level. Take more extra lessons";
    }
    $(".content").prepend(`<p>${sms}</p>`);
    $("#modalw").fadeIn();
  }

  // Close the modal when the "Close" button is clicked
  $("#close").click(function() {
    $("#modalw").fadeOut();
  });

  // Reset the game when the "Restart" button is clicked
  $("#reset").click(function() {
    Ind = 0;
    right = 0;
    incorrect = 0;
    array = words.sort(() => 0.7 - Math.random()); // Reshuffle the words
    updating();
    $("#modalw").fadeOut(); 
  });

  // Move to the next word
  $("#next").click(function() {
    if (Ind < words.length - 1) {
      Ind++;
      updating();
    }
  });

  // Move to the previous word
  $("#prev").click(function() {
    if (Ind > 0) {
      Ind--;
      updating();
    }
  });

  // Initial setup
  updating();
});

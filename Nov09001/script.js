// Immediately invoked function expression
// to not pollute the global scope
(function() {
  const wheel = document.querySelector('.wheel');
  const startButton = document.querySelector('.button');
  const display = document.querySelector('.display');
  
  let deg = 0;
  let zoneSize = 45; // deg

  // Counter clockwise
  const symbolSegments = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
  }


  const handleWin = (actualDeg) => {
    const winningSymbolNr = Math.ceil(actualDeg / zoneSize);
    // display.innerHTML = symbolSegments[winningSymbolNr];
    price = symbolSegments[winningSymbolNr];

    // price = display.innerHTML
    console.log(price);

    $.post("suggestions.php", {
      suggestion: price
    }, function(data, status) {
      // $("#test").html(data);
      // alert(data);
      if(data == "true"){
        swal("Good job!", "Congratulations, You WON ...", "success", {
          button: "Aww yiss!",
        });
      }else{
        // alert(data);
        swal ( "Oops" ,  "OHH Try at another time ..." ,  "error", {
          buttons: false,
          timer: 3000,
        } )
      }
      
    });

  }

  startButton.addEventListener('click', () => {
    // Reset display
    // display.innerHTML = "-";
    // Disable button during spin
    startButton.style.pointerEvents = 'none';
    // Calculate a new rotation between 5000 and 10 000
    deg = Math.floor(5000 + Math.random() * 5000);
    // Set the transition on the wheel
    wheel.style.transition = 'all 10s ease-out';
    // Rotate the wheel
    wheel.style.transform = `rotate(${deg}deg)`; // use to first time
    // Apply the blur
    wheel.classList.add('blur');
  });

  wheel.addEventListener('transitionend', () => { //use second time, spring ekata 360 value ekak denna ona. nethanam anithpeththata kerakenava.
    // Remove blur
    wheel.classList.remove('blur');
    // Enable button when spin is over
    startButton.style.pointerEvents = 'auto';
    // Need to set transition to none as we want to rotate instantly
    wheel.style.transition = 'none';
    // Calculate degree on a 360 degree basis to get the "natural" real rotation
    // Important because we want to start the next spin from that one
    // Use modulus to get the rest value
    const actualDeg = deg % 360;
    // Set the real rotation instantly without animation
    wheel.style.transform = `rotate(${actualDeg}deg)`;
    // Calculate and display the winning symbol
    handleWin(actualDeg);
  });
})();


//appends an "active" class to .popup and .popup-content when the "Open" button is clicked
$(".open").on("click", function(){
  $(".popup-overlay, .popup-content").addClass("active");
});

//removes the "active" class to .popup and .popup-content when the "Close" button is clicked 
$(".close").on("click", function(){
  $(".popup-overlay, .popup-content").removeClass("active");
});



$(".open2").on("click", function(){
  $(".popup-overlay2, .popup-content2").addClass("active");
});

//removes the "active" class to .popup and .popup-content when the "Close" button is clicked 
$(".close2").on("click", function(){
  $(".popup-overlay2, .popup-content2").removeClass("active");
});
// var dateObj = new Date("<%= hack.ideaSubmissionEndDate %>");
// var month = dateObj.toLocaleString("default", {
//   month: "short",
// });
// var day = dateObj.getDate();
// var year = dateObj.getFullYear();

var regDate = "Oct 30, 2021 23:59:59";

// Set the date we're counting down to
var countDownReg = new Date(regDate).getTime();

var x = setInterval(function () {
  var now = new Date().getTime();

  var distance = countDownReg - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown_reg").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown_reg_span").innerHTML =
      "Registrations Closed";
  }
}, 1000);

var ideaDate = "Oct 30, 2021 23:59:59";

// Set the date we're counting down to
var countDownIdea = new Date(ideaDate).getTime();

var y = setInterval(function () {
  var now = new Date().getTime();

  var distance = countDownIdea - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown_idea").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  if (distance < 0) {
    clearInterval(y);
    document.getElementById("countdown_idea_span").innerHTML =
      "Idea Submissions Closed";
  }
}, 1000);

// $(".nav-link").click(function (e) {
//   $(this).addClass("active").removeClass("active");
// });

// KEYWORD

var key = "symphcool2021";

function checkKey() {
  var givenKey = document.getElementById("password").value;
  $("#passMe").show();
  $("#passProtect").hide();
  console.log(givenKey);

  if (givenKey === "symphcool2021") {
    $("#passMe").hide();
    $("#passProtect").show();
  } else {
    $("#passMe").show();
    $("#passProtect").hide();
    alert("Worng Password! Try Again.");
  }
}

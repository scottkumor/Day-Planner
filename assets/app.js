$(document).ready(function() {
  var dailyTasks = JSON.parse(localStorage.getItem("myDay")) || {};

  $(".save").on("click", function() {
    event.stopPropagation();
    event.stopImmediatePropagation();
    /* get the key and the value */
    var key = $(this).data("key");
    var value = $(`#${key}`).val();

    console.log(this);

    // save it local storage
    dailyTasks[key] = value;
    localStorage.setItem("myDay", JSON.stringify(dailyTasks));
  });

  /* init */
  /* pull from local storage */
  $("#hour-9").val(dailyTasks["hour-9"]);
  $("#hour-10").val(dailyTasks["hour-10"]);
  $("#hour-11").val(dailyTasks["hour-11"]);
  $("#hour-12").val(dailyTasks["hour-12"]);
  $("#hour-1").val(dailyTasks["hour-1"]);
  $("#hour-2").val(dailyTasks["hour-2"]);
  $("#hour-3").val(dailyTasks["hour-3"]);
  $("#hour-4").val(dailyTasks["hour-4"]);
  $("#hour-5").val(dailyTasks["hour-5"]);

  $("#clear").on("click", function() {
   
    localStorage.clear();
    document.location.reload(true)
  });


  

  getDate();
  getTime();
  //colorBoxes();
});



function getDate() {

    var dateGet = moment().format("dddd, MMMM D, YYYY");
    $("#dateBox").text(dateGet);
 };

 function getTime() {
    var timeGet = moment().format("h:mm:ss A");
    $("#timeBox").text(timeGet);
    setTimeout(getTime, 500);
 };


// function colorBoxes() {
//   var currentHour = moment().hours() % 12 || 12;
//   var boxes = [
//     $("#hour-9").data("key"),
//     $("#hour-10").data("key"),
//     $("#hour-11").data("key")
//   ];

//   for (i = 0; i < boxes.length; i++) {
//     if (boxes[i] < currentHour) {
//       $(this).attr("class", "ff-2 bgc-sec-1");
//       console.log(this);
//     }
//     if (boxes[i] === currentHour) {
//       $(this).attr("class", "ff-2 bgc-ter-1");
//     } else {
//       $(this).attr("class", "ff-2 bgc-pri-1");
//     }
//   }
// };
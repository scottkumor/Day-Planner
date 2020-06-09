$(document).ready(function () {
  var dailyTasks = JSON.parse(localStorage.getItem("myDay")) || {};

  $(".save").on("click", function () {
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

  $("#wipe").on("click", function () {

    localStorage.clear();
    document.location.reload(true)
  });




  getDate();
  getTime();
  colorBoxes();
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


function colorBoxes() {

  var currentHour = moment().hours(); //gets current hour

  var keys = []; //empty array to stor data-keys of boxes
  var boxes = []; //empty array to store box data

  $(".hourBox").each(function () {
    var key = $(this).data("key"); 
    var box = $(this);              

    keys.push(key)
    boxes.push(box)

    // gets box info and data-key of each box and pushes into their arrays
  });

  for (i = 0; i < keys.length; i++) {
    value = keys[i]
    if (value < currentHour) {
      if (boxes[i].data("key") === value) {
        boxes[i].attr('style', 'background-color: red')
      };
    }
    if (value === currentHour) {
      if (boxes[i].data("key") === value) {
        boxes[i].attr('style', 'background-color: yellow')
      };
    } else if (value > currentHour) {
      if (boxes[i].data("key") === value) {
        boxes[i].attr('style', 'background-color: green')
      };
    }
    // loops through each key grabbed. if the boxes data-key matches the value which
    // in turn is either less than, equal to, or greater then the current hour, it colors the box
    // accordingly

  }

  setTimeout(colorBoxes, 1000); //updates every second
};
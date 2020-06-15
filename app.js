/* local storage as global variable so it can tansverse through all functions */
var dailyTasks = JSON.parse(localStorage.getItem("items")) || {};

$(document).ready(function () {
  getName(); // prompts user for a name upon entry
  getDate(); // get date
  getTime(); //get time
  colorBoxes(); //color code the boxes based on what time it is

  populate(); // populate data where it needs to go based on key:value pairs from dailyTasks
  save(); // listener, saves individual task
  autoSave();
  clear(); // listener, clears individual task
  wipe(); // listener, clears loacal storage and all fields
});

function getName() {
  var user = JSON.parse(localStorage.getItem("name")) || "";
  // gets user's name from storage if entered previously, or an empty string.

  if (user === "") {
    user = prompt("Please enter your name:");
    if (user === null) {
      getName();
      // essentially bars the user from not entering their name by re-running the
      // function if the prompt returns null due to clicking 'cancel' or clicking
      //'ok' without anything in it.
    } else {
      localStorage.setItem("name", JSON.stringify(user));
      $("#nameBox").text(`,\u00A0${user}`);
      //inserts the text from the prompt into 'nameBox' as rferenced by the
      // 'name' key in local storage, the user's name.
    }
  } else {
    $("#nameBox").text(`\u00A0back, ${user}`);
    // if there is already a user's name in storage, change the greeting
    // and re-populate the user's name.
  }
}

function getDate() {
  var dateGet = moment().format("dddd, MMMM D, YYYY");
  $("#dateBox").text(dateGet);
}

function getTime() {
  var timeGet = moment().format("h:mm:ss A");
  $("#timeBox").text(timeGet);
  setTimeout(getTime, 500);
}

function colorBoxes() {
  var currentHour = moment().hours(); //gets current hour

  var keys = []; //empty array to stor data-keys of boxes
  var boxes = []; //empty array to store box data

  $(".hourBox").each(function () {
    var key = $(this).data("key");
    var box = $(this);

    keys.push(key);
    boxes.push(box);

    // gets box info and data-key of each box and pushes into their arrays
  });

  for (i = 0; i < keys.length; i++) {
    value = keys[i];
    if (value < currentHour) {
      if (boxes[i].data("key") === value) {
        // box itself
        boxes[i].attr(
          "style",
          "background: linear-gradient(to right, white 80%, lightcoral);"
        );
        // next sibling, textareas
        boxes[i].next().attr("disabled", "disabled");
        boxes[i].next().attr("style", "overflow-y:hidden");
        boxes[i]
          .next()
          .attr("placeholder", "It is too late to add a new task here.");
        // siblings after textarea, disabling both buttons
        boxes[i].next().next().attr("disabled", "disabled");
        boxes[i].next().next().next().attr("disabled", "disabled");
      }
    }
    if (value === currentHour) {
      if (boxes[i].data("key") === value) {
        boxes[i].attr(
          "style",
          "background: linear-gradient(to right, white 80%, sandybrown);"
        );
      }
    } else if (value > currentHour) {
      if (boxes[i].data("key") === value) {
        boxes[i].attr(
          "style",
          "background: linear-gradient(to right, white 80%, green);"
        );
      }
    }
    // loops through each key grabbed. if the boxes data-key matches the value which
    // in turn is either less than, equal to, or greater then the current hour, it colors the box
    // accordingly
  }

  setTimeout(colorBoxes, 1000); //updates every second
}

function populate() {
  $("#hour-9").val(dailyTasks["hour-9"]);
  $("#hour-10").val(dailyTasks["hour-10"]);
  $("#hour-11").val(dailyTasks["hour-11"]);
  $("#hour-12").val(dailyTasks["hour-12"]);
  $("#hour-1").val(dailyTasks["hour-1"]);
  $("#hour-2").val(dailyTasks["hour-2"]);
  $("#hour-3").val(dailyTasks["hour-3"]);
  $("#hour-4").val(dailyTasks["hour-4"]);
  $("#hour-5").val(dailyTasks["hour-5"]);
}

function save() {
  $(".save").on("click", function () {
    /* get the key and the value */
    var key = $(this).data("key");
    var value = $(`#${key}`).val();

    // save it local storage
    dailyTasks[key] = value;
    localStorage.setItem("items", JSON.stringify(dailyTasks));
  });
}

function autoSave() {
  $("textarea").keyup(function () {
    $(".save").click();
  });
}

function clear() {
  $(".clear").on("click", function () {
    // get the key
    var key = $(this).data("key");

    // set the value of the key to an empty string
    dailyTasks[key] = "";

    // re-write local storage now that the value specified is deleted
    localStorage.setItem("items", JSON.stringify(dailyTasks));

    // re-populates from local storage and displays persistent data in boxes
    populate();
  });
}

function wipe() {
  $("#wipe").on("click", function () {
    // for each textarea, gabs the keys and sets their values to empty strings, then re-populates
    $(".textBox").each(function () {
      var key = $(this).attr("id");

      dailyTasks[key] = "";

      localStorage.setItem("items", JSON.stringify(dailyTasks));
      populate();
    });
  });
}

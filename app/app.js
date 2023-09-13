/* The code is adding an event listener to the input field with the id "phone". When the user inputs a
value into the field, the event listener function is triggered. */

const phoneNumberInput = document.getElementById("phone");

phoneNumberInput.addEventListener("input", function (event) {
  const input = event.target;
  const value = input.value.replace(/\D/g, "").substring(0, 10); // Remove non-digit characters and limit to 10 digits

  const formattedValue = value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"); // Format the phone number

  input.value = formattedValue;
});

/**
 * The `initListeners` function initializes event listeners for the submit and getName buttons,
 * retrieves input values, creates a user object with the input values, and calls the `addUser`
 * function.
 */
function initListeners() {
  $("#submit").on("click", (e) => {
    e.preventDefault();

    let fn = $("#firstName").val();
    let ln = $("#lastName").val();
    let cs = $("#classes").val();
    let age = $("#age").val();
    let phone = $("#phone").val();
    let email = $("#email").val();

    // let newArrClass = cs.replaceAll(", ", ",").split(",");
    let newArrClass = cs.split(",");
    let finalClassArray = [];
    let userObj = {
      fName: fn,
      lName: ln,
      Age: age,
      pNum: phone,
      eMail: email,
      classes: [],
    };
    $.each(newArrClass, (idx, newClass) => {
      let cl = {
        className: newClass.trim(),
      };
      finalClassArray.push(cl);
    });

    userObj.classes = finalClassArray;

    console.log(userObj);
    $("#firstName").val("");
    $("#lastName").val("");
    $("#classes").val("");
    $("#age").val("");
    $("#phone").val("");
    $("#email").val("");
    addUser(userObj);
  });

  $("#getName").on("click", (e) => {
    getUser();
  });
}

/**
 * The function adds a user to the "Classes" array stored in the browser's localStorage.
 * @param user - The `user` parameter is an object that represents a user. It could have properties
 * such as `name`, `email`, `age`, etc.
 */
function addUser(user) {
  let allUsers = JSON.parse(localStorage.getItem("Classes"));
  allUsers.push(user);

  localStorage.setItem("Classes", JSON.stringify(allUsers));
}
/**
 * The function `getUser` retrieves user data from local storage and displays it on the webpage.
 */
function getUser() {
  $("#app").html("");
  // $("#app #clses").html("");
  let allUsers = JSON.parse(localStorage.getItem("Classes"));

  $.each(allUsers, (idx, user) => {
    const userBox = $(
      `<div class="bar"></div>
      <div class="container2" id="container2">
      <div class="name"><span style="color: blue;">Name: </span> <span style="font-size:18px;">${user.fName} ${user.lName}</span></div> 
      <div class="num"><span style="color: blue;">Number: </span><span style="font-size:18px;">${user.pNum}</span> </div>
       <div class="age"><span style="color: blue;">Age: </span><span style="font-size:18px;">${user.Age}</span></div>
         <div class="email"><span style="color: blue;">Email: </span><span style="font-size:18px;">${user.eMail}</span> </div>

         
         
         
      <div class="course">Courses: <span style="color: black;"></span></div>
      </div>`
    );
    const courseLoca = userBox.find(".course span");
    $.each(user.classes, (idx, cls) => {
      courseLoca.append(`&nbsp;${cls.className}&nbsp;`);
    });
    $("#app").append(userBox);
  });
}

/**
 * The function checks if the browser supports local storage and creates an empty array called
 * "Classes" if it doesn't already exist.
 */
function connectToStorage() {
  if (localStorage) {
    let classes = localStorage.getItem("Classes");
    if (classes) {
      console.log("already there");
    } else {
      localStorage.setItem("Classes", "[]");
    }
  } else {
    console.log("No Storage Detected!");
  }
}

/* The `$(document).ready()` function is a jQuery function that is used to ensure that the code inside
it is executed only after the DOM (Document Object Model) has finished loading. */
$(document).ready(function () {
  initListeners();

  connectToStorage();
});

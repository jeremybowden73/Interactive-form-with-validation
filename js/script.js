// SET FOCUS ON THE FIRST TEXT FIELD
// on page load, set focus on the first text field
const initialFocus = document.getElementById("name");
initialFocus.focus();

// "JOB ROLE" SECTION
// hide the "other job role" field upon page load with JS enabled
const otherJobRoleForm = document
  .getElementsByTagName("fieldset")[0]
  .querySelectorAll("input")[2];
otherJobRoleForm.classList.add("is-hidden");
//
// reveal text field 'Your Job Role' when "Other" option is selected
let jobTitle = document.getElementById("title");
jobTitle.addEventListener("change", e => {
  let jobRole = e.target.value;
  if (jobRole === "other") {
    otherJobRoleForm.classList.remove("is-hidden"); // unhide the 0th element in the array, i.e. the 'Your Job Role' text field
    otherJobRoleForm.id = "other-title"; // add an id attribute to the text field
    otherJobRoleForm.placeholder = "Your Job Role"; // replace default placeholder with new text
  }
});

// "T-SHIRT INFO" SECTION
// initially hide "color" label and menu
let shirtColors = document.getElementById("colors-js-puns");
shirtColors.classList.add("is-hidden");
let colors = document.getElementById("color"); // select the <select> element with id="color"
let colorsChildren = colors.children;
let defaultColor; // for the shirt color dropdown
//
let theme = document.getElementById("design"); // select the <select> element with id="design"
let re = new RegExp(""); // create an empty regex variable
//
// event listener for the "design" dropdown
theme.addEventListener("change", e => {
  let themeSelected = e.target.value;
  if (themeSelected === "js puns") {
    re = /puns/i;
    defaultColor = colorsChildren[0];
    defaultColor.selected = true; // set the displayed color to the first of the "js puns" colors
    setShirtColors(re);
  } else if (themeSelected === "heart js") {
    re = /JS shirt/i;
    defaultColor = colorsChildren[3];
    defaultColor.selected = true; // set the displayed color to the first of the "heart js" colors
    setShirtColors(re);
  } else {
    shirtColors.classList.add("is-hidden"); // re-hide the "color" label and menu if is was displayed
  }
  //
  function setShirtColors(regex) {
    shirtColors.classList.remove("is-hidden"); // unhide the "color" label and menu
    // loop over the <option> elements that are the shirt colors,
    // each time unhide it, then hide it if the regex that has been passed in does not match it's text
    for (let i = 0; i < colorsChildren.length; i++) {
      colorsChildren[i].classList.remove("is-hidden");
      let childText = colorsChildren[i].text;
      if (childText.search(regex) < 0) {
        colorsChildren[i].classList.add("is-hidden");
      }
    }
  }
});

// "REGISTER FOR ACTIVITIES" SECTION
let cost = 0; // variable to track the total cost
const activities = document.querySelector(".activities"); // select the 'activities' <fieldset>
// create a <div> to show the total cost of activies
let costStatement = document.createElement("div");
costStatement.classList.add("is-hidden"); // initially hide it
let costMessage = document.createElement("span");
let costValue = document.createElement("span");
costStatement.appendChild(costMessage);
costStatement.appendChild(costValue);
costMessage.textContent = "Total cost of activities: $";
activities.appendChild(costStatement); // add the <div> to the 'activities' <fieldset>
//
// event listener for the activity checkboxes. It will add or remove the cost of the activity to the total cost.
activities.addEventListener("change", e => {
  const checkbox = e.target; // target the selected checkbox
  const activityLabel = checkbox.parentNode; // select the <label> parent of the checkbox
  const allActivities = activities.children;
  const checkboxChecked = checkbox.checked; // true or false
  // depending on whether the checkbox was checked or unchecked, update the label's class and + or - the cost from the total cost
  //
  activityLabel.id = "trigger"; // add id to identify this activity triggered the handler
  const justClickedActivity = document.getElementById("trigger"); // select the activity that triggered the handler

  // call function to find the index of the "trigger" activity in the list of activites
  const triggerIndex = getTriggerIndex(justClickedActivity);

  document.getElementById("trigger").removeAttribute("id"); // remove the "trigger" id from the activity

  let index = 0;
  // populate 'index' if the trigger was activites 2, 3, 4, or 5
  if (
    triggerIndex === 2 ||
    triggerIndex === 3 ||
    triggerIndex === 4 ||
    triggerIndex === 5
  ) {
    index = triggerIndex;
  }

  //
  if (checkboxChecked) {
    activityLabel.className = "selected"; // add class to identify when selected
    if (index !== 0) {
      clashManagement(index, 1); // if any other activities clash with the one selected, make them unavailable
    }
    cost += parseInt(costofActivity(activityLabel)); // pass the activity to the function 'costOfActivity' and update the total cost
    costValue.textContent = cost;
    costStatement.classList.remove("is-hidden");
  } else {
    activityLabel.className = "";
    if (index !== 0) {
      clashManagement(index, 0); // make any previously clashing activited available
    }
    cost -= parseInt(costofActivity(activityLabel));
    costValue.textContent = cost;
    // hide the total cost statement if value is 0
    if (cost === 0) {
      costStatement.classList.add("is-hidden");
    }
  }
  //
  // function to search the text content of an activity for a regex of the format $xxx
  function costofActivity(activity) {
    const re = /\$(\d+)/; // regexp to capture the value after the $
    const str = activity.textContent;
    const cost = re.exec(str);
    return cost[1]; // return the captured value
  }
  //
  // function to return the index of the "trigger" activity in the list of activites
  function getTriggerIndex(justClickedActivity) {
    const index = Array.prototype.indexOf.call(
      allActivities,
      justClickedActivity
    );
    return index;
  }
  //
  // function to change the appearance of an activity if it clashes with a selected activity, and to return the appearance to normal if the clash is removed by the user
  function clashManagement(index, flag) {
    let activityToChange;
    if (index === 2) {
      activityToChange = 4;
    } else if (index === 3) {
      activityToChange = 5;
    } else if (index === 4) {
      activityToChange = 2;
    } else if (index === 5) {
      activityToChange = 3;
    }

    if (flag === 1) {
      changeState(activityToChange, "gray", true);
    } else {
      changeState(activityToChange, "black", false);
    }
  }
  // function to change the appearance of an activity
  function changeState(val, textColor, box) {
    allActivities[val].style.color = textColor;
    allActivities[val].firstElementChild.disabled = box;
  }
});

//
// "PAYMENT INFO" SECTION
const paymentOption = document.getElementById("payment"); // select the <select> element with id="payment"

// set the Select Payment Method option to disabled
const selPayMeth = paymentOption.querySelectorAll("option")[0];
selPayMeth.setAttribute("disabled", true);
// set the Credit Card option to be selected on page load
const cCard = paymentOption.querySelectorAll("option")[1];
cCard.setAttribute("selected", true);

//
// hide the paypal and bitcoin divs upon page load with JS enabled
const Fieldset = paymentOption.parentNode;
const bitcoinDiv = Fieldset.lastElementChild;
const paypalDiv = bitcoinDiv.previousElementSibling;
bitcoinDiv.classList.add("is-hidden");
paypalDiv.classList.add("is-hidden");

//
// event listener for the "payment" dropdown
paymentOption.addEventListener("change", e => {
  let paymentOptionSelected = e.target.value;
  let paymentSelect = e.target;
  let paymentFieldset = paymentSelect.parentNode.children;
  //
  // hide all the payment option divs, then unhide the one that triggered this event handler
  for (let i = 3; i < paymentFieldset.length; i++) {
    paymentFieldset[i].classList.add("is-hidden");
  }
  if (paymentOptionSelected === "credit card") {
    paymentFieldset[3].classList.remove("is-hidden");
  } else if (paymentOptionSelected === "paypal") {
    paymentFieldset[4].classList.remove("is-hidden");
  } else if (paymentOptionSelected === "bitcoin") {
    paymentFieldset[5].classList.remove("is-hidden");
  }
});

//
// "FORM VALIDATION" SECTION
// disable HTML5 form validation
const formInput = document.querySelector("form");
formInput.setAttribute("novalidate", true);
// create event listener for the form's Submit button
formInput.addEventListener("submit", e => {
  e.preventDefault(); // prevent page refresh on submission
  // create consts for form fields to be validated
  const username = document.getElementById("name");
  const email = document.getElementById("mail");
  const ccNumber = (user_name = document.getElementById("cc-num").value);
  const ccZip = document.getElementById("zip").value;
  const ccCVV = document.getElementById("cvv").value;

  //
  // validate username field has been entered correctly
  const regexUsername = /[a-z]/i;
  if (regexUsername.test(username.value)) {
    console.log("YES");
    inputGood(username, 0);
  } else {
    console.log("NO");
    inputError(username, 0);
  }

  //
  // validate email field has been entered correctly
  // Regex sourced from https://www.regular-expressions.info/email.html
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (regexEmail.test(email.value)) {
    console.log("YAY");
    inputGood(email, 1);
  } else {
    console.log("NOOOO");
    inputError(email, 1);
  }

  //
  // validate a T-shirt design has been selected
  const shirtErrorMessage = document.createElement("div"); // create a div for the error message
  shirtErrorMessage.id = "shirtErrorMessage"; // identifier
  shirtErrorMessage.style.float = "none"; // styling
  shirtErrorMessage.style.marginBottom = "24px";
  shirtErrorMessage.style.color = "red";
  shirtErrorMessage.textContent =
    "Don't forget to pick a T-shirt design and color!";
  const shirtSizeSelect = document.getElementById("size");
  const shirtSizeDiv = shirtSizeSelect.parentNode;
  const shirtSizeFieldset = shirtSizeDiv.parentNode;
  // if the shirtColors div is hidden then no design has been selected, so if the error message div is not already present insert it into the DOM
  if (
    shirtColors.className === "is-hidden" &&
    !document.getElementById("shirtErrorMessage")
  ) {
    shirtSizeFieldset.insertBefore(shirtErrorMessage, shirtSizeDiv);
    theme.style.border = "2px dotted red";
  }
  // but if the shirtColorsdiv is NOT "is-hidden" and the error message div is present, it needs to be removed from the DOM
  else if (
    shirtColors.className !== "is-hidden" &&
    document.getElementById("shirtErrorMessage")
  ) {
    const removeErrorMessage = document.getElementById("shirtErrorMessage");
    shirtSizeFieldset.removeChild(removeErrorMessage);
    theme.style.border = "";
  }

  //
  // function to change the styling of the label and input elements if erroneous data has been entered
  function inputError(input, value) {
    input.style.border = "2px dotted red";
    const errorLabel = input.previousElementSibling;
    errorLabel.style.color = "red";
    // switch statement to determine which error message should be displayed
    switch (value) {
      case 0:
        errorLabel.textContent =
          "Please enter a name containing at least one alphanumeric character:";
        break;
      case 1:
        errorLabel.textContent = "Please enter a valid email address:";
        break;
      default:
        break;
    }
  }

  // function to set the styling of the label and input elements to the default style if the entered data is valid (in case the elements were previously changed due to erroneous input)
  function inputGood(input, value) {
    input.style.border = "";
    const label = input.previousElementSibling;
    label.style.color = "";
    // switch statement to determine which label message should be displayed
    switch (value) {
      case 0:
        label.textContent = "Name:";
        break;
      case 1:
        label.textContent = "Email:";
        break;
      default:
        break;
    }
  }
});

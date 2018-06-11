// SET FOCUS ON THE FIRST TEXT FIELD
// on page load, set focus on the first text field
const initialFocus = document.getElementById("name");
initialFocus.focus();

// variable score is used to count how many of the 3 required fields
// (name, email, activity) meet the validation requirements. Only if all 3
// are met (i.e. score === 3) will the form submit successfully.
// If credit card is chosen as payment type, scoreRequiredToSubmit will
// change to 6 because it has 3 additional validation requirements that
// Paypal and Bitcoin do not
let score = 0;
let scoreRequiredToSubmit = 6;
let paymentOptionSelected = "credit-card";
//
// add Real-Time validation to the Name field
//
// create regex for allowable characters
// (alphabetic characters, hyphens and whitespaces)
const nameRegex = /[^a-z\s-]/i;
const nameInput = document.getElementById("name");
// create listener for input on the Name field
nameInput.addEventListener("input", nameValueFunc, false);
// function to check that the string is between 3 and 20 chars in length
// and the characters in the Name value match the regex
function nameValueFunc(event) {
  const nameValue = (event.target.value);
  if (nameValue.length < 3) {
    inputError(nameInput, 2);
  }
  if (nameValue.length > 20) {
    inputError(nameInput, 3);
  }
  if (nameValue.length >= 3 && nameValue.length <= 20) {
    if (nameRegex.test(nameValue)) {
      inputError(nameInput, 0);
    } else {
      inputGood(nameInput, 0);
    }
  }
}

// function to change the styling of text inputs (the label and input elements) if erroneous data has been entered
function inputError(input, value) {
  input.style.border = "2px dotted red";
  const errorLabel = input.previousElementSibling;
  errorLabel.style.color = "red";
  // switch statement to determine which error message should be displayed
  switch (value) {
    case 0:
      errorLabel.textContent =
        "Please enter only alphabetic characters, spaces, or hyphens:";
      break;
    case 1:
      errorLabel.textContent = "Please enter a valid email address:";
      break;
    case 2:
      errorLabel.textContent = "Please enter a minimum of 3 characters:";
      break;
    case 3:
      errorLabel.textContent = "Please enter a maximum of 20 characters:";
      break;
    default:
      break;
  }
}

// function to set the styling of the text inputs (label and input elements) to the default style if the entered data is valid (in case the elements were previously changed due to erroneous input)
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

//
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
    otherJobRoleForm.classList.remove("is-hidden"); // unhide the 'Your Job Role' text field
    otherJobRoleForm.id = "other-title"; // add an id attribute to the text field
    otherJobRoleForm.placeholder = "Your Job Role"; // replace default placeholder with new text
  } else {
    otherJobRoleForm.classList.add("is-hidden"); // hide the 'Your Job Role' text field if "Other" wasn't selected
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
    re = /I/;
    defaultColor = colorsChildren[3];
    defaultColor.selected = true; // set the displayed color to the first of the "heart js" colors
    setShirtColors(re);
  } else {
    shirtColors.classList.add("is-hidden"); // re-hide the "color" label and menu if is was displayed
  }
  ///
  function setShirtColors(regex) {
    shirtColors.classList.remove("is-hidden"); // unhide the "color" label and menu
    // loop over the <option> elements that are the shirt colors,
    // each time unhide and enable it, then hide and disable it if the regex that has been passed in does not match it's text
    for (let i = 0; i < colorsChildren.length; i++) {
      colorsChildren[i].classList.remove("is-hidden");
      colorsChildren[i].disabled = false;
      let childText = colorsChildren[i].text;
      if (!regex.test(childText)) {
        colorsChildren[i].classList.add("is-hidden");
        colorsChildren[i].disabled = true;
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
  const allActivities = document
    .querySelector("fieldset.activities")
    .querySelectorAll("label");
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
    triggerIndex === 1 ||
    triggerIndex === 2 ||
    triggerIndex === 3 ||
    triggerIndex === 4
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
    if (index === 1) {
      activityToChange = 3;
    } else if (index === 2) {
      activityToChange = 4;
    } else if (index === 3) {
      activityToChange = 1;
    } else if (index === 4) {
      activityToChange = 2;
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
  paymentOptionSelected = e.target.value;
  let paymentFieldset = paymentOption.parentNode.children;
  //
  // hide all the payment option divs, then unhide the one that triggered this event handler
  // and set the value of scoreRequiredToSubmit accordingly
  for (let i = 3; i < paymentFieldset.length; i++) {
    paymentFieldset[i].classList.add("is-hidden");
  }
  if (paymentOptionSelected === "credit card") {
    paymentFieldset[3].classList.remove("is-hidden");
    scoreRequiredToSubmit = 6;
  } else if (paymentOptionSelected === "paypal") {
    paymentFieldset[4].classList.remove("is-hidden");
    scoreRequiredToSubmit = 3;
  } else if (paymentOptionSelected === "bitcoin") {
    paymentFieldset[5].classList.remove("is-hidden");
    scoreRequiredToSubmit = 3;
  }
});

//
// "FORM VALIDATION" SECTION
// disable HTML5 form validation
const formInput = document.querySelector("form");
formInput.setAttribute("novalidate", true);
// create event listener for the form's Submit button
formInput.addEventListener("submit", e => {
  // create consts for form fields to be validated
  const username = document.getElementById("name");
  const email = document.getElementById("mail");
  const ccNumber = document.getElementById("cc-num");
  const ccZip = document.getElementById("zip");
  const ccCVV = document.getElementById("cvv");

  // set the "score", required for form submission, to 0
  score = 0;
  // if the "activities" field has been validated, update score
  if (cost > 0) {
    score += 1;
  }

  // validate username field has been entered correctly
  if (username.value.length < 3) {
    inputError(username, 2);
  }
  if (username.value.length > 20) {
    inputError(username, 3);
  }
  if (username.value.length >= 3 && username.value.length <= 20) {
    if (nameRegex.test(username.value)) {
      inputError(username, 0);
    } else {
      inputGood(username, 0);
      score += 1; // update score +1 if username is validated
    }
  }


  //
  // validate email field has been entered correctly
  // Regex sourced from https://www.regular-expressions.info/email.html
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (regexEmail.test(email.value)) {
    inputGood(email, 1);
    score += 1; // update score +1 if email is validated
  } else {
    inputError(email, 1);
  }

  //
  // validate a T-shirt design has been selected
  const shirtErrorDiv = createErrorMessage("shirt"); // call function to create the error message div
  //
  const shirtSizeSelect = document.getElementById("size");
  const shirtSizeDiv = shirtSizeSelect.parentNode;
  const shirtSizeFieldset = document.querySelector("fieldset.shirt");
  // if the shirtColors div is hidden then no design has been selected, so if the error message div is not already present insert it into the DOM
  if (
    shirtColors.className === "is-hidden" &&
    !document.getElementById("shirt")
  ) {
    shirtSizeFieldset.insertBefore(shirtErrorDiv, shirtSizeDiv);
    theme.style.border = "2px dotted red";
  }
  // but if the shirtColors div is NOT "is-hidden" and the error message div is present, it needs to be removed from the DOM
  else if (
    shirtColors.className !== "is-hidden" &&
    document.getElementById("shirt")
  ) {
    const removeErrorMessage = document.getElementById("shirt");
    shirtSizeFieldset.removeChild(removeErrorMessage);
    theme.style.border = "";
  }

  //
  // validate at least one Activity has been selected
  const activityErrorDiv = createErrorMessage("activity"); // call function to create the error message div
  //
  activityFieldset = document.querySelector("fieldset.activities");
  activityFirstLabel = activityFieldset.querySelector("label");
  const activitiesLastChild = activities.lastElementChild;
  if (
    activitiesLastChild.className === "is-hidden" &&
    !document.getElementById("activity")
  ) {
    activityFieldset.insertBefore(activityErrorDiv, activityFirstLabel);
  } else if (
    activitiesLastChild.className !== "is-hidden" &&
    document.getElementById("activity")
  ) {
    const removeActivityErrorDiv = document.getElementById("activity");
    activityFieldset.removeChild(removeActivityErrorDiv);
  }

  //
  // validate the credit card number field has been entered correctly
  /*
            CONDITIONAL FORMATTING DEPENDING ON THE ERROR:
            1. less than 13 characters
            2. more than 16 characters
            3. any non-numeric character
  */
  // create consts to access the DOM
  const ccardNumberDiv = ccNumber.parentNode;
  const ccardDiv = ccardNumberDiv.parentNode;
  // create a const from the user input value
  const ccNum = ccNumber.value;
  // if the card number length is less than 13 characters create and display an error message
  if (ccNum.length <= 12) {
    checkAndCreateErrorMessage("ccardShort");
  } else {
    checkAndRemoveErrorMessage("ccardShort");
  }
  // if the card number length is more than 16 characters create and display an error message
  if (ccNum.length >= 17) {
    checkAndCreateErrorMessage("ccardLong");
  } else {
    checkAndRemoveErrorMessage("ccardLong");
  }
  // if the card value contains any non-numeric characters create and display an error message
  const numericsOnlyRegex = /\D/; // regex for any non-numerics
  const checkForNumerics = numericsOnlyRegex.test(ccNum);
  if (checkForNumerics) {
    checkAndCreateErrorMessage("ccardNumerals");
  } else {
    checkAndRemoveErrorMessage("ccardNumerals");
  }

  if (ccNum.length >= 13 && ccNum.length <= 16 && !checkForNumerics) {
    score += 1; // update score +1 if card number is validated
  }

  // validate the zip code field has been entered correctly
  // create a const from the user input value
  const ccZipVal = ccZip.value;
  // check it is 5 digits; if not create and display an error message
  if (ccZipVal.length !== 5) {
    checkAndCreateErrorMessage("ccardZipLength");
  } else {
    checkAndRemoveErrorMessage("ccardZipLength");
  }
  // check if the zip code contains any non-numeric characters
  const checkZipForNumerics = numericsOnlyRegex.test(ccZipVal);
  if (checkZipForNumerics) {
    checkAndCreateErrorMessage("ccardZipNumerals");
  } else {
    checkAndRemoveErrorMessage("ccardZipNumerals");
  }

  if (ccZipVal.length === 5 && !checkZipForNumerics) {
    score += 1; // update score +1 if card Zip is validated
  }

  // validate the CVV field has been entered correctly

  // create a const from the user input value
  const ccCVVVal = ccCVV.value;
  // check it is 3 digits; if not create and display an error message
  if (ccCVVVal.length !== 3) {
    checkAndCreateErrorMessage("ccardCVVLength");
  } else {
    checkAndRemoveErrorMessage("ccardCVVLength");
  }
  // check if the zip code contains any non-numeric characters
  const checkCVVForNumerics = numericsOnlyRegex.test(ccCVVVal);
  if (checkCVVForNumerics) {
    checkAndCreateErrorMessage("ccardCVVNumerals");
  } else {
    checkAndRemoveErrorMessage("ccardCVVNumerals");
  }

  if (ccCVVVal.length === 3 && !checkCVVForNumerics) {
    score += 1; // update score +1 if card CVV is validated
  }


  // if required fields have not been validated, alert the user of the problem and prevent default behaviour (form submission)
  // otherwise, alert user that the form is submitted and submit the form
  if (score === scoreRequiredToSubmit) {
    alert("FORM SUBMITTED, THANKS!!!");
  } else {
    e.preventDefault(); // prevent page refresh on submission
    alert("Whoops! Please correct the errors on the form. Thanks");
  }



  //
  /*

          FUNCTIONS FOR FORM VALIDATION

  */

  // function to check if an error message div is already present in the DOM, and if not create it and add it to the DOM
  function checkAndCreateErrorMessage(field) {
    if (!document.getElementById(field)) {
      const addDiv = createErrorMessage(field); // call function to create the error message div
      ccardDiv.insertBefore(addDiv, ccardNumberDiv);
    }
  }

  // function to check if an error message div already exists in the DOM, and if so remove it
  function checkAndRemoveErrorMessage(field) {
    if (document.getElementById(field)) {
      const removeDiv = document.getElementById(field);
      ccardDiv.removeChild(removeDiv);
    }
  }

  // function to create an error message div
  function createErrorMessage(field) {
    const errorMessage = document.createElement("div"); // create a div for the error message
    errorMessage.id = field; // identifier
    errorMessage.style.float = "none"; // styling
    errorMessage.style.marginBottom = "24px";
    errorMessage.style.color = "red";
    if (field === "shirt") {
      errorMessage.textContent =
        "Don't forget to pick a T-shirt design and color!";
    } else if (field === "activity") {
      errorMessage.textContent = "Don't forget to pick at least one activity!";
    } else if (field === "ccardNumerals") {
      errorMessage.textContent =
        "Card Number: Please enter only numerals 0 to 9";
    } else if (field === "ccardShort") {
      errorMessage.textContent =
        "Card Number was too short. Must be 13 to 16 digits.";
    } else if (field === "ccardLong") {
      errorMessage.textContent =
        "Card Number was too long. Must be 13 to 16 digits.";
    } else if (field === "ccardZipLength") {
      errorMessage.textContent = "Zip Code must be 5 digits.";
    } else if (field === "ccardZipNumerals") {
      errorMessage.textContent = "Zip Code: Please enter only numerals 0 to 9";
    } else if (field === "ccardCVVLength") {
      errorMessage.textContent = "CVV must be 3 digits.";
    } else if (field === "ccardCVVNumerals") {
      errorMessage.textContent = "CVV: Please enter only numerals 0 to 9";
    }
    return errorMessage;
  }
});

/************************/
/*      Variables       */
/************************/
//Name Input
const nameInput = document.querySelector("#name");
// Form Element
const formElement = document.querySelector("form");
//Email Input
const emailInput = document.querySelector("#mail");
//Get All Checkboxes
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
//Grab Activity Legend
const activitiesLegend = document.querySelector(".activities legend");
//Grab Payment Selection Container
const paymentSelection = document.querySelector("#payment");
//Grab Credit Card Div
const creditCard = document.querySelector("#credit-card");
//Grab Label to Prepend Error
const nameLabel = document.querySelector('label[for="name"]');
const emailLabel = document.querySelector('label[for="mail"]');
//Create Error
const nameError = document.createElement("div");
const emailError = document.createElement("div");
const creditError = document.createElement("div");
//Assign errors class "error-message"
nameError.classList.add("error-message");
emailError.classList.add("error-message");
creditError.classList.add("error-message");

/************************/
/*   First Input Focus  */
/************************/

window.onload = () => {
  //On Load, make sure name input is focused
  nameInput.focus();
};

/************************/
/*    Job Role Input    */
/************************/

function optionJobRole() {
  //Grab Job Role Input
  const jobRoleInput = document.querySelector("#other-text");
  //Grab Select Option
  const selectOption = document.querySelector("#title");
  // Set Job Role to display none
  jobRoleInput.style.display = "none";

  //Event Handler to Check if "Other" is selected
  selectOption.addEventListener("change", (e) => {
    const target = e.target.value;
    if (target === "other") {
      jobRoleInput.style.display = "block";
    } else {
      jobRoleInput.style.display = "none";
    }
  });
}
//Call Job Role
optionJobRole();

/************************/
/*    T-Shirt Info      */
/************************/

function tShirtSelect() {
  // Design Select
  const designSelect = document.querySelector("#design");
  // Color Select
  const colorSelect = document.querySelector("#color");
  // Color Container
  const colorContainer = document.querySelector("#colors-js-puns");
  // Color Container to None
  colorContainer.style.display = "none";
  // Color Select Disabled
  colorSelect.disabled = true;

  // Design Select Event Handler to Check Which Theme is Selected
  designSelect.addEventListener("change", (e) => {
    const target = e.target.value;
    // If design JS PUNS is selected
    if (target === "js puns") {
      colorContainer.style.display = "block";
      colorSelect.disabled = false;
      colorSelect.innerHTML = `
        <option selected disabled>Please select a T-Shirt theme</option>
        <option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
        <option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</options>
        <option value="gold">Gold (JS Puns shirt only)</option>
            `;
      //If Design Heart JS is selected
    } else if (target === "heart js") {
      colorContainer.style.display = "block";
      colorSelect.disabled = false;
      colorSelect.innerHTML = `
        <option selected disabled>Please select a T-Shirt theme</option>
        <option value="tomato">Tomato (I &#9829; JS shirt only)</option>
        <option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>
        <option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>   
        `;
      // Have User Select a Theme Again
    } else if (target === "Select Theme") {
      colorContainer.style.display = "none";
      colorSelect.disabled = true;
      colorSelect.innerHTML = `
              <option selected disabled>Please select a T-shirt theme</option>
          `;
    }
  });
}

tShirtSelect();

/************************/
/*       Register       */
/************************/

function registerActivities() {
  //Create H3 Element for Total
  const costHTML = document.createElement("h3");
  //Select Activities Section
  const activityContainer = document.querySelector(".activities");
  //Append H3 Element to Activity Container
  activityContainer.append(costHTML);
  //Let Start Cost Equal Zero
  let totalCost = 0;
  //Have H3 display none
  costHTML.style.display = "none";

  //Event Handler
  activityContainer.addEventListener("change", (e) => {
    //Target
    const target = e.target;
    //Creating Cost String into Numeric
    const dataCost = parseInt(target.dataset.cost);
    //If Checked, display block and add to total cost
    if (target.checked) {
      costHTML.style.display = "block";
      totalCost += dataCost;
    } else if (!target.checked) {
      totalCost -= dataCost;
      //if Total Cost equals Zero, set the H3 display to none
      if (totalCost === 0) {
        costHTML.style.display = "none";
      }
    }
    //Select the target day and time attribute
    const dayAndTime = target.dataset.dayAndTime;
    //Loop through each CheckBox
    checkBoxes.forEach((box) => {
      //Get each box day and time
      const checkDayAndTime = box.dataset.dayAndTime;
      // Check if target day and time is equal to box day and time
      // && checkbox is not equal to the current target
      if (dayAndTime === checkDayAndTime && box !== target) {
        if (target.checked) {
          box.setAttribute("disabled", true);
          box.parentElement.style.color = "gray";
        } else if (!target.checked) {
          box.removeAttribute("disabled");
          box.parentElement.style.color = "";
        }
      }
    });
    //Set inner HTML to total Cost
    costHTML.innerHTML = `Total: $${totalCost}`;
  });
}

registerActivities();

/************************/
/*       Payment        */
/************************/

function paymentSection() {
  //Grab Paypal Container
  const paypal = document.querySelector("#paypal");
  //Grab Bitcoin Container
  const bitcoin = document.querySelector("#bitcoin");
  //Grab First Option
  const selectMethod = document.querySelector('option[value="select method"]');
  //Set Paypal and Bitcoin to display none
  paypal.style.display = "none";
  bitcoin.style.display = "none";
  //Set First Option to display none
  selectMethod.style.display = "none";
  //Event Handler to see which payment is selected
  paymentSelection.addEventListener("change", (e) => {
    const target = e.target;
    //if Credit Card
    if (target.value === "credit card") {
      creditCard.style.display = "block";
      paypal.style.display = "none";
      bitcoin.style.display = "none";
      //if paypal
    } else if (target.value === "paypal") {
      creditCard.style.display = "none";
      paypal.style.display = "block";
      bitcoin.style.display = "none";
      //if bitcoin
    } else if (target.value === "bitcoin") {
      creditCard.style.display = "none";
      paypal.style.display = "none";
      bitcoin.style.display = "block";
    }
  });
}

paymentSection();

/************************/
/*    Name Validation   */
/************************/

function nameVal() {
  //Grab Name Input Value
  const nameValue = nameInput.value;
  //If Name Input Length is less greater than zero
  if (nameValue.length > 0) {
    nameInput.style.borderColor = "";
    nameInput.previousElementSibling.style.color = "";
    nameError.style.display = "none";
    return true;
    //if Name Input Length is not greater than zero
  } else {
    nameLabel.prepend(nameError);
    nameError.style.display = "flex";
    nameError.innerHTML = `<h2>Please enter a name</h2>`;
    nameInput.style.borderColor = "red";
    nameInput.previousElementSibling.style.color = "red";
    return false;
  }
}

/************************/
/*    Email Validation  */
/************************/

function emailVal() {
  //Grab Email Input Value
  const emailValue = emailInput.value;
  //Grab the index of @ sign
  const atSign = emailValue.indexOf("@");
  //Grab the last index of .
  const period = emailValue.lastIndexOf(".");
  //Check to see if the at sign is greater than 1 and period is greater than at sign + 1
  if (atSign > 1 && period > atSign + 1) {
    //Display none of Email Error
    emailError.style.display = "none";
    emailInput.style.borderColor = "";
    emailInput.previousElementSibling.style.color = "";
    return true;
    //if email value is empty string
  } else if (emailValue === "") {
    //Email Error Display Flex
    emailError.style.display = "flex";
    //Prepend Email Error
    emailLabel.prepend(emailError);
    //Email Error Inner HTML
    emailError.innerHTML = `<h2>Please enter a email</h2>`;
    emailInput.style.borderColor = "red";
    emailInput.previousElementSibling.style.color = "red";
    return false;
    //if email value does not contain AtSign or Period
  } else if (!emailValue.includes(atSign) || !emailValue.includes(period)) {
    //Email Error Display Flex
    emailError.style.display = "flex";
    //Prepend Email Error
    emailLabel.prepend(emailError);
    //Email Error Inner HTML
    emailError.innerHTML = `<h2>Email must be: example@example.com</h2>`;
    emailInput.style.borderColor = "red";
    emailInput.previousElementSibling.style.color = "red";
    return false;
  } else {
    emailInput.style.borderColor = "red";
    emailInput.previousElementSibling.style.color = "red";
    return false;
  }
}

/************************/
/*  Activity Validation */
/************************/

function activityVal() {
  //Loop through checkboxes and see if any is checked
  for (let i = 0; i < checkBoxes.length; i++) {
    if (checkBoxes[i].checked) {
      activitiesLegend.style.color = "";
      return true;
    }
  }
  //If not return false
  activitiesLegend.style.color = "red";
  return false;
}

/************************/
/*   Credit Card Field  */
/************************/

function creditVal() {
  //Grab CC Input
  const creditCardInput = document.querySelector("#cc-num");
  //Grab CC Value
  const creditCardValue = creditCardInput.value;
  //Credit Card Regex
  const creditRegex = /^[0-9]{13,16}$/g;
  //Test Regex against CC Value
  const matchCredit = creditRegex.test(creditCardValue);
  //Check to see if credit card field is block
  if (creditCard.style.display === "block") {
    //Check to see if CC Value is true
    if (matchCredit) {
      //Set Label Color
      creditCardInput.previousElementSibling.style.color = "";
      //Set Border Color
      creditCardInput.style.borderColor = "";
      // Prepend Credit Error
      creditCard.prepend(creditError);
      //Error Display to None
      creditError.style.display = "none";
      return true;
    }
    //If CC Value is none, return true to stop function
  } else if (creditCard.style.display === "none") {
    return true;
  }
  //if CC value equals empty string
  if (creditCardValue === "") {
    //Prepend Credit Error
    creditCard.prepend(creditError);
    //Set to display flex
    creditError.style.display = "flex";
    //Credit Error Inner HTML
    creditError.innerHTML = `<h2>Please enter a credit card number</h2>`;
    //Set Border and Label Color Red
    creditCardInput.style.borderColor = "red";
    creditCardInput.previousElementSibling.style.color = "red";
    return false;
    //If Match Credit Returns False
  } else if (!matchCredit) {
    //Prepend Credit Error
    creditCard.prepend(creditError);
    //Set to display flex;
    creditError.style.display = "flex";
    //Set Credit Error Inner HTML
    creditError.innerHTML = `<h2>Please enter a credit card number between 13 and 16 digits</h2>`;
    //Set Border and Label Color
    creditCardInput.style.borderColor = "red";
    creditCardInput.previousElementSibling.style.color = "red";
    return false;
  }
}

/************************/
/*    Zip Code Field    */
/************************/

function zipVal() {
  //Grab Zip Input
  const zipCode = document.querySelector("#zip");
  //Grab Zip Value
  const zipCodeValue = zipCode.value;
  //Zip Regex
  const zipRegex = /^\d{5}$/g;
  //Test Zip Regex against Zip Value
  const matchZip = zipRegex.test(zipCodeValue);
  //if Credit Card is display block
  if (creditCard.style.display === "block") {
    //Check if matchZip returns true
    if (matchZip) {
      zipCode.previousElementSibling.style.color = "";
      zipCode.style.borderColor = "";
      return true;
    }
    //If Credit Card container is display none, return true to stop function
  } else if (creditCard.style.display === "none") {
    return true;
  }
  //If matchZip returns false
  if (!matchZip) {
    zipCode.style.borderColor = "red";
    zipCode.previousElementSibling.style.color = "red";
    return false;
  }
}

/************************/
/*      CVV Field       */
/************************/

function cvvField() {
  //Get CVV Input Field
  const cvvField = document.querySelector("#cvv");
  //Get CVV Value
  const cvvValue = cvvField.value;
  // CVV Regex
  const cvvRegex = /^\d{3}$/g;
  //CVV Test To Input Value
  const matchCvv = cvvRegex.test(cvvValue);
  //If Credit Card is Block
  if (creditCard.style.display === "block") {
    //Check if user has provided CVV that match Regex
    if (matchCvv) {
      cvvField.style.borderColor = "";
      cvvField.previousElementSibling.style.color = "";
      return true;
    }
    //If Credit Card is display none
  } else if (creditCard.style.display === "none") {
    //Return True, this prevents code running with other payment selection
    return true;
  }
  //if user CVV does not match Regex
  if (!matchCvv) {
    cvvField.style.borderColor = "red";
    cvvField.previousElementSibling.style.color = "red";
    return false;
  }
}

/************************/
/*     Submit Form      */
/************************/

formElement.addEventListener("submit", (e) => {
  //Call Every Function
  nameVal();
  emailVal();
  activityVal();
  creditVal();
  zipVal();
  cvvField();

  //Test to see if these functions fail to prevent form from submitting
  if (!nameVal()) {
    e.preventDefault();
  }
  if (!emailVal()) {
    e.preventDefault();
  }
  if (!activityVal()) {
    e.preventDefault();
  }

  if (!creditVal()) {
    e.preventDefault();
  }
  if (!zipVal()) {
    e.preventDefault();
  }
  if (!cvvField()) {
    e.preventDefault();
  }
});

/************************/
/*     Event Handler    */
/************************/

//This will keep track of what the user types and display a error message based on what is typed in the email input
emailInput.addEventListener("keyup", emailVal);

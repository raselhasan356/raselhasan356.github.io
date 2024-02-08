//var apiUrl = 'http://192.168.8.95:4000/v1/popup-entity?shop=fusionfirm.myshopify.com'
var submitUrl =
  "https://fb04-182-163-107-41.ngrok-free.app/v1/leads/generate-lead?shop=fusionfirm.myshopify.com";

var apiUrl =
  "https://fb04-182-163-107-41.ngrok-free.app/v1/popup-entity?shop=fusionfirm.myshopify.com";

// Attach event listener to the close button

var templateMap = new Map();
var shop = "fusionfirm";

var popups = [];
var idleTime = 0;
window.document.onload = function (e) {
  console.log(
    "document.onload",
    e,
    Date.now(),
    window.tdiff,
    (window.tdiff[0] = Date.now()) && window.tdiff.reduce(fred)
  );
};
window.onload = function (e) {
  // var idleInterval = setInterval(timerIncrement, 60000);
  getPopupInformation();

  /*  document.onmousemove = function (e) {

    idleTime = 0;
  } */

  /*  $(document).keypress(function (e) {
    idleTime = 0;
  });

  const body = document.querySelector('body');
  let mouseY;
  body.addEventListener('mouseleave', (event) => {
    mouseY = event.clientY;
    console.log('y', mouseY)
    if (mouseY < 0) {
      console.log('Exit Intent');
      showPopups();
      // add additional code for exit intent here
    }
  }); */

  //writeDom(data);
};

/* window.addEventListener("beforeunload", function (e) {

  //handleExitEvent();
  showPopups();


}); */

/* $(window).on('scroll', function () {
  var s = $(window).scrollTop(),
    d = $(document).height(),
    c = $(window).height();

  var scrollPercent = (s / (d - c)) * 100;

  console.clear();
  console.log(scrollPercent);

  if (scrollPercent > 15) {
    if (popups.length > 0) {

      for (var i = 0; i < popups.length; i++) {
        var rules = popups[i].rules;
        for (var j = 0; j < rules.length; j++) {
          if (rules[j].sequenceNumber == 2 && rules[j].status === 'active') {

            showPopup(i);
          }


        }
      }
    }
  }
}) */

function populateMap(data2, i) {
  /*   let data2 = {
    background: {
        color: "#4343",
        image_url: "test.jpg"
    },
    headingField: {
        textAlignment: "left",
        textContent: 'Newsletter',
        fontColor: 'black',
        fontFamily: 'dmSans',
        fontSize: '24'
    },
    inputFieldLabel01: {
        textAlignment: 'left',
        textContent: 'Newsletter',
        fontColor: 'black',
        fontFamily: 'dmSans',
        fontSize: '24'
    },
    inputFieldLabel02: {
        textAlignment: 'left',
        textContent: 'Newsletter',
        fontColor: 'black',
        fontFamily: 'dmSans',
        fontSize: '24'
    },
    submitButtonField: {
        textAlignment: 'left',
        textContent: 'Newsletter',
        fontColor: 'black',
        fontFamily: 'dmSans',
        fontSize: '24'
    }
} */

  let bgStyle =
    "display: flex;" +
    "flex-direction: column;" +
    "align-items: center;" +
    "padding: 1.5rem;" +
    "background-color:" +
    " " +
    data2.background.color +
    ";" +
    "background-image: url(" +
    data2.background_image +
    ")" +
    ";" +
    "width: auto;" +
    "height: auto;" +
    "background-repeat: no-repeat;" +
    "background-size: cover;" +
    "background-position: top center;" +
    "overflow: hidden;";

  let headingStyle =
    "border-bottom: 3px solid rgb(41, 49, 60);" +
    "font-weight: 800;" +
    "margin-bottom: 1rem;" +
    "margin-top: 1.5rem;" +
    "padding-bottom: 0.5rem;" +
    "font-size: " +
    data2.headingField.fontSize +
    ";" +
    "color: " +
    data2.headingField.fontColor +
    ";" +
    "text-align: " +
    data2.headingField.textAlignment +
    ";";

  let input1Style =
    " display: flex;" +
    "height: 2.5rem;" +
    "width: 100%;" +
    "border-radius: 0.375rem;" +
    "border: 1px solid #a0aec0;" +
    "background-color: 222.2 47.4% 11.2%ii;" +
    "padding-left: 0.75rem;" +
    "padding-right: 0.75rem;" +
    "padding-top: 0.5rem;" +
    "padding-bottom: 0.5rem;" +
    "font-size:" +
    " " +
    data2.inputFieldLabel01.fontSize +
    ";" +
    "outline: none;" +
    "transition: border-color 0.15s ease-in-out;" +
    ' box-sizing: border-box;"';

  let input2Style =
    " display: flex;" +
    "height: 2.5rem;" +
    "width: 100%;" +
    "border-radius: 0.375rem;" +
    "border: 1px solid #a0aec0;" +
    "background-color: 222.2 47.4% 11.2%ii;" +
    "padding-left: 0.75rem;" +
    "padding-right: 0.75rem;" +
    "padding-top: 0.5rem;" +
    "padding-bottom: 0.5rem;" +
    "font-size:" +
    " " +
    data2.inputFieldLabel02.fontSize +
    ";" +
    "outline: none;" +
    "transition: border-color 0.15s ease-in-out;" +
    " box-sizing: border-box;";

  let buttonStyle =
    " display: inline-flex;" +
    "align-items: center;" +
    "justify-content: center;" +
    "white-space: nowrap;" +
    "border-radius: 0.375rem;" +
    "font-size: 0.875rem;" +
    "font-weight: 500;" +
    "transition: background-color 0.15s ease-in-out;" +
    "outline: none;" +
    "border: none;" +
    "cursor: pointer;" +
    "opacity: 1;" +
    "background-color: #000;" +
    "color: #fff;" +
    "&:hover {" +
    "background-color: rgba(0, 0, 0, 0.9);" +
    "}" +
    "padding-left: 1rem;" +
    "padding-right: 1rem;" +
    "padding-top: 0.5rem;" +
    "padding-bottom: 0.5rem;" +
    "width: 6rem;" +
    '"';

  let template1 =
    "<div " +
    'style="' +
    "position: fixed;" +
    "top: 50%;" +
    "left: 50%;" +
    "display: grid;" +
    "grid-template-columns: 1fr 1fr;" +
    "background-color: #ff7f4d;" +
    "box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);" +
    "max-width: 450px;" +
    "font-family: 'DM Sans', sans-serif;\"" +
    ">" +
    "<div " +
    'style="' +
    bgStyle +
    '"' +
    "></div>" +
    "<div" +
    " " +
    ' style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem"' +
    ">" +
    ' <div style="position: absolute; right: 0.75rem; top: 0.75rem">' +
    "<svg" +
    " " +
    'width="16"' +
    'height="16"' +
    'viewBox="0 0 16 16"' +
    " " +
    'fill="none"' +
    " " +
    " " +
    'xmlns="http://www.w3.org/2000/svg"' +
    ">" +
    "<path" +
    " " +
    'd="M13.3332 13.3334L2.6665 2.66675M13.3332 2.66675L2.6665 13.3334"' +
    " " +
    'stroke="#212121"' +
    " " +
    'stroke-linecap="round"' +
    "></path>" +
    "</svg>" +
    "</div>" +
    " " +
    "<div" +
    " " +
    "style=" +
    '"' +
    headingStyle +
    '"' +
    ">" +
    "$header" +
    "</div>" +
    "<div>" +
    '<div style="font-size: 14px; color: #000; text-align: left">' +
    "$input1Label" +
    "</div>" +
    '<input id="input1' +
    i +
    '"' +
    ' style= "' +
    input1Style +
    '"' +
    ' placeholder="Enter here"' +
    "/>" +
    "</div>" +
    "<div>" +
    '<div style="font-size: 0.875rem; color: #000; text-align: left">' +
    "$input2Label" +
    "</div>" +
    "<input" +
    ' id="input2' +
    i +
    '"' +
    " " +
    'style="' +
    input2Style +
    '"' +
    'placeholder="Enter here"' +
    "/>" +
    "</div>" +
    "<button" +
    " " +
    "id =" +
    '"submitButtonFieldText' +
    i +
    '"' +
    " " +
    "style=" +
    " " +
    '"' +
    buttonStyle +
    " " +
    ">" +
    '<div style="font-size: 0.875rem; color: #fff; text-align: left">' +
    "$buttonText" +
    " </div>" +
    "</button>" +
    "</div>" +
    "</div>";

  return template1;
}

function createPopup(data, i) {
  var popup = document.createElement("div");
  popup.id = "popup" + i;
  //popup.style.position = "absolute";
  //popup.style.top = "50%";
  //popup.style.left = "50%";
  //popup.style.display = "none";

  /* var closeBtn = document.createElement("span");
  closeBtn.id = "closeBtn" + i;
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = hidePopup;
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "5px";
  closeBtn.style.right = "5px";
  closeBtn.style.cursor = "pointer";
  //popup.style.display = "block";
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.padding = "20px";
  popup.style.backgroundColor = "#0acf73";
  popup.style.border = "1px solid #ccc";
  popup.style.borderRadius = "8px";
  popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
  popup.style.zIndex = "999";

  // Apply styles for the close button
  //var closeBtn = document.getElementById("closeBtn");
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "5px";
  closeBtn.style.right = "5px";
  closeBtn.style.cursor = "pointer";
   */

  var template = populateMap(data, i);
  console.log("template", template);

  template = template.replace("$header", data.headingField.textContent);
  template = template.replace(
    "$input1Label",
    data.inputFieldLabel01.textContent
  );
  template = template.replace(
    "$input2Label",
    data.inputFieldLabel02.textContent
  );
  template = template.replace(
    "$buttonText",
    data.submitButtonField.textContent
  );

  popup.innerHTML = template;

  //var content = document.createElement("p");
  //content.innerHTML = data.text;

  //popup.appendChild(closeBtn);
  //popup.appendChild(content);

  document.body.appendChild(popup);
  /*  document.getElementById("closeBtn" + i).addEventListener("click", function () {
    hidePopup(i);
  }, false); */

  document.getElementById("submitButtonFieldText" + i).addEventListener(
    "click",
    function () {
      submitEmail(i, data._id);
    },
    false
  );

  //commenting rules

  /*  var rules = data.rules;
  var displayOnStart = false;
  for (var j = 0; j < rules.length; j++) {
    if (rules[j].sequenceNumber == 1 && rules[j].status === 'active') {
      setTimeout(function () {
        showPopup(i);


      }, rules[j].value*1000);
      displayOnStart = true;

    }
    if (rules[j].sequenceNumber == 2 && rules[j].status === 'active') {

      displayOnStart = true;

    }

  } */
}

function submitEmail(i, id) {
  console.log("insed submit...." + i);

  let name = document.getElementById("input1" + i).value;
  let email = document.getElementById("input2" + i).value;
  console.log("name", name);
  console.log("email", email);

  let data = { email: email, name: name, popUpId: id };
  generateLead(data);
}

async function getPopupInformation() {
  console.log("called");
  fetch(apiUrl, {
    headers: {
      "ngrok-skip-browser-warning": true,
    },
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Data not found");
        } else if (response.status === 500) {
          throw new Error("Server error");
        } else {
          throw new Error("Network response was not ok");
        }
      }
      return response.json();
    })
    .then((data) => {
      console.log(JSON.stringify(data, null, 2));
      popups = data.data;

      writeDom(popups);

      const body = document.querySelector("body");
      body.style.position = "relative";
      let mouseY;

      body.addEventListener("mouseleave", (event) => {
        mouseY = event.clientY;
        if (mouseY < 0) {
        }
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // writeDom(popups);
}

async function generateLead(data) {
  console.log("called lead api");
  fetch(submitUrl, {
    headers: {
      "ngrok-skip-browser-warning": true,
      "Content-type": "application/json; charset=UTF-8",
    },
    method: "POST",
    body: JSON.stringify({
      email: data.email,
      name: data.name,
      popUpId: data.popUpId,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Data not found");
        } else if (response.status === 500) {
          throw new Error("Server error");
        } else {
          throw new Error("Network response was not ok");
        }
      }
      return response.json();
    })
    .then((data) => {
      console.log(JSON.stringify(data, null, 2));
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // writeDom(popups);
}

function writeDom(data) {
  for (var i = 0; i < data.length; i++) {
    //if (data[i].text) {

    createPopup(data[i], i);
    //}
  }

  //createPopup(null, 1);
}

// Function to hide the popup
function hidePopup(i) {
  document.getElementById("popup" + i).style.display = "none";
}

function showPopup(i) {
  document.getElementById("popup" + i).style.display = "block";
}

function handleExitIntent() {
  body.addEventListener("mouseleave", (event) => {
    mouseY = event.clientY;
    if (mouseY < 16) {
      console.log("Exit Intent");
      // add additional code for exit intent here

      if (popups.length > 0) {
        for (var i = 0; i < popups.length; i++) {
          var rules = popups[i].rules;
          for (var j = 0; j < rules.length; j++) {
            if (rules[j].sequenceNumber == 3 && rules[j].status === "active") {
              showPopup(i);
            }
          }
        }
      }
    }
  });
}
// Create the popup dynamically

// Call the showPopup function when the page loads
//window.onload = showPopup;
/* function timerIncrement() {
  idleTime = idleTime + 1;
  if (idleTime > 1) { // 20 minutes
    //window.location.reload();
    if (popups.length > 0) {

      for (var i = 0; i < popups.length; i++) {
        var rules = popups[i].rules;
        for (var j = 0; j < rules.length; j++) {
          if (rules[j].sequenceNumber == 4 && rules[j].status === 'active') {

            showPopup(i);
          }


        }
      }
    }


  }
} */

function showPopups() {
  if (popups.length > 0) {
    for (var i = 0; i < popups.length; i++) {
      var rules = popups[i].rules;
      for (var j = 0; j < rules.length; j++) {
        if (rules[j].sequenceNumber == 3 && rules[j].status === "active") {
          showPopup(i);
        }
      }
    }
  }
}

var apiUrl = "https://016e-175-29-198-242.ngrok-free.app/v1/popup-entity?shop=";
var submitUrl =
    "https://016e-175-29-198-242.ngrok-free.app/v1/leads/generate-lead?shop=";

/* var apiUrl =
  "https://87ff-182-163-107-41.ngrok-free.app/v1/popup-entity?shop=quickstart-bdb585f9.myshopify.com";
 */
// Attach event listener to the close button

var templateMap = new Map();
var shop = "quickstart-bdb585f9";
var shownOn25 = 0;
var shownOn50 = 0;
var shownOn75 = 0;
var shownOn100 = 0;
var shownOnLeave = false;
var shownOnInactivity = 0;

var popups = [];
var idleTime = 0;
var addEvent = function (obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    } else if (obj.attachEvent) {
        obj.attachEvent("on" + evt, fn);
    }
};

window.document.onload = function (e) {
    console.log(
        "document.onload",
        e,
        Date.now(),
        window.tdiff,
        (window.tdiff[0] = Date.now()) && window.tdiff.reduce(fred)
    );
};

function setApi() {
    let browserUrl = window.location.href;
    browserUrl = browserUrl.replace("https://", "");

    browserUrl = browserUrl.substring(0, browserUrl.indexOf("/"));
    //var first =  browserUrl.charAt('https://');

    // apiUrl = apiUrl + browserUrl;
    apiUrl = "http://192.168.9.119:4000/v1/popup-entity?shop=fusionfirm.myshopify.com";
    // submitUrl = submitUrl + browserUrl;
    submitUrl = "http://192.168.9.119:4000/v1/leads/generate-lead?shop=fusionfirm.myshopify.com";
    console.log(apiUrl);
    console.log(browserUrl);
}

window.onload = function (e) {
    // var idleInterval = setInterval(timerIncrement, 60000);
    //let browserUrl = window.location.href;

    var idleInterval = setInterval(timerIncrement, 60000);
    setApi();
    getPopupInformation();

    document.onmousemove = function (e) {
        idleTime = 0;
    };

    $(document).keypress(function (e) {
        idleTime = 0;
    });

    const body = document.querySelector("body");
    let mouseY;
    /*  $(document).mouseleave(function () {
      console.log("out");
      showPopups();
    });
    document.body.addEventListener("mouseleave", (event) => {
      mouseY = event.clientY;
      console.log("y", mouseY);
      if (mouseY < 15) {
        console.log("Exit Intent");
        showPopups();
        // add additional code for exit intent here
      }
    }); */

    //writeDom(data);

    addEvent(document, "mouseout", function (event) {
        event = event ? event : window.event;
        var from = event.relatedTarget || event.toElement;
        if ((!from || from.nodeName == "HTML") && event.clientY <= 100) {
            //alert("left top bar");mo
            if (popups.length > 0 && !shownOnLeave) {
                for (var i = 0; i < popups.length; i++) {
                    var rules = popups[i].rules;
                    for (var j = 0; j < rules.length; j++) {
                        if (rules[j].sequenceNumber == 3 && rules[j].status === "active") {
                            showPopup(i);
                            shownOnLeave = true;
                        }
                    }
                }
            }
        }
    });
};

// window.addEventListener("beforeunload", function (e) {
//   //handleExitEvent();
//   showPopups();
// });

/* window.onbeforeunload = confirmExit;
  function confirmExit()
  {
    showPopups();
    //return "You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?";
  }
 */
/* window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  showPopups();

  setTimeout(function () {
    //your code to be executed after 1 second
  }, 10000);
}); */

$(window).on("scroll", function () {
    var s = $(window).scrollTop(),
        d = $(document).height(),
        c = $(window).height();

    var scrollPercent = (s / (d - c)) * 100;

    // console.clear();
    console.log(scrollPercent);

    if (scrollPercent >= 25 && scrollPercent < 26 && shownOn25 <= 2) {
        //console.log(alert('scroll 25'));
        if (popups.length > 0) {
            var s25 = false;
            for (var i = 0; i < popups.length; i++) {
                var rules = popups[i].rules;
                for (var j = 0; j < rules.length; j++) {
                    if (
                        rules[j].sequenceNumber == 2 &&
                        rules[j].status === "active" &&
                        rules[j].value == 25
                    ) {
                        showPopup(i);
                        if (!s25) shownOn25++;
                        s25 = true;
                    }
                }
            }
        }
    }

    if (scrollPercent >= 50 && scrollPercent < 52 && shownOn50 <= 2) {
        //console.log(alert('scroll 25'));
        if (popups.length > 0) {
            var s50 = false;
            for (var i = 0; i < popups.length; i++) {
                var rules = popups[i].rules;

                for (var j = 0; j < rules.length; j++) {
                    if (
                        rules[j].sequenceNumber == 2 &&
                        rules[j].status === "active" &&
                        rules[j].value == 50
                    ) {
                        showPopup(i);
                        if (!s50) shownOn50++;
                        s50 = true;
                    }
                }
            }
        }
    }

    if (scrollPercent >= 75 && scrollPercent < 77 && shownOn75 <= 2) {
        //console.log(alert('scroll 25'));
        if (popups.length > 0) {
            var s75 = false;
            for (var i = 0; i < popups.length; i++) {
                var rules = popups[i].rules;
                for (var j = 0; j < rules.length; j++) {
                    if (
                        rules[j].sequenceNumber == 2 &&
                        rules[j].status === "active" &&
                        rules[j].value == 75
                    ) {
                        showPopup(i);
                        if (!s75) shownOn75++;
                        s75 = true;
                    }
                }
            }
        }
    }

    if (scrollPercent >= 95 && scrollPercent <= 100 && shownOn100 <= 2) {
        //console.log(alert('scroll 25'));
        if (popups.length > 0) {
            var s100 = false;
            for (var i = 0; i < popups.length; i++) {
                var rules = popups[i].rules;
                for (var j = 0; j < rules.length; j++) {
                    if (
                        rules[j].sequenceNumber == 2 &&
                        rules[j].status === "active" &&
                        rules[j].value == 100
                    ) {
                        showPopup(i);
                        if (!s100) shownOn100++;
                        s100 = true;
                    }
                }
            }
        }
    }
});

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

    let fontLink = document.createElement("link");
    fontLink.setAttribute("rel", "stylesheet");
    // fontLink.setAttribute('href', 'https://fonts.googleapis.com/css2?family=' + convertToTitleCaseWithPlus(data2.headingField.fontFamily));
    fontLink.setAttribute(
        "href",
        "https://fonts.googleapis.com/css2?family=DM+Sans"
    );
    document.head.appendChild(fontLink);

    let bgStyle =
        "display: flex;" +
        "flex-direction: column;" +
        "align-items: center;" +
        "padding: 1.5rem;" +
        // "background-color:" +
        // " " +
        // data2.background.color +
        // ";" +
        "background-image: url(" +
        data2.background_image +
        ")" +
        ";" +
        // "width: auto;" +
        // "height: 335px;" +
        "background-repeat: round;" +
        "background-size: cover;" +
        "background-position: top center;" +
        "overflow: hidden;";

    let headingStyle =
        "border-bottom: 2px solid rgb(23 23 63);" +
        "font-weight: 800;" +
        "letter-spacing: 1px;" +
        "margin: 26px 0 0;" +
        "padding: 0 0 6px 3px;" +
        "font-size: " +
        data2.headingField.fontSize +
        "px;" +
        "font-family: " +
        convertToTitleCaseWithSpace(data2.headingField.fontFamily) +
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
        "background-color: #fff;" +
        "padding-left: 0.75rem;" +
        "padding-right: 0.75rem;" +
        "padding-top: 0.5rem;" +
        "padding-bottom: 0.5rem;" +
        "font-size:" +
        " " +
        data2.inputFieldLabel01.fontSize +
        "px;" +
        "outline: none;" +
        "transition: border-color 0.15s ease-in-out;" +
        "box-sizing: border-box;";

    let input2Style =
        " display: flex;" +
        "height: 2.5rem;" +
        "width: 100%;" +
        "border-radius: 0.375rem;" +
        "border: 1px solid #a0aec0;" +
        "background-color: #fff;" +
        "padding-left: 0.75rem;" +
        "padding-right: 0.75rem;" +
        "padding-top: 0.5rem;" +
        "padding-bottom: 0.5rem;" +
        "font-size:" +
        " " +
        data2.inputFieldLabel02.fontSize +
        "px;" +
        "outline: none;" +
        "transition: border-color 0.15s ease-in-out;" +
        " box-sizing: border-box;";

    let buttonStyle =
        " display: inline-flex;" +
        "align-items: center;" +
        "justify-content: center;" +
        "white-space: nowrap;" +
        "border-radius: 0.375rem;" +
        "font-size:"+
        data2.submitButtonField.fontSize +
        ";" +
        "font-family: " + convertToTitleCaseWithSpace(data2.submitButtonField.fontFamily) +
        ";" +
        "font-weight: 500;" +
        "transition: background-color 0.15s ease-in-out;" +
        "outline: none;" +
        "border: none;" +
        "cursor: pointer;" +
        "opacity: 1;" +
        "background-color: #17173f;" +
        "color:"+
        data2.submitButtonField.fontColor +
        ";" +
        // "&:hover {" +
        // "background-color: red;" + // Changed to red color on hover
        // "};" +
        // "padding-left: 1rem;" +
        // "padding-right: 1rem;" +
        "width: 96px;" +
        "height: 40px;" +
        '"';

    let template1 =
        "<div " +
        'style="' +
        "display: grid;" +
        "grid-template-columns: 1fr 1fr;" +
        "background-color: " +
        data2.background.color +
        ";" +
        "box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" +
        "height: 335px;" +
        "width: 575px;" +
        "max-height: auto;" +
        "font-family: 'DM Sans', sans-serif;\"" +
        ">" +
        "<div " +
        'style="' +
        bgStyle +
        '"' +
        "></div>" +
        "<div" +
        " " +
        ' style="display: flex; flex-direction: column; gap: 1.25rem; padding: 16px 16px 24px"' +
        ">" +
        ' <div id = "close' +
        i +
        '"' +
        ' style="position: absolute; right: 0.75rem; top: 0.75rem">' +
        "<svg" +
        " " +
        'width="16"' +
        ' height="16"' +
        ' viewBox="0 0 16 16"' +
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
        '<div style="font-size: 14px; font-family: DM Sans; color: #000; text-align: left; margin: 11px 0 5px 2px">' +
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
        "<div style='margin-bottom: -5px'>" +
        '<div style="font-size: 14px; font-family: DM Sans; color: #000; text-align: left; margin: -2px 0 5px 2px;">' +
        "$input2Label" +
        "</div>" +
        "<input" +
        ' id="input2' +
        i +
        '"' +
        " " +
        'style="' +
        input2Style +
        '" ' +
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
        '"' +
        buttonStyle +
        '" onmouseover="this.style.backgroundColor=\'#353563\'"' +
        ' onmouseout="this.style.backgroundColor=\'#17173f\'"' +
        '>' +
        "$buttonText" +
        "</button>" +
        "</div>" +
        "</div>";

    return template1;
}

function createPopup(data, i) {
    var popup = document.createElement("div");
    popup.id = "popup" + i;

    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.zIndex = "999";
    popup.style.display = "none";

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
    document.getElementById("close" + i).addEventListener(
        "click",
        function () {
            hidePopup(i);
        },
        false
    );
    /*  document.getElementById("closeBtn" + i).addEventListener("click", function () {
        hidePopup(i);
      }, false); */

    document.getElementById("submitButtonFieldText" + i).addEventListener(
        "click",
        function () {
            // // Disable the button
            // document.getElementById("submitButtonFieldText" + i).disabled = true;
            // // Add loader text or spinner inside the button
            // document.getElementById("submitButtonFieldText" + i).innerHTML =
            //     '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Waiting...';
            submitEmail(i, data._id);
        },
        false
    );

    //commenting rules

    var rules = data.rules;
    var displayOnStart = false;
    for (var j = 0; j < rules.length; j++) {
        if (rules[j].sequenceNumber == 1 && rules[j].status === "active") {
            setTimeout(function () {
                showPopup(i);
            }, rules[j].value * 1000);
            displayOnStart = true;
        }
        if (rules[j].sequenceNumber == 2 && rules[j].status === "active") {
            displayOnStart = true;
        }
    }
}

function submitEmail(i, id) {
    console.log("inset submit...." + i);

    let nameInput = document.getElementById("input1" + i);
    let emailInput = document.getElementById("input2" + i);

    // Get the values from the input fields
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();

    // Regular expression pattern for validating email
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Create a style element
    let style = document.createElement('style');

    // Add the CSS rules to the style element
    style.textContent = `
        .error::placeholder {
            color: red;
        }
    `;
    // Append the style element to the document head
    document.head.appendChild(style);
// Validate name and email
    if (name === '') {
        console.log("Please enter a name");
        nameInput.placeholder = "Please enter a name";
        nameInput.classList.add("error");
        // return;
    }

    if (!emailPattern.test(email)) {
        console.log("Please enter a valid email");
        emailInput.value = '';
        emailInput.placeholder = "Please enter a valid email";
        emailInput.classList.add("error");
        // return;
    }

    console.log("name", name);
    console.log("email", email);

    let data = { email: email, name: name, popUpId: id };
    generateLead(data, i);
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

async function generateLead(data, i) {
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
            // document.getElementById("popup" + i).style.display = "none";
            // Enable the button and restore its original text
            document.getElementById("submitButtonFieldText" + i).disabled = false;
            document.getElementById("submitButtonFieldText" + i).innerHTML = "Submitted";
            setTimeout(()=>
                // Hide the popup
                hidePopup(i),1000);
        })
        .catch((error) => {
            console.error( error);
            // Enable the button and restore its original text
            document.getElementById("submitButtonFieldText" + i).disabled = false;
            document.getElementById("submitButtonFieldText" + i).innerHTML = "Submit";
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
    // Remove the background overlay
    const overlay = document.querySelector('#popup-overlay');
    if (overlay) {
        overlay.parentNode.removeChild(overlay);
    }
}

function showPopup(i) {
    document.getElementById("popup" + i).style.display = "block";
    overLay();
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
function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 1) {
        // 20 minutes
        //window.location.reload();
        if (popups.length > 0) {
            for (var i = 0; i < popups.length; i++) {
                var rules = popups[i].rules;
                for (var j = 0; j < rules.length; j++) {
                    if (rules[j].sequenceNumber == 4 && rules[j].status === "active") {
                        showPopup(i);
                    }
                }
            }
        }
    }
}

function showPopups() {
    alert("hi");
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

function convertToTitleCaseWithSpace(inputString) {
    // Split the string by a regex pattern that matches uppercase letters
    let words = inputString.split(/(?=[A-Z])/);

    // Capitalize the first letter of the first word
    words[0] = words[0][0].toUpperCase() + words[0].slice(1);

    // Join the words back together with a space between each word
    let titleCaseString = words.join(" ");

    return titleCaseString;
}

function convertToTitleCaseWithPlus(inputString) {
    // Split the string by a regex pattern that matches uppercase letters
    let words = inputString.split(/(?=[A-Z])/);

    // Capitalize the first letter of the first word
    words[0] = words[0][0].toUpperCase() + words[0].slice(1);

    // Join the words back together with a plus symbol between each word
    let titleCaseString = words.join("+");

    return titleCaseString;
}

function overLay() {
    // Create a background overlay
    const overlay = document.createElement('div');
    overlay.id = 'popup-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = ' rgb(0 0 0 / 0.4)'; // Semi-transparent black background
    overlay.style.backdropFilter = 'blur(2px)'; // Apply blur effect
    overlay.style.zIndex = '1';

    // Append overlay to body
    document.body.appendChild(overlay);
}
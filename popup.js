//var apiUrl = 'http://192.168.11.121:4000/v1/popup-entity?shop=fusionfirm.myshopify.com'

var apiUrl =
  "https://3880-182-163-107-41.ngrok-free.app/v1/popup-entity?shop=fusionfirm.myshopify.com";

// Attach event listener to the close button

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
  var idleInterval = setInterval(timerIncrement, 60000);
  getPopupInformation();

  document.onmousemove = function (e) {
    idleTime = 0;
  };

  $(document).keypress(function (e) {
    idleTime = 0;
  });

  const body = document.querySelector("body");
  let mouseY;
  body.addEventListener("mouseleave", (event) => {
    mouseY = event.clientY;
    console.log("y", mouseY);
    if (mouseY < 0) {
      console.log("Exit Intent");
      showPopups();
      // add additional code for exit intent here
    }
  });

  //writeDom(data);
};

window.addEventListener("beforeunload", function (e) {
  //handleExitEvent();
  showPopups();
});

$(window).on("scroll", function () {
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
          if (rules[j].sequenceNumber == 2 && rules[j].status === "active") {
            showPopup(i);
          }
        }
      }
    }
  }
});

function createPopup(data, i) {
  var popup = document.createElement("div");
  popup.id = "popup" + i;
  popup.style.display = "none";

  var closeBtn = document.createElement("span");
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

  var content = document.createElement("p");
  content.innerHTML = data.text;

  popup.appendChild(closeBtn);
  popup.appendChild(content);

  document.body.appendChild(popup);
  document.getElementById("closeBtn" + i).addEventListener(
    "click",
    function () {
      hidePopup(i);
    },
    false
  );

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

      writeDom(data);

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
}

function writeDom(data) {
  for (var i = 0; i < data.data.length; i++) {
    if (data.data[i].text) {
      createPopup(data.data[i], i);
    }
  }
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

// var apiUrl = 'http://192.168.11.121:4000/v1/popup-entity?shop=fusionfirm.myshopify.com'

var apiUrl =
  "https://e31b-182-163-107-41.ngrok-free.app/v1/popup-entity?shop=fusionfirm.myshopify.com";

// Attach event listener to the close button

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
  getPopupInformation();
  // console.log('data',data);
  //writeDom(data);
};

function createPopup(text, i) {
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
  popup.style.display = "block";
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
  content.innerHTML = text;

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
      writeDom(data);

      //return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function writeDom(data) {
  for (var i = 0; i < data.data.length; i++) {
    if (data.data[i].text) {
      createPopup(data.data[i].text, i);
    }
  }
}

// Function to hide the popup
function hidePopup(i) {
  document.getElementById("popup" + i).style.display = "none";
}

// Create the popup dynamically

// Call the showPopup function when the page loads
//window.onload = showPopup;

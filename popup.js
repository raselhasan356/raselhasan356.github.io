// var apiUrl = 'http://192.168.11.121:4000/v1/popup-entity?shop=fusionfirm.myshopify.com'

var apiUrl =
  "https://e31b-182-163-107-41.ngrok-free.app/v1/popup-entity?shop=fusionfirm.myshopify.com";
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
      alert(data.data[i].text);
    }
  }
}

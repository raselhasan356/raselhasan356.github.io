var baseUrl = "https://shopify-app.vivasoftltd.com/"
var apiUrl = baseUrl+ "v1/popup-entity";
var submitUrl =
  baseUrl +"v1/leads/generate-lead";
//only for test
  //var shopName= "rasel-test-store-01.myshopify.com";  


  /* var apiUrl =
  "https://87ff-182-163-107-41.ngrok-free.app/v1/popup-entity?shop=quickstart-bdb585f9.myshopify.com";
 */
// Attach event listener to the close button

var eventUrl = baseUrl+"v1/events/generate-events?shop=";

var templateMap = new Map();
var shopName = "quickstart-bdb585f9.myshopify.com";
var shownOnLeave = false;
var shownOnInactivity = 0;
var scrollPopups=[];
let inactivityPopups =[];
let exitPopups=[];

var popups = [];

var idleTime = 1;
var idleTime2=1;
var idleTime3=1;
var addEvent = function (obj, evt, fn) {
  if (obj.addEventListener) {
    obj.addEventListener(evt, fn, false);
  } else if (obj.attachEvent) {
    obj.attachEvent("on" + evt, fn);
  }
};



(function() {


  var foo = 3;
  console.log(foo);

  //onload();


})();



var onStart = function() {
  
  loadFonts();
  
  var idleInterval1 = setInterval(timerIncrement, 60000);
  var idleInterval2 = setInterval(timerIncrement2, 180000);
  var idleInterval3 = setInterval(timerIncrement3, 300000);

  setApi();
  getPopupInformation();

  var throttledListener = throttle(scrollListener, 2000);
  window.addEventListener('scroll', throttledListener);


  document.onmousemove = function (e) {
    idleTime = 0;
    idleTime2=0;
    idleTime3=0;
  };

  $(document).keypress(function (e) {
    idleTime = 0;
    idleTime2=0;
    idleTime3=0;
  });

  const body = document.querySelector("body");
  let mouseY;



};

window.onStart();


//onload();

function setApi() {
   let browserUrl = window.location.hostname;
  
  //apiUrl = apiUrl + "?shop="+browserUrl+"&popupStatus=active";
 //for testing locally
 apiUrl = apiUrl + "?shop="+shopName+"&popupStatus=active";
  
  submitUrl = submitUrl + "?shop="+ browserUrl;
  //submitUrl = submitUrl + "?shop="+ shopName;
 
  eventUrl = eventUrl + browserUrl;
 //eventUrl = eventUrl + shopName;
  
  console.log(apiUrl);
  console.log(submitUrl);
  console.log(eventUrl); 


}




 



 function onLoad() {


 /*  loadFonts();
  
  var idleInterval1 = setInterval(timerIncrement, 60000);
  var idleInterval2 = setInterval(timerIncrement2, 180000);
  var idleInterval3 = setInterval(timerIncrement3, 300000);

  setApi();
  getPopupInformation();

  var throttledListener = throttle(scrollListener, 2000);
  window.addEventListener('scroll', throttledListener);


  document.onmousemove = function (e) {
    idleTime = 0;
    idleTime2=0;
    idleTime3=0;
  };

  $(document).keypress(function (e) {
    idleTime = 0;
    idleTime2=0;
    idleTime3=0;
  });

  const body = document.querySelector("body");
  let mouseY;
  */ 
  
};


function createPopup(data) {

  console.log('found data',data)
  var popup = document.createElement("div");
  popup.id = "popup_" + data._id;
  if(data.template_id==6){
    setParentDivStyleTopHeader(popup);
  }else{
    setParentDivStyle(popup);
  }

  
  popup.style.display = "none";
  
  popup.innerHTML = data.templateData;

  
  document.body.appendChild(popup);
  document.getElementById(data.close_button_id).addEventListener(
    "click",
    function (event) {
      console.log("event",event)
      hidePopup(data._id);
    },
    false
  );
  
  

  const events = document.getElementsByClassName("click");

  for (var i = 0 ; i < events.length; i++) {

    events[i].addEventListener(
      "click",
      function (e) {
       
        incrementClick(e,data._id,"Click");
      },
      false
      
    );
    }


    const submitButn =  document.getElementById(data.submit_button_id);
  if(submitButn){
    if (data.template_id == 3 || data.template_id == 4){
      submitButn.addEventListener(
          "click",
          function (event) {
            hidePopup(data._id)
          },
          false
      );
    }else {
      submitButn.addEventListener(
          "click",
          function (event) {
            submitEmail(data._id,false,event,data.submit_button_id);
          },
          false
      );
    }
  }
  
  

  var rules = data.rules;
  var displayOnStart = false;
  for (var j = 0; j < rules.length; j++) {
    if (rules[j].sequenceNumber == 1 && rules[j].status === "active") {
      setTimeout(function () {
        showPopup(data._id);
      }, rules[j].value * 1000);
      
    }

    if (rules[j].sequenceNumber == 2 && rules[j].status === "active") {
      //data.shownOnScroll = false;
      data.scrollPercentage =rules[j].value;
      scrollPopups.push(data)
      
    }
    if(rules[j].sequenceNumber == 3 && rules[j].status === 'active'){
      //data.shownOnExit = false;
      exitPopups.push(data)
    }
    if(rules[j].sequenceNumber == 4 && rules[j].status === 'active'){
      //data.shownOnInactivity = false;
      inactivityPopups.push(data);
    }
 
  }
}

document.addEventListener("mouseout", (e) => {
  if (!e.toElement && !e.relatedTarget) {
   console.log('exit intent')
   showExitPopups();
  }
});

function submitEmail(id,nameMandatory,event,submit_button_id) {
  event.preventDefault();
  console.log("inside submit");
  let name = "";
  let email = "";
  
  let nameInput = document.getElementById("name_"+id);
  let emailInput = document.getElementById("email_" +id);

  // Get the values from the input fields
    if(nameInput){
        name = nameInput.value.trim();
  }
  if(emailInput){
    email = emailInput.value.trim();
  }


  // Regular expression pattern for validating email
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Create a style element
  let style = document.createElement("style");

  // Add the CSS rules to the style element
  style.textContent = `
        .error::placeholder {
            color: red;
        }
    `;
  // Append the style element to the document head
  document.head.appendChild(style);
  // Validate name and email
  if (name === "" && nameMandatory) {
    console.log("Please enter a name");
    nameInput.placeholder = "Please enter a name";
    nameInput.classList.add("error");
    return;
  }

  if (!emailPattern.test(email)) {
    console.log("Please enter a valid email");
    emailInput.value = "";
    emailInput.placeholder = "Please enter a valid email";
    emailInput.classList.add("error");
    return;
  }

  console.log("name", name);
  console.log("email", email);

  let data = { email: email, name: name, popUpId: id };
  generateLead(data, id,submit_button_id).then(response=>{
    console.log(response);

  });
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
      
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // writeDom(popups);
}

async function generateLead(data, id,submit_button_id) {
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
      document.getElementById(submit_button_id).disabled = false;
      document.getElementById(submit_button_id).innerHTML =
        "Submitted";
      setTimeout(
        () =>
          // Hide the popup
          hidePopup(id),
        1000
      );
    })
    .catch((error) => {
      console.log(error);
      // Enable the button and restore its original text
      /* document.getElementById("submitButtonFieldText" + i).disabled = false;
      document.getElementById("submitButtonFieldText" + i).innerHTML = "Submit"; */
    });

 
}

function writeDom(data) {
  for (var i = 0; i < data.length; i++) {
    

    createPopup(data[i]);
   
  }


}

// Function to hide the popup
function hidePopup(id) {
  document.getElementById("popup_" + id).style.display = "none";
  // Remove the background overlay
  
  
  const overlay = document.querySelector("#popup-overlay");
  if (overlay) {
    overlay.parentNode.removeChild(overlay);
  }
}

function showPopup(i) {
  if(checkIf24Hours(i)){
    document.getElementById("popup_" + i).style.display = "block";
  overLay();
  incrementView(i,"View")
  }
  

}


function timerIncrement() {
  idleTime = idleTime + 1;
  if (idleTime > 1) {
    // 20 minutes
    //window.location.reload();
    if (inactivityPopups.length > 0) {
      for (var i = 0; i < inactivityPopups.length; i++) {
        var rules = inactivityPopups[i].rules;

      
          if (rules[3].value==1) {
          
            showPopup(inactivityPopups[i]._id);
          }

         
         
        }
      }
    }
  }


function timerIncrement2() {
  idleTime2 = idleTime2 + 1;
  if (idleTime2 > 1) {
    // 20 minutes
    //window.location.reload();
    if (inactivityPopups.length > 0) {
      for (var i = 0; i < inactivityPopups.length; i++) {
        var rules = inactivityPopups[i].rules;

        
          if (rules[3].value==3) {
        
            showPopup(inactivityPopups[i]._id);
          }

        
         
        }
      }
    }
}


function timerIncrement3() {
  idleTime3 = idleTime3 + 1;
  if (idleTime3 > 1) {
    // 20 minutes
    //window.location.reload();
    if (inactivityPopups.length > 0) {
      for (var i = 0; i < inactivityPopups.length; i++) {
        var rules = inactivityPopups[i].rules;

       
          if (rules[3].value==5) {
            
            showPopup(inactivityPopups[i]._id);
          }

        
         
        }
      }
    }
}

function showPopups(value) {
  

  if (scrollPopups.length > 0) {
    for (var i = 0; i < scrollPopups.length; i++) {
   
      
        if (scrollPopups[i].scrollPercentage ==value) {
         
            showPopup(scrollPopups[i]._id);

        
          }
  }

}

}


function showExitPopups() {
 
  if (exitPopups.length > 0) {
    for (var i = 0; i < exitPopups.length; i++) {
      
        showPopup(exitPopups[i]._id);
      
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
  const overlay = document.createElement("div");
  overlay.id = "popup-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = " rgb(0 0 0 / 0.4)"; // Semi-transparent black background
  overlay.style.backdropFilter = "blur(2px)"; // Apply blur effect
  overlay.style.zIndex = "1";

  // Append overlay to body
  document.body.appendChild(overlay);
}

function throttle(func, delay) { // allows [func] to run once every [delay] ms
  var func = func.bind(func),
      last = Date.now();
  return function() {
      if (Date.now() - last > delay) {
          func();
          last = Date.now();
      }
  }
}
function scrollListener() {
  console.log('scrolled with delay');

  var s = $(window).scrollTop(),
    d = $(document).height(),
    c = $(window).height();

  var scrollPercent = (s / (d - c)) * 100;
  console.log('scroll',scrollPercent)

  
  if(scrollPercent >= 25 && scrollPercent <=50){

   
 
      showPopups(25);
    
    
  }
  
  
  if(scrollPercent >= 50 && scrollPercent <=75){

   
 
      
      showPopups(50);

  
  }
  if(scrollPercent >= 75 && scrollPercent <=100){
   
     
      showPopups(75);
    

    
  }


}


async function incrementClick(event,id,type){
if(event.target.id.startsWith("submit")){

}else{

  fetch(eventUrl, {
    headers: {
      "ngrok-skip-browser-warning": true,
      "Content-type": "application/json; charset=UTF-8",
    },
    method: "POST",
    body: JSON.stringify({
    /*   "eventType": "Click", */
    "eventType": type,
      "popUpId" : id
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
     console.log('click api hit')
        
     
    })
    .catch((error) => {
      console.log(error);
     
    });


}


}

//increment view

async function incrementView(id,type){


    fetch(eventUrl, {
      headers: {
        "ngrok-skip-browser-warning": true,
        "Content-type": "application/json; charset=UTF-8",
      },
      method: "POST",
      body: JSON.stringify({
      /*   "eventType": "Click", */
      "eventType": type,
        "popUpId" : id
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
       console.log('click api hit')
          
       
      })
      .catch((error) => {
        console.log(error);
       
      });
  
  
  }


function setParentDivStyle(element){

  element.style.cssText="display: block; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 999;";

}


function setParentDivStyleTopHeader(element){

  element.style.cssText = "display: block; background: transparent; position: fixed; left: 50%; transform: translate(-50%); z-index: 999;"

}

function checkIf24Hours(popupid){

  if(!localStorage.getItem(popupid)){
    //var date = new Date();
    localStorage.setItem(popupid, Date.now())
    return true;
  }
  var date1 = new Date();
  var date2 = localStorage.getItem(popupid) ;

  
  
  var hours = Math.abs(date1 - date2) / 36e5;

  if (hours>=24){
    localStorage.setItem(popupid,Date.now())
    return true;

  } 
  return false;

}

function loadFonts(){


  var cssId = 'myCss1';  
if (!document.getElementById(cssId))
{
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    //link.href = 'https://fonts.gstatic.com" crossorigin>
    link.href='https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Serif+Display:ital@0;1&family=Dancing+Script:wght@400..700&family=Inter:wght@100..900&family=Jost:ital,wght@0,100..900;1,100..900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Limelight&family=Manrope:wght@200..800&family=Metrophobic&family=Michroma&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap';
    link.media = 'all';
    head.appendChild(link);
}
}

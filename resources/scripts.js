window.addEventListener("scroll", event=>{scrollBehavior()});
const nav = document.getElementById("home-nav");
const navOffset = nav.offsetTop;
function scrollBehavior() {
    if (window.pageYOffset >= navOffset) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
    parallaxSnow();
}

function parallaxSnow() {
    let elements = ['background','midground'];
    //for(var i = 0; i < elements.length; i++) {
        //document.getElementById(elements[i]).style.top = ((-1 * window.pageYOffset) /((elements.length-i)*2)+20) + "px";
    //}
    document.getElementById("background").style.top = ((1 * window.pageYOffset)/20) + "px";
    document.getElementById("midground").style.top = ((-1 * window.pageYOffset)/15) + "px";
}
function sendResponse() {
    const contactName= document.getElementById("contact-name").value; 
    const contactEmail= document.getElementById("contact-email").value;
    const contactMessage= document.getElementById("contact-message").value;
    sendingResponse();
    $.ajax({
        url: "https://formspree.io/f/xyybyjyv",
        method: "POST",
        dataType: "json",  
        data: {
            name: contactName, 
            email: contactEmail,
            message: contactMessage
        },
        success: function() {
            sendingSuccess();
        }
    });
}
function sendingResponse() {
    document.getElementById("contact-content").remove();
    let loadingDiv = document.createElement("div");
    loadingDiv.id = "loading";
    let loadingText = document.createElement("h3");
    loadingText.innerHTML = "Submitting response";
    loadingDiv.appendChild(loadingText);
    let circleGroups = 2;
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("height","200px");
    svg.setAttribute("width", "200px");
    svg.id = "loading-icon";
    for (let i = 0; i<circleGroups; i++) {
        let circleGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        circleGroup.id = "group" + (i+1);
        let circlePositions = [["100","27"],["100","173"],["27","100"],["173","100"]];
        circlePositions.forEach((pos) => {
            let currentCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            currentCircle.setAttribute("r", "25");
            currentCircle.setAttribute("cx",pos[0]);
            currentCircle.setAttribute("cy",pos[1]);
            circleGroup.appendChild(currentCircle);
        })
        svg.appendChild(circleGroup);
    }
    loadingDiv.appendChild(svg);
    document.getElementById("contact").appendChild(loadingDiv);
}
function sendingSuccess() {
    document.getElementById("loading").remove();
    let contactSuccess = document.createElement("h3");
    contactSuccess.innerHTML = "Response received! Thank you for reaching out!";
    document.getElementById("contact").appendChild(contactSuccess);
}
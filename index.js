// ------------------------------------Hamburger Start------------------------------------
var Hamburger = document.querySelector('.Hamburger-Container');
Hamburger.addEventListener('click', function () {
    // this.innerHTML = '<i class="fa-solid fa-xmark Hamburger"></i>'
    this.innerHTML = this.innerHTML === '<i class="fa-solid fa-xmark Hamburger"></i>' ? '<i class="fa-solid fa-bars Hamburger Hamburger-Open"></i>' : '<i class="fa-solid fa-xmark Hamburger"></i>';
    document.querySelector('.navbar-items-Md').classList.toggle('Hamburger-active');
})

document.querySelectorAll("li").forEach(n => n.addEventListener("click", () => {
    document.querySelector('.navbar-items-Md').classList.remove("Hamburger-active");
    Hamburger.innerHTML = '<i class="fa-solid fa-bars Hamburger Hamburger-Open"></i>';
}))

document.querySelector(".navbar-logo").addEventListener("click", () => {
    document.querySelector('.navbar-items-Md').classList.remove("Hamburger-active");
    Hamburger.innerHTML = '<i class="fa-solid fa-bars Hamburger Hamburger-Open"></i>';
})


// ------------------------------------Hamburger Start------------------------------------

// ------------------------------------Card Scroll Start------------------------------------

document.querySelector('.Slider-right-btn').addEventListener('click', function () {
    document.querySelector('.Card-Container').scrollLeft += 400;
})

document.querySelector('.Slider-left-btn').addEventListener('click', function () {
    document.querySelector('.Card-Container').scrollLeft -= 400;
})

document.querySelector('.Slider-right-btn-Md').addEventListener('click', function () {
    document.querySelector('.Card-Container').scrollLeft += 360;
})

document.querySelector('.Slider-left-btn-Md').addEventListener('click', function () {
    document.querySelector('.Card-Container').scrollLeft -= 360;
})


// ------------------------------------Card Scroll End------------------------------------

// ------------------------------------Form Validation Start------------------------------------

const scriptURL = 'https://script.google.com/macros/s/AKfycbx64Ll2L6WgEgckVV2IP3_j6eyLfeuRzmOJL8DaIIqHdYVxGTqL3U1Sa2AyamcN6QVc/exec'
const form = document.forms['google-sheet']

var Nregex = /\b([A-Za-z]+[A-Za-z]+[ ]*)/i
var Cregex = /(^[0-9]{10}$)/i

function clearerror() {
    errors = document.getElementsByClassName('Form-Error');
    for (let item of errors) {
        item.style.transform = "scale(0)";
    }

}

function seterror(id) {
    element = document.getElementById(id);
    // element.getElementsByClassName('Form-Error')[0].innerHTML = message;
    element.getElementsByClassName('Form-Error')[0].style.transform = 'scale(1)';
}


form.addEventListener('submit', e => {
    e.preventDefault();
    /*---------------------------------------Validation---------------------------------------*/
    clearerror();
    var returnvalue = true;
    var name = document.forms['google-sheet']["Name"].value;
    if (Nregex.test(name) === false) {
        seterror("Name");
        returnvalue = false;
    }

    var phonenumber = document.forms['google-sheet']["PhoneNumber"].value;
    if (Cregex.test(phonenumber) === false) {
        seterror("PhoneNumber");
        returnvalue = false;
    }

    var message = document.forms['google-sheet']["Message"].value;
    if (message.length < 10 || message === "") {
        seterror("Message");
        returnvalue = false;
    }


    if (returnvalue) {
        document.querySelector('#Date').value = new Date().toLocaleString();
        document.querySelector('.Form-Button').disabled = true;
        document.querySelector('.Form-Button').innerHTML = 'Submitting <i class="fa-solid fa-spinner loading"></i>';

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                document.querySelector('.Form-Response-Container').classList.add("active");
                setTimeout(() => {
                    document.querySelector('.Form-Response-Container').classList.remove("active");
                }, 5000);
                document.querySelector('.Form-Button').innerHTML = 'Submit <i class="fa-sharp fa-solid fa-plane-departure"></i>'
                document.querySelector('.Form-Button').disabled = false;
                document.querySelector('#google-sheet').reset();
            })
            .catch(error => {
                console.log('*Error While Submitting Form Contact Admin*');
            })
    }

})

// ------------------------------------Form Validation End------------------------------------
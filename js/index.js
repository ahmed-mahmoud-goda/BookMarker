var inputName = document.getElementById("SiteName");
var inputURL = document.getElementById("SiteURL");
var error1 = document.getElementById("invalid1");
var error2 = document.getElementById("invalid2");
var nameValid = false;
var urlValid = false;
var regex = [/[A-Za-z0-9]{3,}/gm, /[A-Za-z0-9]{3,}\.[A-Za-z]{2,}/gm]
var bookmarks = [];
showItems();
function clearForm() {
    inputName.value = '';
    inputURL.value = '';
    nameValid=false;
    urlValid=false;
    inputName.classList.remove("is-valid");
    inputURL.classList.remove("is-valid");
}
function submit() {
    if (nameValid == false) {
        error1.classList.remove("d-none");
    }
    if (urlValid == false) {
        error2.classList.remove("d-none");
    }
    if (urlValid == true && nameValid == true) {
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push([inputName.value,inputURL.value]);
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
        error1.classList.add("d-none");
        error2.classList.add("d-none");
        showItems();
        clearForm();
    }
}
function remove(item) {
    var index;
    for(var i=0;i<bookmarks.length;i++){
        if(item == bookmarks[i][0]){
            index = i;
        }
    }
    bookmarks.splice(index,1);
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    showItems();
}
function checkName(element) {
    if (regex[0].test(element.value) == true) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        nameValid = true;
    }
    else if (regex[0].test(element.value) == false) {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        nameValid = false;
    }
}
function checkURL(element) {
    if (regex[1].test(element.value) == true) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        urlValid = true;
    }
    else if (regex[1].test(element.value) == false) {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        urlValid = false;
    }
}
function showItems() {
    if(localStorage.getItem("bookmarks")==null){
        localStorage.setItem("bookmarks",JSON.stringify([]))
    }
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    var rows = `
            <div class="d-flex">
                <div class="w-25 bg-light py-2">
                    <b>index</b>
                </div>
                <div class="w-25 bg-light py-2">
                    <b>Website Name</b>
                </div>
                <div class="w-25 bg-light py-2">
                    <b>Visit</b>
                </div>
                <div class="w-25 bg-light py-2">
                    <b>Delete</b>
                </div>
            </div>
                `
    for (var i = 0; i < bookmarks.length; i++) {
        rows += `
        <div class="d-flex border-top border-bottom border-1 border-light-subtile">
                <div class="w-25 bg-light py-2">
                    <p>${i+1}</p>
                </div>
                <div class="w-25 bg-light py-2">
                    <p>${bookmarks[i][0]}</p>
                </div>
                <div class="w-25 bg-light py-2">
                    <a href="${bookmarks[i][1]}" target="_blank"><button class="btn btn-success text-white"><i class="fa-solid fa-eye me-1"></i> Visit</button></a>
                </div>
                <div class="w-25 bg-light py-2">
                    <button onclick="remove('${bookmarks[i][0]}')" class="btn btn-danger text-white"><i class="fa-solid fa-trash me-1"></i> Delete</button>
                </div>
            </div>

        `
    }
    document.getElementById("items").innerHTML = rows;
}

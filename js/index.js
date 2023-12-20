var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var warningLayer = document.querySelector("#warningLayer");
var close = document.querySelector("#close");
var siteList = [];

if (localStorage.getItem("booked") != null) {
  siteList = JSON.parse(localStorage.getItem("booked"));
  display(siteList);
}

function addNewSite() {
  if (validSiteName() && validSiteURL() == true) {
    var newObject = {
      siteName: siteName.value,
      siteURL: siteURL.value,
    };
    siteList.push(newObject);

    localStorage.setItem("booked", JSON.stringify(siteList));

    display(siteList);

    clearForm();
  } else {
    warningLayer.classList.replace("d-none", "d-flex");
  }
}

function display(list) {
  var cartona = ``;
  for (var i = 0; i < siteList.length; i++) {
    cartona += `<tr>
        <td>${i + 1}</td>
        <td>${list[i].siteName}</td>
        <td><a href="${
          list[i].siteURL
        }" target="_blank" class="btn btn-sm btn-success w-25">Visit</a></td>
        <td><button class="btn btn-sm btn-danger w-25" onclick="deleteRow(${i})"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`;
  }
  document.getElementById("body").innerHTML = cartona;
}

function clearForm() {
  siteName.value = ``;
  siteURL.value = ``;
}

function deleteRow(i) {
  siteList.splice(i, 1);
  localStorage.setItem("booked", JSON.stringify(siteList));
  display(siteList);
}

function validSiteName() {
  var regex = /^[a-zA-z0-9]{3,}$/;
  if (regex.test(siteName.value)) {
    siteName.classList.replace("is-invalid", "is-valid");
    document
      .querySelector("#nameMessage")
      .classList.replace("d-block", "d-none");
    return true;
  } else {
    siteName.classList.add("is-invalid");
    document
      .querySelector("#nameMessage")
      .classList.replace("d-none", "d-block");
    return false;
  }
}

function validSiteURL() {
  var regex =
    /^(https:\/\/)(www){0,1}(\.){0,1}[a-zA-z0-9]{1,}\.((com)|(net)|(org))\/{0,1}$/;
  if (regex.test(siteURL.value)) {
    siteURL.classList.replace("is-invalid", "is-valid");
    document.querySelector("#message").classList.replace("d-block", "d-none");

    return true;
  } else {
    siteURL.classList.add("is-invalid");
    document.querySelector("#message").classList.replace("d-none", "d-block");
    return false;
  }
}

function closebtn() {
  warningLayer.classList.replace("d-flex", "d-none");
}

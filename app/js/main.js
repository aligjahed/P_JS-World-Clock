// Test
console.log("JS is working");

// Calls
const url = "https://worldtimeapi.org/api/timezone/";
const timezoneObj = document.getElementById("timezoneSel");
const timeText = document.getElementById("timeText");

//Variables
let contReq = "";
let timezoneReq = "";
let data = "";

//Get data from api
async function getData() {
  const res = await fetch(url + contReq + timezoneReq);
  data = await res.json();
}

//Set Continent
async function continetSel(Req) {
  contReq = Req.value;
  timezoneReq = "";
  timeText.innerHTML = "Select Timezone please";
  await timezoneSelPop();
  contReq = "";
}

//Set Timezone
async function timezoneSel(Req) {
  timezoneReq = Req.value;
  setTime();
}

//Populate timezone selector
async function timezoneSelPop() {
  //Resets timezone selector to default
  timezoneObj.innerHTML = '<option value="">' + "--SELECT--" + "</option>";

  if (contReq !== "") {
    await getData();

    for (let index = 0; index < data.length; index++) {
      timezoneObj.innerHTML =
        timezoneObj.innerHTML +
        '<option value="' +
        data[index] +
        '">' +
        data[index].substring(contReq.length + 1) +
        "</option>";
    }
  }
}

//Show time on site
async function setTime() {
  await getData();

  timeText.innerHTML = "Time : " + data.datetime.substring(11, 19);
}

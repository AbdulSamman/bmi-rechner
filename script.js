const weight = document.getElementById("weight");
const tall = document.getElementById("tall");
const age = document.getElementById("age");

const outputBmi = document.querySelector(".outputBMI");
const outputStatus = document.getElementById("outputstatus");
const idealerResult = document.getElementById("idealerwert");
const idealerTxt = document.getElementById("idealertxt");
const button = document.getElementById("getbmi");
const resultColor = document.getElementById("resultclr");
const lastresult = document.getElementById("lastresult");

button.addEventListener("click", getBmiMen);

async function getBmiMen(event) {
  event.preventDefault();
  const weightValue = weight.value;

  const tallValue = tall.value;
  const ageValue = age.value;
  const bmi = weightValue / tallValue ** 2;

  const roundedAndToStr = bmi.toFixed(2);

  localStorage.setItem("lastResult", roundedAndToStr);
  const getResult = localStorage.getItem("lastResult");
  lastresult.innerHTML = ` <span id="lastresult">CurrentlyBMI:</span> `;

  if (weight.value > 800) {
    alert("Elephant or what!!");
    return;
  }
  let status = "";
  let ageStatus = 0; //REACT iwie switch mit if -> intigireren
  let color = "";

  if (ageValue >= 19 && ageValue <= 24) {
    ageStatus = 0;

    idealerResult.textContent = ` ${idealerBmi(19, 25)}`;
  } else if (ageValue >= 25 && ageValue <= 34) {
    ageStatus = 1;
    idealerResult.textContent = `${idealerBmi(20, 26)}`;
  } else if (ageValue >= 35 && ageValue <= 44) {
    ageStatus = 2;
    idealerResult.textContent = `${idealerBmi(21, 27)}`;
  } else if (ageValue >= 45 && ageValue <= 54) {
    ageStatus = 3;
    idealerResult.textContent = `${idealerBmi(22, 28)}`;
  } else if (ageValue >= 55 && ageValue <= 64) {
    ageStatus = 4;
    idealerResult.textContent = `${idealerBmi(23, 29)}`;
  } else if (ageValue >= 65) {
    resultclr;
    ageStatus = 5;
    idealerResult.textContent = `${idealerBmi(24, 30)}`;
  } else {
    alert("Age must be older than 18");
  }

  if (roundedAndToStr < 19 + ageStatus) {
    status = " Underweight";
    color = "#00008B";
  } else if (
    roundedAndToStr >= 19 + ageStatus &&
    roundedAndToStr < 25 + ageStatus
  ) {
    status = "Normal weight";
    color = "#006400";
  } else if (
    roundedAndToStr >= 25 + ageStatus &&
    roundedAndToStr < 30 + ageStatus
  ) {
    status = "Overweight";
    color = "#ADFF2F";
  } else if (
    roundedAndToStr >= 30 + ageStatus &&
    roundedAndToStr < 40 + ageStatus
  ) {
    status = "Extreme obesity";
    color = "#FF8C00";
  } else {
    status = "massive obesity";
    color = "#B22222";
  }

  outputStatus.textContent = `${status} `;
  outputStatus.style.color = `${color}`;

  resultColor.textContent = `${roundedAndToStr}`;

  resultColor.style.color = `${color}`;
  resultColor.style.border = `7px solid ${color}`;
}

function idealerBmi(min, max) {
  idealerResult.style.display = "flex";
  idealerResult.style.justifyContent = "center";
  idealerResult.style.alignItems = "center";
  idealerResult.style.color = "seagreen";
  idealerResult.style.border = "7px solid palegreen";
  idealerTxt.textContent = "IDEAL BMI";
  idealerTxt.style.color = "seagreen";
  return ((min + max) / 2).toFixed(2);
}

function lastResultWiederrufen() {
  //prüfe localStorage ob schon ne wert besetzt! -> vorheriges ergebnis!
  const lastResult = localStorage.getItem("lastResult");

  if (lastResult) {
    resultColor.textContent = `${lastResult}`;
    lastresult.innerHTML = `<span id="lastresult">LastBMI:</span>`;
    resultColor.style.display = "flex";
    resultColor.style.justifyContent = "center";
    resultColor.style.alignItems = "center";
    resultColor.style.color = "seagreen";
    resultColor.style.border = "7px solid pink";
  }
}
lastResultWiederrufen();

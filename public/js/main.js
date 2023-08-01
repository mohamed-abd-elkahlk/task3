let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  weatherFunction();
  form.reset();
});
const errorForm = document.getElementById("error");
const locationForm = document.getElementById("location");
const forecastForm = document.getElementById("forecast");

// async --> function return promise
let weatherFunction = async () => {
  try {
    const address = document.getElementById("address").value;
    const res = await fetch(`http://localhost:3000/weather?address=${address}`);
    const data = await res.json();
    console.log(data);
    if (data.error) {
      errorForm.innerText = data.error;
      locationForm.innerText = "";
      forecastForm.innerText = "";
    } else {
      // locationForm.innerText = data.location;
      // forecastForm.innerText = data.forecast;
      errorForm.innerText = "sucess with 0 erorr loding...";

      setTimeout(() => {
        locationForm.innerText = data.location;
        setTimeout(() => {
          forecastForm.innerText = data.forecast;
          setTimeout(() => {
            errorForm.innerText = "";
          }, 1000);
        }, 500);
      }, 500);
    }
  } catch (e) {
    console.log(e);
  }
};
function locationFormData() {}
function forecastFormData() {}

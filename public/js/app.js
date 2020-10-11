const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageHeader = document.querySelector("#message-header");
const messageBody = document.querySelector("#message-body");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageHeader.textContent = "";
  messageBody.textContent = "Loading...";

  fetch(`/weather?address=${encodeURIComponent(location)}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageHeader.textContent = "Error";
        messageBody.textContent = data.error;
      } else {
        messageHeader.textContent = data.location;
        messageBody.textContent = data.forecast;
      }
    });
  });
});

document.querySelector("form").addEventListener("submit", handleSubmitForm);

document.querySelector(".close-button").addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
});

function handleSubmitForm(event) {
  event.preventDefault();
  const modal = document.querySelector(".modal");
  modal.style.display = "block";
  fetch("/weather", { method: "POST", body: new FormData(event.target) })
    .then((response) => response.json())
    .then((data) => {
      const modalContent = document.querySelector(".modal-content");
      let contentHtml = "";

      if (data.description.includes("rain")) {
        contentHtml = `<p><img src="/static/assets/img/rain.png" alt="Rain Icon" /> Temperature: ${data.temperature}°F</p><p>Description: ${data.description}</p><p>Don't forget your umbrella!</p>`;
      } else if (data.description.includes("cloud")) {
        contentHtml = `<p><img src="/static/assets/img/clouds.png" alt="Cloud Icon" /> Temperature: ${data.temperature}°F</p><p>Description: ${data.description}</p><p>Don't forget your umbrella!</p>`;
      } else if (data.description.includes("clear sky")) {
        contentHtml = `<p><img src="/static/assets/img/isun.png" alt="Sun Icon" /> Temperature: ${data.temperature}°F</p><p>Description: ${data.description}</p><p>Enjoy your day!</p>`;
      }

      modalContent.innerHTML = contentHtml;
    })
    .catch((error) => {
      console.error("Error retrieving data, ", error);
    });
}

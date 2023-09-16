/*
import { API_URL } from "../utils/settings.js";
import { fetchPostJsonFormData } from "../utils/utils.js";

let initialized = false;
initDateCalc();

async function initDateCalc() {
    const form = document.querySelector("#form");
    const resultContainer = document.getElementById("date-result");
    if (!initialized) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            try {
                const response = await fetchPostJsonFormData(
                    API_URL + "datecalc",
                    form
                );
                if (response) {
                    resultContainer.innerText = response.data;
                } else {
                    resultContainer.innerText = response.message;
                }
            } catch (error) {
                resultContainer.innerText = error.message;
            }
        });
        initialized = true;
    }
}
*/
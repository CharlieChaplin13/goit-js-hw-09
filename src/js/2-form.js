const formData = { email: "", message: "" };

const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector(".feedback-form");

form.addEventListener("submit", onFormSubmit);
form.addEventListener("input", onFormInput);

populateOnFormInput();


function onFormInput({target: { name, value }}) {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateOnFormInput() {
    const savedData  = localStorage.getItem(STORAGE_KEY);

    if(savedData) {
        const { email, message } = JSON.parse(savedData);

        formData.email = email || "";
        formData.message = message || "";

        form.elements.email.value = formData.email;
        form.elements.message.value = formData.message;
    }
}

function onFormSubmit(event) {
    event.preventDefault();
    const { email, message } = form.elements;
    
    if(!email.value.trim() || !message.value.trim()) {
       return alert("Fill please all fields");
    }

    console.log(formData)
    event.target.reset();
    localStorage.removeItem(STORAGE_KEY);

    formData.email = "";
    formData.message = "";
}
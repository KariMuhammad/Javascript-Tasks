const lang = {
  username: {
    ar: "إسمك",
  },
  age: {
    ar: "عمرك",
  },
  hobby: {
    ar: "هواياتك",
  },
};

const form = document.getElementById("personal-info-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const errors = {};
  const data = {};

  //   console.log(formData); won't show data, because it is not iterable, but has method returns iterables
  for (let [key, value] of formData.entries()) {
    if (key === "username" && value.length < 5)
      errors[key] = `${lang[key].ar} يجب أن يكون علي الأقل 5 أحرف`;
    if (key === "age" && value <= 0)
      errors[key] = `${lang[key].ar} يجب أن يكون أكبر من ال0`;
    if (key === "hobby" && value.length === 0)
      errors[key] = `${lang[key].ar} هذا الحقل مطلوب إملاءه`;

    data[key] = value;
  }

  if (Object.keys(errors).length > 0) {
    return showErrors(errors);
  }

  const message = `أهلا يا ${data.username}, عمرك ${data.age}, وهواياتك ${data.hobby}`;

  return showMessage(message);
});

function showMessage(message) {
  const output = document.querySelector(".output");
  output.classList.add("show");

  const text = document.createElement("p");
  text.textContent = message;

  output.appendChild(text);
}

function showErrors(errors) {
  const output = document.querySelector(".output");
  output.classList.add("show");
  output.classList.add("has_errors");

  const list = document.createElement("ul");

  for (let key of Object.keys(errors)) {
    const li = document.createElement("li");
    li.textContent = errors[key];

    list.appendChild(li);
  }

  output.appendChild(list);
}

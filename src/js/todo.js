const ListContainer = document.getElementById("todo__list");
const addTaskBtn = document.getElementById("add_to_list");
const openModal = document.getElementById("openModal");
const btnCloseModal = document.getElementById("btnClose");
const modalPopup = document.getElementById("popup");
const c = document.querySelector(".todo__c");
let n = 0;
let taskList = [];

////////////////////////////////////////////////
// FUNCTION
const closeModal = () => {
  modalPopup.classList.add("hidden");
};

const completeTodo = (inputElement) => {
  inputElement.nextElementSibling.classList.toggle("complete");
  inputElement.parentElement.nextElementSibling.firstElementChild.classList.toggle(
    "complete"
  );
};

const removeTask = (removeElement) => {
  const i = removeElement.parentNode.parentElement;
  const itemId = +i.dataset.listItemId;
  const index = taskList.findIndex((el) => el.listItemId - 1 === itemId);

  if (index !== -1) {
    i.remove();
    taskList.splice(index, 1);
  }

  if (taskList.length === 0) {
    c.style.display = "block";
  }
};

const renderTask = (title, description) => {
  const markup = `
  <li class="todo__item" id="list" data-list-item-id="${n++}">
        <div class="todo__item--title-box">
         <input
            type="checkbox"
            class="todo__checkbox"
          />
          <span class="todo__item--title"
            >${title}
          </span>
          <button class="todo__icon   todo__icon--delete"  id="remove-task">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
        <div class="todo__item--description">
          <p class="todo__item--description-note">
            ${description}
          </p>
        </div>
      </li>
            `;

  if (taskList.length === 0) {
    c.style.display = "block";
  }
  c.style.display = "none";
  ListContainer.insertAdjacentHTML("beforeend", markup);
  taskList.push({ listItemId: n, title, description });
};

// popup.addEventListener("keypress", (e) => {
//   if (e.key === "Escape") renderTask();
// });

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalPopup.classList.contains("hidden")) {
    closeModal();
  }
});

modalPopup.addEventListener("click", (e) => {
  if (e.target.className === "popup") {
    closeModal();
  }
});
btnCloseModal.addEventListener("click", closeModal);

openModal.addEventListener("click", (e) => {
  modalPopup.classList.remove("hidden");
});

if (ListContainer) {
  ListContainer.addEventListener(
    "click",
    (e) => {
      const removeList = e.target.parentNode.closest("#remove-task");

      if (!removeList) return;
      removeTask(removeList);

      // switch (e.target.tagName) {
      //   case "svg":
      //     break;
      // }
    },
    true
  );
}
if (ListContainer) {
  ListContainer.addEventListener("change", (e) => {
    if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
      completeTodo(e.target);
    }
  });
}

if (addTaskBtn) {
  addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.getElementById("titleInput").value.trim();
    const description = document
      .getElementById("descriptionInput")
      .value.trim();
    clearInput();
    if (title.length === 0 || description.length === 0) return;
    renderTask(title, description);
    clearInput();
    closeModal();
  });
}

const clearInput = () => {
  document.getElementById("titleInput").value = "";
  document.getElementById("descriptionInput").value = "";
};

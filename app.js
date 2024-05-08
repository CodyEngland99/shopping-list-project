// ADD FILTER ITEM

const formSubmit = document
	.getElementById("item-form")
	.addEventListener("submit", (e) => {
		e.preventDefault();

		let userFromData = document.getElementById("item-input");

		let userInput = userFromData.value;

		checkUserInput(userInput);

		//clearing input
		userFromData.value = "";
	});

// REMOVING SELECTED ELEMTENT
const itemContainer = document.getElementById("item-list");

itemContainer.addEventListener("click", (e) => {
	if (e.target.classList.contains("remove-item")) {
		const listItem = e.target.closest("li");
		if (listItem) {
			removeLocalStorage(listItem);
			listItem.remove();
		}
	}
});

const deleteBtn = document
	.getElementById("clear")
	.addEventListener("click", () => {
		const itemContainer = document.getElementById("item-list");

		removeAllLocal();

		while (itemContainer.firstChild) {
			itemContainer.removeChild(itemContainer.lastChild);
		}
	});

const checkUserInput = (input) => {
	let inputField = document.getElementById("item-input");

	if (input.trim() === "") {
		inputField.classList.add("not-filled");
		return;
	} else {
		inputField.classList.remove("not-filled");
		addItem(input);
		addLocalStorage(input);
	}
};

// local storage
let usersList = [];

const addLocalStorage = (input) => {
	usersList.push(input);

	localStorage.setItem("item-list", JSON.stringify(usersList));
};

const removeLocalStorage = (item) => {
	const itemText = item.innerText;

	const itemIndex = usersList.indexOf(itemText);

	usersList.splice(itemIndex, 1);

	localStorage.setItem("item-list", JSON.stringify(usersList));
};

const loadingStorage = () => {
	const itemStorage = JSON.parse(localStorage.getItem("item-list"));

	if ("item-list" in localStorage) {
		itemStorage.forEach((item) => {
			usersList.push(item);

			addItem(item);
		});
	} else {
		return;
	}
};

const removeAllLocal = () => {
	localStorage.clear();
	usersList = [];
};

// adding new item
const addItem = (item) => {
	const itemContainer = document.getElementById("item-list");

	const li = document.createElement("li");

	li.classList.add("item");

	li.innerText = item;

	itemContainer.appendChild(li);
	li.appendChild(addBtn());
};

const addBtn = () => {
	const button = document.createElement("button");
	const icon = document.createElement("i");

	icon.classList.add("fa-solid", "fa-xmark", "remove-item");
	button.classList.add("remove-item", "btn-link", "text-red");

	button.appendChild(icon);

	return button;
};

// filter items

const filter = document
	.getElementById("filter")
	.addEventListener("input", (e) => {
		const item = document.querySelectorAll(".item");

		const userFilter = e.target.value;

		item.forEach((line) => {
			const liText = line.textContent.toLowerCase();

			if (liText.includes(userFilter)) {
				line.classList.remove("display-none"); // Show the li
			} else {
				line.classList.add("display-none"); // Hide the li
			}
		});
	});

//run local storage check

window.onload = function () {
	loadingStorage();
};

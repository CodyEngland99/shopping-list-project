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
			listItem.remove();
		}
	}
});

const deleteBtn = document
	.getElementById("clear")
	.addEventListener("click", () => {
		const itemContainer = document.getElementById("item-list");

		while (itemContainer.firstChild) {
			itemContainer.removeChild(itemContainer.lastChild);
		}
	});

const checkUserInput = (input) => {
	if (input.trim() === "") {
		return;
	} else {
		addItem(input);
	}
};

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

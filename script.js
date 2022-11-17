let welcPop,
	wojciu,
	tomi,
	accountName,
	noTask,
	plusBtn,
	calendarBtn,
	doorBtn,
	ulList,
	tierList,
	expInfo,
	newTodoInput,
	createTaskBtn,
	tierOne,
	tierTwo,
	tierThree,
	errorInfo,
	expBarLimitAmount,
	pLimit;

const main = () => {
	prepareDomElements();
	prepareDomEvents();
};

const prepareDomElements = () => {
	welcPop = document.querySelector(".welcome-popup");
	welcWojciu = document.querySelector(".choose-account .account-conteiner.wojciu");
	welcTomi = document.querySelector(".choose-account .account-conteiner.tomi");
	wojciu = document.querySelector(".left-side .account-conteiner.wojciu");
	tomi = document.querySelector(".left-side .account-conteiner.tomi");
	accountName = document.querySelector(".header-name");
	ulWojciu = document.querySelector("#wojciu");
	ulTomi = document.querySelector("#tomi");

	noTask = document.querySelector(".no-task");

	plusBtn = document.querySelector(".plusBtn");
	calendarBtn = document.querySelector(".calendarBtn");
	doorBtn = document.querySelector(".doorBtn");
	ulListWojciu = document.querySelector("#wojciu");
	ulListTomi = document.querySelector("#tomi");

	popupConteiner = document.querySelector(".popup-conteiner");
	addPopup = document.querySelector(".add-popup");
	exitPopup = document.querySelector(".fa-xmark");
	tierList = document.querySelectorAll(".tier-list");
	expInfo = document.querySelector(".exp-info");
	newTodoInput = document.querySelector(".input-conteiner input");
	createTaskBtn = document.querySelector("#confirm");

	tierOne = document.querySelector(".tier-one");
	tierTwo = document.querySelector(".tier-two");
	tierThree = document.querySelector(".tier-three");
	errorInfo = document.querySelector(".error-info");
	expBarLimitAmount = document.querySelector(".exp-bar-limit-ammount");
	pLimit = document.querySelector(".limit");
	// 	popup = document.querySelector(".popup");
	// 	popupInfo = document.querySelector(".popup-info");
	// 	popupInput = document.querySelector(".popup-input");
	// 	popupAddBtn = document.querySelector(".accept");
	// 	popupCloseBtn = document.querySelector(".cancel");
};

const prepareDomEvents = () => {
	welcWojciu.addEventListener("click", userWojciu);
	welcTomi.addEventListener("click", userTomi);
	wojciu.addEventListener("click", userWojciu);
	tomi.addEventListener("click", userTomi);
	ulListWojciu.addEventListener("click", checkClick);
	ulListTomi.addEventListener("click", checkClick);

	plusBtn.addEventListener("click", showAddPopup);
	exitPopup.addEventListener("click", exitAddPopup);
	tierList.forEach(element => {
		element.addEventListener("click", tierActive);
	});
	createTaskBtn.addEventListener("click", addNewTodo);
	newTodoInput.addEventListener("keyup", enterKeyCheck);
};

const userWojciu = () => {
	accountName.textContent = "wojciu";
	ulWojciu.classList.add("show");
	ulTomi.classList.remove("show");
	checkTasksLength();
	welcPop.classList.add("hide");
};
const userTomi = () => {
	accountName.textContent = "tomi";
	ulWojciu.classList.remove("show");
	ulTomi.classList.add("show");
	checkTasksLength();
	welcPop.classList.add("hide");
};

const displayDate = () => {
	let today = new Date();

	let month = today.getMonth() + 1;
	let year = today.getFullYear();
	let date = today.getDate();
	let time = new Date().toLocaleTimeString();

	let currentDate = `Today is: ${date}/${month}/${year} at: ${time}`;
	let dateH2 = document.querySelector(".date");
	dateH2.textContent = `${currentDate}`;
	setTimeout(displayDate, 1000);
};
displayDate();

const addNewTodo = () => {
	if (newTodoInput.value !== "") {
		if (newTodoInput.value.length <= 32) {
			const taskContent = newTodoInput.value;
			let tierClass;
			let tierValue;
			const checkTierClass = () => {
				if (tierOne.matches(".active")) {
					tierClass = "tier1";
					tierValue = "+100 exp";
				} else if (tierTwo.matches(".active")) {
					tierClass = "tier2";
					tierValue = "+200 exp";
				} else if (tierThree.matches(".active")) {
					tierClass = "tier3";
					tierValue = "+300 exp";
				}
			};
			checkTierClass();
			createNewTodo(taskContent, tierClass, tierValue);

			checkTasksLength();
			exitAddPopup();
		} else {
			errorInfo.textContent = "The maximum number of letters is 32";
		}
	} else {
		errorInfo.textContent = "Enter the content of the task!";
	}
};

const createNewTodo = (taskContent, tierClass, tierValue, user) => {
	const li = document.createElement("li");
	li.classList.add(tierClass, "new-li");

	const liCheckbox = document.createElement("div");
	liCheckbox.classList.add("checkbox");

	const checkboxIcon = document.createElement("i");
	checkboxIcon.classList.add("fa-solid");
	checkboxIcon.classList.add("fa-check");

	const taskName = document.createElement("p");
	taskName.classList.add("task-name");
	taskName.textContent = taskContent;

	const taskExp = document.createElement("p");
	taskExp.classList.add("exp");
	taskExp.textContent = tierValue;

	const editTask = document.createElement("div");
	editTask.classList.add("edit");

	const editIcon = document.createElement("i");
	editIcon.classList.add("fa-solid");
	editIcon.classList.add("fa-pen-to-square");

	if (ulListWojciu.matches(".show")) {
		ulListWojciu.append(li);
	} else if (ulListTomi.matches(".show")) {
		ulListTomi.append(li);
	}
	li.append(liCheckbox, taskName, taskExp, editTask);
	liCheckbox.append(checkboxIcon);
	editTask.append(editIcon);
	setTimeout(() => {
		li.classList.remove("new-li");
	}, 1000);
};

const checkClick = e => {
	if (e.target.matches(".checkbox, .fa-check")) {
		e.target.closest("li").classList.toggle("completed");
		e.target.classList.toggle("completed");
		// } else if (e.target.matches(".edit")) {
		// 	editTodo(e);
	}
};

const showAddPopup = () => {
	popupConteiner.classList.toggle("hide");
};

const exitAddPopup = () => {
	popupConteiner.classList.add("hide");

	setTimeout(() => {
		tierList.forEach(e => {
			e.classList.remove("active");
		});
		tierList[0].classList.add("active");

		expInfo.textContent = "+100 exp";
		expInfo.classList.add("tier1");
		expInfo.classList.remove("tier2", "tier3");

		pLimit.classList.remove("tier2", "tier3");
		pLimit.classList.add("tier1");
		expBarLimitAmount.classList.remove("tier2", "tier3");
		expBarLimitAmount.classList.add("tier1");

		newTodoInput.value = "";
		errorInfo.textContent = "";
	}, 300);
};

function tierActive() {
	tierList.forEach(element => {
		element.classList.remove("active");
		this.classList.add("active");
	});
	if (tierList[0].matches(".active")) {
		expInfo.textContent = "+100 exp";
		expInfo.classList.add("tier1");
		expInfo.classList.remove("tier2", "tier3");

		expBarLimitAmount.classList.add("tier1");
		expBarLimitAmount.classList.remove("tier2", "tier3");
		pLimit.classList.add("tier1");
		pLimit.classList.remove("tier2", "tier3");
	} else if (tierList[1].matches(".active")) {
		expInfo.textContent = "+200 exp";
		expInfo.classList.remove("tier1", "tier3");
		expInfo.classList.add("tier2");

		expBarLimitAmount.classList.add("tier2");
		expBarLimitAmount.classList.remove("tier1", "tier3");
		pLimit.classList.add("tier2");
		pLimit.classList.remove("tier1", "tier3");
	} else if (tierList[2].matches(".active")) {
		expInfo.textContent = "+300 exp";
		expInfo.classList.remove("tier1", "tier2");
		expInfo.classList.add("tier3");

		expBarLimitAmount.classList.add("tier3");
		expBarLimitAmount.classList.remove("tier1", "tier2");
		pLimit.classList.add("tier3");
		pLimit.classList.remove("tier1", "tier2");
	}
}
// const plus = () => {
// 	console.log("jest ok");
// };

// const editTodo = e => {
// 	todoToEdit = e.target.closest("li");
// 	popupInput.value = todoToEdit.firstChild.textContent;
// 	popup.style.display = "flex";
// };

// const changeTodoText = () => {
// 	if (popupInput.value !== "") {
// 		todoToEdit.firstChild.textContent = popupInput.value;
// 		popup.style.display = "none";
// 		popupInfo.textContent = "";
// 	} else {
// 		popupInfo.textContent = "Musisz podać jakąś treść!";
// 	}
// };

// const deleteTodo = e => {
// 	e.target.closest("li").remove();
const checkTasksLength = () => {
	const allTodosTomi = ulListTomi.querySelectorAll("li");
	const allTodosWojciu = ulListWojciu.querySelectorAll("li");
	if (ulListWojciu.matches(".show")) {
		if (allTodosWojciu.length === 0) {
			noTask.classList.remove("hide");
		} else {
			noTask.classList.add("hide");
		}
	} else if (ulListTomi.matches(".show")) {
		if (allTodosTomi.length === 0) {
			noTask.classList.remove("hide");
		} else {
			noTask.classList.add("hide");
		}
	}
};

const enterKeyCheck = e => {
	if (e.key === "Enter") {
		addNewTodo();
	}
};
const escKeyCheck = e => {
	if (e.key === "Escape") {
		exitAddPopup();
	}
};

document.onkeydown = function (e) {
	if (e.key === "Escape") {
		exitAddPopup();
	}
};

document.addEventListener("DOMContentLoaded", main);

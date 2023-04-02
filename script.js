//Lista degli utenti con ricerca

import { GET, cE, qS, app } from "./utils.js";

//Funzioni

function createUser(us) {
  const userEl = cE("div");
  const anagraphic = cE("div");
  const profPicCont = cE("div");
  const profPic = cE("img");
  const information = cE("div");
  const nameSurname = cE("span");
  const birthDate = cE("h5");
  const contact = cE("div");
  const contactName = cE("div");
  const contactInfo = cE("div");
  const userName = cE("h3");
  const contInfo = cE("h2");
  const userTitle = cE("h2");
  const mail = cE("span");
  const phoneNum = cE("span");

  userEl.className = "userCard";
  anagraphic.className = "anagraphic";
  profPicCont.className = "profPicContainer";
  profPic.className = "profPic";
  information.className = "info";
  contact.className = "contact";
  contactName.className = "contName";
  contactInfo.className = "contInfo";

  profPic.setAttribute("src", us.image);
  nameSurname.textContent = `${us.firstName} ${us.lastName}`;
  birthDate.textContent = us.birthDate;
  userName.textContent = us.username;
  mail.textContent = us.email;
  phoneNum.textContent = us.phone;
  contInfo.textContent = "Contacts:";
  contInfo.style.color = "black";
  contInfo.style.cursor = "default";
  userTitle.textContent = "username:";
  userTitle.style.color = "black";
  userTitle.style.cursor = "default";

  profPicCont.appendChild(profPic);
  information.append(nameSurname, birthDate);
  anagraphic.append(profPicCont, information);
  contactName.append(userTitle, userName);
  contactInfo.append(contInfo, mail, phoneNum);
  contact.append(contactName, contactInfo);
  userEl.append(anagraphic, contact);
  return userEl;
}

function searchUsersName(event) {
  deleteUsers();
  let value = event.target.value;
  GET("https://dummyjson.com/", "users?limit=100").then((data) => {
    data.users.map((user) => {
      if (user.firstName.includes(value) || user.lastName.includes(value)) {
        usersList.appendChild(createUser(user));
      }
    });
  });
}

function searchUsersTag(event) {
  deleteUsers();
  let value = event.target.value;
  GET("https://dummyjson.com/", "users?limit=100").then((data) => {
    data.users.map((user) => {
      if (user.username.includes(value)) {
        usersList.appendChild(createUser(user));
      }
    });
  });
}

function searchUsersCont(event) {
  deleteUsers();
  let value = event.target.value;
  GET("https://dummyjson.com/", "users?limit=100").then((data) => {
    data.users.map((user) => {
      if (user.email.includes(value) || user.phone.includes(value)) {
        usersList.appendChild(createUser(user));
      }
    });
  });
}

function deleteUsers() {
  const usersList = document.querySelectorAll(".userCard");

  usersList.forEach((user) => user.remove());
}

//Dichiarazioni

const usersList = qS(".usersList");
const filters = qS("#filters");
const ricerca = qS("#ricerca");

//Get

GET("https://dummyjson.com/", "users?limit=100").then((data) => {
  data.users.map((user) => usersList.appendChild(createUser(user)));
});

//AddEvents

//Iniziale
ricerca.addEventListener("input", searchUsersName);

//In caso di scelta dell'utente

filters.addEventListener("change", (event) => {
  ricerca.removeEventListener("input", searchUsersName);
  ricerca.removeEventListener("input", searchUsersTag);
  ricerca.removeEventListener("input", searchUsersCont);
  let selectedValue = event.target.value;
  if (selectedValue === "1") {
    ricerca.addEventListener("input", searchUsersName);
  }

  if (selectedValue === "2") {
    ricerca.addEventListener("input", searchUsersTag);
  }

  if (selectedValue === "3") {
    ricerca.addEventListener("input", searchUsersCont);
  }
});

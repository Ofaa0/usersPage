const tBody = document.querySelector("table tbody");
const addUserModal = document.querySelector(".addUserModal");
const updateUserModal = document.querySelector(".updateUserModal");
const inpUserEmail = document.querySelector("#inpUserEmail");
const inpUserName = document.querySelector("#inpUserName");
const inpUserPass = document.querySelector("#inpUserPass");
const inpUserRole = document.querySelector("#inpUserRole");
const inpUserEmailE = document.querySelector("#inpUserEmailE");
const inpUserNameE = document.querySelector("#inpUserNameE");
const inpUserPassE = document.querySelector("#inpUserPassE");
const inpUserRoleE = document.querySelector("#inpUserRoleE");
let updateIndex = null;

const users = JSON.parse(localStorage.getItem("users")) || [];

const showUsers = () => {
  tBody.innerHTML = "";
  users.forEach((el, index) => {
    updateIndex = index;
    tBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${el.email}</td>
                <td>${el.name}</td>
                <td>${el.password}</td>
                <td>${el.role}</td>
                <td>
                    <button onclick="deleteUser(${index})" class="btn btn-danger">Delete</button>
                    <button onclick="openEditUserModal(${index})" class="btn btn-primary">Update</button>
                </td>
            </tr>
        `;
  });
};

const openUserModal = () => {
  addUserModal.style.display = "flex";
};
const closeUserModal = () => {
  addUserModal.style.display = "none";
};
const openEditUserModal = (indexToUpdate) => {
  updateIndex = indexToUpdate;
  updateUserModal.style.display = "flex";
  let userByIndex = users[indexToUpdate];
  inpUserEmailE.value = userByIndex.email;
  inpUserNameE.value = userByIndex.name;
  inpUserPassE.value = userByIndex.password;
  inpUserRoleE.value = userByIndex.role;
};
const closeEditUserModal = () => {
  updateUserModal.style.display = "none";
};

const addNewUser = () => {
  let userOpj = {
    email: inpUserEmail.value,
    name: inpUserName.value,
    password: inpUserPass.value,
    role: inpUserRole.value,
  };
  inpUserEmail.value = "";
  inpUserName.value = "";
  inpUserPass.value = "";
  users.push(userOpj);
  localStorage.setItem("users", JSON.stringify(users));
  closeUserModal();
  showUsers();
};

const deleteUser = (userIndex) => {
  let deleteConfirm = confirm("You will delete, Are you sure ? ");
  if (deleteConfirm) {
    users.splice(userIndex, 1);
    localStorage.setItem("users", JSON.stringify(users));
    showUsers();
  } else {
    alert("No change happened...");
  }
};
const updateUserInfo = () => {
  let updatedUser = users[updateIndex];
  updatedUser.email = inpUserEmailE.value;
  updatedUser.name = inpUserNameE.value;
  updatedUser.password = inpUserPassE.value;
  updatedUser.role = inpUserRoleE.value;
  localStorage.setItem("users", JSON.stringify(users));
  closeEditUserModal();
  showUsers();
};
showUsers();

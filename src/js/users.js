import { Modal, Toast } from 'bootstrap';
import * as api from './services/crud';
import getFormData from './services/getFormData';
import findNameErrors from './services/validateUser';
import createUsersMarkup from '../templates/users.hbs';

const refs = {
  form: document.querySelector('form'),
  usersList: document.querySelector('.users-list'),
  modal: document.getElementById('exampleModal'),
  modalForm: document.getElementById('modal-form'),
  updateBtn: document.querySelector('button[data-action="update"]'),
  toast: document.querySelector('.toast'),
  toastText: document.querySelector('.toast-body'),
};

const myModal = new Modal(refs.modal);
const myToast = new Toast(refs.toast, { delay: 6000 });

// ********************* READ  ********************* //
// Render
// const renderAllUsers = () =>
//   api.getUsers().then(users => {
//     refs.usersList.innerHTML = createUsersMarkup(users);
//   });

const renderAllUsers = async () => {
  try {
    const users = await api.getUsers();
    refs.usersList.innerHTML = createUsersMarkup(users);
  } catch (err) {
    console.log(err);
  }
};

renderAllUsers();

// ********************* CREATE  ********************* //

refs.form.addEventListener('submit', saveUser);

// function saveUser(e) {
//   e.preventDefault();

//   const form = e.currentTarget;
//   const newUser = getFormData(form.elements);

//   const nameError = findNameErrors(newUser);
//   if (nameError) {
//     refs.toastText.textContent = nameError;
//     myToast.show();
//     return;
//   }

//   newUser.icon = 'https://cdn4.iconfinder.com/data/icons/pretty_office_3/256/Add-Male-User.png';

//   api.saveUser(newUser).then(renderAllUsers);

//   form.reset();
// }

async function saveUser(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const newUser = getFormData(form.elements);

  const nameError = findNameErrors(newUser);
  if (nameError) {
    refs.toastText.textContent = nameError;
    myToast.show();
    return;
  }

  newUser.icon = 'https://cdn4.iconfinder.com/data/icons/pretty_office_3/256/Add-Male-User.png';

  try {
    await api.saveUser(newUser);
    renderAllUsers();
  } catch (error) {
    console.log(error);
  }

  form.reset();
}

// // ********************* UPDATE / DELETE  ********************* //

refs.usersList.addEventListener('click', handleListClick);

// function handleListClick(e) {
//   if (e.target.dataset.action === 'delete') {
//     api.deleteUser(e.target.dataset.id).then(renderAllUsers);
//   }

//   if (e.target.dataset.action === 'edit') {
//     handleEditUser(e.target.dataset.id);
//   }
// }

async function handleListClick(e) {
  if (e.target.dataset.action === 'delete') {
    await api.deleteUser(e.target.dataset.id);
    renderAllUsers();
  }

  if (e.target.dataset.action === 'edit') {
    handleEditUser(e.target.dataset.id);
  }
}

// function handleEditUser(id) {
//   api.getUserById(id).then(user => {
//     const inputs = refs.modalForm.elements;
//     Object.keys(user).forEach(key => {
//       if (inputs.hasOwnProperty(key)) {
//         inputs[key].value = user[key];
//       }
//     });

//     refs.updateBtn.addEventListener('click', saveChanges);

//     function saveChanges() {
//       const updatedUser = getFormData(inputs);

//       const nameError = findNameErrors(updatedUser);
//       if (nameError) {
//         refs.toastText.textContent = nameError;
//         myToast.show();
//         return;
//       }

//       api.editUser(id, updatedUser).then(renderAllUsers);
//       myModal.hide();

//       refs.updateBtn.removeEventListener('click', saveChanges);
//     }
//   });
// }

async function handleEditUser(id) {
  const user = await api.getUserById(id);

  const inputs = refs.modalForm.elements;
  Object.keys(user).forEach(key => {
    if (inputs.hasOwnProperty(key)) {
      inputs[key].value = user[key];
    }
  });

  refs.updateBtn.addEventListener('click', saveChanges);

  async function saveChanges() {
    const updatedUser = getFormData(inputs);

    const nameError = findNameErrors(updatedUser);
    if (nameError) {
      refs.toastText.textContent = nameError;
      myToast.show();
      return;
    }

    await api.editUser(id, updatedUser);
    renderAllUsers();

    myModal.hide();

    refs.updateBtn.removeEventListener('click', saveChanges);
  }
}

refs.modal.addEventListener('hidden.bs.modal', () => refs.modalForm.reset());

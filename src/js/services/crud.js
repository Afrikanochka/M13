// Create CRUD operations using  https://github.com/typicode/json-server

const BASE_URL = 'http://localhost:3033';

// ********************* READ  ********************* //

// Написать функцию getUsers, которая делает GET запрос на сервер, чтобы получить список всех юзеров

// const getUsers = () => {
//   return fetch(`${BASE_URL}/users`).then(res => res.json());
// };

const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  return response.json();
};

// Написать функцию getUserById, которая делает GET запрос на сервер, чтобы получить юзера по id
// Добавить обработку ошибки, если юзера с данным id не существует

// const getUserById = id =>
//   fetch(`${BASE_URL}/users/${id}`).then(res => {
//     if (res.status === 404) {
//       return Promise.reject(`User with id ${id} not found`);
//     }
//     return res.json();
//   });

async function getUserById(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  if (res.status === 404) {
    return Promise.reject(`User with id ${id} not found`);
  }
  return res.json();
}

// ********************* CREATE  ********************* //

// Написать функцию saveUser, которая делает POST запрос на сервер, чтобы сохранить нового юзера

// const saveUser = user => {
//   const url = BASE_URL + '/users';
//   const options = {
//     method: 'POST',
//     body: JSON.stringify(user),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   return fetch(url, options).then(response => response.json());
// };

async function saveUser(user) {
  const url = BASE_URL + '/users';
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const result = await fetch(url, options);
  return result.json();
}

// ********************* UPDATE  ********************* //

// Написать функцию editUser, которая делает PATCH запрос на сервер, чтобы изменить определенные данные у юзера по id
// Добавить обработку ошибки, если юзера с данным id не существует

const editUser = (id, data) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return fetch(`${BASE_URL}/users/${id}`, options).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`User with id ${id} not found`);
  });
};

// Написать функцию replaceUser, которая делает PUT запрос на сервер, чтобы изменить определенные данные у юзера по id
// Добавить обработку ошибки, если юзера с данным id не существует

const replaceUser = (id, data) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  return fetch(`${BASE_URL}/users/${id}`, options).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`User with id ${id} not found`);
  });
};

// ********************* DELETE  ********************* //

// Написать функцию deleteUser, которая делает DELETE запрос на сервер, чтобы удалить юзера по id
// Добавить обработку ошибки, если юзера с данным id не существует

// const deleteUser = id => {
//   return fetch(`${BASE_URL}/users/${id}`, { method: 'DELETE' }).then(res => {
//     if (res.status === 404) {
//       throw new Error(`User with id ${id} not found`);
//     }
//     return res.json();
//   });
// };

const deleteUser = async id => {
  const res = await fetch(`${BASE_URL}/users/${id}`, { method: 'DELETE' });
  if (res.status === 404) {
    throw new Error(`User with id ${id} not found`);
  }
  return res.json();
};

// ************************************************** //

export { getUsers, getUserById, saveUser, editUser, replaceUser, deleteUser };

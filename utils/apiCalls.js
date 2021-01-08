const url = 'https://192.168.1.4:3000';
export const createUser = async (email) => {
  await fetch(`${url}/user/add`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      name: '',
      qualification: '',
      location: '',
      phone: '',
    }),
  })
    .then((response) => {
      response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUser = async () => {
  await fetch(`${url}/`);
};

export const updateUser = async (name, qualification, location, phone) => {
  await fetch(`${url}/user/update/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      qualification: qualification,
      location: location,
      phone: phone,
    }),
  })
    .then((response) => {
      console.log(JSON.stringify(response));
    })
    .catch((err) => {
      console.log(err);
    });
};

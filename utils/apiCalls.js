const url = 'http://localhost:3000';
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
      console.log(response.json());
    })
    .catch((err) => {
      console.log(err);
    });
};

import AsyncStorage from '@react-native-community/async-storage';

const url = 'https://tuitionapp13.herokuapp.com';
const local = 'http://localhost:3000/';

//User APIs
export const createUser = async (email) => {
  try {
    let user = await fetch(`${url}/user/add`, {
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
    }).then((response) => response.json());
    console.log('USER', user);
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (email) => {
  try {
    let user = await fetch(`${url}/user/${email}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data._id);
        AsyncStorage.setItem('mongoId', data._id);
        AsyncStorage.setItem('email', data.email);
        if (
          data.name == '' ||
          data.location == '' ||
          data.qualification == '' ||
          data.phone == '' ||
          data.name == null ||
          data.location == null ||
          data.qualification == null ||
          data.phone == null
        ) {
          console.log('Here');
          AsyncStorage.setItem('check', 'false');
          // setCheck(false);
        } else {
          AsyncStorage.setItem('check', 'true');
        }
      });
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (name, qualification, location, phone) => {
  let userId = await AsyncStorage.getItem('mongoId').then((value) => {
    return value;
  });
  console.log(userId);
  try {
    let updatedUser = await fetch(`${url}/user/update/${userId}`, {
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
    }).then((response) => response.json());
    console.log(updatedUser);
  } catch (err) {
    console.log(err);
  }
  // .then((response) => {
  //   console.log(JSON.stringify(response));
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
};

//Tutor APIs
export const createBatch = async (batch) => {
  batch.userId = await AsyncStorage.getItem('mongoId').then((value) => {
    return value;
  });
  console.log(batch, 'IN HERE');
  try {
    let createdBatch = await fetch(`${url}/tutor/create_batch`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(batch),
    });
    console.log(createdBatch);
  } catch (error) {
    console.log(error, 'CREATE BATCH ERROR');
  }
};

export const getCreatedBatches = async () => {
  let tutorId = await AsyncStorage.getItem('mongoId').then((value) => {
    return value;
  });
  console.log(tutorId);
  try {
    let createdBatches = await fetch(
      `${url}/tutor/mybatches?tutorId=${tutorId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    let batches = await createdBatches.json();
    console.log(batches);
    return batches;
  } catch (error) {
    console.log(error, 'GET ENROLLED BATCHES ERROR');
  }
};

export const scheduleAssignment = async (assignment) => {
  try {
    let createdAssignment = await fetch(`${url}/tutor/schedule`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assignment),
    });
    console.log(createdAssignment);
  } catch (error) {
    console.log(error);
  }
};

export const getAssignment = async (batchId) => {
  try {
    let assignments = await fetch(
      `${url}/tutor/assignments?batchId=${batchId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    let allAssignments = await assignments.json();
    // console.log(allAssignments);
    return allAssignments;
  } catch (error) {
    console.log(error);
  }
};
//Student APIs
export const getSearchResult = async (std, subject) => {
  console.log(std, subject, 'IN HERE');
  try {
    let batches = await fetch(
      `${url}/student/search_batches?std=${std}&subject=${subject}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    return await batches.json();
  } catch (error) {
    console.log(error, 'SEARCH BATCH ERROR');
  }
};

export const getEnrolled = async (studentId, batchId) => {
  console.log(studentId, batchId, 'IN ENROLLED');
  try {
    let enrolled = await fetch(
      `${url}/student/enroll_batch?studentId=${studentId}&batchId=${batchId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(enrolled);
  } catch (error) {
    console.log(error, 'ENROLL ERROR');
  }
};

export const getEnrolledBatches = async () => {
  let studentId = await AsyncStorage.getItem('mongoId').then((value) => {
    return value;
  });
  console.log(studentId);
  try {
    let enrolledBatches = await fetch(
      `${url}/student/enrolled_batches?studentId=${studentId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    let batches = await enrolledBatches.json();
    console.log(batches);
    return batches;
  } catch (error) {
    console.log(error, 'GET ENROLLED BATCHES ERROR');
  }
};

export const getAllAssignments = async () => {
  let studentId = await AsyncStorage.getItem('mongoId').then((value) => {
    return value;
  });
  console.log(studentId);
  try {
    let allAssignments = await fetch(
      `${url}/student/assignments?studentId=${studentId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    let assign = await allAssignments.json();
    console.log(assign);
    return assign;
  } catch (error) {
    console.log(error);
  }
};

export const sendResponse = async (response) => {
  try {
    let submittedResponse = await fetch(`${url}/student/response`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response),
    });
    console.log(submittedResponse);
  } catch (error) {
    console.log(error);
  }
};

export const getAssignmentResponses = async (batchId, assignId) => {
  try {
    let resp = await fetch(
      `${url}/tutor/responses?assignId=${assignId}&batchId=${batchId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    let responses = await resp.json();
    console.log(responses);
    return responses;
  } catch (error) {
    console.log(error);
  }
};

export const getBatchAssignments = async (batchId) =>{
  try {
    let resp = await fetch(`${url}/student/batch_assignments?batchId=${batchId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    let assignments = await resp.json();
    return assignments;
  } catch (error) {
    console.log(error);
    return []; 
  }
}

export const getBatchInfo = async (batchId)=>{
  console.log(batchId);
  try {
    let resp = await fetch(`${url}/batch?batchId=${batchId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    let batch = await resp.json();
    console.log(batch,"SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
    return batch;
  } catch (error) {
    console.log(error);
    return {}; 
  }
}

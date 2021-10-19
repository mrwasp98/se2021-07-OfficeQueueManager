
const getAllServices = () => {
  return new Promise((resolve, reject) => {
    fetch('/api/services', {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
        if (!res.ok) {
          const error = new Error(`${res.status}: ${res.statusText}`);
          error.response = res;
          throw error;
        }
        resolve(res.json());
      })
      .catch((err) => {
        reject({ message: err.message });
      });
  });
}

// API to get the officers that are working/waiting
const getActiveOfficers = () => {
  return new Promise((resolve, reject) => {
    fetch('/api/officers', {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          const error = new Error(`${res.status}: ${res.statusText}`);
          error.response = res;
          throw error;
        }
        resolve(res.json());
      })
      .catch((err) => {
        reject({ message: err.message });
      });
  });
}

const getServedClients = () => {
  return new Promise((resolve, reject) => {
    fetch('/api/Customer', {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
        if (!res.ok) {
          const error = new Error(`${res.status}: ${res.statusText}`);
          error.response = res;
          throw error;
        }
        resolve(res.json());
      })
      .catch((err) => {
        reject({ message: err.message });
      });
  });
}

const getNextClient = () => {
  return new Promise((resolve, reject) => {
    fetch('/api/NextServeCustomer', {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
        if (!res.ok) {
          const error = new Error(`${res.status}: ${res.statusText}`);
          error.response = res;
          throw error;
        }
        resolve(res.json());console.log("getAPI" + res);
      })
      .catch((err) => {
        reject({ message: err.message });
      });
  });
}

const getQueue = () => {
  return new Promise((resolve, reject) => {
    fetch('/api/queue', {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
        if (!res.ok) {
          const error = new Error(`${res.status}: ${res.statusText}`);
          error.response = res;
          throw error;
        }
        resolve(res.json());
      })
      .catch((err) => {
        reject({ message: err.message });
      });
  });
}


export default { getAllServices, getActiveOfficers, getServedClients, getNextClient}
export {getQueue }
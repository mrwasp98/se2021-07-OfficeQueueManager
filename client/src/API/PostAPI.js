const addService = (tagName, serviceTime) => {
    return new Promise((resolve, reject) => {
      fetch( '/api/services', {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
            tagName : tagName, 
            serviceTime: serviceTime
        })
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

  const addCounter = (counterNum, services) => {
    return new Promise((resolve, reject) => {
      fetch('/api/counters', {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({counterNum: counterNum, services: services})
      }).then((res) => {
          if (!res.ok) {
            const error = new Error(`${res.status}: ${res.statusText}`);
            error.response = res;
            throw error;
          }
          resolve(res.json());
        }).catch((err) => {
            reject({ message: err.message });
        });
    });
  }

  const addTicket = (service) =>{
    return new Promise((resolve, reject) => {
      fetch('/api/addTicket', {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({service: service})
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
  export { addService, addCounter, addTicket}
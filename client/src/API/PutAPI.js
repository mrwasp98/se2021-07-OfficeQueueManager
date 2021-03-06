// PutAPI.js: API to put information on the DB
// Implements by Riccardo and Francesco
// Date update: 18/10/2021

// API to update the staus of the officer
async function updateOfficerStatus(officerId, stat) {
    const response = await fetch('/api/officer/' + officerId + '/status/' + stat, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    });
    if(response.ok) {
        return null;
    } else return { 'err': 'PUT error' };
};

async function updateTickets (officerId) {
    const response = await fetch('/api/updateTickets/officer/' + officerId , {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    });
    if(response.ok) {
        return null;
    } else return { 'err': 'PUT error' };
};


export default {updateOfficerStatus, updateTickets}
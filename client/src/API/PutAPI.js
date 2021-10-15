

async function updateOfficerStatus(officerId, stat) {
    const response = await fetch(url + '/api/officer/'+officerId+'/status/:' + stat, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    });
    if(response.ok) {
        return null;
    } else return { 'err': 'PUT error' };
}

export default {updateOfficerStatus}
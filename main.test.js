const fetch = require('node-fetch');

function setupQuery() {
    const query = `{
        guardians(orderBy: registeredTimestamp, orderDirection: asc) 
        {
            ethAddress
            orbsAddress
            name
            ip
            website
            isInCommittee
            isCertified
            weight
            registeredTimestamp
            registeredBlockNumber
        }
    }`;
    return query;
}

async function fetchData() {
    let query = setupQuery();
    const res = await fetch('http://127.0.0.1:8000/subgraphs/name/orbs-network/guardians', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query}),
    });
    const body = await res.json();
    return body;

}

async function main() {
    console.log(JSON.stringify(await fetchData(), null, 2));
}

main().then(()=> process.exit(0)).catch(e => console.log(`${e.stack}`));
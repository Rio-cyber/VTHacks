const promisifiedRequest = async function(options) {
    return await fetch(options.url, options);
};

const getRandomInt = (max) => Math.floor(Math.random() * max);

const powerMod = (a, b, mod) => {
    let res = 1;
    while(b) {
        if((b % 2)) res = res * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return res;
}

// const password = "iamwatchingyou";
// const username = 'addy23';


async function makeRequest(url, body) {
    const options = {
        'method': 'POST',
        'url': `http://localhost:3000/${url}`,
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)

    };
    const res = await promisifiedRequest(options);
    const contentType = res.headers.get('content-type');
    if (contentType.startsWith('application/json;'))  {
        return await res.json();
    } else {
        return await res.text();
    }
}

async function register(username) {
    return await makeRequest('saveUser', {username});
    // var options = {
    //     'method': 'POST',
    //     'url': 'http://localhost:3000/saveUser',
    //     'headers': {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         username,
    //     })

    // };
    // const res = await promisifiedRequest(options);
    // return JSON.parse(res.body);
}


//
function hashPassword(password, modulo) {
    const hashString = (MD5(password));
    return parseInt(hashString, 16) % modulo;
}
function convertPasswordToSets(password, n) {
    let passwordSets = [];
    for(let i = 0, len = 1; i < password.length; i += 1, len += 1) {
        let curPassword = '';
        for(let j = i; j < password.length; j += len) {
            curPassword += password[j];
        }
        passwordSets.push(curPassword);
    }
    passwordSets = passwordSets.map((p) =>
        (hashPassword(p, n))
    );
    // return [1, 2, 3, 4];
    return passwordSets;
}

async function fullRegisterFlow(username, password) {
    const { g, n } = (await register(username));
    // const {g, n} = {g: 51, n: 53};
    const x = convertPasswordToSets(password, n);
    const y = x.map((v) => powerMod(g, v, n));
    console.log(y);
    const res = await makeRequest('saveUserSecret', {username, y});
    console.log('Registration Successful');
}

async function  login(username, password) {
    // await fullRegisterFlow();
    const res = await makeRequest('loginRequest', {username});
    const {g, n} = res;
    console.log(res);
    const x = convertPasswordToSets(password, n);
    const C = [];
    const Z = [];
    for(let i = 0; i < x.length; i++) {
        const z = getRandomInt(100);
        Z.push(z);
        C.push(powerMod(g, z, n));
    }
    const { requestArray } = await makeRequest('loginRequest2', {username, C});
    const w = [];
    for(let i = 0; i < requestArray.length; i += 1) {
        if(requestArray[i] === '0') {
            w.push((x[i] + Z[i]) % (n - 1));
        }
        else {
            w.push(Z[i]);
        }
    }
    const verdict = await makeRequest('verifyLogin', {username, w});
    console.log(verdict);
}



//

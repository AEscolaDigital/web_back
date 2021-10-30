
const getPayloadJWT = (authorization) => {

    const [Bearer, token] = authorization.split(" ");

    let payload = token.split('.').slice(1, 2);
    let buff = Buffer.from(payload[0], 'base64');
    let dataString = buff.toString('utf-8');
    let data = JSON.parse(dataString);

    return data;
}

module.exports = getPayloadJWT;

const {dbConnect} = require('@amplify/connectors')

exports.handler = async (event) => {
    const user = await dbConnect.knexConnection('user').select('*').where('id',265);
    console.log(user);
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};

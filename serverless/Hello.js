module.exports.handler = async(event)=>{
    return({
        statusCode: 200,
        headers: {
            "content-type":"application/json",
        },
        body: JSON.stringify({"THIS IS HELLO FROM FIRST DEPLOY FUNCTION."}),
    });
};
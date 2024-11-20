const {s3Client , GetObjectCommand, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand} = require("@aws-sdk/client-s3")
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner")

const s3Client = s3Client({
    //HERE,WE CHECK IF THIS USER HAVE PERMISSIONS TO GENERATE SIGNED URL'S.
    region:"ap-south-1", //Found in bucket list.
    credentials: {
        acessKey: "",
        secretKey: "", //using which this client requests on behalf of user.
    }
});

async function getObjectUrl(key) {
    const command = new GetObjectCommand({
        Bucket: "bucketName",
        key: key,
    });
    const url = await getSignedUrl(s3Client, command , {expiresIn: 20}); //to generate and append signature and token
    return url;
} 

async function putObjectUrl(fileName, contentType){
    const command = new PutObjectCommand({
        Bucket: "bucketName",
        key: `/uploads/user/${fileName}`,
        contentType: contentType,
    });
    const url = await getSignedUrl(s3Client,command,{expiresIn:60});
    return url;
}

async function listObject() {
    const command = new ListObjectsV2Command({
        Bucket: "BucketName",
        key:`/`,
    })
    const files = await s3Client.send(command);
    console.log(files);
}

async function init(){
    console.log("URL FOR object.jpg: ", getObjectUrl("object.jpg")); //key can be any text. This line generates URL to getobject.
    console.log("URL FOR Putobject: ", await putObjectUrl(`image-${Date.now()}.jpeg`,"image/jpeg")); //This line generates URL to putobject.
    await listObject(); // returns Dict . metadata ,Contents,,,,etc.

    const command = new DeleteObjectCommand({
        Bucket:"BucketName",
        key: "object.jpeg", //filename.
    })

    await s3Client.send(command); 
}

init();
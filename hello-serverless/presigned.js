var AWS = require("aws-sdk");

AWS.config.update({ region: "ap-southeast-1" });

const s3 = new AWS.S3({
     apiVersion: "4"
});

const uploadUrl = (name, key, type) => {
  return new Promise((resr, rej) => {
    s3.getSignedUrl(
      "putObject",
      {
        Bucket: name,
        Key: key,
        ContentType: type, 
        Expires: 300
      },
      (err, data) => {
        if (!err) resr(data);
        else rej(err);
      }
    );
  });
};


module.exports.handler = async (event) => {
  console.log(event)
  const { key, type } = event.headers
  const bucketName = "faceapp-test1";

  let a = await uploadUrl(bucketName, key, type)
  console.log(a)
  return a;
};

'use strict';

module.exports = (function () {
    let aws = require('aws-sdk');
    let S3_BUCKET = process.env.S3_BUCKET_NAME;
    let url = require('url');
    let crypto = require('crypto');

    function getUrl(imageId) {
        return new Promise(function (resolve, reject) {
            let s3 = new aws.S3();
            let imageName = imageId;
            let s3_params = {
                Bucket: S3_BUCKET,
                Key: imageName,
                ContentType: 'image/png',
                ACL: 'public-read'
            };

            if (!imageId) {
                reject('Image is not defined');
            }

            s3.getSignedUrl('putObject', s3_params, function (err, data) {
                if (err) {
                    reject(err);
                }

                let queryData = url.parse(data, true).query;
                let policy = {
                    "expiration": queryData.Expires,
                    "conditions": [
                        ["starts-with", "$key", "/" + imageName],
                        {"bucket": S3_BUCKET},
                        {"acl": "public-read"},
                        ["starts-with", "$Content-Type", 'image/png']
                    ]
                };
                let base64Policy = Buffer(JSON.stringify(policy), "utf-8").toString("base64");
                let signature = crypto.createHmac("sha1", process.env.AWS_SECRET_ACCESS_KEY)
                    .update(new Buffer(base64Policy, "utf-8")).digest("base64");
                let return_data = {
                    signed_data: {
                        AWSAccessKeyId: queryData.AWSAccessKeyId,
                        Expires: queryData.Expires,
                        Signature: signature,
                        key: imageName,
                        policy: base64Policy
                    },
                    url: 'https://' + S3_BUCKET + '.s3.amazonaws.com/'
                };
                resolve(return_data);

            });
        });
    }

    return {
        getUrl: getUrl
    };
})();
'use strict';

module.exports = (function () {
    let aws = require('aws-sdk');
    let S3_BUCKET = process.env.S3_BUCKET_NAME;
    let url = require('url');

    function getUrl(imageId) {
        return new Promise(function (resolve, reject) {
            let s3 = new aws.S3();
            let imageName = imageId + '.png';
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

                let return_data = {
                    signed_data: {
                        AWSAccessKeyId: queryData.AWSAccessKeyId,
                        Expires: queryData.Expires,
                        Signature: queryData.Signature,
                        key: imageName
                    },
                    url: 'https://' + S3_BUCKET + '.s3.amazonaws.com/' + imageName
                };
                resolve(return_data);

            });
        });
    }

    return {
        getUrl: getUrl
    };
})();
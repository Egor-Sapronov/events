'use strict';

module.exports = (function () {
    let aws = require('aws-sdk');
    let S3_BUCKET = process.env.S3_BUCKET_NAME;

    function getUrl(imageId) {
        return new Promise(function (resolve, reject) {
            let s3 = new aws.S3();

            let s3_params = {
                Bucket: S3_BUCKET,
                Key: imageId,
                Type: 'text/html; charset=utf-8'
            };
            s3.getSignedUrl('putObject', s3_params, function (err, data) {
                if (err) {
                    reject(err);
                }

                console.log(data);

                let return_data = {
                    signed_request: data,
                    url: 'https://' + S3_BUCKET + '.s3.amazonaws.com/' + imageId
                };
                resolve(return_data);

            });
        });
    }

    return {
        getUrl: getUrl
    };
})();
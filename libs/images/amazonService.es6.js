'use strict';

module.exports = (function () {
    let aws = require('aws-sdk');
    let S3_BUCKET = process.env.S3_BUCKET_NAME;

    function upload(file, imageId) {
        let s3 = new aws.S3({
            params: {
                Bucket: S3_BUCKET,
                Key: imageId + '.png',
                ACL: 'public-read'
            }
        });

        return new Promise(function (resolve, reject) {
            s3.upload({Body: file})
                .send(function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
        });
    }

    return {
        upload: upload
    };
})();
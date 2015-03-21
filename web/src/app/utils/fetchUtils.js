'use strict';

module.exports = (function () {
    /**
     * resolve on successful, 200 level, status codes and reject on failure status
     *
     * @param response
     * @returns {Promise} promise
     */
    function status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    /**
     * parse json from response into object, async
     *
     * @param response
     * @returns {object}
     */
    function json(response) {
        return response.json();
    }

    return {
        status: status,
        json: json
    };
})();
import { extractRateLimitData } from './utils/responseExtractors';

export const ApiService = {

    _extractRateLimitData: extractRateLimitData,

    async _throttle(response) {
        const rateLimit = this._extractRateLimitData(response);
        if (rateLimit.requestsLeft <= 3) { // Buffer threshold
            const waitTime = rateLimit.windowMs / rateLimit.requestsQuota;
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
    },

    async getOrders(params) {
        params = Object.assign({
            page: 1,
            limit: 10,
        }, params); 

        const response = await axios({
            method: 'get',
            url: '/bc-api/v2/orders',
            params,
        });

        await this._throttle(response);
        
        return response;
    },

    async updateOrder(orderId, data) {
        const response = await axios({
            method: 'put',
            url: `/bc-api/v2/orders/${orderId}`,
            data,
        });

        await this._throttle(response);
        return response;
    },

    async deleteOrder(orderId) {
        const response = await axios({
            method: 'delete',
            url: `/bc-api/v2/orders/${orderId}`,
        });

        await this._throttle(response);
        return response;
    },

    async getResourceCollection(resource, params) {
        params = Object.assign({
            page: 1,
            limit: 10,
        }, params);

        const response = await axios({
            method: 'get',
            url: `/bc-api/${resource}`,
            params,
        });

        await this._throttle(response);

        return response;
    },

    async getResourceEntry(resource, params) {
        const response = await axios({
            method: 'get',
            url: `/bc-api/${resource}`,
            params,
        });

        await this._throttle(response);
        return response;
    },

    async updateResourceEntry(resource, data) {
        const response = await axios({
            method: 'put',
            url: `/bc-api/${resource}`,
            data,
        });

        await this._throttle(response);
        return response;
    },

    async deleteResourceEntry(resource) {
        const response = await axios({
            method: 'delete',
            url: `/bc-api/${resource}`,
        });

        await this._throttle(response);
        return response;
    },
};
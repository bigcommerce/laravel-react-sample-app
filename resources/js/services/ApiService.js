export const ApiService = {
    getOrders(params) {
        params = Object.assign({
            page: 1,
            limit: 10,
        }, params);

        return axios({
            method: 'get',
            url: '/bc-api/v2/orders',
            params,
        });
    },

    updateOrder(orderId, data) {
        return axios({
            method: 'put',
            url: `/bc-api/v2/orders/${orderId}`,
            data,
        });
    },

    deleteOrder(orderId) {
        return axios({
            method: 'delete',
            url: `/bc-api/v2/orders/${orderId}`,
        });
    },

    getResourceCollection(resource, params) {
        params = Object.assign({
            page: 1,
            limit: 10,
        }, params);

        return axios({
            method: 'get',
            url: `/bc-api/${resource}`,
            params,
        });
    },

    getResourceEntry(resource, params) {
        return axios({
            method: 'get',
            url: `/bc-api/${resource}`,
            params,
        });
    },

    updateResourceEntry(resource, data) {
        return axios({
            method: 'put',
            url: `/bc-api/${resource}`,
            data,
        });
    },

    deleteResourceEntry(resource, data) {
        return axios({
            method: 'delete',
            url: `/bc-api/${resource}`,
        });
    },
};
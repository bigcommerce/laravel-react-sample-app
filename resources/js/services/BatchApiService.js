import { extractPaginationData, extractRateLimitData } from './utils/responseExtractors';

export const BatchApiService = {
        _extractPaginationData: extractPaginationData,
        _extractRateLimitData: extractRateLimitData,
    

    // Helper throttle function
    async _throttle(response) {
        const rateLimit = this._extractRateLimitData(response);
        if (rateLimit.requestsLeft <= 3) { // Buffer threshold
            const waitTime = rateLimit.windowMs / rateLimit.requestsQuota;
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
    },

    async fetchAllPages(resource, params = {}) {
        params = Object.assign({
            page: 1,
            limit: 250,
        }, params);

        let allData = [];
        let hasNextPage = true;
        let lastResponse = null;

        while (hasNextPage) {

                const response = await axios({
                    method: 'get',
                    url: `/bc-api/${resource}`,
                    params,
                });
                
                await this._throttle(response);
                
                lastResponse = response;

                if (response?.data?.data) {
                    allData = allData.concat(response.data.data);
                }

                const pagination = response.data?.meta?.pagination;
                hasNextPage = pagination?.current_page < pagination?.total_pages;
                
                if (hasNextPage) {
                    params.page++;
                }
        }

        lastResponse.data = {
            data: allData,
            meta: lastResponse.data.meta
        };
        return lastResponse;
    },

    async exportInventory(params = {}) {
        return this.fetchAllPages('v3/inventory/locations/1/items', params);
    },

    async generateInventoryReport() {
        const response = await this.fetchAllPages('v3/inventory/locations/1/items');

        return {
            data: response.data.data,
            stats: this._calculateInventoryStats(response.data.data)
        };
    },

    _calculateInventoryStats(items) {
        return {
            totalItems: items.length,
            totalStock: items.reduce((sum, item) => sum + item.total_inventory_onhand, 0),
            lowStockItems: items.filter(item => item.available_to_sell <= item.settings.warning_level).length,
            outOfStockItems: items.filter(item => !item.settings.is_in_stock).length
        };
    }
}; 
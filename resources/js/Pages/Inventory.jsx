import Navigation from '@/Components/Navigation';
import Spinner from '@/Components/Spinner';
import Table from '@/Components/Table';
import { ApiService } from '@/Services';

import { Head } from '@inertiajs/react';
import React from 'react';

export default class Inventory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            inventory: {
                data: [],
                meta: {
                    pagination: {
                        total: 0,
                        count: 0,
                        per_page: 5,
                        current_page: 1,
                        total_pages: 0,
                        links: {
                            previous: null,
                            current: null,
                            next: null
                        }
                    }
                }
            },
            tableHeaders: [
                {
                    label: "Product ID",
                    index: "identity",
                    callback: function (identity) {
                        return identity.product_id;
                    },
                },
                {
                    label: "Variant ID",
                    index: "identity",
                    callback: function (identity) {
                        return identity.variant_id || 'N/A';
                    },
                },
                {
                    label: "SKU",
                    index: "identity",
                    callback: function (identity) {
                        return identity.sku;
                    },
                },
                {
                    label: "Stock Level",
                    index: "available_to_sell",
                    callback: function (available) {
                        let colorClass = 'text-gray-800';
                        if (available <= 5) {
                            colorClass = 'text-red-600 font-bold';
                        } else if (available <= 20) {
                            colorClass = 'text-yellow-600';
                        }
                        return <span className={colorClass}>{available}</span>;
                    },
                },
                {
                    label: "Total On Hand",
                    index: "total_inventory_onhand",
                    callback: function (total) {
                        return total || 0;
                    },
                },
                {
                    label: "Status",
                    index: "settings",
                    callback: function (settings) {
                        return settings.is_in_stock ? 
                            <span className="badge badge-success">In Stock</span> : 
                            <span className="badge badge-danger">Out of Stock</span>;
                    },
                }
            ],
        };
    }

    componentDidMount() {
        this.loadInventory();
    }

    loadInventory() {
        ApiService.getResourceCollection('v3/inventory/locations/1/items', {
            limit: 5,
            page: 1
        })
            .then(this.handleInventoryResponse.bind(this))
    }

    handleInventoryResponse(response) {
        this.setState({
            isLoading: false,
            inventory: response.data
        });
    }

    hasInventory() {
        return (this.state.inventory.data.length > 0);
    }

    handlePageChange = (newPage) => {
        this.setState({ isLoading: true });
        ApiService.getResourceCollection('v3/inventory/locations/1/items', {
            limit: 5,
            page: newPage
        }).then(this.handleInventoryResponse.bind(this))
    };

    render() {
        const { pagination } = this.state.inventory.meta;
        
        return (
            <>
                <Head title="Inventory List" />
                <Navigation />
                <div className="container mx-auto p-5">
                    <div className="content col-span-3 grid-col-3 rounded bg-gray-100 shadow-lg p-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Inventory Levels</h2>
                            
                            {/* Page Info */}
                            {!this.state.isLoading && (
                                <div className="text-sm text-gray-600">
                                    Showing page {pagination.current_page} of {pagination.total_pages} 
                                    ({pagination.count} items of {pagination.total} total)
                                </div>
                            )}
                        </div>

                        {this.state.isLoading ? (
                            <Spinner />
                        ) : this.hasInventory() ? (
                            <section>
                                <Table 
                                    tableHeaders={this.state.tableHeaders} 
                                    tableData={this.state.inventory.data} 
                                />
                                
                                {/* Pagination Controls */}
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex flex-1 justify-between sm:hidden">
                                        {/* Mobile Pagination */}
                                        <button
                                            onClick={() => this.handlePageChange(pagination.current_page - 1)}
                                            disabled={!pagination.links.previous}
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                                !pagination.links.previous 
                                                    ? 'bg-gray-100 text-gray-400'
                                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => this.handlePageChange(pagination.current_page + 1)}
                                            disabled={!pagination.links.next}
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                                !pagination.links.next
                                                    ? 'bg-gray-100 text-gray-400'
                                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                    
                                    {/* Desktop Pagination */}
                                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Showing <span className="font-medium">{(pagination.current_page - 1) * pagination.per_page + 1}</span> to{' '}
                                                <span className="font-medium">
                                                    {Math.min(pagination.current_page * pagination.per_page, pagination.total)}
                                                </span> of{' '}
                                                <span className="font-medium">{pagination.total}</span> items
                                            </p>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            {/* Page Numbers */}
                                            {[...Array(pagination.total_pages)].map((_, index) => {
                                                const pageNum = index + 1;
                                                const isCurrentPage = pageNum === pagination.current_page;
                                                
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => this.handlePageChange(pageNum)}
                                                        className={`px-3 py-1 rounded ${
                                                            isCurrentPage
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ) : (
                            <section>
                                <div className="emptyTable">No inventory items found!</div>
                            </section>
                        )}
                    </div>
                </div>
            </>
        );
    }
} 
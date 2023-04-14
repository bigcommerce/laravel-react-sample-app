import Navigation from '@/Components/Navigation';
import Spinner from '@/Components/Spinner';
import Table from '@/Components/Table';
import { ApiService } from '@/Services';

import { Head } from '@inertiajs/react';
import React from 'react';

export default class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOrdersLoading: true,
            orders: {
                data: [],
                pagination: {},
            },
            tableHeaders:
                [
                    {
                        label: "Order ID",
                        index: "id",
                        callback: function (orderId) {
                            return orderId;
                        },
                    },
                    {
                        label: "Billing Name",
                        index: "billing_address",
                        callback: function (billingAddress) {
                            return `${billingAddress.first_name} ${billingAddress.last_name}`;
                        },
                    },
                    {
                        label: "Order Total",
                        index: "total_inc_tax",
                        callback: function (orderTotal) {
                            return orderTotal;
                        },
                    },
                    {
                        label: "Order Status",
                        callback: function (data) {
                            let badgeClass = 'badge badge-';
                            if (data.status_id === 5) {
                                badgeClass += 'danger';
                            } else if (data.status_id === 2 || data.status_id === 10) {
                                badgeClass += 'success';
                            } else {
                                badgeClass += 'light';
                            }

                            return (
                                <span className={badgeClass}>{data.status}</span>
                            );
                        },
                    },
                    {
                        label: "Actions",
                        callback: function (data) {
                            if (data.status_id !== 5) {
                                return (
                                    <button type="button" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => this.cancelOrder(data.id, e)}>Cancel</button>
                                );
                            }
                        }.bind(this),
                    },
                ],
        };
    }

    componentWillMount() {
        this.loadOrders();
    }

    loadOrders() {
        ApiService.getOrders({
            limit: 5
        }).then(this.handleOrdersResponse.bind(this));
    }

    handleOrdersResponse(response) {
        this.setState({
            isOrdersLoading: false,
            orders: {
                data: response.data
            }
        });
    }

    cancelOrder(orderId) {
        const newOrderData = { status_id: 5 };

        this.setState({
            isOrdersLoading: true,
        });

        ApiService.updateOrder(orderId, newOrderData)
            .then(this.loadOrders.bind(this));
    }

    hasOrders() {
        return (this.state.orders.data.length > 0);
    }

    render() {
        return (
           <>
                <Head title="Order List" />
                <Navigation />
                <div className="container mx-auto p-5">
                    <div className="content col-span-3 grid-col-3 rounded bg-gray-100 shadow-lg p-4">
                        <h2 className="text-xl font-bold mb-6">List of Orders</h2>
                            {
                                this.state.isOrdersLoading
                                    ?
                                    <Spinner />
                                    :
                                    this.hasOrders()
                                        ?
                                        <section>
                                            <Table tableHeaders={this.state.tableHeaders} tableData={this.state.orders.data} />
                                        </section>
                                        :
                                        <section>
                                            <div className="emptyTable">No orders exist yet!</div>
                                        </section>
                            }
                    </div>
                </div>
            </>
        );
    }
}

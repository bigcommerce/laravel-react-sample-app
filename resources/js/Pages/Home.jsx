import Navigation from '@/Components/Navigation';
import Spinner from '@/Components/Spinner';
import { ApiService } from '@/Services';

import { Head } from '@inertiajs/react';
import React from 'react';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isCatalogSummaryLoading: true,
            isStoreInfoLoading: true,
            catalogSummary: {},
            storeInfo: {},
        };
    }

    componentDidMount() {
        ApiService.getResourceEntry('v2/store').then(this.handleStoreInfoResponse.bind(this));
        ApiService.getResourceEntry('v3/catalog/summary').then(this.handleCatalogSummaryResponse.bind(this));
    }

    handleStoreInfoResponse(response) {
        this.setState({
            isStoreInfoLoading: false,
            storeInfo: response.data,
        });
    }

    handleCatalogSummaryResponse(response) {
        this.setState({
            isCatalogSummaryLoading: false,
            catalogSummary: response.data.data,
        });
    }

    render() {
        const fieldsInSummary = [
            {
                label: "Variant Count",
                index: "variant_count",
                format: "number",
            },
            {
                label: "Inventory Count",
                index: "variant_count",
                format: "number",
            },
            {
                label: "Inventory Value",
                index: "inventory_value",
                format: "currency",
            },
        ];
        return (
            <>
                <Head title="Home" />
                <Navigation />
                <div className="container mx-auto p-5">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="content col-span-3 grid-col-3 rounded bg-gray-100 shadow-lg p-4">
                            <h2 className="text-xl font-bold mb-6">This is the Home Page.</h2>
                            <div className="grid grid-cols-3 gap-4">
                                {fieldsInSummary.map(function (summaryItem, index) {
                                    return <div className="max-w-sm rounded overflow-hidden shadow-lg px-6 py-4 bg-white" key={index}>
                                        <h3 className="font-bold text-xl mb-2">
                                            {summaryItem.label}
                                        </h3>
                                        {
                                            this.state.isStoreInfoLoading
                                                ?
                                                <Spinner />
                                                :
                                                <span className="text-gray-700 text-base">
                                                    {
                                                        summaryItem.format === 'currency'
                                                            ?
                                                            new Intl.NumberFormat(undefined, { style: 'currency', currency: this.state.storeInfo.currency }).format(this.state.catalogSummary[summaryItem.index])
                                                            :
                                                            this.state.catalogSummary[summaryItem.index]
                                                
                                                    }
                                                </span>
                                        }
                                    </div>;
                                }.bind(this))}
                            </div>
                        </div>
                        <div className="sidebar rounded bg-gray-100 shadow-lg p-4">
                            <h2 className="text-xl font-bold mb-6">This is a Side Bar.</h2>
                            {
                                this.state.isStoreInfoLoading
                                    ?
                                    <Spinner />
                                    :
                                    <section>
                                        {
                                            this.state.storeInfo.logo.url
                                                ?
                                                <img src={this.state.storeInfo.logo.url} className="img-fluid img-thumbnail rounded" />
                                                :
                                                <h5>{this.state.storeInfo.name}</h5>
                                        }

                                        <ul>
                                            <li className="flex flex-row justify-between mb-1">
                                                <h3 className="font-bold">Domain:</h3>
                                                <p className="">{this.state.storeInfo.domain}</p>
                                            </li>
                                            <li className="flex flex-row justify-between mb-1">
                                                <h3 className="font-bold">Secure URL:</h3>
                                                <p className="">{this.state.storeInfo.secure_url}</p>
                                            </li>
                                        </ul>

                                    </section>
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

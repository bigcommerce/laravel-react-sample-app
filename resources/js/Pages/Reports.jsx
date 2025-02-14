import Navigation from '@/Components/Navigation';
import Spinner from '@/Components/Spinner';
import { BatchApiService } from '@/Services';
import { Head } from '@inertiajs/react';
import React from 'react';

export default class Reports extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExporting: false,
            lastExportTime: null,
        };
    }

    exportInventoryCSV = async () => {
        this.setState({ isExporting: true });

        const response = await BatchApiService.exportInventory();
        const csvData = this.convertToCSV(response.data.data);
        this.downloadCSV(csvData, `inventory-export-${new Date().toISOString()}.csv`);
        this.setState({ 
            lastExportTime: new Date().toLocaleString(),
            isExporting: false 
        });
    };

    convertToCSV(items) {
        // Define CSV headers
        const headers = [
            'Product ID',
            'Variant ID',
            'SKU',
            'Available to Sell',
            'Total On Hand',
            'Warning Level',
            'Safety Stock',
            'Is In Stock',
            'Bin Picking Number'
        ];

        // Convert items to CSV rows
        const rows = items.map(item => [
            item.identity.product_id,
            item.identity.variant_id,
            item.identity.sku,
            item.available_to_sell,
            item.total_inventory_onhand,
            item.settings.warning_level,
            item.settings.safety_stock,
            item.settings.is_in_stock ? 'Yes' : 'No',
            item.settings.bin_picking_number
        ]);

        // Combine headers and rows
        return [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');
    }

    downloadCSV(csvData, filename) {
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    render() {
        return (
            <>
                <Head title="Inventory Export" />
                <Navigation />
                <div className="container mx-auto p-5">
                    <div className="content col-span-3 grid-col-3 rounded bg-gray-100 shadow-lg p-4">
                        <h2 className="text-xl font-bold mb-6">Inventory Export Tool</h2>
                        
                        <div className="mb-6">
                            <p className="text-gray-600 mb-4">
                                Export a complete CSV file containing all inventory items across all pages. 
                                This operation may take a few moments to complete.
                            </p>

                            <button
                                onClick={this.exportInventoryCSV}
                                disabled={this.state.isExporting}
                                className={`${
                                    this.state.isExporting 
                                        ? 'bg-blue-400 cursor-not-allowed' 
                                        : 'bg-blue-600 hover:bg-blue-700'
                                } text-white font-bold py-2 px-4 rounded inline-flex items-center`}
                            >
                                {this.state.isExporting ? (
                                    <>
                                        <Spinner className="w-4 h-4 mr-2" />
                                        Exporting...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
                                        </svg>
                                        Export Inventory CSV
                                    </>
                                )}
                            </button>
                        </div>

                        {this.state.lastExportTime && (
                            <div className="text-sm text-green-600">
                                ✓ Last export completed: {this.state.lastExportTime}
                            </div>
                        )}

                    </div>
                </div>
            </>
        );
    }
} 
import React from 'react';
import {Spinner} from '../components';
import {ApiService} from '../services/ApiService';

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

  componentWillMount() {
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
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Home Page</div>

              <div className="card-body">
                {
                  (this.state.isStoreInfoLoading || this.state.isCatalogSummaryLoading)
                  ?
                  <Spinner/>
                  :
                  <div className="row">
                    {fieldsInSummary.map(function(summaryItem, index) {
                      return  <div className="col-12 col-lg-6 col-xl" key={index}>
                                <div className="card">
                                  <div className="card-body">
                                    <div className="row align-items-center">
                                      <div className="col">
                                        <h6 className="card-title text-uppercase text-muted mb-2">
                                          { summaryItem.label }
                                        </h6>
                                        <span className="h2 mb-0">
                                          { 
                                            summaryItem.format === 'currency'
                                            ?
                                            new Intl.NumberFormat(undefined, { style: 'currency', currency: this.state.storeInfo.currency }).format(this.state.catalogSummary[summaryItem.index])
                                            :
                                            this.state.catalogSummary[summaryItem.index]
                                          }
                                        </span>
                                      </div>
                                    </div> 
                                  </div>
                                </div>
                              </div>
                      }.bind(this))}
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
                <div className="card-header">Side Bar</div>

                <div className="card-body">
                  {
                    this.state.isStoreInfoLoading
                    ? 
                    <Spinner/>
                    : 
                    <section>
                      { 
                        this.state.storeInfo.logo.url
                        ? 
                        <img src={ this.state.storeInfo.logo.url } className="img-fluid img-thumbnail" />
                        : 
                        <h5>{ this.state.storeInfo.name }</h5>
                      }

                      <ul className="list-group">
                        <li className="list-group-item">
                          <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Domain</h5>
                          </div>
                          <p className="mb-1">{ this.state.storeInfo.domain }</p>
                        </li>
                        <li className="list-group-item">
                          <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Secure URL</h5>
                          </div>
                          <p className="mb-1">{ this.state.storeInfo.secure_url }</p>
                        </li>
                      </ul>

                    </section>
                }
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

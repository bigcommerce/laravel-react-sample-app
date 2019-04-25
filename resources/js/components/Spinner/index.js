import React from 'react';

export class Spinner extends React.Component {
  render() {
    return (
      <div className="text-center">
        <div className="spinner-border m-5" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

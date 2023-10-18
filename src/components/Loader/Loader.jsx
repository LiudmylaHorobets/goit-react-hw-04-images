import { Component } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

export class MyLoader extends Component {
  render() {
    return (
      <div className="MyLoader">
        <MagnifyingGlass
          visible={true}
          height="160"
          width="160"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#e0e0e0"
          color="#3f51b5"
        />
      </div>
    );
  }
}

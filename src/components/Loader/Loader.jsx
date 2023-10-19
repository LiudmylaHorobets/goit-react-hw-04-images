import { useState, useEffect } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

export function MyLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="MyLoader">
      {visible && (
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
      )}
    </div>
  );
}

import React, {Children, useRef} from 'react';
import useOnClickOutside from './clickOutside-hook';

function Window({children, active, handleClose}) {
  const windowRef = useRef();
  useOnClickOutside(windowRef, () => handleClose());

  if (active) {
    return (
      <div className="screen">
        <div className="window" ref={windowRef}>
          {Children.map(children, child => {
            return (
              <div>
              {child}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
    else {
      return (
        <></>
      );
    }
}

export default Window;

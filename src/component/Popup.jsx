import React, { useState, useEffect } from "react";
import { createPopper } from "@popperjs/core"; // Update import statement

const Popup = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  let popperInstance; // Declare a variable to store the popper instance

  const openPopover = (event, placement, popoverID) => {
    let element = event.target;
    while (element.nodeName !== "BUTTON") {
      element = element.parentNode;
    }
    popperInstance = createPopper(element, document.getElementById(popoverID), { // Use createPopper directly
      placement: placement,
    });
    setIsPopoverOpen(!isPopoverOpen);
  };

  // Function to update the popover position
  const updatePopoverPosition = () => {
    if (popperInstance) {
      popperInstance.update();
    }
  };

  // Cleanup function
  useEffect(() => {
    return () => {
      if (popperInstance) {
        popperInstance.destroy();
      }
    };
  }, [popperInstance]);

  return (
    <div className="flex flex-wrap">
      <div className="w-full text-center">
        <button
          className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={(event) => openPopover(event, "left", "popover-id-left-purple")}
        >
          left purple
        </button>
        <div
          className={`${
            isPopoverOpen ? "block" : "hidden"
          } bg-purple-600 border-0 mr-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg`}
          id="popover-id-left-purple"
        >
          <div>
            <div className="bg-purple-600 text-white opacity-75 font-semibold p-3 mb-0 border-b border-solid border-blueGray-100 uppercase rounded-t-lg">
              purple popover title
            </div>
            <div className="text-white p-3">
              And here's some amazing content. It's very engaging. Right?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;

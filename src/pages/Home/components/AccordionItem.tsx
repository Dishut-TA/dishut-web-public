import React, { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import clsx from "clsx";

interface Props {
  title: string;
  content: string;
}

const AccordionItem: React.FC<Props> = ({ title, content }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (open) {
      setHeight(`${contentRef.current?.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [open]);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all">
      
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 md:px-6 py-4 text-left cursor-pointer"
      >
        <h3 className="text-sm md:text-base font-semibold text-primary">
          {title}
        </h3>

        {/* Arrow */}
        <MdKeyboardArrowDown
          className={clsx(
            "text-xl transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Content */}
      <div
        style={{ height }}
        className="transition-all duration-300 ease-in-out overflow-hidden"
      >
        <div
          ref={contentRef}
          className="px-4 md:px-6 pb-4 text-sm text-primary"
        >
          {content}
        </div>
      </div>

    </div>
  );
};

export default AccordionItem;
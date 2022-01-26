import { useState } from "react";
import readingTime from "reading-time";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { IconContext } from "react-icons";

export default function ExpandableCard(props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-50 border-gray-300 dark:border-slate-500 border-[2px] rounded-xl p-3 text-left drop-shadow-sm dark:bg-slate-800">
      <button className="w-full" onClick={() => setExpanded(!expanded)}>
        <div className="flex justify-between px-2 items-center">
          <p className="font-medium text-base md:text-xl text-gray-600 dark:text-slate-300">
            {props.title}
          </p>
          <IconContext.Provider
            value={{
              className:
                "text-xl md:text-3xl font-heavy text-gray-600 dark:text-slate-300",
            }}
          >
            {expanded ? <MdExpandLess /> : <MdExpandMore />}
          </IconContext.Provider>
        </div>
      </button>
      {expanded && (
        <div className="pt-2 px-2 text-gray-500 dark:text-slate-400">
          {props.children}
        </div>
      )}
    </div>
  );
}

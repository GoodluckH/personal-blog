import { useState } from 'react'
import readingTime from 'reading-time'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'
import { IconContext } from 'react-icons'

export default function ExpandableCard(props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-cyan-500 rounded-xl border-black border-2 p-3 text-left">
      <button className="w-full" onClick={() => setExpanded(!expanded)}>
        <div className="flex justify-between px-2 items-center">
          <p className="text-base md:text-xl text-black font-bold">
            {props.title}
          </p>
          <IconContext.Provider
            value={{
              className: 'text-xl md:text-3xl font-bold text-black',
            }}
          >
            {expanded ? <MdExpandLess /> : <MdExpandMore />}
          </IconContext.Provider>
        </div>
      </button>
      {expanded && <div className="pt-2 px-2 text-black">{props.children}</div>}
    </div>
  )
}


// import {MdOutlinePushPin} from "react-icons/md";
// import { MdCreate, MdDelete } from 'react-icons/md';
// import moment from "moment";

// const NoteCard = ({title, date, content,tags, isPinned, onEdit, onDelete, onPinNote}) => {
//   return (
//     <div className="ml-18 mr-12 mt-12 rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out  border border-blue-300">
//    <div className="flex items-center justify-between  ">
//     <div>
//     <h6 className="text-xl font-sm">{title}</h6>
//     <span className="text-xs text-slate-800">{moment(date).format('Do MMM YYYY')}</span>

//    </div>
//    <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-blue-300' : 'text-slate-300'}`} onClick={onPinNote} />
//    </div>
//    <p className="text-slate-600 mt-1">{content?.slice(0,60)}</p>

//    <div className="flex items-center gap-2">
//     <div className="text-xs text-slate-500">{tags.map((item) => `#${item}`)}</div>
//     <div className="flex items-center gap-2">
//         <MdCreate className="icon-btn hover:text-green-600"
//         onClick={onEdit} />

//         <MdDelete className="icon-btn hover:text-red-500"
//         onClick={onDelete} />


//     </div>
//    </div>

   
// </div>
//   )
// }

// export default NoteCard









import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
  return (
    <div className="w-full sm:w-[90%] md:w-[80%] lg:w-full mx-auto mt-6  rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out border border-blue-300">
      
      {/* Header with title and pin */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h6 className="text-lg font-semibold break-words">{title}</h6>
          <span className="text-xs text-slate-600">{moment(date).format('Do MMM YYYY')}</span>
        </div>
        <MdOutlinePushPin 
          className={`icon-btn text-xl cursor-pointer ${isPinned ? 'text-blue-400' : 'text-slate-300'}`} 
          onClick={onPinNote} 
        />
      </div>

      {/* Note content */}
      <p className="text-slate-700 text-sm mt-1 break-words">
        {content?.length > 60 ? content.slice(0, 60) + '...' : content}
      </p>

      {/* Tags and actions */}
      <div className="flex flex-wrap justify-between items-center mt-3">
        <div className="text-xs text-blue-500 flex flex-wrap gap-1">
          {tags.map((item, index) => (
            <span key={index}>#{item}</span>
          ))}
        </div>
        
        <div className="flex items-center gap-3 mt-2 sm:mt-0">
          <MdCreate 
            className="icon-btn text-xl cursor-pointer hover:text-green-600" 
            onClick={onEdit} 
          />
          <MdDelete 
            className="icon-btn text-xl cursor-pointer hover:text-red-500" 
            onClick={onDelete} 
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

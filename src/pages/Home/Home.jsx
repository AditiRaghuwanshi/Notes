
import Navbar from '../../components/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import { useEffect, useState } from 'react';
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { ToastBar } from 'react-hot-toast';
import Toast from '../../components/ToastMessage/Toast';
import EmptyCard from '../../components/EmptyCard/EmptyCard';
import AddNotesImg from "../../assets/pencil.jpg";
import empty from "../../assets/empty.jpg";


const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });


  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);


  const navigate = useNavigate();

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };




  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/user/userdetails");
      console.log("API RESPONSE:", response);
      if (response.data && response.data.user) {
        console.log("Setting userInfo:", response.data.user);
        setUserInfo(response.data.user);
      } else {
        console.warn("User data not found in response");
      }
    } catch (error) {
      console.error("Error fetching userInfo:", error);
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/api/user/allnotes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("unexpected error occured please try again");
    }

  }

  const deleteNote = async (data) => {
    const noteId = data._id;
    const response = await axiosInstance.delete("/api/user/deletenote/" + noteId);
    try {
      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("an unexpected error occurred please try again....")
      }
    }
  };


  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  const onSearchNote = async(query) => {
    try{
      const response = await axiosInstance.get("/api/user/search", {
        params: {query},
      });
      if(response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch(error) {
      console.log(error);
    }
  }






const updateIsPinned = async (noteData) => {
  const noteId = noteData._id;
  try {
    const response = await axiosInstance.put(`/api/user/pinnednote/${noteId}`, {
      isPinned: !noteData.isPinned,  // <--- correct object here
    });

    if (response.data && response.data.note) {
      showToastMessage("Note Updated Successfully", "update");
      getAllNotes();
    }
  } catch (error) {
    console.log(error);
  }
};


  useEffect(() => {
    getUserInfo();
    getAllNotes();

    return () => { };
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} 
      onSearchNote={onSearchNote}
      handleClearSearch={handleClearSearch} />

      <div className="container mx-auto">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-3">

            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => {updateIsPinned(item)}}
              />
            ))}


          </div>
        ) : (
          <EmptyCard

            imgSrc={isSearch ? empty : AddNotesImg}
            message={
              isSearch ? 
              <>
               Oops!! No notes Found matching your search. try again
              </>
              : 
              <>
                Start creating your first note! Click the "Add" button to write down your thoughts, ideas, and reminders.
                <br />
                Let's get started
              </>
            }
          />

        )}
      </div>


      <button className="w-14 h-14 flex items-center justify-center rounded-2xl
      bg-blue-500 hover:bg-blue-300 absolute right-12 bottom-10 cursor-pointer"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >

        <MdAdd className="text-[32px] text-white" />

      </button>
      {/* <Modal
        isOpen={openAddEditModal.isShown}


        //  onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },


        }}
        contentLabel=""
        className=" w-[85%] md:w-[35%] max-h-3/4 bg-white  rounded-md mx-auto mt-24 p-5 overflow-auto"
      > */}


      <Modal
  isOpen={openAddEditModal.isShown}
  style={{
    overlay: {
      backgroundColor: "rgba(0,0,0,0.2)",
    },
  }}
  contentLabel=""
  className="w-[85%] md:w-[35%] max-h-[80vh] bg-white rounded-md mx-auto mt-24 p-5 overflow-y-auto"
>

        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          OnClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />

      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        OnClose={handleCloseToast}
      />


    </>
  );
};

export default Home;












// import Navbar from '../../components/Navbar'
// import NoteCard from '../../components/Cards/NoteCard'
// import { MdAdd } from 'react-icons/md';
// import AddEditNotes from './AddEditNotes';
// import { useEffect, useState } from 'react';
// import Modal from "react-modal";
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosinstance';
// import { ToastBar } from 'react-hot-toast';
// import Toast from '../../components/ToastMessage/Toast';
// import EmptyCard from '../../components/EmptyCard/EmptyCard';
// import AddNotesImg from "../../assets/pencil.jpg";
// import empty from "../../assets/empty.jpg";


// const Home = () => {
//   const [openAddEditModal, setOpenAddEditModal] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   const [showToastMsg, setShowToastMsg] = useState({
//     isShown: false,
//     message: "",
//     type: "add",
//   });


//   const [userInfo, setUserInfo] = useState(null);
//   const [allNotes, setAllNotes] = useState([]);
//   const [isSearch, setIsSearch] = useState(false);


//   const navigate = useNavigate();

//   const showToastMessage = (message, type) => {
//     setShowToastMsg({
//       isShown: true,
//       message,
//       type,
//     });
//   };

//   const handleCloseToast = () => {
//     setShowToastMsg({
//       isShown: false,
//       message: "",
//     });
//   };

//   const handleEdit = (noteDetails) => {
//     setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
//   };




//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/api/user/userdetails");
//       console.log("API RESPONSE:", response);
//       if (response.data && response.data.user) {
//         console.log("Setting userInfo:", response.data.user);
//         setUserInfo(response.data.user);
//       } else {
//         console.warn("User data not found in response");
//       }
//     } catch (error) {
//       console.error("Error fetching userInfo:", error);
//       if (error.response?.status === 401) {
//         localStorage.clear();
//         navigate("/");
//       }
//     }
//   };

//   const getAllNotes = async () => {
//     try {
//       const response = await axiosInstance.get("/api/user/allnotes");
//       if (response.data && response.data.notes) {
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log("unexpected error occured please try again");
//     }

//   }

//   const deleteNote = async (data) => {
//     const noteId = data._id;
//     const response = await axiosInstance.delete("/api/user/deletenote/" + noteId);
//     try {
//       if (response.data && !response.data.error) {
//         showToastMessage("Note Deleted Successfully", "delete");
//         getAllNotes();
//       }
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         console.log("an unexpected error occurred please try again....")
//       }
//     }
//   };


//   const handleClearSearch = () => {
//     setIsSearch(false);
//     getAllNotes();
//   }

//   const onSearchNote = async (query) => {
//     try {
//       const response = await axiosInstance.get("/api/user/search", {
//         params: { query },
//       });
//       if (response.data && response.data.notes) {
//         setIsSearch(true);
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }






//   const updateIsPinned = async (noteData) => {
//     const noteId = noteData._id;
//     try {
//       const response = await axiosInstance.put("/api/user/pinnednote/${noteId}`, {
//         isPinned: !noteData.isPinned,  // <--- correct object here
//       });

//       if (response.data && response.data.note) {
//         showToastMessage("Note Updated Successfully", "update");
//         getAllNotes();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   useEffect(() => {
//     getUserInfo();
//     getAllNotes();

//     return () => { };
//   }, []);

//   return (
//     <>
//       <Navbar userInfo={userInfo}
//         onSearchNote={onSearchNote}
//         handleClearSearch={handleClearSearch} />

//       <div className="container mx-auto">
//         {allNotes.length > 0 ? (
//           <div className="grid grid-cols-1 
//           sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3 px-4 p-0">

//             {allNotes.map((item, index) => (
//               <NoteCard
//                 key={item._id}
//                 title={item.title}
//                 date={item.createdOn}
//                 content={item.content}
//                 tags={item.tags}
//                 isPinned={item.isPinned}
//                 onEdit={() => handleEdit(item)}
//                 onDelete={() => deleteNote(item)}
//                 onPinNote={() => { updateIsPinned(item) }}
//               />
//             ))}


//           </div>
//         ) : (
//           <EmptyCard

//             imgSrc={isSearch ? empty : AddNotesImg}
//             message={
//               isSearch ?
//                 <>
//                   Oops!! No notes Found matching your search. try again
//                 </>
//                 :
//                 <>
//                   Start creating your first note! Click the "Add" button to write down your thoughts, ideas, and reminders.
//                   <br />
//                   Let's get started
//                 </>
//             }
//           />

//         )}
//       </div>


//       <button className="w-14 h-14 fixed bottom-0 right-0 flex items-center justify-center rounded-2xl
//       bg-blue-500 hover:bg-blue-300 absolute right-12 bottom-10 cursor-pointer"
//         onClick={() => {
//           setOpenAddEditModal({ isShown: true, type: "add", data: null });
//         }}
//       >

//         <MdAdd className="text-[32px] text-white" />

//       </button>
//       <Modal
//         isOpen={openAddEditModal.isShown}


//         //  onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
//         // style={{
//         //   overlay: {
//         //     backgroundColor: "rgba(0,0,0,0.2)",
//         //   },


//         // }}


//         style={{
//           overlay: {
//             backgroundColor: "rgba(0,0,0,0.2)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           },
//         }}

//         contentLabel=""
//         className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-h-[80vh] bg-white rounded-md mx-auto mt-20 p-4 overflow-y-auto"

//       >
//         <AddEditNotes
//           type={openAddEditModal.type}
//           noteData={openAddEditModal.data}
//           OnClose={() => {
//             setOpenAddEditModal({ isShown: false, type: "add", data: null });
//           }}
//           getAllNotes={getAllNotes}
//           showToastMessage={showToastMessage}
//         />

//       </Modal>

//       <Toast
//         isShown={showToastMsg.isShown}
//         message={showToastMsg.message}
//         type={showToastMsg.type}
//         OnClose={handleCloseToast}
//       />


//     </>
//   );


// export default Home;

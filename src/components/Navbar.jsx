import ProfileInfo from "./Cards/ProfileInfo"
import {useNavigate} from "react-router-dom";
import SearchBar from ".		/api/user/searchbar		/api/user/searchBar";
import { useState } from "react";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {

  console.log(userInfo, "userInfo");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()
  const onLogout = () => {
    localStorage.clear()
    navigate("/");
  }

  const handleSearch = () => {
     if(searchQuery) {
      onSearchNote(searchQuery)
     }
  }

  const onClearSearch = () => {
   setSearchQuery("");
   handleClearSearch();
  }
  return (
    // <div className="bg-white flex items-center justify-between px-3 py-2 drop-shadow">
    <div className="bg-white sticky top-0 z-50 flex flex-row sm:flex-row items-center sm:justify-between gap-3 px-4 py-3 drop-shadow-sm">

        <h2 className="text-xl font-medium text-black py-2">Notes</h2>

        <SearchBar
        value={searchQuery}
        onChange={({target}) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}

         />
      <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </div>
  )
}

export default Navbar

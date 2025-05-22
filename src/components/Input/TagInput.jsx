import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'


const TagInput = ({ tags, setTags }) => {

    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()])
            setInputValue("");
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewTag();
        }
    }

    const handleRemoveTag = (tagRemove) => {
        setTags(tags.filter((tag) => tag !== tagRemove));
    }
    return (
        <div>
            {tags?.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mt-2">
                    {/* {tags.map((tag,index) => {
            <span key={index} className="">
                # {tag}
                <button onClick={() => {handleRemoveTag(tag);

                }}>
                    <MdClose />
                </button>
            </span>
          })} */}


                    {tags.map((tag, index) => (
                        <span key={index} className="flex items-center gap-1 bg-slate-200 px-2 py-1 rounded">
                            #{tag}
                            <button onClick={() => handleRemoveTag(tag)}>
                                <MdClose className="text-slate-600 hover:text-black-500" />
                            </button>
                        </span>
                    ))}


                </div>
            )}

            <div className="flex items-center gap-4 mt-2 mb-4">
                <input type="text"
                    value={inputValue}
                    className="text-sm bg-transparent border px-3 py-2 rounded outline-none border border-slate-300 "
                    placeholder="Add Tags"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />

                <button className="w-8 h-8 flex items-center justify-center border border-blue-700 
        rounded-md hover:bg-blue-400 cursor-pointer"
                    onClick={() => {
                        addNewTag();
                    }} >
                    <MdAdd className="text-2xl text-blue-700 hover:text-white" />
                </button>



            </div>
        </div>
    )
}

export default TagInput

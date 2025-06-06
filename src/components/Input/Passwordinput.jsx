import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Passwordinput = ({ value, onChange, placeholder }) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const togglePassword = () => {
        setIsShowPassword(!isShowPassword);
    }
    return (
        <div className="flex items-center bg-transparent border-[1.5px]
    px-5 rounded mb-3">
            <input
                value={value}
                onChange={onChange}
                type={isShowPassword ? "text" : "Password"}
                placeholder={placeholder || "Password"}
                className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"

            />
            {isShowPassword ? (
             <FaRegEye
             size={22}
            className="text-blue-400 cursor-pointer"
            onClick={() => togglePassword()}
    />
    ) : (
        <FaRegEyeSlash 
        size={22}
        className="text-slate-400 cursor-pointer"
        onClick={() => togglePassword()}
        />
    )
    }

        </div>
    )
}

export default Passwordinput

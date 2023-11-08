import React, { useState } from 'react'
import { CiUser } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom';

function User() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };



    const signupPage = () => {
        navigate('/signup');
        setIsDropdownOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };
    const profilePage = () => {
        navigate('');
        setIsDropdownOpen(false);
    };


    return (
        <div className="relative">
            <CiUser
                onClick={toggleDropdown}
                className="w-9 h-9 cursor-pointer hover:text-thirdColor"
            />

            {isDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 origin-top-right rounded-lg bg-white shadow-lg w-32 font-nunito font-semibold text-lg">
                    <button
                        onClick={() => {
                            if (localStorage.getItem("token")) {
                            profilePage(); // Panggil fungsi profilePage() jika pengguna sudah masuk
                            } else {
                            signupPage(); // Panggil fungsi signupPage() jika pengguna belum masuk
                            }
                        }}
                        className="block text-black px-4 py-2"
                        >
                        {localStorage.getItem("token") ? "Profile" : "Signup"}
                    </button>
                    <hr />
                    <button
                        onClick={handleLogout}
                        className="block text-black px-4 py-2"
                    >
                        {localStorage.getItem("token") ? "Logout" : "Login"}
                    </button>
                    <hr />
                    
                    
                </div>
            )}
        </div>
    )
}

export default User;
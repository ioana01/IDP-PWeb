import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import { useAuth } from "../../contexts/contexts";
import { auth } from "../../firebase";
import './navbar.css';

export default function BootstrapNavbar() {
    const { logout } = useAuth();
    const [error, setError] = useState("")
    let email = undefined;

    if(auth.currentUser != null) {
        email = auth.currentUser.email
    }

    async function handleLogout() {
        setError("")

        try {
            await logout();
        } catch {
            setError("Failed to log out");
        }
    }

    function toggleNavbar(collapseID){
        document.getElementById(collapseID).classList.toggle("hidden");
        document.getElementById(collapseID).classList.toggle("flex");
    }

    return (
        <nav class="flex items-center justify-between flex-wrap p-6">
            <div class="block lg:hidden">
                <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 burger-icon"
                onClick={() => toggleNavbar('example-collapse-navbar')}>
                    <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto" id="example-collapse-navbar">
                <div class="text-sm lg:flex-grow">
                    <a href="/" class="block mt-3 lg:inline-block lg:mt-0 text-teal-200 mr-4 nav-item">
                        About
                    </a>
                    <a href="/offers" class="block mt-3 lg:inline-block lg:mt-0 text-teal-200 mr-4 nav-item">
                        Offers
                    </a>
                    <a href="/myRequests" class="block mt-3 lg:inline-block lg:mt-0 text-teal-200 mr-4 nav-item">
                        My requests
                    </a>
                    <a href="/info" class="block mt-3 lg:inline-block lg:mt-0 text-teal-200 mr-4 nav-item">
                        Emergency info
                    </a>
                </div>
                <div class="text-sm">
                    {!auth.currentUser ?
                    <>
                        <a href="/login" class="block mt-3 lg:inline-block lg:mt-0 text-teal-200 mr-4 nav-item">
                            Login
                        </a>
                        <a href="/register" class="block mt-3 lg:inline-block lg:mt-0 text-teal-200 mr-4 nav-item">
                            Register
                        </a>
                    </> : 
                    <>
                        <a href="/account" class="block mt-3 lg:inline-block lg:mt-0 text-teal-200 mr-4 nav-item">
                            Account
                        </a>
                        <a href="/login" class="block mt-3 lg:inline-block lg:mt-0 text-teal-200 mr-4 nav-item"
                        onClick={handleLogout}>
                            Logout
                        </a>
                    </>}
                </div>
            </div>
        </nav>
    )  
}
import { FiFacebook } from "react-icons/fi";
import { FaInstagram ,FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
    const items = ['Audio Description','Help Center','Gift Cards','Media Center','Investor Relations','Jobs','Terms of Use','Privacy','Legal Notices','Cookie Prefrences','Corporate Information','Contact Us']
  return (
    <footer className="lg:ps-64 pt-16 bg-black">
        <div className="social flex p-5">
        <FiFacebook className="transition-all duration-200 cursor-pointer mx-3 text-white hover:text-red-600 text-3xl"/>
        <FaInstagram className="transition-all duration-200 cursor-pointer mx-3 text-white hover:text-red-600 text-3xl"/>
        <FaXTwitter className="transition-all duration-200 cursor-pointer mx-3 text-white hover:text-red-600 text-3xl"/>
        <FaYoutube className="transition-all duration-200 cursor-pointer mx-3 text-white hover:text-red-600 text-3xl"/>
        </div>

        <div className="ms-5 navLinks grid lg:grid-cols-4 grid-cols-2 gap-4 p-5 text-white">
            {items.map((item,index)=>(
                <a href="#" className="hover:underline text-gray-400" key={index}>{item}</a>
            ))}
        </div>
        <button className="ms-9 border-gray-700 border-2 px-3 py-1 text-gray-400">Service Code</button>
        <p className="ms-9 py-5 text-gray-400">@ 2023-2024 Netflix</p>
    </footer>
  )
}

export default Footer
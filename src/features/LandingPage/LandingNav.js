/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Logo from "./Assets/Logo.svg";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import { useContext } from 'react';
import { Link } from "react-router-dom";


const LNavbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "About",
      icon: <InfoIcon />,
    },
    {
      text: "How it works",
      icon: <InfoIcon />,
    },
  
   
  ];
  return (
    // <nav>
    //   <div className="nav-logo-container">
    //     <img src={Logo} alt="" />
    //   </div>
    //   <div className="navbar-links-container">
    //     <a href="home">Home</a>
    //     <a href="about">About</a>
    //     <a href="work">How it works</a>
        
    
    //     <button className="primary-button">Order Now</button>
    //   </div>
    //   <div className="navbar-menu-container">
    //     <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
    //   </div>
    //   <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
    //     <Box
    //       sx={{ width: 250 }}
    //       role="presentation"
    //       onClick={() => setOpenMenu(false)}
    //       onKeyDown={() => setOpenMenu(false)}
    //     >
    //       <List>
    //         {menuOptions.map((item) => (
    //           <ListItem key={item.text} disablePadding>
    //             <ListItemButton>
    //               <ListItemIcon>{item.icon}</ListItemIcon>
    //               <ListItemText primary={item.text} />
    //             </ListItemButton>
    //           </ListItem>
    //         ))}
    //       </List>
    //       <Divider />
    //     </Box>
    //   </Drawer>
    // </nav>
   
     <div
    className="navbar flex items-center justify-between w-full p-4 bg-yellow-400 h-auto"
    style={{ backgroundImage: "url(/homebg.svg)" }}
  >
    <Link
      to="/"
      className="text-white text-xl font-semibold hover:text-yellow-500"
    >
      <button class="button2">Home</button>
    </Link>
   
    
 
    <Link to="/signup" className="  py-2 px-4 ">
      <div className="button-nav">
        <button>
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                />
              </svg>
            </div>
          </div>
          <span>Sign Up</span>
        </button>
      </div>
    </Link>
    </div>
   
  

  );
};

export default LNavbar;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "./StateProvider";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { addUser, logout } from "./Redux/slice/AuthSlice";
import { handelImage } from "./Hooks/Handelimage";
import { toast } from "react-toastify";
import { useRef } from "react";
import logo from "./utils/images";
function Nav() {
  const [{ basket }, dispatch] = useStateValue();
  const { user, userLoggedIn, token } = useSelector((state) => state.Auth);
  const dispatches = useDispatch();
  const Navigate = useNavigate();

  useQuery({
    queryKey: ["todos"],
    queryFn: () => {
      axios.get("/api/v1/Auth/current-user").then((res) => {
        setTimeout(() => {
          dispatches(addUser(res?.data));
        }, 1000);
      });
    },
    enabled: !!userLoggedIn && !!token,
  });

  const [popup, setpopup] = useState(false);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setpopup(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const handelref = useRef();
  useOutsideAlerter(handelref);

  return (
    <>
      {/* nav bar start here */}
      <nav className="header relative">
        {/* Logo start here */}
        <Link to="/">
          <div className="rounded-[50%] w-[8rem] h-[5rem] mr-3 flex justify-center items-center overflow-hidden">
            <img
              src={"../logo.png"}
              alt="logo"
              className="absolute  w-[8rem] h-[5rem]  px-2 py-1 bg-contain"
            />
          </div>
        </Link>
        {/* search bar start Here */}
        <div className="header__search mr-4">
          {" "}
          <input type="text" className="header__searchInput outline-none" />
          <SearchIcon className="header__searchIcon" />{" "}
        </div>
        {/* nav links start  */}
        <div className="header__Nav">
          {/* fiest link */}

          {!userLoggedIn ? (
            <Link to="/login" className="header__link">
              <div className="header__option">
                <span className="header__optionLineOne">Hello, users</span>
                <span className="header__optionLineTwo">Sign In</span>
              </div>
            </Link>
          ) : (
            <div className="header_link curs">
              <div className="header__option text-white">
                <span className="header__optionLineOne">
                  Hello, {user?.name}
                </span>
                {/* <span className="header__optionLineTwo">Sign In</span> */}
                <span
                  className="header__optionLineTwo cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setpopup(!popup);
                  }}
                >
                  Account & Lists <ArrowDropDownOutlinedIcon />
                </span>
              </div>
            </div>
          )}

          {/* secound Link */}
          <Link to="/" className="header__link">
            <div className="header__option">
              {" "}
              <span className="header__optionLineOne">Return</span>
              <span className="header__optionLineTwo">& Order</span>
            </div>
          </Link>
          {/* third link */}
          <Link to="/" className="header__link">
            <div className="header__option">
              {" "}
              <span className="header__optionLineOne">Your</span>
              <span className="header__optionLineTwo">Prime</span>
            </div>
          </Link>
          {/* forth link */}
          <Link to="/checkout" className="header__link">
            <div className="header__basket">
              {/* icon of basket */}
              <ShoppingBasket className="header__basketLogo" />
              {/* checkout-items */}
              <span className="header__optionLineTwo header__basketCount">
                {basket.length}
              </span>
            </div>
          </Link>
        </div>
        <div
          className="absolute top-[5.3rem] right-[7rem] bg-gray-300  w-[15rem] rounded-md z-30"
          style={{ display: popup ? "block" : "none" }}
          ref={handelref}
        >
          <div className=" w-[5rem] m-auto mt-3 rounded-[50%]  h-[5rem] overflow-hidden">
            <img
              src={handelImage(user?.AuthType, user?.Avatar)}
              alt="profile_image"
              className="bg-cover bg-center w-[100%]"
            />
          </div>
          <h1 className=" text-center mt-2 font-medium">{user?.name}</h1>
          <div className=" flex justify-start items-center px-4 mt-4 mb-4">
            <ol className=" flex justify-center items-start flex-col">
              <li className="list">
                <AccountCircleOutlinedIcon />
                Profile
              </li>
              <li className="list">
                <CardGiftcardOutlinedIcon />
                Orders
              </li>
              <li className="list">
                <FavoriteBorderOutlinedIcon />
                Watchlist
              </li>
              <li className="list">
                <PeopleOutlinedIcon />
                Memberships
              </li>
              <li
                className="list"
                onClick={() => {
                  setpopup(false);
                  toast.info("Logging out...");
                  setTimeout(() => {
                    Navigate("/login");
                    dispatches(logout());
                  }, 1000);
                }}
              >
                <LogoutOutlinedIcon />
                logout
              </li>
            </ol>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;

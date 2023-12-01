import { Children, Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItems } from "../Cart/CartSlice";
import { selectLoggedInUser } from "../auth/authSlice";
import "./Navbar.css";
// import Chatbot from "../chatbotbox/chatbot";

const navigation = [
  { name: "Products", link: "/home", user: true },
  { name: "Team", link: "#", user: true },
  { name: "Product", link: "/admin", admin: true },
  { name: "Orders", link: "/admin/orders", admin: true },
  { name: "Users", link: "/admin/users", admin: true },
  { name: "Dashboard", link: "/admin/dash", admin: true },
  { name: "Chat", link: "/chatbot", admin: true, user:true },

  
];
const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/orders" },
  { name: "sign out", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function Navbar({ children }) {
  const user = useSelector(selectLoggedInUser);
  const items = useSelector(selectItems);

  return (
    <>
      <nav className="navbar h-full w-full">
        <div
          className="h-auto w-full "
          style={{
            backgroundImage: "url(/homebg.svg)",
            minHeight: "100vh",
            minWidth: "100vh",
            backgroundSize: "cover",
          }}
        >
          <Disclosure
            as="nav"
            style={{ backgroundImage: "url(/navbarbg.svg)" }}
            className="h-auto w-full "
          >
            {({ open }) => (
              <>
                <div className="mx-auto w-auto  px-4 sm:px-6 lg:px-8 p-4 flex h-16  items-center justify-between ">
                  <div className="flex items-center  ">
                    <div className="nav-home">
                      <div
                        id="animation-demo"
                        className="flex-shrink-0 animated fadeInUp "
                      >
                        <Link
                          to="/"
                          className="flex items-center space-x-2 w-auto h-auto "
                        >
                          <button className="button-home bloack relative left-0 w-auto h-auto  ml-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 1024 1024"
                              stroke-width="0"
                              fill="white"
                              stroke="currentColor"
                              className="icon-home p-2"
                            >
                              <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
                            </svg>
                          </button>
                          <div class="container-parent mt-5">
                            <div class="text-container">
                              <div class="upper css-3d-text">FOODIE</div>
                              <div class="lower css-3d-text">FOODIE</div>
                              <div class="inside">LIFE</div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>

                    <div className="hidden md:block">
                      <div className="ml-auto  flex items-baseline space-x-4">
                        {navigation.map((item) =>
                          item[user.role] ? (
                            <Link
                              key={item.name}
                              to={item.link}
                              className={classNames(
                                "rounded-md ml-auto px-3 py-2 text-sm font-bold",
                                {
                                  "bg-gray-900 text-white": item.current,
                                  "text-gray-300 hover:bg-gray-700 hover:text-white":
                                    !item.current,
                                },
                                "lg:mx-2 lg:my-0 md:mx-1 md:my-0 sm:mx-0 sm:my-1"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              <p class="btn-works">{item.name}</p>
                            </Link>
                          ) : null
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block top-30 right-0">
                    <div className="ml-4 flex items-center md:ml-6">
                      <Link
                        to="/profile"
                        className="flex items-center right-10 w-auto h-auto  m-5"
                      >
                        <div className="flex bg-black w-fit px-1.25 py-1.25 shadow-box-up-md rounded-2xl dark:bg-box-dark dark:shadow-box-dark-out mr-auto ">
                          <div className="dark:shadow-buttons-box-dark rounded-2xl w-full mr-auto  p-2">
                            <a
                              title="Go to about me page"
                              className="text-light-blue-light hover:text-black dark:text-gray-400 border-2 inline-flex items-center p-1 bottom-2 top-4 border-transparent bg-light-secondary shadow-button-flat-nopressed hover:border-2 hover:shadow-button-flat-pressed focus:opacity-100 focus:outline-none active:border-2 active:shadow-button-flat-pressed font-medium rounded-full text-sm text-center dark:bg-button-curved-default-dark dark:shadow-button-curved-default-dark dark:hover:bg-button-curved-pressed-dark dark:hover:shadow-button-curved-pressed-dark dark:active:bg-button-curved-pressed-dark dark:active:shadow-button-curved-pressed-dark dark:focus:bg-button-curved-pressed-dark dark:focus:shadow-button-curved-pressed-dark dark:border-0"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-7 h-7"
                                viewBox="0 0 20 20"
                                fill="yellow"
                              >
                                <path
                                  fill="yellow"
                                  fill-rule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </Link>
                      <Link to="/cart">
                        <button type="button">
                          <div data-tooltip="Price:-$20" class="button">
                            <div class="button-wrapper">
                              <div class="text">Buy Now</div>
                              <span class="icon">
                                <svg
                                  viewBox="0 0 16 16"
                                  class="bi bi-cart2"
                                  fill="currentColor"
                                  height="16"
                                  width="16"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                                </svg>
                              </span>
                            </div>
                          </div>
                        </button>
                      </Link>
                      {items.length > 0 && (
                        <span
                          className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                          style={{
                            zIndex: 1,
                            fontSize: "16px",
                            width: "fit-content",
                          }}
                        >
                          {items.length}
                        </span>
                      )}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-transform transform scale-100 hover:scale-110">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-300 transform opacity-0 translate-y-2 scale-95"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 translate-y-0 scale-100"
                          leave="transition ease-in duration-200 transform opacity-100 translate-y-0 scale-95"
                          leaveFrom="transform opacity-100 translate-y-0 scale-100"
                          leaveTo="transform opacity-0 translate-y-2 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700 transform translate-y-0 transition-transform hover:translate-y-2 hover:scale-105"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden ">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden bg-white">
                  <div className="space-y-2 px-4 pb-4 pt-2 sm:px-6">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-300 ease-in-out",
                          "block rounded-md px-4 py-2 text-base font-medium transform hover:scale-105"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pb-4 pt-4">
                    <div className="flex items-center px-6">
                      <div className="flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full"
                          src={user.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-lg font-semibold leading-none text-gray-800">
                          {user.name}
                        </div>
                        <div className="text-sm leading-none text-gray-500">
                          {user.email}
                        </div>
                      </div>
                      <Link to="/cart">
                        <button
                          type="button"
                          className="relative ml-auto flex-shrink-0 rounded-full bg-indigo-600 p-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>
                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                      {items.length > 0 && (
                        <span className="inline-flex items-center rounded-md bg-red-600 ml-2 px-3 py-1 text-xs font-medium text-white transform hover:scale-105">
                          {items.length} New
                        </span>
                      )}
                    </div>
                    <div className="mt-3 space-y-2 px-4">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <header
            className="bg-white shadow-md py-2 check dash-board relative"
            style={{ backgroundImage: "url(/dash.svg)" }}
          >
            <div className="ml-10 flex ">
              <h1 className="text-3xl   m-4 font-bold text-indigo-600 tracking-tight transform transition-transform hover:scale-105 hover:text-indigo-800">
                {/* <Link to={Chatbot}></Link> */}
                Dashboard
              </h1>
            </div>

            <form className="absolute top-30 right-0">
              <div className="relative  search-box ">
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for Food"
                  z
                  required=""
                />

                <button className="btn ml-4">Search</button>
              </div>
            </form>
          </header>

          <main>
          <div class=" w-full  flex items-center justify-center">
              {children}
            </div>
          </main>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

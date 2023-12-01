import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProducts,
  fetchProductsByFilterAsync,
  selectTotalItems,
  selectCategories,
  fetchCategoriesAsync,
} from "../ProductListSlice";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ProductList.css";
import { Carousel } from "react-responsive-carousel";

import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

import { Link } from "react-router-dom";
import { fetchAllProducts } from "../ProductListAPI";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import Pagination from "../../common/Pagination";
import { selectLoggedInUser } from "../../auth/authSlice";
import { addToCartAsync, selectItems } from "../../Cart/CartSlice";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

const items = [
  {
    id: 1,
    title: "Back End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 2,
    title: "Front End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 3,
    title: "User Interface Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProductList() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const totalItems = useSelector(selectTotalItems);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const products = useSelector(selectAllProducts);
  const categories = useSelector(selectCategories);
  const user = useSelector(selectLoggedInUser);
  const items = useSelector(selectItems);
  const filters = [
    {
      id: "category",
      name: "Category",
      // change according to database //
      options: categories,
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);

  // ...

  const handleCart = (product) => {
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      console.log({ items, product });
      const newItem = {
        product: product.id,
        quantity: 1,
        user: user.id,
      };
      dispatch(addToCartAsync(newItem));
    } else {
      // we will use alertsin UI //
      console.log("item already added");
    }
  };

  const handleFilter = (e, section, option) => {
    console.log(e.target.checked);
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    console.log({ newFilter });

    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    console.log({ sort });

    setSort(sort);
  };
  const handlePage = (page) => {
    console.log({ page });
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFilterAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);
  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    console.log("useeffect");
    dispatch(fetchCategoriesAsync());
  }, []);

  return (
    <div className="container flex items-center justify-center">
      <div>
      <MobileFilter
          handleFilter={handleFilter}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filters={filters}
        ></MobileFilter>
        
        <div >
          <div>
            <main className="mx-auto max-w-9xl sm:px-6 lg:px-1 bg-transparent">
              {/* <div className="mt-8 mb-8">
                <MyCarousel
                  handleFilters={handleFilters}
                  filters={categories}
                  selectedCategory={selectedCategory}
                />
              </div> */}
              
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
             

                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mt-0">
                  Menu
                </h1>

                <div className="flex items-center bg-transparent">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-bold text-gray-900 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className=" cursor-pointer absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <p
                                  onClick={(e) => handleSort(e, option)}
                                  className={classNames(
                                    option.current
                                      ? "font-medium text-gray-900"
                                      : "text-gray-500",
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {option.name}
                                </p>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <button
                    type="button"
                    className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>
                <div className="flex flex-row"> <DesktopFilter
                handleFilter={handleFilter}
                filters={filters}
              ></DesktopFilter>
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                  {/* Filters */}
                 

                  {/* Product grid */}
                  <div className="lg:col-span-3">
                    {/* // this is product list page // */}
                    <ProductGrid
                      products={products}
                      handleCart={handleCart}
                    ></ProductGrid>
                  </div>
                </div></div>
               
              </section>

              

              <Pagination
                page={page}
                setPage={setPage}
                handlePage={handlePage}
                totalItems={totalItems}
              ></Pagination>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
function MyScrollMenu({ handleFilters, filters }) {
  return (
    <div className="mt-8 mb-8 flex items-center justify-center">
      <div className="scrollmenu flex overflow-auto border-t border-b py-4 whitespace-nowrap">
        {filters.map((item, index) => (
          <div
            key={index}
            className="scrollmenu-item mr-4 flex flex-col items-center" // Improved styling
            onClick={() => handleFilters(item.label)}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-full cursor-pointer  mb-2"
            />
            <p className="text-center">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          show={mobileFiltersOpen}
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {/* <h3 className="sr-only">Categories</h3>
             <ul role="list" className="px-2 py-3 font-medium text-gray-900 flex">
             {subCategories.map((category) => (
             <li key={category.name} className="inline-block">
             <a href={category.href} className="block px-2 py-3">
             {category.name}
             </a>
             </li>
             ))}
            </ul> */}

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center cursor-pointer"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={(e) =>
                                    handleFilter(e, section, option)
                                  }
                                  className="cursor-pointer h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

// function MyCarousel({ handleFilters, filters }) {
//   return (
//     <Carousel
//       showThumbs={false}
//       showStatus={false}
//       showIndicators={false}
//       infiniteLoop={true}
//       centerMode={true}
//       centerSlidePercentage={33.33}
      
//       style={{ width: "80%", height: "500px" }} // Adjust the width and height here
//     >
//       {filters.map((category, index) => (
//         <div
//           key={index}
//           className="flex flex-col bg-trasparent items-center transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100 hover:shadow-md p-4 rounded-lg cursor-pointer"
//           onClick={() => handleFilters(category.label)} style={{ backgroundImage: "url(/dash.svg)" }}
//         >
//           <img
//             src={category.images}
//             alt={category.label}
//             className="w-32 h-32 object-cover rounded-full mb-2 transition duration-300 ease-in-out transform hover:scale-110"
//           />
//           <div className="text-center text-gray-800 font-semibold text-lg hover:text-indigo-600 transition duration-300 ease-in-out transform hover:scale-110">{category.label}</div>
//         </div>
//       ))}
//     </Carousel>
//   );
// }

function ProductGrid({ products, handleCart }) {
  return (
    <div >
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8 bg-transparent">
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <>
              <div className="container page-wrapper">
                <div className="page-inner">
                  <div className="row">
                    <div className="el-wrapper">
                      <Link
                        to={`/product-detail/${product.id}`}
                        key={product.id}
                      >
                        <div className="box-up">
                          <div className="img-box">
                            <img
                              className="img"
                              src={product.thumbnail}
                              alt={product.title}
                            />
                          </div>

                          <div className="img-info">
                            <div className="info-inner">
                              <span className="p-name"> {product.title}</span>
                              <span className="p-company">
                                {" "}
                                <StarIcon className="w-6 h-6 inline"></StarIcon>{" "}
                                {product.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div className="box-down">
                        <div className="h-bg">
                          <div className="h-bg-inner"></div>
                        </div>

                        <button
                          className="cart"
                          onClick={() => handleCart(product)}
                        >
                          <span className="price">${product.price}</span>
                          <span className="add-to-cart">
                            <span className="txt">Add to cart</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
function DesktopFilter({ handleFilter, filters }) {
  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 font-bold py-6 bg-transparent"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-transparent py-3 text-sm text-gray-900 hover:text-gray-500">
                  <span className="font-bold text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) => handleFilter(e, section, option)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-900"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}


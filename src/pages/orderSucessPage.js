import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync, selectItems } from "../features/Cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { resetOrder, selectCurrentOrder } from "../features/order/orderSlice";
import { updateProduct } from "../features/product/ProductListAPI";
import { updateUserAsync } from "../features/user/userSlice";
import { updateProductAsync } from "../features/product/ProductListSlice";

function OrderSuccessPage() {
   const params = useParams() 
   const dispatch = useDispatch();
   const user=useSelector(selectLoggedInUser);
   const items=useSelector(selectItems);
   const currentOrder=useSelector(selectCurrentOrder);
   console.log('currentorder',currentOrder)

   const resetorder=()=>{
    dispatch(resetOrder(user.id));

   }

   
   //const user = useSelector(selectLoggedInUser);

   useEffect(() => {
    for (let item of items) {
      
  
      // Create a new object or clone the existing one
      const newProduct = { ...item.product };
  
      // Update properties on the new object
      console.log('initial stock', newProduct.stock);
      newProduct.stock -= item.quantity;
      newProduct.sale = newProduct.sale+item.quantity;
  
      console.log('final stock and sale', newProduct.stock, newProduct.sale);
  
      // Dispatch the updateProduct action with the new object
      dispatch(updateProductAsync(newProduct));
    }
  
    // Create a new user object or clone the existing one
    const newUser = { ...user };
    console.log('user',user)
    console.log('initial user points',newUser.points)
    newUser.points = newUser.points || 0;
    
    // Calculate the new points based on the current order's total amount
    const newPoints = newUser.points + currentOrder.totalAmount;
    
    console.log('Initial User:', newUser);
    
    // Update newUser with the new points
    newUser.points = newPoints;
    
    console.log('User with Updated Points:', newUser);
    console.log('Final Points:', newPoints);
    // Dispatch the updateUserAsync action with the new user object
    dispatch(updateUserAsync(newUser));
  
    // Dispatch the resetCartAsync action
     dispatch(resetCartAsync(user.id));
  
    
    // dispatch(resetOrder(user.id));
  }, [dispatch]);
  

  return (
    <>
    {!params.id &&  <Navigate to='/' replace={true}></Navigate>}
    <main  style={{
            backgroundImage: "url('/bgall.svg')",
            minHeight: "100vh",
            minWidth: "100vh",
            backgroundSize: "cover",
          }} className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      
      <div className="text-center">
        <p className="text-4xl font-bold text-gray-700">Order Successfully Placed</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Order Number #{params?.id}
        </h1>

        <div className="border-gray-900">
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8 border-gray-900 rounded-3xl">
          <div className=" border-gray-900 px-4 py-6 sm:px-6 rounded-3xl ">
            {/* <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Order # {order.id}
            </h1> */}
             {/* <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
              Order Status : {currentOrder.status}
            </h3> */}
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {currentOrder.items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.product.id}>{item.product.title}</a>
                          </h3>
                          <p className="ml-4">${item.product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty :{item.quantity}
                          </label>

                        </div>

                        <div className="flex">

                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-xl font-bold text-gray-900">
              <p>Subtotal</p>
              <p>$ {currentOrder.totalAmount}</p>
            </div>
            <div className="flex justify-between my-2 text-xl font-bold text-gray-900">
              <p>Total Items </p>
              <p>{currentOrder.totalItems} items</p>
            </div>
           

          </div>
        </div>
      </div>

        <p className="mt-6 text-base leading-7 font-bold text-gray-600">
          You can collect your Order from the stall
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/home"
            
          >
            <button onClick={resetOrder(user.id)}   className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
               Go back home
            </button>
           
          </Link>
        </div>
      </div>
    </main>
    </>
  );
}

export default OrderSuccessPage;
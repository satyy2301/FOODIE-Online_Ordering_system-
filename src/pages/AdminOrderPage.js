
import AdminOrders from "../features/admin/components/AdminOrders";
import NavBar from "../features/NavBar/Navbar";

function AdminOrdersPage() {
    return ( 
        <div>
            <NavBar>
            <AdminOrders></AdminOrders>
            </NavBar>
          
        </div>
     );
}

export default AdminOrdersPage;
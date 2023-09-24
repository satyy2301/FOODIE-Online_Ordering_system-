import AdminProductList from "../features/admin/components/AdminProductlist";
import NavBar from "../features/NavBar/Navbar";

function AdminHome() {
    return ( 
        <div>
            <NavBar>
                <AdminProductList></AdminProductList>
            </NavBar>
        </div>
     );
}

export default AdminHome;
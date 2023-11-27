
import AdminUserList from "../features/admin/components/AdminUserList";
import NavBar from "../features/NavBar/Navbar";

function AdminUserPage() {
    return ( 
        <div>
            <NavBar>
                <AdminUserList></AdminUserList>
            </NavBar>
        </div>
     );
}

export default AdminUserPage;
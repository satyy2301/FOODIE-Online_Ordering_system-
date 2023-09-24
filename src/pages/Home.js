import Navbar from "../features/NavBar/Navbar";
import ProductList from "../features/product/components/ProductList";
import { Link } from "react-router-dom";

function Home() {
    return ( 
        <Navbar>
            <ProductList />
               
           
        </Navbar>
     );
}

export default Home;
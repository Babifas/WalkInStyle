
import { Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './Components/Authorization/Login';
import Signup from './Components/Authorization/Signup';
import { createContext, useEffect, useState } from 'react';
import Home from './Components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarMain from './Components/Navbar/NavbarMain';
import AllProducts from './Components/ProductsCategory/AllProducts';
import { Product } from './Components/Product/ProductList';
import MenProducts from './Components/ProductsCategory/MenProducts';
import WomenProducts from './Components/ProductsCategory/WomenProducts';
import ProductDetails from './Components/Product/ProductDetails'
import Cart from './Components/Cart/Cart';
import Payment from './Components/Payment/Payment';
import Admin from './Components/AdminSection/Admin';
import Search from './Components/Search/Search';
import ProductSection from './Components/AdminSection/ProductSection';
import UserSection from './Components/AdminSection/UserSection';
import AddProduct from './Components/AdminSection/AddProduct';
import UpdateProduct from './Components/AdminSection/UpdateProduct';
import ViewUser from './Components/AdminSection/ViewUser';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';



export const myContext = createContext();
function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState(Product);
  const [carts, setCarts] = useState([]);
  const [login, setLogin] = useState(false);
  const [searchitem, setSearchitem] = useState('');
  const [totalPrice, setTotalprice] = useState(0);
  const [adminloged, setAdminloged] = useState(false)

  const [token,setToken]=useState('hi');

  useEffect(()=>{
    var token=Cookies.get('accessToken');
    if(token){
      const decodeToken=jwtDecode(token);
      const role=decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      console.log(role);

      if(role==='Admin'){
        setAdminloged(true);
      }
      setToken(token)
      setLogin(true)
    }
  },[])
  return (
    <div className="App">
      <myContext.Provider value={{token,setToken, email, setEmail, password, setPassword,  products, setProducts, carts, setCarts, login, setLogin,searchitem, setSearchitem, totalPrice, setTotalprice,  adminloged, setAdminloged }}>
        <NavbarMain />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/collection' element={<AllProducts />} />
          <Route path='/menproducts' element={<MenProducts />} />
          <Route path='/womenproducts' element={<WomenProducts />} />
          <Route path=':id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/usersection' element={<UserSection />} />
          <Route path='/productsection' element={<ProductSection />} />
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/productsection/:id' element={<UpdateProduct />} />
          <Route path='/usersection/:id' element={<ViewUser />} />

        </Routes>
      </myContext.Provider>


    </div>
  );
}

export default App;

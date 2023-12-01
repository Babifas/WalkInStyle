
import { Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './Components/Authorization/Login';
import Signup from './Components/Authorization/Signup';
import { createContext, useState } from 'react';
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



export const myContext = createContext();
function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupData, setSignupdata] = useState([{ email: 'admin@gmail.com', password: "963963963", id: 1, previlage: 'Admin' }, { email: 'babi@gmail.com', password: "753753753", id: 2, previlage: 'Admin' }, { email: 'jonh@gmail.com', password: "753753753", id: 3, previlage: 'User' }, { email: 'ramesh@gmail.com', password: "753753753", id: 4, previlage: 'User' }]);
  const [products, setProducts] = useState(Product);
  const [carts, setCarts] = useState([]);
  const [login, setLogin] = useState(false);
  const [logindata, setLogindata] = useState('');
  const [searchitem, setSearchitem] = useState('');
  const [totalPrice, setTotalprice] = useState(0);
  const [logemail, setLogemail] = useState('');
  const [adminloged, setAdminloged] = useState(false)
  return (
    <div className="App">
      <myContext.Provider value={{ email, setEmail, password, setPassword, signupData, setSignupdata, products, setProducts, carts, setCarts, login, setLogin, logindata, setLogindata, searchitem, setSearchitem, totalPrice, setTotalprice, logemail, setLogemail, adminloged, setAdminloged }}>
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

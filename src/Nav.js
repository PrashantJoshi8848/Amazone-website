import React from 'react'
import {Link} from 'react-router-dom'
import SearchIcon from "@material-ui/icons/Search"
import  ShoppingBasket  from '@material-ui/icons/ShoppingBasket'
import { useStateValue } from './StateProvider';

function Nav() {
  const [ { basket } ,dispatch]=useStateValue();
  return (
    <>
{/* nav bar start here */}
    <nav className='header'>
{/* Logo start here */}
<Link to ="/">
    
    <img src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' 
    alt='logo' 
    className='header__logo'/>
</Link>
{/* search bar start Here */}
      <div className='header__search'> <input type="text" 
      className='header__searchInput'/>
      <SearchIcon className='header__searchIcon'/>  </div>
{/* nav links start  */}
      <div className='header__Nav'>
        {/* fiest link */}
        <Link to="/login" className='header__link'>
          <div className='header__option'> <span className='header__optionLineOne'>Hello, Qazi</span>
           <span className='header__optionLineTwo'>Sign In</span></div>
          </Link>
          {/* secound Link */}
          <Link to="/" className='header__link'>
          <div className='header__option'> <span className='header__optionLineOne'>Return</span>
           <span className='header__optionLineTwo'>& Order</span></div>
          </Link>
          {/* third link */}
          <Link to="/" className='header__link'>
          <div className='header__option'> <span className='header__optionLineOne'>Your</span>
           <span className='header__optionLineTwo'>Prime</span></div>
          </Link>
{/* forth link */}
          <Link to="/checkout" className='header__link'>
          <div className='header__basket'>
            {/* icon of basket */}
            <ShoppingBasket className='header__basketLogo'/>
            {/* checkout-items */}
            <span className='header__optionLineTwo header__basketCount'>{basket.length}</span>
          </div>
          </Link>
      </div>
       
    </nav>
    </>
  )
}

export default Nav
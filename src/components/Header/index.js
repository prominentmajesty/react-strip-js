import React from 'react';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import './styles.scss';
import {auth} from './../../firebase/utils';

import Logo from '../../assets/logo.png';

const mapState  = ({user})=>  ({
    currentUser : user.currentUser
});

const Header = props => {
    const {currentUser} = useSelector(mapState);

    return(
        <header className="header">
            <div className="wrap">
                <div className="logo">
                   <Link to="/"><img src={Logo} alt="SimpleTut Logo"/></Link>
                </div>

                <div className="callToActions">
                    {currentUser && (
                        <ul>
                             <li>
                                <Link to="/dashboard">My Account</Link>
                            </li>
                            <li>
                                <span className="logout" onClick={() => {auth.signOut()}}>
                                    LogOut
                                </span>
                            </li>
                        </ul>
                    )}
                    {!currentUser && (
                        <ul>
                            <li>
                                <Link to="/registration">Register</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                    </ul>
                    )}
                </div>
            </div>
        </header>
    )
}

Header.defaultProps = {
    currentUser : null
}

export default Header;
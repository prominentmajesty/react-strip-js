import { read } from "fs";
import React from 'react';
import ShopMens from './../../assets/shopMens.jpg';
import ShopWomens from './../../assets/shopWomens.jpg';
import './styles.scss';
 
const Directory = props =>{
    return(
        <div className="directory">
            <div className="wrap">
                <div className="item" style={{backgroundImage: `url(${ShopWomens})`}}>
                    <a>Shop For Women</a>
                </div>
                <div className="item" style={{backgroundImage: `url(${ShopMens})`}}>
                    <a>Shop For Men</a>
                </div>
            </div>
        </div>
    );
};

export default Directory;
import React from 'react';
import FontAwesome from "react-fontawesome";
import { Link } from 'react-router-dom';
import { excerpt } from '../utility/Index';

const ItemsSection = ({ items, user }) => {
    return (
        <div>
            <div className='blog-heading text-start py-2 md-4'>All Item's</div>
            {items?.map((item) => (
              <div className='row pb-4' key={item.id}>
                <div className='col-md-5'>
                    <div className='hover-blogs-img'>
                        <div className='blogs-img'>
                            <img src={item.imgUrl} alt={item.Equipment_serial_number} />
                            <div></div>
                        </div>
                    </div>
                </div>
                <div className='col-md-7'>
                    <div className='text-start'>
                        <h6 className='Equipment_group group-color'>{item.Equipment_group}</h6>
                        <span className='Equipment_serial_number py-2'>{item.Equipment_serial_number}</span>
                        <span className='meta-info'>
                            <p className='author'>{item.author}</p>
                            {item.timesTamp.toDate().toDateString()}
                        </span>
                    </div>
                    <div className='shot-date'>
                        {excerpt(item.Equipment_group, 5)}
                    </div>
                    <button className='btn btn-view'>View</button>
                    <div style={{ float: "right"}}>
                        <FontAwesome
                        name='trash'
                        style={{ margin: "15px", cursor: "pointer" }}
                        size="2x"
                        />
                         <FontAwesome
                        name='edit'
                        style={{ cursor: "pointer" }}
                        size="2x"
                        />
                    </div>
                </div>
              </div>
            ))}
        </div>
    )
}

export default ItemsSection
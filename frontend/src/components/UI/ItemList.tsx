import React from "react";
import {Employee} from "../../pages/types";
import Image from 'react-bootstrap/Image';

interface ItemListProps {
    items: Employee[];
}

const ItemList: React.FC<ItemListProps> = ({items}) => {
    console.log(items)
    return (
        <ul className="list-group">
            {items.map((item, index) => {
                    return <li className="list-group-item  d-flex justify-content-around" key={index}>
                        <div className={'container align-items-center d-flex flex-row gap-2'}>
                            <Image className={item.photo_uri} width={'50px'} height={'60rem'} src={item.photo_uri} thumbnail></Image>
                            <div className="container d-flex p-2 flex-column w-100">
                                <h3 className={'center'}>{item.name}</h3>
                                <p className={'center'}>Setor: {item.position}</p>
                            </div>
                        </div>
                        <div className={'container d-flex justify-content-end align-items-center gap-2'}>
                            <button className="btn btn-danger h-75">Apagar</button>
                        </div>
                    </li>
                }
            )}
        </ul>
    );
};


export default ItemList;
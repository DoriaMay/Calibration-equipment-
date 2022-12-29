import { collection, onSnapshot } from 'firebase/firestore';
import React, {useState, useEffect} from 'react'
import { db } from '../components/firebase';
import ItemsSection from '../components/ItemsSection';

const ItemDetails = () => {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
       const unsub = onSnapshot(
        collection(db, "items"),
        (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
                list.push({id: doc.id, ...doc.data()})
            });
            setItems(list);
        }, (error) => {
            console.log(error);
        }
       );

       return() => {
        unsub();
       };
    }, []);

    console.log("items", items);

    return (
        <div className='container-fluid pb-4 pt-4 padding'>
            <div className='container padding'>
                <div className='col-mb-8'>
                    <ItemsSection items={items}/>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetails
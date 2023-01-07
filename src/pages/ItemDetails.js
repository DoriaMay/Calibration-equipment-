// import { collection, deleteDoc, doc, onSnapshot} from 'firebase/firestore';
// import React, {useState, useEffect} from 'react'
// import { Spinner } from 'react-bootstrap';
// import { db } from '../components/firebase';
// import ItemsSection from '../components/ItemsSection';

// const ItemDetails = ({setActive, user}) => {
//     const [loading, setLoading] = useState(true);
//     const [items, setItems] = useState([]);

//     useEffect(() => {
//        const unsub = onSnapshot(
//         collection(db, "items"),
//         (snapshot) => {
//             let list = [];
//             snapshot.docs.forEach((doc) => {
//                 list.push({id: doc.id, ...doc.data()})
//             });
//             setItems(list);
//             setLoading(false);
//             setActive("ItemDetails");
//         }, (error) => {
//             console.log(error);
//         }
//        );

//        return() => {
//         unsub();
//        };
//     }, []);
    
//     if (loading) {
//         return <Spinner />;
//     }

//     const handleDelete = async (id) => {
//         if(window.confirm("Aur you sure wante to delete that item")) {
//             try{
//                 setLoading(true);
//                 await deleteDoc(doc(db, "items", id));
//                 alert("items deleted")
//                 setLoading(false);
//             }catch (err){
//                 console.log(err);
//             }
//         }
//     };

//     console.log("items", items);

//     return (
//         <div className='container-fluid pb-4 pt-4 padding'>
//             <div className='container padding'>
//                 <div className='col-mb-8'>
//                     <ItemsSection items={items} user={user} handleDelete={handleDelete}/>
//                 </div>
//                 <div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ItemDetails
// import { doc, getDoc } from 'firebase/firestore';
// import React, {useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { db } from '../components/firebase';

// const Detail = (setActive) => {
//   const{id} = useParams();
//   const [item, setItem] = useState(null);
  
//   useEffect(() => {
//     id && getItemsDetail();

//   }, [id]);

//   const getItemsDetail = async () => {
//     const docRef = doc(db, "items", id);
//     const itemDetail = await getDoc(docRef);
//     setItem(itemDetail.data());
//     setActive(null);
//   }
  
//   return (
//     <div className='single'>
//       <div className='item-box' style={{bagroundImage: `url('${item?.imgUrl}')`}}>
//         <div className='overlay'></div>
//         <div className='item-num'>
//           <span >{item?.timesTamp.toDate().toDateString}</span>
//           <h2>{item?.Equipment_serial_number}</h2>
//         </div>
//       </div>
//       <div className='container-fluid pb-4 pt-4 padding item-single-content'>
//         <div className='container-padding'>
//           <div className='row mx-0'>
//             <div className='row-md-8'>
//               <span className='meta-ingo text-start'>
//                 BY <p className='author'>{item?.author}</p> - &nbsp;
//                 {item?.timesTamp.toDate().toDateString()}
//               </span>
//               <div className='text-start'>{item?.Equipment_group}</div>
//             </div>
//             <div className='col-md-3'></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Detail
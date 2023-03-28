import React from 'react'

export default function ApiService() {
    const refreshPage = () => {
        window.location.reload(false);
    }
    // const payloadData = {
    //     get:{
    //         url: 'http://127.0.0.1:8000/api/articles/',
    //         payload:{
    //             'method':'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Token f75b1f084e6ff08157861b359c6c36d59402fb40'
    //             }
    //         }
    //     },
    //     update:{
    //         url: 'http://127.0.0.1:8000/api/articles/',
    //         payload:{
    //             'method':'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Token f75b1f084e6ff08157861b359c6c36d59402fb40'
    //             }
    //         }
    //     },
    //     delete:{
    //         url: 'http://127.0.0.1:8000/api/articles/',
    //         payload:{
    //             'method':'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Token f75b1f084e6ff08157861b359c6c36d59402fb40'
    //             }
    //         }
    //     }
    // }
    // const getData = async (props) => {
    //     let res = await fetch(payloadData.get.url, payloadData.get.payload);

    //     res = await res.json();
    //     console.log(res);
        
    //     // return res;
    //     // return data;
    // }

    // const updateData = async (id, body) => {
    //     payloadData.update.body=body;
    //     let res = await fetch(payloadData.update.url+id+'/',payloadData.update.payload);

    //     res = await res.json();
    //     if (res.status === 204){
    //         refreshPage();
    //     }
    //     // return data;
    // }

    // const deleteData = async (id) => {
    //     let res = await fetch(payloadData.delete.url+id+'/', payloadData.delete.payload);

    //     res = await res.json();
    //     console.log(res.status);
    //     if (res.status === 204){
    //         await refreshPage();
    //     }
    //     // return data;
    // }

//   return (
//     <div>ApiService</div>
//   )
}


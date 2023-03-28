import React, { useEffect, useState } from 'react'
import ArticleList from './ArticleList';
import ApiService from './ApiService';
import Form from './form';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

export default function Main() {
    const [articles, setArticles] = useState([])
    const [isAddarticleFormOpen, setIsAddArticleFormOpen] = useState(false)
    const [token, settoken, removeToken] = useCookies(['myToken'])
    const navigate = useNavigate()

    const refreshPage = () => {
        window.location.reload(true);
    }

    const updateArticle = (articles) => {
        setArticles(articles)
    }
    useEffect(() =>{
        if(!token['myToken']){
            navigate('/')
        }
    }, [token])

    const payloadData = {
        get:{
            url: 'http://127.0.0.1:8000/api/articles/',
            payload:{
                'method':'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['myToken']}`
                }
            }
        },
        update:{
            url: 'http://127.0.0.1:8000/api/articles/',
            payload:{
                'method':'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['myToken']}`
                }
            }
        },
        delete:{
            url: 'http://127.0.0.1:8000/api/articles/',
            payload:{
                'method':'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['myToken']}`
                }
            }
        }
    }
    const getData = async (props) => {
        let res = await fetch(payloadData.get.url, payloadData.get.payload);

        res = await res.json();
        console.log(res);
        if(res){
            setArticles(res);
        }
        // return res;
        // return data;
    }

    const updateData = async (id, body) => {
        // const upPayLoad = {
            
        // }
        const updatePayload = {
            method:payloadData.update.payload.method,
            headers:payloadData.update.payload.headers,
            body:JSON.stringify(body)
        }
        console.log(updatePayload);
        let res = await fetch(payloadData.update.url+id+'/',updatePayload);

        res = await res.json();
        console.log(res);
        const new_articles = articles.map(
            (article) => article.id === res.id? res:article
        );
        setArticles(new_articles);
        // await getData()
        // if (res.status === 204){
        //     refreshPage();
        // }
        // return data;
    }

    const deleteData = async (id) => {
        let res = await fetch(payloadData.delete.url+id+'/', payloadData.delete.payload);

        console.log(res);
        setArticles(articles.filter(item => item.id !== id))
        // await getData();
        // console.log(res.status);
        // if (res.status === 204){
        //     refreshPage();
        // }
        // // return data;
    }

    const addData = async(body) => {
        const postPayload = {
            method:'POST',
            headers:payloadData.update.payload.headers,
            body:JSON.stringify(body)
        }
        console.log(postPayload);
        let res = await fetch(payloadData.update.url,postPayload);

        res = await res.json();
        console.log(res);
        setArticles([...articles, res]);
    }

    useEffect(
        () => {
            getData();
        }, []
    )
    
    useEffect(() =>{
        console.log('articles', articles);
        setArticles(articles);
    }, [articles])

    const clossAddArticleForm = () => {
        setIsAddArticleFormOpen(false)
    }

    const deleteArticle = (id)=> {

    }

    return (
        <div>
            <div className='row'>
                <div className='col-md-8'>
                    <h2>Django and RectJs Course</h2>
                </div>
                <div className='col relative'>
                    <button className="btn btn-success" onClick={() => setIsAddArticleFormOpen(true)}>Add Article</button>
                </div>
                <div className='col relative'>
                    <button className="btn btn-danger" onClick={() => removeToken('myToken')}>Logout</button>
                </div>
            </div>
            
            <ArticleList deleteApi={deleteData} updateApi={updateData} updateArticle={updateArticle} articles={articles}/>
            {
                isAddarticleFormOpen? 
                (
                    <div className=''>
                        <h3 className='mt-100'> Add New Article</h3>
                        <Form  closeForm={clossAddArticleForm} addApi={addData}/>
                        <br/>
                    </div>
                ):null
            }
        </div>
    )
}


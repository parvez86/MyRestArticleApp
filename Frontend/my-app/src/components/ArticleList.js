import React, { useState } from 'react'
import Form from './form';

export default function ArticleList(props) {

    const [isOpenForm, setIsOpenForm] = useState(false);
    const [formArticleId, setFormArticleId] = useState(null)
    const openForm = (id) => {
        setIsOpenForm(true);
        setFormArticleId(id);
    }

    const closeForm = () => {
        setIsOpenForm(false);
        setFormArticleId(null);
    }

    console.log(props.articles.length)

    return (
        <div>
            {
                (props.articles.length>0)?(
                    props.articles.map(
                    (article) => {
                        return (
                            <div key={article.id}>
                                <h2>{article.title}</h2>
                                <p>{article.description}</p>
                                <div className='row' style={{paddingBottom:10}}>
                                    <div className='col-md-1'>
                                        <button className='btn btn-primary' onClick={() => openForm(article.id)}>update</button>
                                    </div>

                                    <div className='col-md-1'>
                                        <button className='btn btn-danger' style={{marginLeft:20}} onClick={() => props.deleteApi(article.id)}>delete</button>
                                    </div>
                                </div>
                                {
                                    isOpenForm && article.id===formArticleId && <Form closeForm={closeForm} article={article} updateApi={props.updateApi} updateArticle={props.updateArticle}/>
                                }
                                <hr style={{backgroundColor:'red', padding:2}}/>
                            </div>
                        )
                    }
                )):null
            }
        </div>
    )
}


import React, { useState } from 'react'

export default function Form(props) {
    const [upTitle, setUpTitle] = useState(props.article !== undefined?props.article.title:"");
    const [upDescription, setUpDescription] = useState(props.article !== undefined?props.article.description:"");
    
    const onSubmit = () => {
        // props.updateArticle(props.article.id);
        props.closeForm();
        const body = {
            title:upTitle,
            description:upDescription
        }
        console.log("updated article: ", body);
        props.addApi===undefined?props.updateApi(props.article.id, body):props.addApi(body);
    }

    return (
        <div>
            <div className='row'>
            <label htmlFor='title' className='form-label'>Title</label>
            {/* <input className='form-control' id='title' type='text' value={props.article.title} onChange={(e) => props.setArticle(...props.article, {"title":e.target.value})}/> */}
            <input className='form-control' id='title' type='text' defaultValue={upTitle} onChange={(e) => setUpTitle(e.target.value)}/>
            </div>
            <div className='row'>
            <label htmlFor='description' className='form-label'>Description</label>
            <textarea className='form-control' id='description' defaultValue={upDescription} onChange={(e) => setUpDescription(e.target.value)}/>
            </div>
            <div className='row'>
            <div className='col-md-3'>
            <button className='form-control form-btn btn btn-success' onClick={onSubmit}>Submit</button>
            </div>
            <div className="col-md-3">
            <button className='form-control form-btn btn btn-danger' onClick={() => props.closeForm()}>Cancel</button>
            </div>
            </div>
        </div>
    )
}
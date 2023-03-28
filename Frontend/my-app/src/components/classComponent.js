import React, {Component} from 'react';

export default class ClassComp extends Component{
    render(){
        return (
            // <h4>  This is from <strong> {this.props.name} </strong> component</h4>
            <div>
                <h4>My email: <strong>sp86@email.com</strong></h4>
                <button onClick={() => this.props.myClick(this.props.name)}>clickme</button>
            </div>
        )
    }
}


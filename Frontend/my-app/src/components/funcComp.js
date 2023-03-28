export default function FuncComp(props){
    return (
        // <h3>this is from <strong>{props.name}</strong> component</h3>
        <div>
            <h3>My name is: <strong>SP</strong> </h3>
            <button onClick={() => props.myClick(props.name)}> clickme</button>
        </div>
    )
}

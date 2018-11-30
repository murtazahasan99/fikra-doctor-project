import React, { Component } from "react"
import ReactDOM from "react-DOM"
import firebase from "firebase"
import logo from "./asset/pharmacy.jpg"


 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBWGo7R9kIfR4ebLbwJBEK5pmqwr799-9Y",
    authDomain: "test-9dec8.firebaseapp.com",
    databaseURL: "https://test-9dec8.firebaseio.com",
    projectId: "test-9dec8",
    storageBucket: "test-9dec8.appspot.com",
    messagingSenderId: "6717506101"
  };
  firebase.initializeApp(config);

class App extends Component {
    constructor(props) {
        super(props)
        this.state={
            name:"",
            mid:"",
            Medication:[]

        }

    }
    onChangename(event){
        console.log(event.target.value)
        this.setState({
            name:event.target.value
        })
    }

    onChangemid(event){
        console.log(event.target.value)
        this.setState({
            mid:event.target.value
        })
    }
    add(){
        let Medication=this.state.Medication
        let mid=this.state.mid
        Medication.push(
            this.state.mid
        )
        mid=""
        this.setState({
           Medication:Medication,
           mid:mid
        })
    }
    save(){
        firebase.firestore().collection('Medication').add({
            name:this.state.name,
            mid:this.state.Medication,
            date:Date.now()

          })
          this.setState({
            Medication:[],
            name:"",
            mid:""
          })
    }

    render() {

        return (
            <div>
                <nav className="navbar navbar-light bg-light" >
                    <div>
                        <img src={logo} width="50" height="50" className="d-inline-block align-top" alt=""></img>
                        <a className="navbar-brand" href="index.html">Home</a>
                        <a className="navbar-brand" href="add.html"><h3>Add</h3></a>
                    </div>
                </nav>
                <div id="box">
                    <input type="text" placeholder="Name..." value={this.state.name} onChange={this.onChangename.bind(this)}></input>
                    <ul>
                        {
                            this.state.Medication.map((item,i)=>{
                                return <li key={i}>{item}</li>
                            })
                        }
                    </ul>
                    <div id="sub">
                    <input type="text" placeholder="add new Medication" value={this.state.mid} onChange={this.onChangemid.bind(this)}></input>
                    <button id="add" onClick={this.add.bind(this)}>Add</button>
                    </div>
                    <button id="save" onClick={this.save.bind(this)}>Save</button>
                </div>
            </div>

        )
    }

}
ReactDOM.render(<App></App>, document.getElementById("add"))

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
        this.state = {
            Medication: []
        }
        firebase.firestore().collection('Medication').onSnapshot((snapshot) => {
            let mid = []

            snapshot.forEach((doc) => {
                mid.push(doc.data())
                this.setState({
                    Medication: mid
                })
            })
            console.log(this.state.Medication)

        })
    }
    humanReadableTime(dateString) {
        let d = new Date();
        d.setTime(Number(dateString));
        return d.getDay() + '/' + d.getMonth() + '/' + d.getFullYear() ;
    }
    render() {
        return (
            <div>

                <nav className="navbar navbar-light bg-light" >
                    <div>
                        <img src={logo} width="50" height="50" className="d-inline-block align-top" alt=""></img>
                        <a className="navbar-brand" href="index.html"><h3>Home</h3></a>
                        <a className="navbar-brand" href="add.html">Add</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                    {
                        this.state.Medication.map((item,i)=>{

                            return <div className="col-lg-4">
                            <div className="card">
                                <div className="card-header">
                                    <h4>{item.name}</h4>
                                    <time>{this.humanReadableTime(item.date)}</time>
                                </div>
                                <div className="card-body">
                                    <ul>
                                        {item.mid.map(i=>{
                                            return<li>{i}</li>
                                        })}
                                    </ul>
                                    <div id="pdf">
                                        <p>الدكتور<br /> محمد كنعان</p>
                                        <button style={{color:'#ffff'}}>PDF</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        })
                    }
                       
                    </div>

                </div>

            </div>
        )
    }

}
ReactDOM.render(<App></App>, document.getElementById("root"))

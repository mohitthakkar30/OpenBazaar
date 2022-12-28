import First from '../components/First';
import Second from '../components/Second';
import Footer from '../components/Footer';
import Third from '../components/Third';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Redirect,
//   } from "react-router-dom";

export default function Home() {
    return(
        // <Router>
        // <Switch>
        <div>
        {/* <Route exact path="/" component={First} /> */}
            <First />
            {/* <Second />
            <Third />
            <Footer /> */}
        </div>
        // </Switch>
        // </Router>
    )
}
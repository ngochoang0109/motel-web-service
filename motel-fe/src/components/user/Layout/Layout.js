import { Fragment } from "react";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import { Route, Routes } from "react-router-dom";


const Layout = () => {
    return (
        <Fragment>
            <Routes>
                <Route path="/" element={
                    <>
                        <NavBar/>
                        <Footer></Footer>
                    </>}>
                </Route>
            
                
            </Routes>

        </Fragment>
    )
}

export default Layout;
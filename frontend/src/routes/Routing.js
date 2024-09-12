import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/layouts/Header';
import Leftnav from '../components/layouts/Leftnav';
import Index from '../components/pages/dashboard/Index';
import Listfaq from '../components/pages/faqs/Listfaq';
import Listdepartment from '../components/pages/departments/Listdepartment';
import Listdocument from '../components/pages/document/Listdocument';
import Leave from '../components/pages/leave/Leave';
import Footer from '../components/layouts/Footer';
import Emp from '../components/pages/employe/emp';
import Addemp from '../components/pages/employe/addemp';
import PolicyForm from '../components/pages/policy/addpolicy';
import Policy from '../components/pages/policy/policy';
import Addpolicy from '../components/pages/policy/addpolicy';
function Routing() {
    return (
        <Router>
            <div class="container-scroller">
                <Header />
                <div class="container-fluid page-body-wrapper">
                    <Leftnav />
                    <div class="main-panel">
                        <div class="content-wrapper">
                            <Routes>
                                <Route path="/" element={<Index />} />
                                <Route path="/emp" element={<Emp />} />
                                <Route path="/addemp" element={<Addemp />} />
                                <Route path="/Listfaq" element={<Listfaq />} />
                                <Route path="/Listdepartment" element={<Listdepartment />} />
                                <Route path="/Listdocument" element={<Listdocument />} />
                                <Route path="/leave" element={<Leave />} />
                                <Route path="/policy" element={<Policy/>} />
                                <Route path="/addpolicy" element={<Addpolicy/>} />


                            </Routes>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </Router>

    );
}

export default Routing;

import React from 'react';
import Footer from '../pages/Footer';
import Teampage1 from '../pages/Teampage1';
import Gallery from '../pages/Gallery';
const TeamPage=()=>{
    return(
 <>
 {/* <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container py-5">
            <h1 class="display-1 text-white animated slideInDown">Members</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-white" href="#">Home</a></li>
                    <li class="breadcrumb-item"><a class="text-white" href="#">Pages</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Members</li>
                </ol>
            </nav>
        </div>
    </div> */}
<Teampage1/>
<Gallery/>
 <Footer/>
</>
);
}
export default TeamPage;
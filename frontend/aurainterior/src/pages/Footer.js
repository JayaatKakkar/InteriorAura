import {Link} from 'react-router-dom'
 
const Footer=()=>{
    return(
        <>
<div class="container-fluid bg-dark text-body footer mt-5 pt-5 px-0 wow fadeIn" data-wow-delay="0.1s">
    <div class="container py-5">
        <div class="row g-5">
            <div class="col-lg-3 col-md-6">
                <h3 class="text-light mb-4">Address</h3>
                <p class=" text-light mb-2"><i class="fa fa-map-marker-alt text-primary me-3"></i>Kot Mit Singh,Tarn Taran ,Amritsar</p>
                <p class=" text-light mb-2"><i class="fa fa-phone-alt text-primary me-3"></i>+91 7707994236</p>
                <p class="text-light mb-2"><i class="fa fa-envelope text-primary me-3"></i>Interioraura267@gmail.com</p>
                <div class="d-flex pt-2">
                    <a class="btn btn-square btn-outline-body me-1" href=""><i class="fab fa-twitter"></i></a>
                    <a class="btn btn-square btn-outline-body me-1" href=""><i class="fab fa-facebook-f"></i></a>
                    <a class="btn btn-square btn-outline-body me-1" href=""><i class="fab fa-youtube"></i></a>
                    <a class="btn btn-square btn-outline-body me-0" href=""><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <h3 class="text-light mb-4">Services</h3>
                <a class="btn btn-link" href="">Architecture</a>
                <a class="btn btn-link" href="">3D Animation</a>
                <a class="btn btn-link" href="">House Planning</a>
                <a class="btn btn-link" href="">Interior Design</a>
                <a class="btn btn-link" href="">Construction</a>
            </div>
            <div class="col-lg-3 col-md-6">
                <h3 class="text-light mb-4">Quick Links</h3>
                <a class="btn btn-link" href="">About Us</a>
                <a class="btn btn-link" href="">Contact Us</a>
                <a class="btn btn-link" href="">Our Services</a>
                <a class="btn btn-link" href="">Terms & Condition</a>
                <a class="btn btn-link" href="">Support</a>
                <Link to="http://localhost:3000/login" class="btn btn-link" href=""  target='_blank'>Admin Login</Link>
                <Link to="http://localhost:3002/login" class="btn btn-link" href=""  target='_blank'>Architect Login</Link>
                <Link to="http://localhost:3003/login" class="btn btn-link" href=""  target='_blank'>Vendor Login</Link>

            </div>
            <div class="col-lg-3 col-md-6">
                <h3 class="text-light mb-4">Newsletter</h3>
                {/* <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p> */}
                <div class="position-relative mx-auto" style={{maxWidth: 400}}>
                    <input class="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email"/>
                    <button type="button" class="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                </div>
            </div>
        </div>
    </div>
    {/* <div class="container-fluid copyright">
        <div class="container">
            <div class="row">
                <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                    &copy; <a href="#">Your Site Name</a>, All Right Reserved.
                </div>
                <div class="col-md-6 text-center text-md-end">
                    Designed By <a href="https://htmlcodex.com">HTML Codex</a>
                    <br/> Distributed By: <a class="border-bottom" href="https://themewagon.com" target="_blank">ThemeWagon</a>
                </div>
            </div>
        </div>
    </div> */}
</div>
</>
    );
    }
    export default Footer;
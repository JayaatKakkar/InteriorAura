const Team = () => {
    return (
        <>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 600 }}>
                        <h4 className="section-title">Team Members</h4>
                        <h1 className="display-5 mb-4">We Are Creative Architecture Team For Your Dream Home</h1>
                    </div>
                    <div className="row g-0 team-items">
                        {/* First Team Member */}
                        <div className="col-lg-4 col-md-6 col-12 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="team-item position-relative">
                                <div className="position-relative">
                                    <img className="img-fluid" src="img/team1.jpg" alt="" />
                                    <div className="team-social text-center">
                                        <a className="btn btn-square" href=""><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-square" href=""><i class="fa fa-phone-alt"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                                <div className="bg-light text-center p-4">
                                    <h3 className="mt-2">Sr.Kiranjit Singh</h3>
                                    <span className="text-primary" style={{ fontSize: "24px" }}>Space Planner</span>
                                </div>
                            </div>
                        </div>

                        {/* Second Team Member */}
                        <div className="col-lg-4 col-md-6 col-12 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="team-item position-relative">
                                <div className="position-relative">
                                    <img className="img-fluid" src="img/team-2.jpg" alt="" />
                                    <div className="team-social text-center">
                                        <a className="btn btn-square" href=""><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-square" href=""><i class="fa fa-phone-alt"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                                <div className="bg-light text-center p-4">
                                    <h3 className="mt-2">Sr.Charanjit Singh</h3>
                                    <span className="text-primary" style={{ fontSize: "24px" }}>Space Planner</span>
                                </div>
                            </div>
                        </div>

                        {/* Third Team Member */}
                        <div className="col-lg-4 col-md-6 col-12 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="team-item position-relative">
                                <div className="position-relative">
                                    <img className="img-fluid" src="img/team-3.jpg" alt="" />
                                    <div className="team-social text-center">
                                        <a className="btn btn-square" href=""><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-square" href=""><i class="fa fa-phone-alt"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                                <div className="bg-light text-center p-4">
                                    <h3 className="mt-2">Sr.Paramjit Singh</h3>
                                    <span className="text-primary"  style={{ fontSize: "24px" }}>Space Planners</span>
                                </div>
                            </div>
                        </div>
                        {/* Fourth Team Member */}
                        <div className="col-lg-4 col-md-6 col-12 wow fadeInUp" data-wow-delay="0.7s">
                            <div className="team-item position-relative">
                                <div className="position-relative">
                                    <img className="img-fluid" src="img/team-4.png" alt="" />
                                    <div className="team-social text-center">
                                        <a className="btn btn-square" href=""><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-square" href=""><i class="fa fa-phone-alt"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                                <div className="bg-light text-center p-4">
                                    <h3 className="mt-2">Arshdeep Singh</h3>
                                    <span className="text-primary"  style={{ fontSize: "24px" }}>Interior Architect</span>
                                </div>
                            </div>
                        </div>

                        {/* Fifth Team Member */}
                        <div className="col-lg-4 col-md-6 col-12 wow fadeInUp" data-wow-delay="0.7s">
                            <div className="team-item position-relative">
                                <div className="position-relative">
                                    <img className="img-fluid" src="img/team-4.jpg" alt="" />
                                    <div className="team-social text-center">
                                        <a className="btn btn-square" href=""><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-square" href=""><i class="fa fa-phone-alt"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                                <div className="bg-light text-center p-4">
                                    <h3 className="mt-2">Damandeep Singh</h3>
                                    <span className="text-primary"  style={{ fontSize: "24px" }}>Interior Stylist</span>
                                </div>
                            </div>
                        </div>

                        {/* Sixth Team Member */}
                          <div className="col-lg-4 col-md-6 col-12 wow fadeInUp" data-wow-delay="0.7s">
                            <div className="team-item position-relative">
                                <div className="position-relative">
                                    <img className="img-fluid" src="img/team-5.png" alt="" />
                                    <div className="team-social text-center">
                                        <a className="btn btn-square" href=""><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-square" href=""><i class="fa fa-phone-alt"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                                <div className="bg-light text-center p-4">
                                    <h3 className="mt-2">Bikramjit Singh</h3>
                                    <span className="text-primary"  style={{ fontSize: "24px" }}>Design Consultant</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Team;

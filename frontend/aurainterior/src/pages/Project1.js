const Project1=()=>{
return(
 <>
        <div class="container-xxl project py-5">
            <div class="container">
                 <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: 600}}>
                    <h4 class="section-title">Our Projects</h4>
                    <h1 class="display-5 mb-4">Visit Our Latest Projects And Our Innovative Works</h1>
                 </div>
                 <div class="tab">
  <button class="tablinks" onmouseover="openCity(event, 'London')">London</button>
  <button class="tablinks" onmouseover="openCity(event, 'Paris')">Paris</button>
  <button class="tablinks" onmouseover="openCity(event, 'Tokyo')">Tokyo</button>
</div>

<div id="London" class="tabcontent">
  <h3>London</h3>
  <p>London is the capital city of England.</p>
</div>

<div id="Paris" class="tabcontent">
  <h3>Paris</h3>
  <p>Paris is the capital of France.</p>
</div>

<div id="Tokyo" class="tabcontent">
  <h3>Tokyo</h3>
  <p>Tokyo is the capital of Japan.</p>
</div>
<script>
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
</script>
              </div>
        </div>
</>

);
}
export default Project1;
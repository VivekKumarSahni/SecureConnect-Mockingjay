import React from 'react';

function Helpline() {
  // Existing code...

  return (
    <div>
      {/* Existing JSX... */}

      {/* Helpline and Emergency Numbers Section */}
      <section class="bg-light text-dark py-5" id="helpline">
  <div class="container">
    <h2 class="text-center mb-4">Emergency Helpline Numbers</h2>
    <p class="text-center">Keep these numbers handy in case of emergencies.</p>
    
    <div class="row">
      {/* National Disaster Helpline */}
      <div class="col-md-4">
        <div class="card mb-4" style={{ backgroundImage: 'url(/images/disaster-help.jpg)', backgroundSize: 'cover' }}>
          <div class="card-body text-white">
            <h5 class="card-title">National Disaster Helpline</h5>
            <p class="card-text">Phone: 1078</p>
            <p class="card-text">Toll-free: 1-800-800-2020</p>
          </div>
        </div>
      </div>

      {/* Fire and Emergency Services */}
      <div class="col-md-4">
        <div class="card mb-4" style={{ backgroundImage: 'url(/images/fire-emergency.jpg)', backgroundSize: 'cover' ,backgroundPosition:'bottom'}}>
          <div class="card-body text-white">
            <h5 class="card-title">Fire and Emergency Services</h5>
            <p class="card-text">Phone: 101</p>
            <p class="card-text">Phone (Emergency): +91-11-23093554</p>
          </div>
        </div>
      </div>
     
      {/* Medical Emergency */}
      <div class="col-md-4">
        <div class="card mb-4" style={{ backgroundImage: 'url(/images/medical-emergency.jpg)', backgroundSize: 'cover' }}>
          <div class="card-body text-white">
            <h5 class="card-title">Medical Emergency</h5>
            <p class="card-text">Phone: 102</p>
            <p class="card-text">Toll-free: 108 (Ambulance)</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      {/* Police */}
      <div class="col-md-4">
        <div class="card mb-4" style={{ backgroundImage: 'url(/images/police-emergency.jpg)', backgroundSize: 'cover' }}>
          <div class="card-body text-white">
            <h5 class="card-title">Police</h5>
            <p class="card-text">Phone: 100</p>
          </div>
        </div>
      </div>

      {/* Child Helpline */}
      <div class="col-md-4">
        <div class="card mb-4" style={{ backgroundImage: 'url(/images/child-helpline.jpg)', backgroundSize: 'cover' ,backgroundPosition:'center'}}>
          <div class="card-body text-white">
            <h5 class="card-title">Child Helpline</h5>
            <p class="card-text">Phone: 1098</p>
          </div>
        </div>
      </div>

      {/* Coast Guard Emergency */}
      <div class="col-md-4">
        <div class="card mb-4" style={{ backgroundImage: 'url(/images/coast-guard-emergency.jpg)', backgroundSize: 'cover' }}>
          <div class="card-body text-white">
            <h5 class="card-title">Coast Guard Emergency</h5>
            <p class="card-text">Phone: 1554</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      

      {/* Bootstrap JavaScript (Popper.js and Bootstrap JS) */}
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.min.js"></script>
    </div>
  );
}

export default Helpline;

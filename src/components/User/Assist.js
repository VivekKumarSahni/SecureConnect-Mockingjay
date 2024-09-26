// import React, { useState } from "react";
// import { Button, Modal, Card, Row, Col, Container, Carousel } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const AlertList = ({ alerts }) => {
//   const [selectedAlert, setSelectedAlert] = useState(null); // For tracking selected alert
//   const [showModal, setShowModal] = useState(false); // To manage modal state

//   // Function to open the modal with the clicked alert's details
//   const openModal = (alert) => {
//     setSelectedAlert(alert);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedAlert(null);
//   };

//   // Sample images for carousel (you can replace these with real images or image URLs)
//   const sampleImages = [
//     "/images/fire-emergency.jpg",
//     "/images/coast-guard-emergency.jpg",
//     "/images/police-emergency.jpg"
//   ];

//   return (
//     <Container className="mt-12  ">
//       {/* <h2 className="mb-4 text-center text-primary">Active Emergency Alerts</h2> */}
//       {alerts.map((alert, index) => (
//         <Row 
//           key={index} 
//           className={`g-4 mb-4 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}
//           style={{
//             background: index % 2 === 0 ? 'linear-gradient(135deg, #e0f7fa, #20c997)' : 'linear-gradient(135deg,#cfcfcf ,#f0f4c3)',
//             borderRadius: '12px',
//             padding: '20px',
//             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//             transition: 'transform 0.3s',
//             cursor: 'pointer'
//           }}
//           onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
//           onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
//         >
//           {/* Carousel with fixed size */}
//           <Col xs={12} md={6}>
//             <Carousel interval={null}>
//               {sampleImages.map((image, imgIndex) => (
//                 <Carousel.Item key={imgIndex}>
//                   <img
//                     className="d-block w-100"
//                     src={image}
//                     alt={`Slide ${imgIndex + 1}`}
//                     style={{ objectFit: 'cover', height: '300px', borderRadius: '10px' }}
//                   />
//                 </Carousel.Item>
//               ))}
//             </Carousel>
//           </Col>

//           {/* Details */}
//           <Col xs={12} md={6} className="d-flex align-items-center">
//             <div>
//               <h3 className="text-dark">🚨 Emergency Alert</h3>
//               <p className="text-dark"><strong>Location:</strong> {alert.Address}</p>
//               <p className="text-secondary"><strong>Description:</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
//               <Button variant="primary" onClick={() => openModal(alert)}>
//                 View Details
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       ))}

//       {/* Modal for showing alert details */}
//       <Modal show={showModal} onHide={closeModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Alert Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedAlert && (
//             <>
//               <p><strong>Address:</strong> {selectedAlert.Address}</p>
//               <p><strong>Description:</strong> This is a critical alert that requires immediate attention. Please take necessary actions.</p>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={() => alert('Applied as Volunteer')}>
//             Apply as Volunteer
//           </Button>
//           <Button variant="success" onClick={() => alert('Help Financially')}>
//             Help Financially
//           </Button>
//           <Button variant="secondary" onClick={closeModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// // Example usage of the component
// const alerts = [
//   { Address: "Bhangagarh, Dispur, Kamrup Metropolitan District, Assam, 781005, India" },
//   { Address: "Paltan Bazaar, Guwahati, Assam, 781001, India" },
//   { Address: "Pan Bazaar, Guwahati, Assam, 781001, India" },
//   { Address: "Pan Bazaar, Guwahati, Assam, 781001, India" },
// ];

// export default function App() {
//   return <AlertList alerts={alerts} />;
// }

import React, { useState } from "react";
import { Button, Modal, Row, Col, Container, Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FixedSizeList as List } from "react-window";

const AlertList = ({ alerts }) => {
  const [selectedAlert, setSelectedAlert] = useState(null); // For tracking selected alert
  const [showModal, setShowModal] = useState(false); // To manage modal state

  // Function to open the modal with the clicked alert's details
  const openModal = (alert) => {
    setSelectedAlert(alert);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAlert(null);
  };

  // Sample images for carousel (you can replace these with real images or image URLs)
  const sampleImages = [
    "/images/fire-emergency.jpg",
    "/images/coast-guard-emergency.jpg",
    "/images/police-emergency.jpg"
  ];

  // Item renderer function for react-window's FixedSizeList
  const renderRow = ({ index, style }) => {
    const alert = alerts[index];
    return (
      <div style={style} key={index}>
        <Row
          className={`g-4 mb-4 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}
          style={{
            background: index % 2 === 0 ? 'linear-gradient(135deg, #e0f7fa, #20c997)' : 'linear-gradient(135deg,#cfcfcf ,#f0f4c3)',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            margin: '0',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Carousel with fixed size */}
          <Col xs={12} md={6}>
            <Carousel interval={null}>
              {sampleImages.map((image, imgIndex) => (
                <Carousel.Item key={imgIndex}>
                  <img
                    className="d-block w-100"
                    src={image}
                    alt={`Slide ${imgIndex + 1}`}
                    style={{ objectFit: 'cover', height: '300px', borderRadius: '10px' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>

          {/* Details */}
          <Col xs={12} md={6} className="d-flex align-items-center">
            <div style={{ width: '100%' }}>
              <h3 className="text-dark">🚨 Emergency Alert</h3>
              <p className="text-dark"><strong>Location:</strong> {alert.Address}</p>
              <p className="text-secondary">
                <strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Button variant="primary" onClick={() => openModal(alert)}>
                View Details
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <Container className="mt-12" style={{ overflowX: 'hidden', padding: '0' }}>
      {/* Alert List using react-window */}
      <List
        height={700} // Set the height of the window
        itemCount={alerts.length} // Total number of alerts
        itemSize={360} // Height of each item (adjusted for better content fit)
        width="100%" // Width of the window
      >
        {renderRow}
      </List>

      {/* Modal for showing alert details */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Alert Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAlert && (
            <>
              <p><strong>Address:</strong> {selectedAlert.Address}</p>
              <p><strong>Description:</strong> This is a critical alert that requires immediate attention. Please take necessary actions.</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => alert('Applied as Volunteer')}>
            Apply as Volunteer
          </Button>
          <Button variant="success" onClick={() => alert('Help Financially')}>
            Help Financially
          </Button>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

// Example usage of the component
const alerts = [
  { Address: "Bhangagarh, Dispur, Kamrup Metropolitan District, Assam, 781005, India" },
  { Address: "Paltan Bazaar, Guwahati, Assam, 781001, India" },
  { Address: "Pan Bazaar, Guwahati, Assam, 781001, India" },
  { Address: "Pan Bazaar, Guwahati, Assam, 781001, India" },
];

export default function App() {
  return <AlertList alerts={alerts} />;
}

import React from "react";
import "./guide.css";
export const GuideBlog = (props) => {
  const { blog } = props;//#009688
  if (blog === "guide") {
    return (
      <>
        <div class="card text-bg-dark mb-3" style={{ marginTop: "2rem"  }} >
          <div class="card-header" style={{backgroundColor: "198754"}}>
            <h3>Guidelines</h3>
          </div>
          <div class="card-body" style={{backgroundColor: "198754"}}>
            {/* <h5 class="card-title">Primary card title</h5> */}
            <p class="card-text">
              <div>
                {/* Before a Disaster */}
                <h4>Before a Disaster:</h4>
                <ul>
                  <li className="line">
                    Emergency Kit: Prepare an emergency kit with essential
                    supplies, including non-perishable food, water, a
                    flashlight, batteries, a first-aid kit, medications,
                    important documents, and personal hygiene items.
                  </li>
                  <li className="line">
                    Communication Plan: Establish a communication plan with your
                    family and loved ones. Ensure everyone knows how to contact
                    each other in case of separation.
                  </li>
                  <li className="line">
                    Emergency Contacts: Have a list of emergency contacts,
                    including local authorities, hospitals, and utility
                    companies, readily available.
                  </li>
                  <li className="line">
                    Evacuation Plan: Familiarize yourself with evacuation routes
                    and shelters in your area. Plan how you will evacuate,
                    including transportation and meeting points.
                  </li>
                  <li className="line">
                    Home Safety: Secure heavy furniture, appliances, and objects
                    that could become projectiles during strong winds or
                    earthquakes.
                  </li>
                  <li className="line">
                    Insurance: Review your insurance policies, including
                    homeowners or renters insurance, and ensure they cover
                    potential disasters in your area.
                  </li>
                  <li className="line">
                    Alert Systems: Sign up for local emergency alerts and
                    warnings provided by authorities through apps or text
                    messages.
                  </li>
                </ul>
                {/* During a Disaster */}
                <h4>During a Disaster:</h4>
                <ul>
                  <li className="line">
                    Stay Informed: Keep a battery-powered or hand-crank radio to
                    stay updated on the situation through local news and
                    official alerts.
                  </li>
                  <li className="line">
                    Follow Orders: Follow evacuation orders issued by local
                    authorities promptly. Don't wait until the last minute.
                  </li>
                  <li className="line">
                    Safe Shelter: Seek shelter in the safest location possible,
                    away from windows and outside walls. In some cases, it may
                    be best to shelter in place.
                  </li>
                  <li className="line">
                    Emergency Kit: Use your emergency kit for sustenance and
                    medical needs.
                  </li>
                  <li className="line">
                    Communication: Keep in touch with family and friends if
                    possible. Let them know you are safe.
                  </li>
                  <li className="line">
                    Utilities: Turn off utilities (gas, water, electricity) if
                    instructed to do so or if you suspect damage. Be cautious
                    when using alternative heating or cooking sources.
                  </li>
                </ul>

                {/* After a Disaster */}
                <h4>After a Disaster:</h4>
                <ul>
                  <li className="line">
                    Safety Check: Check yourself and those around you for
                    injuries. Provide first aid as needed.
                  </li>
                  <li className="line">
                    Property Safety: Inspect your home for structural damage and
                    hazards before entering.
                  </li>
                  <li className="line">
                    Water and Food: Conserve resources, as it may take time for
                    utilities to be restored. Use stored food and water.
                  </li>
                  <li className="line">
                    Utilities: Do not turn utilities back on until authorities
                    confirm it is safe to do so.
                  </li>
                  <li className="line">
                    Avoid Hazards: Be cautious of downed power lines,
                    floodwaters, and unstable structures.
                  </li>
                  <li className="line">
                    Help Others: Assist neighbors and those in need if it is
                    safe to do so.
                  </li>
                  <li className="line">
                    Documentation: Document damage with photographs for
                    insurance claims.
                  </li>
                  <li className="line">
                    Stay Informed: Continue to listen to local news and
                    authorities for updates and instructions.
                  </li>
                  <li className="line">
                    Emotional Support: Seek emotional support from friends,
                    family, or mental health professionals as needed.
                  </li>
                  <li className="line">
                    Recovery: Follow recovery guidelines provided by local
                    authorities and community organizations.
                  </li>
                </ul>
              </div>
            </p>
          </div>
        </div>
      </>
    );
  }
  if (blog === "tools") {
    return (
      <>
        <div class="card text-bg-dark mb-3" style={{ margin: "2rem" }}>
          <div class="card-header">
            <h3>Support and Tools</h3>
          </div>
          <div class="card-body">
            {/* <h5 class="card-title">Primary card title</h5> */}
            <p class="card-text">
              <div>
                <section>
                  <h4>Early Warning Systems</h4>
                  <p>
                    Early warning systems are critical for detecting natural
                    disasters in advance and providing timely alerts to
                    communities.
                  </p>
                </section>
                <section>
                  <h4>Geographic Information Systems (GIS)</h4>
                  <p>
                    GIS technology helps in mapping and analyzing disaster-prone
                    areas, infrastructure, and evacuation routes.
                  </p>
                </section>

                <section>
                  <h4>Emergency Alert Systems</h4>
                  <p>
                    Emergency alert systems broadcast warnings and information
                    to the public through various channels.
                  </p>
                </section>

                <section>
                  <h4>Disaster Management Software</h4>
                  <p>
                    Specialized software aids in planning and managing disaster
                    response efforts, including resource allocation and
                    logistics.
                  </p>
                </section>

                <section>
                  <h4>Communication and Coordination Tools</h4>
                  <p>
                    Communication tools and incident command systems facilitate
                    real-time coordination among response teams and agencies.
                  </p>
                </section>

                <section>
                  <h4>Weather Forecasting and Monitoring Tools</h4>
                  <p>
                    Advanced weather forecasting tools provide up-to-date
                    information on weather patterns and severe weather events,
                    enabling early response.
                  </p>
                </section>
                <section>
                  <h4>Search and Rescue Equipment</h4>
                  <p>
                    Search and rescue teams use specialized equipment like
                    drones, K-9 units, and rope rescue gear to locate and rescue
                    survivors in disaster-stricken areas.
                  </p>
                </section>

                <section>
                  <h4>Emergency Medical Services</h4>
                  <p>
                    Ambulances and medical teams are essential for providing
                    medical care to injured individuals during and after
                    disasters.
                  </p>
                </section>

                <section>
                  <h4>Shelter and Relief Supplies</h4>
                  <p>
                    Temporary shelters, tents, and relief supplies such as food,
                    water, blankets, and medical kits are critical for providing
                    immediate assistance to disaster survivors.
                  </p>
                </section>

                <section>
                  <h4>Humanitarian Assistance and NGOs</h4>
                  <p>
                    Non-Governmental Organizations (NGOs) and international
                    organizations play a vital role in providing humanitarian
                    aid, including food, water, and medical assistance, to
                    affected populations.
                  </p>
                </section>

                <section>
                  <h4>Government Agencies and Emergency Services</h4>
                  <p>
                    Local, state, and national government agencies, including
                    fire departments, police, and emergency medical services,
                    are at the forefront of disaster response and recovery
                    efforts.
                  </p>
                </section>
              </div>
            </p>
          </div>
        </div>
      </>
    );
  }
  if (blog === "news") {
    return (
      <>
        <div class="card text-bg-dark mb-3" style={{ margin: "2rem" }}>
          <div class="card-header">
            <h3>News and Updates</h3>
          </div>
          <div class="card-body">
            {/* <h5 class="card-title">Primary card title</h5> */}
            <p class="card-text">
              <div>
                <h4>Massive Earthquake Strikes Coastal Region</h4>
                <p>Date: September 15, 2023</p>
                <p>Location: Coastal City, Country X</p>
                <p>
                  Summary: A powerful earthquake with a magnitude of 7.2 has hit
                  the coastal region, causing widespread damage and triggering a
                  tsunami warning.
                </p>

                <h4>Floods Devastate Multiple Villages</h4>
                <p>Date: August 28, 2023</p>
                <p>Location: Region Y, Country Z</p>
                <p>
                  Summary: Heavy monsoon rains have led to severe flooding in
                  several villages, displacing thousands and prompting rescue
                  operations.
                </p>

                <h4>Wildfire Threatens National Park</h4>
                <p>Date: July 10, 2023</p>
                <p>Location: National Park A, Country W</p>
                <p>
                  Summary: A massive wildfire is rapidly spreading in National
                  Park A, threatening local wildlife and vegetation.
                </p>

                <h4>Hurricane Warning Issued for Coastal Areas</h4>
                <p>Date: June 3, 2023</p>
                <p>Location: Coastal City B, Country V</p>
                <p>
                  Summary: Meteorologists have issued a hurricane warning for
                  coastal areas as a powerful storm approaches, urging residents
                  to prepare for evacuation.
                </p>

                <h4>Tornado Touches Down in Rural Town</h4>
                <p>Date: April 14, 2023</p>
                <p>Location: Rural Town C, Country U</p>
                <p>
                  Summary: A tornado touched down in Rural Town C, causing
                  significant damage to homes and infrastructure.
                </p>
              </div>
            </p>
          </div>
        </div>
      </>
    );
  }
};

'use client';

import { useState, useEffect } from 'react';
import styles from './ServicePage.module.css';

const ServicePage = ({ service }) => {
  const [serviceData, setServiceData] = useState(null);

  useEffect(() => {
    if (!service) {
      fetchServiceData();
    } else {
      setServiceData(service);
    }
  }, [service]);

  const fetchServiceData = async () => {
    const id = window.location.pathname.split('/').pop(); // Get ID from URL
    try {
      const response = await fetch(`/api/services/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch service');
      }
      const data = await response.json();
      setServiceData(data);
    } catch (error) {
      console.error('Error fetching service:', error);
    }
  };

  if (!serviceData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const skillList = serviceData.skills ? serviceData.skills.split(',').map(skill => skill.trim()) : [];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {serviceData.coverImage && (
          <img
            src={serviceData.coverImage}
            alt="Cover"
            className={styles.coverImage}/>
        )}
      </header>

      <section className={styles.profileSection}>
        {serviceData.img && (
          <img
            src={serviceData.img}
            alt={serviceData.name}
            className={styles.profileImage}
          />
        )}
        <div className={styles.profileInfo}>
          {serviceData.name && <h1 className={styles.name}>{serviceData.name}</h1>}
          {serviceData.title && <h2 className={styles.title}>{serviceData.title}</h2>}
        </div>
      </section>

      {serviceData.desc && (
        <section className={styles.descriptionSection}>
          <h2 className={styles.sectionTitle}>Description</h2>
          <p className={styles.description}>{serviceData.desc}</p>
        </section>
      )}

      {serviceData.about && (
        <section className={styles.aboutSection}>
          <h2 className={styles.sectionTitle}>About</h2>
          <p className={styles.about}>{serviceData.about}</p>
        </section>
      )}

      {serviceData.experience && (
        <section className={styles.experienceSection}>
          <h2 className={styles.sectionTitle}> 
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg}
              viewBox="0 0 24 24"width="24"height="24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"className={styles.experienceIcon}>
               <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 3h-8v4h8V3z"></path>
              </svg>
            Experience
          </h2>
          <p className={styles.experience}>{serviceData.experience}</p>
        </section>
      )}

      {serviceData.education && (
        <section className={styles.educationSection}>
          <h2 className={styles.sectionTitle}>
          <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" width="24" height="24"
          fill="none"stroke="currentColor"strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"className={styles.educationIcon}>
          <path d="M12 3L1 9l11 6 9-5.14V16a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2"></path>
          <polyline points="22 9 12 15 2 9"></polyline></svg>
            Education
          </h2>
          <p className={styles.education}>{serviceData.education}</p>
        </section>
      )}

      {serviceData.language && (
        <section className={styles.languageSection}>
          <h2 className={styles.sectionTitle}>
          <svg width={ "30"} height={ "30"} className={styles.svg} xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 350.259"><path fill="#DC5045" d="M235.685 65.227L46.41 49.97C21.075 47.927-2.386 70.906.195 96.184l15.258 149.398c2.581 25.276 20.808 46.211 46.214 46.211h48.071l71.816 58.466-5.192-58.466h59.323c25.411 0 46.215-20.793 46.215-46.211v-134.14c0-25.421-20.88-44.172-46.215-46.215z"/><path fill="#2278D2" d="M276.315 15.385L465.59.127c25.335-2.042 48.796 20.936 46.215 46.214l-15.258 149.398c-2.581 25.277-20.807 46.211-46.215 46.211h-50.099l-71.816 58.466 5.191-58.466h-57.293c-25.411 0-46.215-20.793-46.215-46.211V61.599c0-25.421 20.879-44.172 46.215-46.214z"/><path fill="#fff" d="M88.292 119.662h40.712V108.19h18.188v11.472h40.859v18.833h-8.388c-1.513 11.897-4.839 21.7-10.491 32.267-4.781 8.924-10.954 17.522-18.123 25.762 11.441 13.684 25.645 25.588 42.556 36.44l-9.354 14.58c-17.755-11.391-32.833-23.934-45.224-38.382-11.084 10.723-23.676 20.712-36.865 29.834l-9.833-14.231c13.052-9.031 25.451-18.894 36.12-29.412-9.833-14.386-17.363-30.532-22.574-49.1l16.686-4.679c4.272 15.23 10.263 28.636 17.963 40.636 5.253-6.359 9.796-12.885 13.384-19.586 4.401-8.233 6.765-15.04 8.255-24.129H88.292v-18.833zM396.834 158.594h-52.699l-7.476 25.514h-30.38c12.19-32.265 26.267-71.008 38.463-103.289 4.392-11.659 9.391-30.98 25.365-30.98 16.559 0 22.058 17.702 26.665 29.932l39.049 104.864h-31.278l-7.709-26.041zm-6.101-24.81l-20.177-54.492-20.252 54.492h40.429z"/></svg>
            Languages
          </h2>
          <p className={styles.language}>{serviceData.language}</p>
        </section>
      )}

      {serviceData.skills && (
        <section className={styles.skillsSection}>
          <h2 className={styles.sectionTitle}>
          <svg className={styles.svg}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"fill="currentColor" width={ "24"} height={ "24"}>
           <path d="M12 3.5l2.12 4.29 4.74.69-3.42 3.34.81 4.72-4.25-2.24-4.25 2.24.81-4.72-3.42-3.34 4.74-.69L12 3.5zm0-1a1 1 0 0 0-.9.55L8.64 7.7l-4.92.71a1 1 0 0 0-.55 1.7l3.56 3.47-.84 4.91a1 1 0 0 0 1.45 1.05l4.4-2.32 4.4 2.32a1 1 0 0 0 1.45-1.05l-.84-4.91 3.56-3.47a1 1 0 0 0-.55-1.7l-4.92-.71-2.46-4.65a1 1 0 0 0-.9-.55z" />
          </svg>
            Skills
          </h2>
          <div className={styles.skills}>
            {skillList.map((skill, index) => (
              <div key={index} className={styles.skillBubble}>
                {skill}
              </div>
            ))}
          </div>
        </section>
      )}

      {serviceData.totalClients && (
        <section className={styles.totalClientSection}>
          <h2 className={styles.sectionTitle}>Total Clients</h2>
          <p className={styles.totalClients}>{serviceData.totalClients}</p>
        </section> )}

      <section className={styles.contactSection}>
        <h2 className={styles.sectionTitle}>
         
        <svg className={styles.svg}
          fill={ "#000000"} height={ "24px"} width={"24px"}  version="1.1" id="Capa_1"xmlns="http://www.w3.org/2000/svg"viewBox="0 0 473.806 473.806"  >
          <g>
            <path d="M374.456,293.506c-9.7-10.1-21.4-15.5-33.8-15.5c-12.3,0-24.1,5.3-34.2,15.4l-31.6,31.5c-2.6-1.4-5.2-2.7-7.7-4c-3.6-1.8-7-3.5-9.9-5.3c-29.6-18.8-56.5-43.3-82.3-75c-12.5-15.8-20.9-29.1-27-42.6c8.2-7.5,15.8-15.3,23.2-22.8c2.8-2.8,5.6-5.7,8.4-8.5c21-21,21-48.2,0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5c-6-6.2-12.3-12.6-18.8-18.6c-9.7-9.6-21.3-14.7-33.5-14.7s-24,5.1-34,14.7c-0.1,0.1-0.1,0.1-0.2,0.2l-34,34.3c-12.8,12.8-20.1,28.4-21.7,46.5c-2.4,29.2,6.2,56.4,12.8,74.2c16.2,43.7,40.4,84.2,76.5,127.6c43.8,52.3,96.5,93.6,156.7,122.7c23,10.9,53.7,23.8,88,26c2.1,0.1,4.3,0.2,6.3,0.2c23.1,0,42.5-8.3,57.7-24.8c0.1-0.2,0.3-0.3,0.4-0.5c5.2-6.3,11.2-12,17.5-18.1c4.3-4.1,8.7-8.4,13-12.9c9.9-10.3,15.1-22.3,15.1-34.6c0-12.4-5.3-24.3-15.4-34.3L374.456,293.506zM410.256,398.806c-3.9,4.2-7.9,8-12.2,12.2c-6.5,6.2-13.1,12.7-19.3,20c-10.1,10.8-22,15.9-37.6,15.9c-1.5,0-3.1,0-4.6-0.1c-29.7-1.9-57.3-13.5-78-23.4c-56.6-27.4-106.3-66.3-147.6-115.6c-34.1-41.1-56.9-79.1-72-119.9c-9.3-24.9-12.7-44.3-11.2-62.6c1-11.7,5.5-21.4,13.8-29.7l34.1-34.1c4.9-4.6,10.1-7.1,15.2-7.1c6.3,0,11.4,3.8,14.6,7c0.1,0.1,0.2,0.2,0.3,0.3c6.1,5.7,11.9,11.6,18,17.9c3.1,3.2,6.3,6.4,9.5,9.7l27.3,27.3c10.6,10.6,10.6,20.4,0,31c-2.9,2.9-5.7,5.8-8.6,8.6c-8.4,8.6-16.4,16.6-25.1,24.4c-0.2,0.2-0.4,0.3-0.5,0.5c-8.6,8.6-7,17-5.2,22.7c0.1,0.3,0.2,0.6,0.3,0.9c7.1,17.2,17.1,33.4,32.3,52.7l0.1,0.1c27.6,34,56.7,60.5,88.8,80.8c4.1,2.6,8.3,4.7,12.3,6.7c3.6,1.8,7,3.5,9.9,5.3c0.4,0.2,0.8,0.5,1.2,0.7c3.4,1.7,6.6,2.5,9.9,2.5c8.3,0,13.5-5.2,15.2-6.9l34.2-34.2c3.4-3.4,8.8-7.5,15.1-7.5c6.2,0,11.3,3.9,14.4,7.3c0.1,0.1,0.1,0.1,0.2,0.2l55.1,55.1C420.456,377.706,420.456,388.206,410.256,398.806z"/>
            <path d="M256.056,112.706c26.2,4.4,50,16.8,69,35.8s31.3,42.8,35.8,69c1.1,6.6,6.8,11.2,13.3,11.2c0.8,0,1.5-0.1,2.3-0.2c7.4-1.2,12.3-8.2,11.1-15.6c-5.4-31.7-20.4-60.6-43.3-83.5s-51.8-37.9-83.5-43.3c-7.4-1.2-14.3,3.7-15.6,11S248.656,111.506,256.056,112.706z"/>
            <path d="M473.256,209.006c-8.9-52.2-33.5-99.7-71.3-137.5s-85.3-62.4-137.5-71.3c-7.3-1.3-14.2,3.7-15.5,11c-1.2,7.4,3.7,14.3,11.1,15.6c46.6,7.9,89.1,30,122.9,63.7c33.8,33.8,55.8,76.3,63.7,122.9c1.1,6.6,6.8,11.2,13.3,11.2c0.8,0,1.5-0.1,2.3-0.2C469.556,222.306,474.356,215.606,473.256,209.006z"/>
          </g>
         </svg>  
         Contact</h2>
        {serviceData.email && <p>Email: {serviceData.email}</p>}
        {serviceData.phone && <p>Phone: {serviceData.phone}</p>}
      </section>

{/* services card */}
{
  serviceData?.moreservices &&
  serviceData.moreservices.map((service, index) => (
    <div className={styles.serviceCard} key={index}>
      {service.img && (
        <img
          src={service.img}
          alt={service.name}
          className={styles.serviceCardImage}/>
      )}
      <div className={styles.serviceCardDetails}>
        {service.name && <h2 className={styles.serviceCardTitle}>{service.name}</h2>}
        {service.desc && <p className={styles.serviceCardDesc}>{service.desc}</p>}
        <button className={styles.serviceCardButton}>More Info</button>
      </div>
    </div>
  ))
}





    </div>
  );
};

export default ServicePage;

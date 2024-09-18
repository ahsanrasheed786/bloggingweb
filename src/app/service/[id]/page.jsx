
import Head from 'next/head';
import styles from './ServicePage.module.css';

const fatchData = async (id) => {
  const response = await fetch(`${process.env.WEBSIT_URL}/api/services/${id}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch service');
  }
  const serviceData = await response.json();
  const skillList = serviceData?.skills
    ? serviceData?.skills?.split(',').map((skill) => skill.trim())
    : [];
  return { serviceData, skillList };
};

export async function generateMetadata({params}) {
  const { id } = params;
  const { serviceData } = await fatchData(id);  
  const serviceName = serviceData?.name || "Service Name";
  const provider = serviceData?.provider || "Your Company";
  const serviceDesc = serviceData?.desc || "Detailed description of the service provided.";
  const skillList = serviceData?.skills ? serviceData?.skills.split(',').map(skill => skill.trim()) : [];

  // Meta Title: Short and descriptive, combining service name and provider
  const metaTitle = `${serviceName} by ${provider} - Top Rated Services`;

  // Meta Description: A concise, SEO-optimized description
  const metaDescription = `${serviceName} provided by ${provider}. ${serviceDesc.slice(0, 150)}... Offering high-quality services including ${skillList.join(", ")}.`;

  // Keywords: Derived from service name, skills, and other important attributes
  const keywords = [
    serviceName,
    provider,
    ...skillList,
    "best services",
    "quality services",
    serviceData?.title || "Professional Services"
  ].join(", ");

  // Return the metadata object in the correct format
  return {
    title: metaTitle,
    description: metaDescription,
    keywords, // shorthand for `keywords: keywords`
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
    },
  };
}




const ServicePage = async ({ params }) => {
  const { id } = params;
  const { serviceData, skillList } = await fatchData(id);

  // Split languages into a list if available
  const languageList = serviceData?.language
    ? serviceData?.language.split(',').map((lang) => lang.trim())
    : [];

  // Function to generate JSON-LD data for multiple schemas
  const generateSchema = (serviceData) => {
    return {
      "@context": "https://schema.org",
      "@graph": [
        // Service Schema
        {
          "@type": "Service",
          "serviceType": serviceData?.name || "Service Name",
          "description": serviceData?.desc || "Service Description",
          "provider": {
            "@type": "Organization",
            "name": serviceData?.provider || "Provider Name",
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": serviceData?.price || "500",
            "url": serviceData?.userWebsite || "https://yourwebsite.com/service",
          }
        },
        // Organization Schema
        {
          "@type": "Organization",
          "name": serviceData?.organization || "Organization Name",
          "url": serviceData?.userWebsite || "https://yourwebsite.com",
          "logo": serviceData?.logo || "https://yourwebsite.com/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": serviceData?.phone || "+92-123-4567890",
            "contactType": "customer service",
          },
        },
      ],
    };
  };
  
  
  

  return (
    <div className={styles.container}>
      {/* Add structured data in the Head */}
      {/* <Head> */}
        <script type="application/ld+json"dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}/>
      {/* </Head> */}

      {/* Service Page Content */}
      <header className={styles.header}>
        {serviceData?.coverImage && (
          <img
            src={serviceData?.coverImage}
            alt="Cover"
            className={styles.coverImage}
          />
        )}
      </header>

      <section className={styles.profileSection}>
        {serviceData?.img && (
          <img
            src={serviceData?.img}
            alt={serviceData?.name}
            className={styles.profileImage}
          />
        )}
        <div className={styles.profileInfo}>
          {serviceData?.name && <h1 className={styles.name}>{serviceData?.name}</h1>}
          {serviceData?.title && <h2 className={styles.title}>{serviceData?.title}</h2>}
        </div>
      </section>

      
     {serviceData?.desc && (
       <section className={styles.descriptionSection}>
         <h2 className={styles.sectionTitle}>Description</h2>
         <p className={styles.description}>{serviceData?.desc}</p>
       </section>
     )}

     {serviceData?.about && (
       <section className={styles.aboutSection}>
         <h2 className={styles.sectionTitle}>About</h2>
         <p className={styles.about}>{serviceData?.about}</p>
       </section>
     )}

     {serviceData?.experience && (
       <section className={styles.experienceSection}>
         <h2 className={styles.sectionTitle}>
           <svg
             xmlns="http://www.w3.org/2000/svg"
             className={styles.svg}
             viewBox="0 0 24 24"
             width="24"
             height="24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round">
             <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
             <path d="M16 3h-8v4h8V3z"></path>
           </svg>
           Experience
         </h2>
         <p className={styles.experience}>{serviceData?.experience}</p>
       </section>
     )}

     {serviceData?.education && (
       <section className={styles.educationSection}>
         <h2 className={styles.sectionTitle}>
           <svg
             className={styles.svg}
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             width="24"
             height="24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round">
             <path d="M12 3L1 9l11 6 9-5.14V16a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2"></path>
             <polyline points="22 9 12 15 2 9"></polyline>
           </svg>
           Education
         </h2>
         <p className={styles.education}>{serviceData?.education}</p>
       </section>
     )}     
     {serviceData?.language && (
       <section className={styles.languageSection}>
         <h2 className={styles.sectionTitle}>
           <svg
             width={"30"}
             height={"30"}
             className={styles.svg}
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 512 350.259">
             {/* SVG path data */}
           </svg>
           Languages
         </h2>
         <div className={styles.languages}>
           {languageList.map((language, index) => (
             <div key={index} className={styles.languageBubble}>
               {language}
             </div>
           ))}
         </div>
       </section>
     )}

     {serviceData?.skills && (
       <section className={styles.skillsSection}>
         <h2 className={styles.sectionTitle}>
           <svg
             className={styles.svg}
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             fill="currentColor"
             width={"24"}
             height={"24"}>
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

     {serviceData?.totalClients && (
       <section className={styles.totalClientSection}>
         <h2 className={styles.sectionTitle}>Total Clients</h2>
         <p className={styles.totalClients}>{serviceData?.totalClients}</p>
       </section>
     )}

     <section className={styles.contactSection}>
       <h2 className={styles.sectionTitle}>
         <svg
           className={styles.svg}
           fill={"#000000"}
           height={"24px"}
           width={"24px"}
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 473.806 473.806">
           {/* SVG path data */}
         </svg>Contact</h2>
       <div className={styles.contacts}>
       {serviceData?.userEmail && (
         <p>Email: <a className={styles.ancher} href={`mailto:${serviceData.userEmail}`}>{serviceData.userEmail}</a></p>
       )}
       {serviceData?.phone && (
         <p>Phone: <a className={styles.ancher} href={`tel:${serviceData.phone}`}>{serviceData.phone}</a></p>
       )}
       {serviceData?.facebook && (
         <p>Facebook: <a className={styles.ancher} href={serviceData.facebook} target="_blank" rel="noopener noreferrer">{serviceData.facebook}</a></p>
       )}
       {serviceData?.instagram && (
         <p>Instagram: <a className={styles.ancher} href={serviceData.instagram} target="_blank" rel="noopener noreferrer">{serviceData.instagram}</a></p>
       )}
       {serviceData?.userWebsite && (
         <p>Website: <a className={styles.ancher} href={serviceData.userWebsite} target="_blank" rel="noopener noreferrer">{serviceData.userWebsite}</a></p>
       )}
       {serviceData?.whatsapp && (
         <p>WhatsApp: <a  className={styles.ancher} href={`https://wa.me/${serviceData.whatsapp}`} target="_blank" rel="noopener noreferrer">{serviceData.whatsapp}</a></p>
       )}
       </div>

       
     </section> 
       {serviceData?.moreservices &&
  serviceData.moreservices.map((service, index) => (
    <div className={styles.serviceCard} key={index}>
      {service?.img && (
        <img src={service.img} alt={service.name} className={styles.serviceCardImage} />
      )}
      <div className={styles.serviceCardDetails}>
        {service?.title && <h2 className={styles.serviceCardTitle}>{service.title}</h2>}
        {service?.description && <p className={styles.serviceCardDesc}>{service.description}</p>}
        
        <div>
        {service?.direction && <p className={styles.direction}>{service.direction}</p>}
        {service?.needs && <p className={styles.needs}>{service.needs}</p>}
        </div>
        
        {/* servise discount card */}
        {service?.discount && <div className={styles.discountDiv}>
          {service?.price && <p className={styles.price}>Only in RS: {service.price} </p>}
          {service?.discount && <b className={styles.discount}>Save {service.discount}</b>}
          </div>}
         {  service?.date && <div className={styles.date}>{service.date}</div>}
       </div>
        </div>
  ))
}
    </div>
  );
};

export default ServicePage;




// import styles from './ServicePage.module.css';

// const fatchData = async (id) => {
//  const response = await fetch(`${process.env.WEBSIT_URL}/api/services/${id}`, {
//    cache: "no-store",
//  });
//  if (!response.ok) {
//    throw new Error('Failed to fetch service');
//  }
//  const serviceData = await response.json();
//  const skillList = serviceData?.skills
//    ? serviceData?.skills?.split(',').map((skill) => skill.trim())
//    : [];
//  return { serviceData, skillList };
// }

// const ServicePage = async ({ params }) => {
//  const { id } = params;
//  const { serviceData, skillList } = await fatchData(id);

//  // Split languages into a list if available
//  const languageList = serviceData?.language
//    ? serviceData?.language.split(',').map((lang) => lang.trim())
//    : [];

//  return (
//    <div className={styles.container}>
// <header className={styles.header}>
//        {serviceData?.coverImage && (
//          <img
//            src={serviceData?.coverImage} alt="Cover" className={styles.coverImage}/>
//        )}
//      </header>

//      <section className={styles.profileSection}>
//        {serviceData?.img && (
//          <img src={serviceData?.img} alt={serviceData?.name} className={styles.profileImage}/>
//        )}
//        <div className={styles.profileInfo}>
//          {serviceData?.name && <h1 className={styles.name}>{serviceData?.name}</h1>}
//          {serviceData?.title && <h2 className={styles.title}>{serviceData?.title}</h2>}
//        </div>
//      </section>

//      {serviceData?.desc && (
//        <section className={styles.descriptionSection}>
//          <h2 className={styles.sectionTitle}>Description</h2>
//          <p className={styles.description}>{serviceData?.desc}</p>
//        </section>
//      )}

//      {serviceData?.about && (
//        <section className={styles.aboutSection}>
//          <h2 className={styles.sectionTitle}>About</h2>
//          <p className={styles.about}>{serviceData?.about}</p>
//        </section>
//      )}

//      {serviceData?.experience && (
//        <section className={styles.experienceSection}>
//          <h2 className={styles.sectionTitle}>
//            <svg
//              xmlns="http://www.w3.org/2000/svg"
//              className={styles.svg}
//              viewBox="0 0 24 24"
//              width="24"
//              height="24"
//              fill="none"
//              stroke="currentColor"
//              strokeWidth="2"
//              strokeLinecap="round"
//              strokeLinejoin="round">
//              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
//              <path d="M16 3h-8v4h8V3z"></path>
//            </svg>
//            Experience
//          </h2>
//          <p className={styles.experience}>{serviceData?.experience}</p>
//        </section>
//      )}

//      {serviceData?.education && (
//        <section className={styles.educationSection}>
//          <h2 className={styles.sectionTitle}>
//            <svg
//              className={styles.svg}
//              xmlns="http://www.w3.org/2000/svg"
//              viewBox="0 0 24 24"
//              width="24"
//              height="24"
//              fill="none"
//              stroke="currentColor"
//              strokeWidth="2"
//              strokeLinecap="round"
//              strokeLinejoin="round">
//              <path d="M12 3L1 9l11 6 9-5.14V16a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2"></path>
//              <polyline points="22 9 12 15 2 9"></polyline>
//            </svg>
//            Education
//          </h2>
//          <p className={styles.education}>{serviceData?.education}</p>
//        </section>
//      )}     
//      {serviceData?.language && (
//        <section className={styles.languageSection}>
//          <h2 className={styles.sectionTitle}>
//            <svg
//              width={"30"}
//              height={"30"}
//              className={styles.svg}
//              xmlns="http://www.w3.org/2000/svg"
//              viewBox="0 0 512 350.259">
//              {/* SVG path data */}
//            </svg>
//            Languages
//          </h2>
//          <div className={styles.languages}>
//            {languageList.map((language, index) => (
//              <div key={index} className={styles.languageBubble}>
//                {language}
//              </div>
//            ))}
//          </div>
//        </section>
//      )}

//      {serviceData?.skills && (
//        <section className={styles.skillsSection}>
//          <h2 className={styles.sectionTitle}>
//            <svg
//              className={styles.svg}
//              xmlns="http://www.w3.org/2000/svg"
//              viewBox="0 0 24 24"
//              fill="currentColor"
//              width={"24"}
//              height={"24"}>
//              <path d="M12 3.5l2.12 4.29 4.74.69-3.42 3.34.81 4.72-4.25-2.24-4.25 2.24.81-4.72-3.42-3.34 4.74-.69L12 3.5zm0-1a1 1 0 0 0-.9.55L8.64 7.7l-4.92.71a1 1 0 0 0-.55 1.7l3.56 3.47-.84 4.91a1 1 0 0 0 1.45 1.05l4.4-2.32 4.4 2.32a1 1 0 0 0 1.45-1.05l-.84-4.91 3.56-3.47a1 1 0 0 0-.55-1.7l-4.92-.71-2.46-4.65a1 1 0 0 0-.9-.55z" />
//            </svg>
//            Skills
//          </h2>
//          <div className={styles.skills}>
//            {skillList.map((skill, index) => (
//              <div key={index} className={styles.skillBubble}>
//                {skill}
//              </div>
//            ))}
//          </div>
//        </section>
//      )}

//      {serviceData?.totalClients && (
//        <section className={styles.totalClientSection}>
//          <h2 className={styles.sectionTitle}>Total Clients</h2>
//          <p className={styles.totalClients}>{serviceData?.totalClients}</p>
//        </section>
//      )}

//      <section className={styles.contactSection}>
//        <h2 className={styles.sectionTitle}>
//          <svg
//            className={styles.svg}
//            fill={"#000000"}
//            height={"24px"}
//            width={"24px"}
//            xmlns="http://www.w3.org/2000/svg"
//            viewBox="0 0 473.806 473.806">
//            {/* SVG path data */}
//          </svg>Contact</h2>
//        <div className={styles.contacts}>
//        {serviceData?.userEmail && (
//          <p>Email: <a className={styles.ancher} href={`mailto:${serviceData.userEmail}`}>{serviceData.userEmail}</a></p>
//        )}
//        {serviceData?.phone && (
//          <p>Phone: <a className={styles.ancher} href={`tel:${serviceData.phone}`}>{serviceData.phone}</a></p>
//        )}
//        {serviceData?.facebook && (
//          <p>Facebook: <a className={styles.ancher} href={serviceData.facebook} target="_blank" rel="noopener noreferrer">{serviceData.facebook}</a></p>
//        )}
//        {serviceData?.instagram && (
//          <p>Instagram: <a className={styles.ancher} href={serviceData.instagram} target="_blank" rel="noopener noreferrer">{serviceData.instagram}</a></p>
//        )}
//        {serviceData?.userWebsite && (
//          <p>Website: <a className={styles.ancher} href={serviceData.userWebsite} target="_blank" rel="noopener noreferrer">{serviceData.userWebsite}</a></p>
//        )}
//        {serviceData?.whatsapp && (
//          <p>WhatsApp: <a  className={styles.ancher} href={`https://wa.me/${serviceData.whatsapp}`} target="_blank" rel="noopener noreferrer">{serviceData.whatsapp}</a></p>
//        )}
//        </div>

       
//      </section>

//       {/* {serviceData?.moreservices &&
//        serviceData.moreservices.map((service, index) => (
//          <div className={styles.serviceCard} key={index}>
//            {service?.img && (
//              <img src={service.img} alt={service.name} className={styles.serviceCardImage} />
//            )}
//            <div className={styles.serviceCardDetails}>
//              {service?.title && <h2 className={styles.serviceCardTitle}>{service.title}</h2>}
//              {service?.description && <p className={styles.serviceCardDesc}>{service.description}</p>}
//              {service?.date && <p className={styles.date}>{service.date}</p>}
//              {service?.direction && <p className={styles.direction}>{service.direction}</p>}
//              {service?.discount && <p className={styles.discount}>{service.discount}</p>}
//              {service?.needs && <p className={styles.needs}>{service.needs}</p>}
//              {service?.price && <p className={styles.price}>Only in RS:{service.price}</p>}
//            </div>
//          </div>
//        ))} */}
       
//        {serviceData?.moreservices &&
//   serviceData.moreservices.map((service, index) => (
//     <div className={styles.serviceCard} key={index}>
//       {service?.img && (
//         <img src={service.img} alt={service.name} className={styles.serviceCardImage} />
//       )}
//       <div className={styles.serviceCardDetails}>
//         {service?.title && <h2 className={styles.serviceCardTitle}>{service.title}</h2>}
//         {service?.description && <p className={styles.serviceCardDesc}>{service.description}</p>}
        
//         <div>
//         {service?.direction && <p className={styles.direction}>{service.direction}</p>}
//         {service?.needs && <p className={styles.needs}>{service.needs}</p>}
//         </div>
        
//         {/* servise discount card */}
//         {service?.discount && <div className={styles.discountDiv}>
//           {service?.price && <p className={styles.price}>Only in RS: {service.price} </p>}
//           {service?.discount && <b className={styles.discount}>Save {service.discount}</b>}
//           </div>}
//          {  service?.date && <div className={styles.date}>{service.date}</div>}
 

//       </div>
//     </div>
//   ))
// }

       
//        </div>
//  );
// }

// export default ServicePage;

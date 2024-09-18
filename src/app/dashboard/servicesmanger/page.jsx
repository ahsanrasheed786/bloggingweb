// 'use client';
// import { useState, useEffect } from 'react';
// import styles from './ManageServices.module.css';
// import Loader from "@/components/loader/Loader";

// const ManageServices = () => {
//   const [services, setServices] = useState([]);
//   const [fetchingLoader, setFetchingLoader] = useState(true);
//   const [unauthorized, setUnauthorized] = useState(false);
//   const [form, setForm] = useState({
//     slug: '',
//     img: '',
//     imgAlt: '',
//     coverImage: '',
//     name: '',
//     services: '',
//     moreservices: [],  // Now an array of objects
//     location: '',
//     linkdin: '',
//     about: '',
//     experience: '',
//     education: '',
//     skills: '',
//     language: '',
//     totalClient: '',
//     title: '',
//     desc: '',
//     views: 0,
//     userEmail: '',
//   });
//   const [editingId, setEditingId] = useState(null);

//   // Fetch services on mount
//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const response = await fetch('/api/services');
//       if (!response.ok) {
//         throw new Error('Failed to fetch services');
//       }
//       const data = await response.json();
//       setServices(data);
//     } catch (error) {
//       console.error('Error fetching services:', error);
//     }
//   };

//   // Handle form change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   // Handle moreservices change
//   const handleMoreServiceChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedMoreServices = [...form.moreservices];
//     updatedMoreServices[index] = { ...updatedMoreServices[index], [name]: value };
//     setForm({ ...form, moreservices: updatedMoreServices });
//   };

//   // Add a new more service entry
//   const addMoreService = () => {
//     setForm({
//       ...form,
//       moreservices: [...form.moreservices, {
//         img: '',
//         title: '',
//         description: '',
//         price: '',
//         direction: '',
//         discount: '',
//         date: '',
//         needs: '',
//       }],
//     });
//   };

//   // Remove a more service entry
//   const removeMoreService = (index) => {
//     const updatedMoreServices = form.moreservices.filter((_, i) => i !== index);
//     setForm({ ...form, moreservices: updatedMoreServices });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const method = editingId ? 'PUT' : 'POST';
//       const endpoint = editingId ? `/api/services/${editingId}` : '/api/services';
//       const response = await fetch(endpoint, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(form),
//       });

//       if (!response.ok) {
//         setUnauthorized(true);

//         throw new Error('Failed to submit service');
//       }

//       // Reset form after successful submission
//       setForm({
//         slug: '',
//         img: '',
//         imgAlt: '',
//         coverImage: '',
//         name: '',
//         services: '',
//         moreservices: [],
//         location: '',
//         linkdin: '',
//         about: '',
//         experience: '',
//         education: '',
//         skills: '',
//         language: '',
//         totalClient: '',
//         title: '',
//         desc: '',
//         views: 0,
//         userEmail: '',
//       });
//       setEditingId(null);
//       fetchServices(); // Refresh the list of services
//     } catch (error) {
//       console.error('Error submitting service:', error);
//     }finally {
//       setFetchingLoader(false);
//     }
//   };

//   const handleEdit = (service) => {
//     setForm(service);
//     setEditingId(service.id);
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`/api/services/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete service');
//       }

//       fetchServices(); // Refresh the list of services
//     } catch (error) {
//       console.error('Error deleting service:', error);
//     }
//   };

//   if (fetchingLoader) {
//     return <Loader />;
//   }

//   if (unauthorized) {
//     return (
//       <div className={styles.unauthorizedContainer}>
//         <p className={styles.unauthorizedMessage}>Unauthorized access</p>
//         <button onClick={() => window.history.back()} className={styles.backButton}>
//           Go Back
//         </button>
//       </div>
//     );
//   }
//   return (
//     <div className={styles.container}>
//       <h1 className={styles.heading}>Manage Services</h1>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         {/* Other form inputs */}
//         <input
//           type="text"
//           name="slug"
//           value={form.slug}
//           onChange={handleChange}
//           placeholder="Slug"
//           required
//           className={styles.input}
//         />
//         {/* ...more inputs for the main service form... */}
//         <input
//           type="text"
//           name="img"
//           value={form.img}
//           onChange={handleChange}
//           placeholder="Image URL"
//           className={styles.input}
//         />
//         <input
//           type="text"
//           name="imgAlt"
//           value={form.imgAlt}
//           onChange={handleChange}
//           placeholder="Image Alt Text"
//           className={styles.input}
//         />
//         <input
//           type="text"
//           name="coverImage"
//           value={form.coverImage}
//           onChange={handleChange}
//           placeholder="Cover Image URL"
//           className={styles.input}
//         />
//         <input
//           type="text"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Name"
//           className={styles.input}
//         />
//         <input
//           type="text"
//           name="services"
//           value={form.services}
//           onChange={handleChange}
//           placeholder="Services"
//           className={styles.input}
//         />
//         {/* <input
//           type="text"
//           name="moreservices"
//           value={form.moreservices}
//           onChange={handleChange}
//           placeholder="More Services"
//           className={styles.input}
//         /> */}
//         <input
//           type="text"
//           name="location"
//           value={form.location}
//           onChange={handleChange}
//           placeholder="Location"
//           className={styles.input}
//         />
//         <input
//           type="text"
//           name="linkdin"
//           value={form.linkdin}
//           onChange={handleChange}
//           placeholder="LinkedIn URL"
//           className={styles.input}
//         />
//         <textarea
//           name="about"
//           value={form.about}
//           onChange={handleChange}
//           placeholder="About"
//           className={styles.textarea}
//         />
//         <textarea
//           name="experience"
//           value={form.experience}
//           onChange={handleChange}
//           placeholder="Experience"
//           className={styles.textarea}
//         />
//         <textarea
//           name="education"
//           value={form.education}
//           onChange={handleChange}
//           placeholder="Education"
//           className={styles.textarea}
//         />
//         <input
//           type="text"
//           name="skills"
//           value={form.skills}
//           onChange={handleChange}
//           placeholder="Skills"
//           className={styles.input}
//         />
//         <input
//           type="text"
//           name="language"
//           value={form.language}
//           onChange={handleChange}
//           placeholder="Language"
//           className={styles.input}
//         />
//         <input
//           type="text"
//           name="totalClient"
//           value={form.totalClient}
//           onChange={handleChange}
//           placeholder="Total Clients"
//           className={styles.input}
//         />
//         <input
//           type="text"
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           placeholder="Title"
//           className={styles.input}
//         />
//         <textarea
//           name="desc"
//           value={form.desc}
//           onChange={handleChange}
//           placeholder="Description"
//           className={styles.textarea}
//         />
//         <input
//           type="email"
//           name="userEmail"
//           value={form.userEmail}
//           onChange={handleChange}
//           placeholder="User Email"
//           className={styles.input}
//         />
//         {/* moreservices form */}
//         {form.moreservices.map((service, index) => (
//           <div key={index} className={styles.moreService}>
//             <h2>More Service {index + 1}</h2>
//             <input
//               type="text"
//               name="img"
//               value={service.img}
//               onChange={(e) => handleMoreServiceChange(index, e)}
//               placeholder="Image URL"
//               className={styles.input}
//             />
//             <input
//               type="text"
//               name="title"
//               value={service.title}
//               onChange={(e) => handleMoreServiceChange(index, e)}
//               placeholder="Title"
//               className={styles.input}
//             />
//             <textarea
//               name="description"
//               value={service.description}
//               onChange={(e) => handleMoreServiceChange(index, e)}
//               placeholder="Description"
//               className={styles.textarea}
//             />
//             <input
//               type="text"
//               name="price"
//               value={service.price}
//               onChange={(e) => handleMoreServiceChange(index, e)}
//               placeholder="Price"
//               className={styles.input}
//             />
//             <input
//               type="text"
//               name="direction"
//               value={service.direction}
//               onChange={(e) => handleMoreServiceChange(index, e)}
//               placeholder="Direction"
//               className={styles.input}
//             />
//             <input
//               type="text"
//               name="discount"
//               value={service.discount}
//               onChange={(e) => handleMoreServiceChange(index, e)}
//               placeholder="Discount"
//               className={styles.input}
//             />
//             <input
//               type="date"
//               name="date"
//               value={service.date}
//               onChange={(e) => handleMoreServiceChange(index, e)}
//               placeholder="Date"
//               className={styles.input}
//             />
//             <input
//               type="text"
//               name="needs"
//               value={service.needs}
//               onChange={(e) => handleMoreServiceChange(index, e)}
//               placeholder="Needs"
//               className={styles.input}
//             />
//             <button type="button" onClick={() => removeMoreService(index)} className={styles.removeButton}>
//               Remove Service
//             </button>
//           </div>
//         ))}

//         <button type="button" onClick={addMoreService} className={styles.addButton}>
//           Add More Service
//         </button>

//         <button type="submit" className={styles.submitButton}>
//           {editingId ? 'Update Service' : 'Add Service'}
//         </button>
//       </form>

//       <div className={styles.servicesList}>
//         {services.map((service) => (
//           <div key={service.id} className={styles.serviceItem}>
//             <img
//               src={service.img}
//               alt={service.imgAlt}
//               className={styles.serviceImage}
//             />
//             <div className={styles.serviceDetails}>
//               <h2 className={styles.serviceTitle}>{service.name}</h2>
//               <p className={styles.serviceDescription}>{service.desc}</p>
//               <button
//                 onClick={() => handleEdit(service)}
//                 className={styles.actionButton}
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(service.id)}
//                 className={styles.actionButton}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageServices;





'use client';
import { useState, useEffect } from 'react';
import styles from './ManageServices.module.css';
import Loader from "@/components/loader/Loader";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [fetchingLoader, setFetchingLoader] = useState(true); // Show loader initially
  const [unauthorized, setUnauthorized] = useState(false);
  const [form, setForm] = useState({
    slug: '',
    img: '',
    imgAlt: '',
    coverImage: '',
    name: '',
    services: '',
    moreservices: [],  // Now an array of objects
    location: '',
    linkdin: '',
    about: '',
    experience: '',
    education: '',
    skills: '',
    language: '',
    totalClient: '',
    title: '',
    desc: '',
    views: 0,
    userEmail: '',
    facebook:''    ,
    instragram:'' ,
    userWebsite:'' , 
    whatsapp:'' ,  
    keywords:'',
     metaDescription:'',
     metaTitle:''

  });
  const [editingId, setEditingId] = useState(null);

  // Fetch services on mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setFetchingLoader(true); // Show loader when fetching starts
    try {
      const response = await fetch('/api/services');
      if (!response.ok) {
        setUnauthorized(true); // If fetching fails, set unauthorized to true
        throw new Error('Unauthorized access or failed to fetch services');
      }
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setFetchingLoader(false); // Hide loader after fetching
    }
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle moreservices change
  const handleMoreServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMoreServices = [...form.moreservices];
    updatedMoreServices[index] = { ...updatedMoreServices[index], [name]: value };
    setForm({ ...form, moreservices: updatedMoreServices });
  };

  // Add a new more service entry
  const addMoreService = () => {
    setForm({
      ...form,
      moreservices: [...form.moreservices, {
        img: '',
        title: '',
        description: '',
        price: '',
        direction: '',
        discount: '',
        date: '',
        needs: '',
      }],
    });
  };

  // Remove a more service entry
  const removeMoreService = (index) => {
    const updatedMoreServices = form.moreservices.filter((_, i) => i !== index);
    setForm({ ...form, moreservices: updatedMoreServices });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const endpoint = editingId ? `/api/services/${editingId}` : '/api/services';
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        setUnauthorized(true); // Handle unauthorized error
        throw new Error('Failed to submit service');
      }

      // Reset form after successful submission
      setForm({
        slug: '',
        img: '',
        imgAlt: '',
        coverImage: '',
        name: '',
        services: '',
        moreservices: [],
        location: '',
        linkdin: '',
        about: '',
        experience: '',
        education: '',
        skills: '',
        language: '',
        totalClient: '',
        title: '',
        desc: '',
        views: 0,
        userEmail: '',
        facebook:''    ,
        instragram:'' ,
        userWebsite:'' , 
        whatsapp:'' ,  
        keywords:'',
        metaDescription:'',
        metaTitle:''

      });
      setEditingId(null);
      fetchServices(); // Refresh the list of services
    } catch (error) {
      console.error('Error submitting service:', error);
    } finally {
      setFetchingLoader(false); // Hide loader after submission
    }
  };

  const handleEdit = (service) => {
    setForm(service);
    setEditingId(service.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete service');
      }

      fetchServices(); // Refresh the list of services
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  if (fetchingLoader) {
    return <Loader />; // Show loader while fetching services
  }

  if (unauthorized) {
    return (
      <div className={styles.unauthorizedContainer}>
        <p className={styles.unauthorizedMessage}>Unauthorized access</p>
        <button onClick={() => window.history.back()} className={styles.backButton}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Manage Services</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Other form inputs */}
        <input
          type="text"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Slug"
          required
          className={styles.input}
        />
        {/* ...more inputs for the main service form... */}
        <input
          type="text"
          name="img"
          value={form.img}
          onChange={handleChange}
          placeholder="Image URL"
          className={styles.input}
        />
        <input
          type="text"
          name="imgAlt"
          value={form.imgAlt}
          onChange={handleChange}
          placeholder="Image Alt Text"
          className={styles.input}
        />
        <input
          type="text"
          name="coverImage"
          value={form.coverImage}
          onChange={handleChange}
          placeholder="Cover Image URL"
          className={styles.input}
        />
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className={styles.input}
        />
        <input
          type="text"
          name="services"
          value={form.services}
          onChange={handleChange}
          placeholder="Services"
          className={styles.input}
        /> 
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className={styles.input}
        />
        <input
          type="text"
          name="linkdin"
          value={form.linkdin}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          className={styles.input}
        />
        <textarea
          name="about"
          value={form.about}
          onChange={handleChange}
          placeholder="About"
          className={styles.textarea}
        />
        <textarea
          name="experience"
          value={form.experience}
          onChange={handleChange}
          placeholder="Experience"
          className={styles.textarea}
        />
        <textarea
          name="education"
          value={form.education}
          onChange={handleChange}
          placeholder="Education"
          className={styles.textarea}
        />
        <input
          type="text"
          name="skills"
          value={form.skills}
          onChange={handleChange}
          placeholder="Skills"
          className={styles.input}
        />
        <input
          type="text"
          name="language"
          value={form.language}
          onChange={handleChange}
          placeholder="Language"
          className={styles.input}
        />
        <input
          type="text"
          name="totalClient"
          value={form.totalClient}
          onChange={handleChange}
          placeholder="Total Clients"
          className={styles.input}/>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className={styles.input}/>
        <textarea
          name="desc"
          value={form.desc}
          onChange={handleChange}
          placeholder="Description"
          className={styles.textarea}/>
        <input
          type="email"
          name="userEmail"
          value={form.userEmail}
          onChange={handleChange}
          placeholder="User Email"
          className={styles.input}/>
         <input
          type="text"
          name="facebook"
          value={form.facebook}
          onChange={handleChange}
          placeholder="facebook"
          className={styles.input}/>
          <input
          type="text"
          name="instragram"
          value={form.instragram}
          onChange={handleChange}
          placeholder="instragram"
          className={styles.input}/>
           <input
          type="text"
          name="whatsapp"
          value={form.whatsapp}
          onChange={handleChange}
          placeholder="whatsapp"
          className={styles.input}/>
          <input
          type="text"
          name="userWebsite"
          value={form.userWebsite}
          onChange={handleChange}
          placeholder="userWebsite"
          className={styles.input}/>
           <input
          type="text"
          name="metaTitle"
          value={form.metaTitle}
          onChange={handleChange}
          placeholder="metaTitle"
          className={styles.input}/> 
          <input
          type="text"
          name="keywords"
          value={form.keywords}
          onChange={handleChange}
          placeholder="Metakeywords"
          className={styles.input}/> 
          <input
          type="text"
          name="metaDescription"
          value={form.metaDescription}
          onChange={handleChange}
          placeholder="metaDescription"
          className={styles.input}/>
        {/* moreservices form */}
        {form.moreservices.map((service, index) => (
          <div key={index} className={styles.moreService}>
            <h2>More Service {index + 1}</h2>
            <input
              type="text"
              name="img"
              value={service.img}
              onChange={(e) => handleMoreServiceChange(index, e)}
              placeholder="Image URL"
              className={styles.input}
            />
            <input
              type="text"
              name="title"
              value={service.title}
              onChange={(e) => handleMoreServiceChange(index, e)}
              placeholder="Title"
              className={styles.input}
            />
            <textarea
              name="description"
              value={service.description}
              onChange={(e) => handleMoreServiceChange(index, e)}
              placeholder="Description"
              className={styles.textarea}
            />
            {/* Additional fields */}
            <button type="button" onClick={() => removeMoreService(index)} className={styles.removeButton}>
              Remove Service
            </button>
          </div>
        ))}
        <button type="button" onClick={addMoreService} className={styles.addButton}>
          Add More Service
        </button>
        <button type="submit" className={styles.submitButton}>
          {editingId ? 'Update Service' : 'Add Service'}
        </button>
      </form>

      <div className={styles.servicesList}>
        {services.map((service) => (
          <div key={service.id} className={styles.serviceItem}>
            <img
              src={service.img}
              alt={service.imgAlt}
              className={styles.serviceImage}
            />
            <div className={styles.serviceDetails}>
              <h2 className={styles.serviceTitle}>{service.name}</h2>
              <p className={styles.serviceDescription}>{service.desc}</p>
              <button
                onClick={() => handleEdit(service)}
                className={styles.actionButton}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className={styles.actionButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageServices;

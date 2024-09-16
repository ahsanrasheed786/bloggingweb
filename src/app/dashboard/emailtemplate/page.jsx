 



"use client";
import { useState, useEffect } from 'react';
import styles from './emailTemplates.module.css';
import Loader from '@/components/loader/Loader';

const EmailTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [formData, setFormData] = useState({
    subject: '',
    textBody: '',
    htmlBody: '',
    templateType: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editTemplateId, setEditTemplateId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [fetchingLoader, setFetchingLoader] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  // Fetch templates using fetch
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/emailtemplate');
        const data = await response.json();
        setTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }finally {
        setFetchingLoader(false);
      }
    };
    fetchTemplates();
  }, []);

  // Handle form submission to create/update a template
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const method = editTemplateId ? 'PUT' : 'POST';
    const url = editTemplateId
      ? `/api/emailtemplate/${editTemplateId}`
      : '/api/emailtemplate';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newTemplate = await response.json();
      if (editTemplateId) {
        setTemplates(
          templates.map((template) =>
            template.id === editTemplateId ? newTemplate : template
          )
        );
        setEditTemplateId(null);
      } else {
        setTemplates([newTemplate]);
      }
      setPreview(newTemplate);
      setFormData({
        subject: '',
        textBody: '',
        htmlBody: '',
        templateType: '',
      });
    } catch (error) {
      console.error('Error submitting template:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete template
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/emailtemplate/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setTemplates(templates.filter((template) => template.id !== id));
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  // Handle edit
  const handleEdit = (template) => {
    setFormData({
      subject: template.subject,
      textBody: template.textBody,
      htmlBody: template.htmlBody,
      templateType: template.templateType,
    });
    setEditTemplateId(template.id);
  };

  // Toggle preview visibility
  const handlePreviewToggle = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };


  if (fetchingLoader) {
    return <Loader />;
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
      <h1 className={styles.heading1}>Email Templates</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Template Type"
          value={formData.templateType}
          onChange={(e) =>
            setFormData({ ...formData, templateType: e.target.value })
          }
          required
        />
        <input
          type="text"
          className={styles.inputField}
          placeholder="Subject"
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          required
        />
        <textarea
          className={styles.inputField}
          placeholder="Text Body"
          value={formData.textBody}
          onChange={(e) =>
            setFormData({ ...formData, textBody: e.target.value })
          }
          required/>
        <textarea
          className={styles.inputField}
          placeholder="HTML Body"
          value={formData.htmlBody}
          onChange={(e) =>
            setFormData({ ...formData, htmlBody: e.target.value })
          }/>
        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : editTemplateId ? 'Update Template' : 'Create Template'}
        </button>
      </form>

      <h2 className={styles.heading2}>Existing Templates</h2>
      <ul className={styles.templateList}>
        {templates.map((template) => (
          <li key={template.id} className={styles.templateItem}>
            <p>Type: {template.templateType}</p>
            <p>Subject: {template.subject}</p>
            <button onClick={() => handleEdit(template)}>Edit</button>
            <button onClick={() => handleDelete(template.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button className={styles.button} onClick={handlePreviewToggle}>
        {isPreviewVisible ? 'Hide Preview' : 'Show Preview'}
      </button>

      {isPreviewVisible && preview && (
        <div className={styles.preview}>
          <h2>Template Preview</h2>
          <p><strong>Subject:</strong> {preview.subject}</p>
          <p><strong>Text Body:</strong> {preview.textBody}</p>
          <div dangerouslySetInnerHTML={{ __html: preview.htmlBody }} />
        </div>
      )}
    </div>
  );
};

export default EmailTemplates;


// "use client";
// import { useState, useEffect } from 'react';
// import styles from './emailTemplates.module.css';
// import Loader from '@/components/loader/Loader';

// const EmailTemplates = () => {
//   const [templates, setTemplates] = useState([]);
//   const [formData, setFormData] = useState({
//     subject: '',
//     textBody: '',
//     htmlBody: '',
//     templateType: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [editTemplateId, setEditTemplateId] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [isPreviewVisible, setIsPreviewVisible] = useState(false);
//   const [loading, setLoading] = useState(true);
  
//   // Fetch templates using fetch
//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         const response = await fetch('/api/emailtemplate');
//         const data = await response.json();
//         setTemplates(data);
//       } catch (error) {
//         console.error('Error fetching templates:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTemplates();
//   }, []);

//   // Handle form submission to create/update a template
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const method = editTemplateId ? 'PUT' : 'POST';
//     const url = editTemplateId
//       ? `/api/emailtemplate/${editTemplateId}`
//       : '/api/emailtemplate';

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const newTemplate = await response.json();
//       if (editTemplateId) {
//         setTemplates(
//           templates.map((template) =>
//             template.id === editTemplateId ? newTemplate : template
//           )
//         );
//         setEditTemplateId(null);
//       } else {
//         setTemplates([...templates, newTemplate]);
//       }
//       setPreview(newTemplate);
//       setFormData({
//         subject: '',
//         textBody: '',
//         htmlBody: '',
//         templateType: '',
//       });
//     } catch (error) {
//       console.error('Error submitting template:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Handle delete template
//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`/api/emailtemplate/${id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       setTemplates(templates.filter((template) => template.id !== id));
//     } catch (error) {
//       console.error('Error deleting template:', error);
//     }
//   };

//   // Handle edit
//   const handleEdit = (template) => {
//     setFormData({
//       subject: template.subject,
//       textBody: template.textBody,
//       htmlBody: template.htmlBody,
//       templateType: template.templateType,
//     });
//     setEditTemplateId(template.id);
//   };

//   // Toggle preview visibility
//   const handlePreviewToggle = () => {
//     setIsPreviewVisible(!isPreviewVisible);
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.heading1}>Email Templates</h1>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <input
//           type="text"
//           className={styles.inputField}
//           placeholder="Template Type"
//           value={formData.templateType}
//           onChange={(e) =>
//             setFormData({ ...formData, templateType: e.target.value })
//           }
//           required
//         />
//         <input
//           type="text"
//           className={styles.inputField}
//           placeholder="Subject"
//           value={formData.subject}
//           onChange={(e) =>
//             setFormData({ ...formData, subject: e.target.value })
//           }
//           required
//         />
//         <textarea
//           className={styles.inputField}
//           placeholder="Text Body"
//           value={formData.textBody}
//           onChange={(e) =>
//             setFormData({ ...formData, textBody: e.target.value })
//           }
//           required
//         />
//         <textarea
//           className={styles.inputField}
//           placeholder="HTML Body"
//           value={formData.htmlBody}
//           onChange={(e) =>
//             setFormData({ ...formData, htmlBody: e.target.value })
//           }
//         />
//         <button type="submit" className={styles.button} disabled={isSubmitting}>
//           {isSubmitting ? 'Submitting...' : editTemplateId ? 'Update Template' : 'Create Template'}
//         </button>
//       </form>

//       <h2 className={styles.heading2}>Existing Templates</h2>
//       <ul className={styles.templateList}>
//         {templates.map((template) => (
//           <li key={template.id} className={styles.templateItem}>
//             <p>Type: {template.templateType}</p>
//             <p>Subject: {template.subject}</p>
//             <button onClick={() => handleEdit(template)}>Edit</button>
//             <button onClick={() => handleDelete(template.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>

//       <button className={styles.button} onClick={handlePreviewToggle}>
//         {isPreviewVisible ? 'Hide Preview' : 'Show Preview'}
//       </button>

//       {isPreviewVisible && preview && (
//         <div className={styles.preview}>
//           <h2>Template Preview</h2>
//           <p><strong>Subject:</strong> {preview.subject}</p>
//           <p><strong>Text Body:</strong> {preview.textBody}</p>
//           <div dangerouslySetInnerHTML={{ __html: preview.htmlBody }} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmailTemplates;

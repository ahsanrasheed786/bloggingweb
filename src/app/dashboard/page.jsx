"use client";

import { useEffect, useState } from "react";
import { Line, Bar,Pie,Doughnut,Radar,PolarArea,Bubble,Scatter } from "react-chartjs-2";
import Chart from "chart.js/auto";
import styles from "./dashboard.module.css";
// import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Loader from '@/components/loader/Loader';

// Helper function to format date and time according to user's time zone
const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString()
  };
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    filteredPosts: [],
    popularPost: {},
    statsFor: [],
  });
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState('none'); // 'none', 'month-day', 'date-range'
  const [selectedPost, setSelectedPost] = useState(null);
  const [popularPost, setPopularPost] = useState({});
  const [daily, setDaily] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [selector, setSelector] = useState('daily');
  const [menu, setMenu] = useState(false);

  const [unauthorized, setUnauthorized] = useState(false);
  const [adminArray, setAdminArray] = useState([]);
  const [fetchingLoader, setFetchingLoader] = useState(true);
  const [accessData, setAccessData] = useState([]);
  const [fetching, setFetching] = useState(true);

  const { data: session } = useSession();
  const userEmail = session?.user?.email;



  // ================varifying isAdmin==================
// useEffect(() => {
//   async function fetchAccessData() {
//     try {
//       const response = await fetch('/api/access/');
//       if (response.ok) {
//         const data = await response.json();
//         setAccessData(data);
//         setAdminArray(data.filter((item) => item.isAdmin === true));
//       } else {
//         setError('Failed to fetch access data.');
//       }
//     } catch (err) {
//       setError('An error occurred while fetching access data.');
//     } finally {
//       setFetching(false);
//     }
//   }

//   fetchAccessData();
// }, []);

// useEffect(() => {
//   if (!fetching) {
//     if (!adminArray.some((item) => item.email === userEmail)) {
//       setUnauthorized(true);
//       setFetchingLoader(false);
//     } else {
//       setFetchingLoader(false);
//     }
//   }
// }, [fetching, adminArray, userEmail]);

useEffect(() => {
  // async function fetchAccessData() {
  //   try {
  //     const response = await fetch('/api/access/');
  //     if (response.ok) {
  //       const data = await response.json();
  //       setAccessData(data);
  //       setAdminArray(data.filter((item) => item.isAdmin === true));
  //     } else {
  //       setError('Failed to fetch access data.');
  //     }
  //   } catch (err) {
  //     setError('An error occurred while fetching access data.');
  //   } finally {
  //     setFetching(false);
  //   }
  // }

  // fetchAccessData();
}, []);

useEffect(() => {
  // if (!fetching) {
    // if (!adminArray.some((item) => item.email === userEmail)) {
      setUnauthorized(false);
      setFetchingLoader(false);
    // } else {
      // setFetchingLoader(false);
    // }
  // }
}, [fetching, adminArray, userEmail]);





// ==================varifiying isAdmin ended=============




  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch(
        `/api/stats?month=${month}&day=${day}&from=${fromDate}&to=${toDate}`
      );
      const data = await res.json();
      setStats(data);
      setPopularPost(data.popularPost);
      setDaily(data.statsFor[0] || []);
      setWeekly(data.statsFor[1] || []);
      setMonthly(data.statsFor[2] || []);
    };

    fetchStats();
  }, [month, day, fromDate, toDate]);

  const handleChange = (event) => {
    setSelector(event.target.value);
  };

  const handleFromDateChange = (e) => {
    const newFromDate = e.target.value;
    if (newFromDate && toDate && newFromDate > toDate) {
      setToDate(""); // Reset 'To' date if 'From' date is after 'To' date
    }
    setFromDate(newFromDate);
  };

  const handleToDateChange = (e) => {
    const newToDate = e.target.value;
    if (newToDate && fromDate && newToDate < fromDate) {
      return; // Prevent selecting a 'To' date that is before 'From' date
    }
    setToDate(newToDate);
  };

  const chartData = {
    labels: stats.filteredPosts.map((post) =>
      new Date(post.createdAt).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Views",
        data: stats.filteredPosts.map((post) => post.views),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const totalPostsData = {
    labels: selector === 'daily'
      ? daily.map((item) => item.daily)
      : selector === 'weekly'
      ? weekly.map((item) => item.weekly)
      : selector === 'monthly'
      ? monthly.map((item) => item.month)
      : [],
    datasets: [
      {
        label: "Posts",
        data: selector === 'daily'
          ? daily.map((item) => item.totalPosts)
          : selector === 'weekly'
          ? weekly.map((item) => item.totalPosts)
          : selector === 'monthly'
          ? monthly.map((item) => item.totalPosts)
          : [],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const totalViewsData = {
    labels: ['Total Views'],
    datasets: [
      {
        label: 'Total Views',
        data: [stats.totalViews],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const popularPostData = {
    labels: [stats.popularPost.title || 'No Popular Post'],
    datasets: [
      {
        label: 'Views',
        data: [stats.popularPost.views || 0],
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
    ],
  };

  const handlePointClick = (points) => {
    if (points.length) {
      const index = points[0].index;
      setSelectedPost(stats.filteredPosts[index]);
    }
  };

  const toggleFilter = () => {
    setShowFilters(!showFilters);
    if (!showFilters) {
      setFilterType('none');
    }
  };

  const handleFilterTypeChange = (type) => {
    setFilterType(type);
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
      <div className={styles.filters}>
        <button
          className={styles.filterButton}
          onClick={toggleFilter}>
          Toggle Filters
        </button>
        {/* sidebar menue start*/}
    <button className={styles.menubtn} onClick={() => setMenu(!menu)} >{menu ? '✕' : '☰'}</button>
{
  menu &&
   <div className={styles.menuBar}> 

<ul>
  <li><Link href={"dashboard/write"}>Add Post</Link></li>
  <li><Link href={"dashboard/posts"}>All Post</Link></li>
  <li><Link href={"dashboard/categories"}>Category</Link></li>
  <li><Link href={"dashboard/access"}>Access</Link></li>
  <li><Link href={"dashboard/contacts"}>Contacts</Link></li>
  <li><Link href={"dashboard/questions"}>Questions</Link></li>
  <li><Link href={"dashboard/author"}>Doctor List</Link></li>
  <li><Link href={"dashboard/emailtemplate"}>Email-Template</Link></li>
  <li><Link href={"dashboard/users"}>All Users</Link></li>
  <li><Link href={"dashboard/servicesmanger"}>Service Manger</Link></li>
  <li><Link href={"dashboard/ads"}>Ads Manger</Link></li>



</ul>
  </div>}
          {/* sidebar menue start*/}


        {showFilters && (
          <div className={styles.filterOptions}>
            <div className={styles.filterTypeSelector}>
              <button
                className={styles.filterButton}
                onClick={() => handleFilterTypeChange('month-day')}>
                Month/Day Filter
              </button>
              <button
                className={styles.filterButton}
                onClick={() => handleFilterTypeChange('date-range')}>
                Date Range Filter
              </button>
            </div>

            {filterType === 'month-day' && (
              <div className={styles.month_dayGroup}>
                <select
                  className={styles.select}
                  onChange={(e) => setMonth(e.target.value)}
                  value={month}>
                  <option value="">Select Month</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(0, i).toLocaleString("default", { month: "long" })}
                    </option>
                  ))}
                </select>

                <select onChange={(e) => setDay(e.target.value)} value={day}>
                  <option value="">Select Day</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {filterType === 'date-range' && (
              <div className={styles.filterGroup}>
                From:
                <input className={styles.input} type="date" onChange={handleFromDateChange}value={fromDate}/>
                To:
                <input
                  className={styles.input}type="date" onChange={handleToDateChange}value={toDate} min={fromDate}/> 
              </div>
            )}
          </div>
        )}
      </div>

<div className={styles.chartMain}>
      <div className={styles.chart}>
        <h4>Total Posts: {stats.totalPosts}</h4>
        <select id="posts" name="select" value={selector} onChange={handleChange}>
          <option value="daily">Today</option>
          <option value="weekly">Week</option>
          <option value="monthly">Month</option>
        </select>
        {/* Pie,Doughnut,Radar,PolarArea,Bubble,Scatter */}
        <Line
          data={totalPostsData}
          options={{ responsive: true, plugins: { legend: { display: false } } }}/>
      </div>

      <div className={styles.chart}>
        <h4>
          Post Views:{" "}
          {stats.filteredPosts.reduce((current, post) => current + post.views, 0)}
        </h4>
        <Line
          data={chartData}
          options={{
            onClick: (event, elements) => handlePointClick(elements),
          }}/>
      </div>

      <div className={styles.chart}>
        <h4>Total Views: {stats.totalViews}</h4>
        <Bar
          data={totalViewsData}
          options={{ responsive: true, plugins: { legend: { display: false } } }}/>
      </div>

      <div className={styles.chart}>
        <h4>
          Most Popular Post: {stats.popularPost.title} {stats.popularPost.views}{" "}
          views
        </h4>
        <Bar
          data={popularPostData}
          options={{ responsive: true, plugins: { legend: { display: false } } }}/>
      </div>

      {popularPost && (
        <div className={styles.postDetails}>
          <h3>Selected Post Details</h3>
          <h4>Title: {popularPost.title}</h4>
          <h4>Category: {popularPost.catSlug}</h4>
          <h4>Views: {popularPost.views}</h4>
          <h4>
            Created At:{" "}
            {formatDateTime(popularPost.createdAt).date}{" "}
            {formatDateTime(popularPost.createdAt).time}
          </h4>

          {popularPost.img && (
            <img
              src={popularPost.img}
              alt={popularPost.title}
              className={styles.postImage}
              width={100}
              height={100}/>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default Dashboard;

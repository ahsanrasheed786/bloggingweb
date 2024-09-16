import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";
import  checkAccess  from "@/utils/authontication";
// Helper function to format numbers with "k" and "M"
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

// GET STATISTICS API
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const day = searchParams.get("day");
  const fromDate = searchParams.get("from"); 
  const toDate = searchParams.get("to");     // Format: YYYY-MM-DD
  const canAccess = await checkAccess();

  if (canAccess.status!=200) {
   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
 }
  try {
    // Get all posts
    const posts = await prisma.post.findMany({
      select: {
        createdAt: true,
        views: true,
        title: true,
        img: true,
        catSlug: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    //daily stats

    let dailyStats = [];
for (let i = 0; i < 30; i++) {
  const date = new Date();
  date.setDate(date.getDate() - i);
  const day = date.getDate(); // Extract the day (e.g., 17)
  const formattedDate = date.toISOString().slice(0, 10);
  const postsByDate = posts.filter(
    (post) => new Date(post.createdAt).toISOString().slice(0, 10) === formattedDate
  );
  const totalPosts = postsByDate.length;
  dailyStats.push({ daily: day, totalPosts }); // Store only the day
}


// this weekly stats
let weeklyStats = [];
for (let i = 0; i < 7; i++) {
  const date = new Date();
  date.setDate(date.getDate() - i);
  const day = date.getDate(); // Extract the day (e.g., 17)
  const postsByDate = posts.filter(
    (post) => new Date(post.createdAt).toISOString().slice(0, 10) === date.toISOString().slice(0, 10)
  );
  const totalPosts = postsByDate.length;
  weeklyStats.push({ weekly: day, totalPosts }); // Store only the day
}

// montly stats
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
let montlyStats = [];
for (let i = 1; i <= 12; i++) {
  const postsByMonth = posts.filter(
    (post) => new Date(post.createdAt).getMonth() + 1 === i
  );
  // const totalViews = postsByMonth.reduce((sum, post) => sum + post.views, 0);
   const totalPosts = postsByMonth.length;
  montlyStats.push({ month:monthNames[i-1], totalPosts });
} 
    // Filter posts by date range
    let filteredPosts = posts;

    if (fromDate && toDate) {
      filteredPosts = filteredPosts.filter(
        (post) => new Date(post.createdAt) >= new Date(fromDate) && new Date(post.createdAt) <= new Date(toDate)
      );
    } else {
      // Filter posts by selected month and day
      if (month) {
        filteredPosts = filteredPosts.filter(
          (post) => new Date(post.createdAt).getMonth() + 1 === parseInt(month)
        );
      }

      if (day) {
        filteredPosts = filteredPosts.filter(
          (post) => new Date(post.createdAt).getDate() === parseInt(day)
        );
      }
    }

    // If no posts found for the given filters, set default values
    if (filteredPosts.length === 0) {
      return new NextResponse(
        JSON.stringify({
          totalPosts: 0,
          totalViews: 0,
          filteredPosts: [],
          popularPost: {
            title: "No popular post",
            views: 0,
            img: "",
            catSlug: "",
            createdAt: "",
          },
          statsFor:[]
        }),
        { status: 200 }
      );
    }

    // Calculate total posts and total views for the filtered data
    const totalPosts = filteredPosts.length;
    const totalViews = filteredPosts.reduce((acc, post) => acc + post.views, 0);

    // Find the most popular post
    const popularPost = filteredPosts.reduce((prev, current) =>
      prev.views > current.views ? prev : current
    );

    return new NextResponse(
      JSON.stringify({
        totalPosts: formatNumber(totalPosts),
        totalViews: formatNumber(totalViews),
        filteredPosts,
        popularPost: {
          title: popularPost.title || "No popular post",
          views: formatNumber(popularPost.views || 0),
          img: popularPost.img || "",
          catSlug: popularPost.catSlug || "",
          createdAt:popularPost.createdAt ||"" ,
        },
        statsFor:[
          dailyStats,
          weeklyStats,
          montlyStats,
        ]
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to fetch statistics" }),
      { status: 500 }
    );
  }
};
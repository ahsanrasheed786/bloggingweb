
import prisma from "@/utils/connect";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter"); // e.g., lastMonth, thisMonth, etc.
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  let filterConditions = {};

  // Handle filter types
  if (filter === 'lastMonth') {
    const now = new Date();
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // 0th day of current month is last day of previous month

    filterConditions.createdAt = {
      gte: firstDayLastMonth, // Greater than or equal to first day of last month
      lt: new Date(lastDayLastMonth.setDate(lastDayLastMonth.getDate() + 1)), // Less than first day of this month
    };
  }

  // If specific date range is provided, apply it instead
  if (startDate && endDate) {
    filterConditions.createdAt = {
      gte: new Date(startDate),
      lt: new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1)),
    };
  }

  try {
    // Fetch users based on filter conditions
    const users = await prisma.user.findMany({
      where: filterConditions,
    });

    return new Response(JSON.stringify(users), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Error fetching users", { status: 500 });
  }
}

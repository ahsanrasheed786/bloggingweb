import { getAuthSession } from "./auth";
import prisma from "@/utils/connect";
 

  export default async function checkAccess() {
     const session = await getAuthSession();
    if (!session) {
        return new Response(JSON.stringify({ error: 'Unauthorized ' }), { status: 401 });
      }
    const userEmail=session.user.email
    // Get all access data
    try {
      const accessData = await prisma.access.findMany();
       const found = accessData.some((access) => access.email === userEmail);
      if (!found) {
        return new Response(JSON.stringify({ error: 'Unauthorized ' }), { status: 401 });
      }
      return new Response(JSON.stringify(accessData), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
    }
  }

  export async function onlyAdmin() {
    const session = await getAuthSession();
    if (!session) {
        return new Response(JSON.stringify({ error: 'Unauthorized utils/authontication/onlyAdmin' }), { status: 401 });
      }
    const userEmail=session.user.email
    // console.log("utils/authontication/onlyAdmin",userEmail);
    // Get all access data
    try {
      const accessData = await prisma.access.findMany();
       const found = accessData.some((access) => {access.email === userEmail && access.isAdmin===true});
      if (!found) {
        return new Response(JSON.stringify({ error: 'Unauthorized ' }), { status: 401 });
      }
      return new Response(JSON.stringify(accessData), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
    }
  
  }
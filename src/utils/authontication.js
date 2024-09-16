import { getAuthSession } from "./auth";
import prisma from "@/utils/connect";
 

  export default async function checkAccess() {
     const session = await getAuthSession();
    if (!session) {
        return new Response(JSON.stringify({ error: 'Unauthorized ' }), { status: 401 });
      }
        const userEmail=session.user.email
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
    
    // Check if the session exists
    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: No session found' }),
        { status: 401 }
      );
    }
  
    const userEmail = session.user?.email;   
    // console.log("Checking admin access for:", userEmail);
    
    if (!userEmail) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Email not found in session' }),
        { status: 401 }
      );
    }
  
    try {
      // Fetch access data for the user
      const accessData = await prisma.access.findUnique({ where: { email: userEmail } });
      if (!accessData) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized: Access data not found' }),
          { status: 401 }
        );
      }      if (!accessData.isAdmin) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized: Not an admin' }),
          { status: 401 }
        );
      }
  
      return new Response(JSON.stringify(accessData), { status: 200 });
      
    } catch (error) {
      console.error("Error checking admin access:", error);
      return new Response(
        JSON.stringify({ error: 'Internal Server Error: Failed to fetch access data' }),
        { status: 500 }
      );
    }
  }
  
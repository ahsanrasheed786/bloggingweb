// // app/api/access/route.js
// import { getAuthSession } from "@/utils/auth";
// import prisma from "@/utils/connect";

// export async function GET(req) {
//   const session = await getAuthSession();
//   if (!session) {
//     return new Response(JSON.stringify({ error: 'Unauthorized failed!! to access this page' }), { status: 401 });
//   }
// const userEmail=session.user.email
//   // Get all access data
//   try {
//     const accessData = await prisma.access.findMany();
//     const found = accessData.some((access) => access.email === userEmail);
//     if (!found) {
//       return new Response(JSON.stringify({ error: 'Unauthorized failed!! to access this page Admin Have Not Allowed You' }), { status: 401 });
//     }
//     return new Response(JSON.stringify(accessData), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
//   }
// }

// export async function POST(req) {
//   try {
//     const { name, email, isAdmin } = await req.json();

//     if (!name || !email || typeof isAdmin !== 'boolean') {
//       return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
//     }

//     const newAccess = await prisma.access.create({
//       data: {
//         email,
//         isAdmin,
//         name,
//       },
//     });

//     return new Response(JSON.stringify(newAccess), { status: 201 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Failed to create data' }), { status: 500 });
//   }
// }







// app/api/access/route.js
import { getAuthSession } from "@/utils/auth";
// import  checkAccess  from "@/utils/authontication";
import { onlyAdmin } from "@/utils/authontication";
import prisma from "@/utils/connect";

export async function GET(req) {
  // const session = await getAuthSession();
  const canAccess = await onlyAdmin();
   if (!canAccess.status===200) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
   // Get all access data
  try {
    const accessData = await prisma.access.findMany();
     
    return new Response(JSON.stringify(accessData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
  }
}

export async function POST(req) {
  const canAccess = await onlyAdmin();
  if (!canAccess.status===200) {
   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
 }
  try {
    const { name, email, isAdmin } = await req.json();

    if (!name || !email || typeof isAdmin !== 'boolean') {
      return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
    }

    const newAccess = await prisma.access.create({
      data: {
        email,
        isAdmin,
        name,
      },
    });

    return new Response(JSON.stringify(newAccess), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create data' }), { status: 500 });
  }
}

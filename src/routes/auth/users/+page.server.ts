// src/routes/books/+page.server.ts
import { getUserByEmail } from '$lib/server/db/models/users';

export const load = async () => {

    //const { data } = await getUserByEmail();


};

// const { localsUser } = await parent();

// if (!localsUser) {
// //	redirect(302, '../../login');
// }

//     if (!localsUser.companyId) {
//         //console.log('localsUser: ', localsUser.companyId);
//          //redirect(302, './auth/users');
//     }

//     //console.log('localsUser: ', localsUser);

// return {};
// };
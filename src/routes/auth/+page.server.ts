import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { localsUser } = await parent();

	if (!localsUser) {
	//	redirect(302, '../../login');
	}
	
		if (!localsUser.companyId) {
			console.log('localsUser: ', localsUser.companyId);
		 	//redirect(302, './auth/users');
		}
	
		//console.log('localsUser: ', localsUser);

	return {};
};

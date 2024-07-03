import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { localsUser } = await parent();

	if (!localsUser) {
		redirect(302, '../../login');
	}

	return {};
};

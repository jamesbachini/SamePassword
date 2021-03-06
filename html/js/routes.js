import { utils } from './../core/utils.js';
/* global vSettings */

export const routes = {
	init: async () => {
		const get = utils.getQueryParams();
		if (get.page && get.page === 'home') {
			// Home Page
			await utils.loadModule('pages/home.html','content');
			utils.setTitle(`${vSettings.brand} | Home`);
		} else if (get.page && get.page === 'terms') {
			// Terms & Conditions
			await utils.loadModule('pages/terms.html','content', (pageContent) => {
				return pageContent.split('[brand]').join(vSettings.brand);
			});
			utils.setTitle(`${vSettings.brand} Terms and Conditions`);
		} else if (get.page && get.page === 'privacy') {
			// Privacy Policy
			await utils.loadModule('pages/privacy.html','content', (pageContent) => {
				return pageContent.split('[brand]').join(vSettings.brand);
			});
			utils.setTitle(`${vSettings.brand} Privacy Policy`);
		} else if (get.page) {
			// automatically catch any pages without dedicated routes
			const cleanPage = utils.cleanString(get.page);
			const cleanTitle = utils.titleCase(cleanPage);
			await utils.loadModule(`pages/${cleanPage}.html`,'content');
			utils.setTitle(`${vSettings.brand} | ${cleanTitle}`);
		} else {
			// load home page if no page= variable specified in URL
			await utils.loadModule('pages/home.html','content');
			utils.setTitle(`SamePassword | Simple Free Password Generator`);
			utils.setDescription(`Noone should use the same password for all their web accounts. Use this simple free password generator to secure your logins`);
		}
		utils.scrollTo();
		return true;
	},
}

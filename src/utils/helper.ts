import { forEach } from "lodash";

import { FAILED, MAIL_SPAM } from "./constants";

export const handleMakeKey = (length: number): string => {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
};

export const checkEmailSpam = (email: string) => {
	let count = 0;
	forEach(MAIL_SPAM, value => {
		count = email.indexOf(value) === FAILED ? count : count + 1;
	});
	return count;
};

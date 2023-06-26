import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from "class-validator";
import { isUndefined } from "lodash";

@ValidatorConstraint({ name: "IsPasswordRule", async: false })
export class IsPasswordRule implements ValidatorConstraintInterface {
	validate(password: string) {
		if (isUndefined(password)) {
			return false;
		}

		return checkPassword(password);
	}

	defaultMessage() {
		return "password-rule-wrong";
	}
}

const checkPassword = (password: string) => {
	const pattern =
		/([A-Z]+[a-z]+[!@#$%+\-=]+)|([A-Z]+[a-z]+[0-9]+)|([A-Z]+[0-9]+[a-z]+)|([A-Z]+[0-9]+[!@#$%+\-=]+)|([A-Z]+[!@#$%+\-=]+[0-9]+)|([A-Z]+[!@#$%+\-=]+[a-z]+)|([a-z]+[A-Z]+[0-9]+)|([a-z]+[A-Z]+[!@#$%+\-=]+)|([a-z]+[0-9]+[A-Z]+)|([a-z]+[0-9]+[!@#$%+\-=]+)|([a-z]+[!@#$%+\-=]+[0-9]+)|([a-z]+[!@#$%+\-=]+[A-Z]+)|([0-9]+[A-Z]+[a-z]+)|([0-9]+[A-Z]+[!@#$%+\-=]+)|([0-9]+[a-z]+[A-Z]+)|([0-9]+[a-z]+[!@#$%+\-=]+)|([0-9]+[!@#$%+\-=]+[A-Z]+)|([0-9]+[!@#$%+\-=]+[a-z]+)|([!@#$%+\-=]+[a-z]+[A-Z]+)|([!@#$%+\-=]+[a-z]+[0-9]+)|([!@#$%+\-=]+[A-Z]+[a-z]+)|([!@#$%+\-=]+[A-Z]+[0-9]+)|([!@#$%+\-=]+[0-9]+[A-Z]+)|([!@#$%+\-=]+[0-9]+[a-z]+)/g;
	return pattern.test(password);
};

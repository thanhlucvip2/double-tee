import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "IsPasswordRule", async: false })
export class IsSortOrderValue implements ValidatorConstraintInterface {
	validate(sort: string) {
		return sort === "ASC" || sort === "DESC";
	}

	defaultMessage() {
		return "sort-order-value-is-ASC-or-DESC";
	}
}

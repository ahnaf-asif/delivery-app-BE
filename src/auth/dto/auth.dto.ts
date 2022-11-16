import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class signInDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}

export class signUpDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	phone: string;

	@IsString()
	@IsNotEmpty()
	type: 'company' | 'shipper';

	@IsString()
	@IsNotEmpty()
	password: string;
}

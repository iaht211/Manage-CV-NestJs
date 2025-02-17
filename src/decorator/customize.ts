import { SetMetadata } from "@nestjs/common";

// create @Public() to public method every one can user login()
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true); //key:value
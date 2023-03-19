import {GenderModel} from "./gender.model";
import {AddressModel} from "./address.model";

export interface StudentModel {
  id?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
  mobile?: number;
  profileImageUrl?: string;
  genderId?: string;

  gender?: GenderModel;
  address?: AddressModel;
}

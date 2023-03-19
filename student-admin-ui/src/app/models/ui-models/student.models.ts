import {GenderModel} from "./gender.models";
import {AddressModel} from "./address.models";


export interface StudentModel {
  id?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
  mobile?: number;
  profileImageUrl?: string;
  genderId?: string;

  gender: GenderModel;
  address: AddressModel;
}

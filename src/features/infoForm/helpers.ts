import {
  emailRules, loginRules, nameRules, phoneRules, validateInputField,
} from '@features/helpers';
import {
  profileChatNameField,
  profileEmailField,
  profileFirstNameField,
  profileLastNameField,
  profileLoginField, profilePhoneField,
} from '@features/infoForm/infoForm';

export const validateProfileEmail = () => validateInputField(profileEmailField, emailRules);
export const validateProfileLogin = () => validateInputField(profileLoginField, loginRules);
export const validateProfileFirstName = () => validateInputField(profileFirstNameField, nameRules);
export const validateProfileLastName = () => validateInputField(profileLastNameField, nameRules);
export const validateProfileChatName = () => validateInputField(profileChatNameField, loginRules);
export const validateProfilePhone = () => validateInputField(profilePhoneField, phoneRules);

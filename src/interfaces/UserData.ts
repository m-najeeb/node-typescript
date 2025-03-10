export interface SignUpData {
  profilePicture?: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  country?: string;
  password: string;
  [key: string]: any;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface EditProfileData {
  id: string;
  profilePicture?: string;
  fullName?: string;
  phone?: string;
  country?: string;
}

export interface ChangePasswordData {
  email: string;
  currentPassword: string;
  newPassword: string;
}

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useAuth } from '../context/authContext';
import ApiClient, { PasswordUpdateData} from '../services/api-client';
import useUser, { User, Address } from '../hooks/useUser';

import { toast } from 'react-toastify';

export default function useProfile() {
    const userId = Cookies.get('id') || '';
    const { isLogged } = useAuth();
    const { data: user, isLoading, isError } = useUser(userId, isLogged);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [editedUser, setEditedUser] = useState<User | null>(null);
    const [editedAddress, setEditedAddress] = useState<Address | null>(null);
    const [passwordValidation, setPasswordValidation] = useState({ length: false, uppercase: false, number: false });
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
    const [deletePassword, setDeletePassword] = useState('');
    const apiClient = new ApiClient<User>('/users');
    const updateUserMutation = useMutation((newData: User) => apiClient.updateUser(userId, newData));
    const apiClientAddress = new ApiClient<Address>('/addresses');
    const updateAddressMutation = useMutation((editedAddress: Address) => apiClientAddress.updateAddress(userId, editedAddress));
    const queryClient = useQueryClient();
    const [emptyFields, setEmptyFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    streetName: false,
    streetNumber: false,
    zipCode: false,
    city: false,
    oldPassword: false,
    deletePassword: false,
    });
    
    useEffect(() => {
        if (user) {
          setEditedUser(user);
          setEditedAddress(user.Address);
        }
      }, [user]);
    
      const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (isEditing && user) {
          setEditedUser(user);
        }
      };
    
      const handleAddressEditToggle = () => setIsEditingAddress(!isEditingAddress);
      const handlePasswordChangeToggle = () => setIsChangingPassword(!isChangingPassword);
      const handleDeleteAccountToggle = () => setShowDeleteConfirmation(!showDeleteConfirmation);
    
      const validatePassword = (password: string) => {
        const hasLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        setPasswordValidation({ length: hasLength, uppercase: hasUpperCase, number: hasNumbers });
        return hasLength && hasUpperCase && hasNumbers;
      };
    
      const handleUserUpdate = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const isFirstNameEmpty = !editedUser?.firstName;
        const isLastNameEmpty = !editedUser?.lastName;
        const isEmailEmpty = !editedUser?.email;
    
      if (isFirstNameEmpty || isLastNameEmpty || isEmailEmpty) {
        setEmptyFields(fields => ({
          ...fields,
          firstName: isFirstNameEmpty,
          lastName: isLastNameEmpty,
          email: isEmailEmpty
        }));
        return;
      }
      if (editedUser && typeof editedUser.id === 'number') {
        updateUserMutation.mutate({ ...editedUser, id: editedUser.id }, {
          onSuccess: () => {
            queryClient.invalidateQueries(['user', userId]);
            toast.success("User updated successfully!");
            setIsEditing(false);
          },
          onError: () => {
            toast.error("Failed to update user.");
          }
        });
      }
    };
    
      const handleAddressUpdate = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const isStreetNameEmpty = !editedAddress?.street_name;
        const isStreetNumberEmpty = !editedAddress?.street_number;
        const isZipCodeEmpty = !editedAddress?.zip_code;
        const isCityEmpty = !editedAddress?.city;
        setEmptyFields(fields => ({
            ...fields,
            streetName: isStreetNameEmpty,
            streetNumber: isStreetNumberEmpty,
            zipCode: isZipCodeEmpty,
            city: isCityEmpty,
          }));
          if (isStreetNameEmpty || isStreetNumberEmpty || isZipCodeEmpty || isCityEmpty) {
            return;
          }
        if (editedAddress && typeof editedAddress.id === 'number') {
            updateAddressMutation.mutate({ ...editedAddress, id: editedAddress.id }, {
              onSuccess: () => {
                queryClient.invalidateQueries(['user', userId]);
                toast.success("Address updated successfully!");
                setIsEditingAddress(false);
              },
              onError: () => {
                toast.error("Failed to update address.");
              }
            });
          }
        };
    
      const handlePasswordUpdate = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!validatePassword(passwords.newPassword)) {
          toast.error("Password does not meet the criteria.");
          return;
        }
        if (passwords.newPassword !== passwords.confirmNewPassword) {
          toast.error("Passwords do not match.");
          return;
        }
    
        const passwordUpdateData: PasswordUpdateData = { oldPassword: passwords.oldPassword, newPassword: passwords.newPassword };
      if (passwordUpdateData) {
        apiClient.updatePassword(userId, passwordUpdateData)
          .then(() => {
            toast.success('Password updated successfully.');
            setIsChangingPassword(false);
          })
          .catch(() => {
            toast.error('Failed to update password.');
          });
      }
    };
    
      const handleDeleteUser = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!deletePassword) {
          setEmptyFields({ ...emptyFields, deletePassword: true });
          return;
        }
      }

      const handleInputChange = (value: string, field: string) => {
        if (editedUser) {
          setEditedUser({ ...editedUser, [field]: value });
          setEmptyFields({ ...emptyFields, [field]: false });
        }
      };
    
      const handleAddressChange = (value: string, field: string) => {
        if (editedAddress) {
          setEditedAddress({ ...editedAddress, [field]: value });
          setEmptyFields({ ...emptyFields, [field]: false });
        }
      };
    return {
    user, isLoading, isError,
    isEditing, isEditingAddress, isChangingPassword, showDeleteConfirmation,
    editedUser, editedAddress, passwordValidation, passwords, deletePassword, emptyFields,
    setIsEditing, setIsEditingAddress, setIsChangingPassword, setShowDeleteConfirmation,
    setEditedUser, setEditedAddress, setPasswordValidation, setPasswords, setDeletePassword, setEmptyFields,
    handleEditToggle, handleAddressEditToggle, handlePasswordChangeToggle, handleDeleteAccountToggle,
    handleUserUpdate, handleAddressUpdate, handlePasswordUpdate, handleDeleteUser,
    handleInputChange, handleAddressChange, validatePassword
    };
    }

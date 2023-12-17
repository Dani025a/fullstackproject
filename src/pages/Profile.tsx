import './profile.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useProfile from '../hooks/useProfile';

export function Profile() {
    const {
        user, isLoading, isError,
        isEditing, isEditingAddress, isChangingPassword, showDeleteConfirmation,
        editedUser, editedAddress, passwordValidation, passwords, deletePassword, emptyFields,
        handleEditToggle, handleAddressEditToggle, handlePasswordChangeToggle, handleDeleteAccountToggle,
        handleUserUpdate, handleAddressUpdate, handlePasswordUpdate, handleDeleteUser,
        handleInputChange, handleAddressChange, setPasswords, setDeletePassword, validatePassword
      } = useProfile();

  

  if (isLoading) return <div>Loading...</div>;
  if (isError || !user) return <div>Error loading user info</div>;

  return (
    <div className='profile-page'>
    <ToastContainer />
      <h1>User Profile</h1>
      <div className="section-spacer">
      {isEditing ? (
        <form onSubmit={handleUserUpdate}>
            <p>First Name</p>
            <input type='text' value={editedUser?.firstName || ''} onChange={e => handleInputChange(e.target.value, 'firstName')} />
            {emptyFields.firstName && <p style={{ color: 'red' }}>First name cannot be empty.</p>}
            <p>Last Name</p>
            <input type='text' value={editedUser?.lastName || ''} onChange={e => handleInputChange(e.target.value, 'lastName')} />
            {emptyFields.lastName && <p style={{ color: 'red' }}>Last name cannot be empty.</p>}
            <p>Email</p>
            <input type="email" value={editedUser?.email || ''} onChange={e => handleInputChange(e.target.value, 'email')} />
            {emptyFields.email && <p style={{ color: 'red' }}>Email cannot be empty.</p>}
          <button type="submit">Submit</button>
          <button type="button" onClick={handleEditToggle}>Cancel</button>
            </form>
      ) : (
          <div>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Email: {user.email}</p>
            <button onClick={handleEditToggle}>Edit User Info</button>
          </div>
        )}
      </div>
      <div className="section-spacer">
      {isEditingAddress ? (
        <form onSubmit={handleAddressUpdate}>
            <p>Street Name</p>
            <input type='text' placeholder='Street Name' value={editedAddress?.street_name || ''} onChange={e => handleAddressChange(e.target.value, 'street_name')} />
            {emptyFields.streetName && <p style={{ color: 'red' }}>Street Name cannot be empty.</p>}

            <p>Street Number</p>
            <input type='number' placeholder='Street Number' value={editedAddress?.street_number || ''} onChange={e => handleAddressChange(e.target.value, 'street_number')} />
            {emptyFields.streetNumber && <p style={{ color: 'red' }}>Street Number cannot be empty.</p>}

            <p>Zip Code</p>
            <input type='number' placeholder='Zip Code' value={editedAddress?.zip_code || ''} onChange={e => handleAddressChange(e.target.value, 'zip_code')} />
            {emptyFields.zipCode && <p style={{ color: 'red' }}>Zip Code cannot be empty.</p>}

            <p>City</p>
            <input type='text' placeholder='City' value={editedAddress?.city || ''} onChange={e => handleAddressChange(e.target.value, 'city')} />
            {emptyFields.city && <p style={{ color: 'red' }}>City cannot be empty.</p>}

            <button type="submit">Save Address</button>
          <button type="button" onClick={handleAddressEditToggle}>Cancel</button>
        </form>
        ) : (
          <div>
            <p>Address: {user?.Address.street_name} {user?.Address.street_number}, {user?.Address.zip_code}, {user?.Address.city}</p>
            <button onClick={handleAddressEditToggle}>Edit Address</button>
          </div>
        )}
      </div>
      <div className="section-spacer">
      {isChangingPassword ? (
        <form onSubmit={handlePasswordUpdate}>
            <p>Old Password</p>
            <input type='password' placeholder='Old Password' value={passwords.oldPassword} onChange={e => setPasswords({ ...passwords, oldPassword: e.target.value })} />
            {emptyFields.oldPassword && <p style={{ color: 'red' }}>Cannot be empty.</p>}
            <p>New Password</p>
            <input type='password' placeholder='New Password' value={passwords.newPassword} onChange={e => {
              setPasswords({ ...passwords, newPassword: e.target.value });
              validatePassword(e.target.value);
            }} />
                        <div>
              <p style={{ color: passwordValidation.length ? 'green' : 'red' }}>
                {passwordValidation.length ? '✔' : '✘'} At least 8 characters
              </p>
              <p style={{ color: passwordValidation.uppercase ? 'green' : 'red' }}>
                {passwordValidation.uppercase ? '✔' : '✘'} At least one uppercase letter
              </p>
              <p style={{ color: passwordValidation.number ? 'green' : 'red' }}>
                {passwordValidation.number ? '✔' : '✘'} At least one number
              </p>
            </div>
            <p>Confirm New Password</p>
            <input type='password' placeholder='Confirm New Password' value={passwords.confirmNewPassword} onChange={e => setPasswords({ ...passwords, confirmNewPassword: e.target.value })} />
            {passwords.newPassword && passwords.confirmNewPassword && 
             passwords.newPassword !== passwords.confirmNewPassword && 
             <p style={{ color: 'red' }}>Passwords do not match.</p>
            }

           <button type="submit">Change Password</button>
          <button type="button" onClick={handlePasswordChangeToggle}>Cancel</button>
        </form>
      ) : (
        <button onClick={handlePasswordChangeToggle}>Change Password</button>
      )}
      </div>
      <div className="section-spacer">
        <button onClick={handleDeleteAccountToggle}>Delete Account</button>
        {showDeleteConfirmation && (
          <div>
            <p>Are you sure you want to delete your account?</p>
            <input type='password' placeholder='Confirm Password' value={deletePassword} onChange={e => setDeletePassword(e.target.value)} />
            <button onClick={handleDeleteUser}>Delete</button>
            <button onClick={handleDeleteAccountToggle}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}


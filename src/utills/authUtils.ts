

export const isUserSignedIn = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

 export const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
  };
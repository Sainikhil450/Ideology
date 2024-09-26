const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  console.log("Is Authenticated:", isAuthenticated); // Check if this is true after login
  
  return isAuthenticated ? (
    <>
      <Header /> {/* Render the header only if authenticated */}
      {children}
    </>
  ) : (
    <Navigate to="/login" /> // Redirect to login if not authenticated
  );
};
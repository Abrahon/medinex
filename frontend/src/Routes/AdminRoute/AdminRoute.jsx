// Example: protect admin route
const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/users/role?email=${user.email}`)
        .then(res => res.json())
        .then(data => setIsAdmin(data.role === 'admin'));
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return isAdmin ? children : <Navigate to="/" />;
};

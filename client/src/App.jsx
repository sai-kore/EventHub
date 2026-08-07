import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
      <AuthProvider>
          <AppRoutes />
      </AuthProvider>
  );
}

export default App;


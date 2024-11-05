import "./App.css";
import "./styles/styles.css";
import AppRoutes from "./routes/AppRoutes";
import { NavigationProvider } from "./context/NavigationContext";

function App() {
  return (
    <NavigationProvider>
        <AppRoutes />
    </NavigationProvider>
  );
}

export default App;

import "./App.css";
import "./styles/styles.css";
import AppRoutes from "./routes/AppRoutes";
import { NavigationProvider } from "./context/NavigationContext";

function App() {
  return (
    <NavigationProvider>
      <div>
        <AppRoutes />
      </div>
    </NavigationProvider>
  );
}

export default App;

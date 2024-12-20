import MuiThemeProvider from "./contexts/MuiThemeProvider";
import AppRoutes from "./routes";

function App() {
  return (
    <MuiThemeProvider>
      <AppRoutes />;
    </MuiThemeProvider>
  );
}

export default App;

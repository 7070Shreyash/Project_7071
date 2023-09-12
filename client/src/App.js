import { BrowserRouter , Navigate , Routes , Route, useSearchParams} from "react-router-dom";
import HomePage from "scenes/HomePage";
import LoginPage from "scenes/LoginPage";
import UserPage from "scenes/UserPage";
import FirstPage from "scenes/FirstPage";
import QuesPage from "scenes/QuesPage";
import { useMemo } from "react";
import { UseSelector, useSelector } from "react-redux";
import { CssBaseline , ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";


function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(()=> createTheme(themeSettings(mode)),[mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme} >
      <CssBaseline/>
      <Routes>
      <Route path = "/" element = {<FirstPage/>}/>
      <Route path = "/home" element = {isAuth ? <HomePage/> : <FirstPage/> }/>
      <Route path = "/user/:userId" element = {isAuth ? <UserPage/> : <FirstPage/> }/>
      <Route path = "/login" element = {<LoginPage/>}/>
      <Route path = "/ques/:quesId" element = {isAuth ? <QuesPage/> : <FirstPage/> }/>
      </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

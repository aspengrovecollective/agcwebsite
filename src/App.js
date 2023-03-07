import { useEffect } from 'react';

// react-router components
import { Routes, Route, useLocation } from 'react-router-dom';

// @mui material components
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material Kit 2 React themes
import theme from 'assets/theme';
import Home from 'pages/home';

export default function App() {
    const { pathname } = useLocation();

    // Setting page scroll to 0 when changing the route
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [pathname]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </ThemeProvider>
    );
}

// src/pages/LandingPage.js

import * as React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from '../components/layout/AppAppBar';
import Hero from '../components/layout/Hero';
import LogoCollection from '../components/layout/LogoCollection';
import Highlights from '../components/layout/Highlights';
import Pricing from '../components/layout/Pricing';
import Features from '../components/layout/Features';
import Testimonials from '../components/layout/Testimonials';
import FAQ from '../components/layout/FAQ';
import Footer from '../components/layout/Footer';
import { useTheme } from '@mui/material/styles';

// function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 width: '100vw',
//                 position: 'fixed',
//                 bottom: 24,
//             }}
//         >
//             <ToggleButtonGroup
//                 color="primary"
//                 exclusive
//                 value={showCustomTheme ? 'custom' : 'default'}
//                 onChange={toggleCustomTheme}
//                 aria-label="Platform"
//                 sx={{
//                     backgroundColor: 'background.default',
//                     '& .Mui-selected': {
//                         pointerEvents: 'none',
//                     },
//                 }}
//             >
//                 <ToggleButton value="custom">
//                     <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
//                     Custom theme
//                 </ToggleButton>
//                 <ToggleButton value="default">Material Design 2</ToggleButton>
//             </ToggleButtonGroup>
//         </Box>
//     );
// }

// ToggleCustomTheme.propTypes = {
//     showCustomTheme: PropTypes.bool.isRequired,
//     toggleCustomTheme: PropTypes.func.isRequired,
// };

export default function LandingPage() {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const theme = useTheme();

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    // const toggleCustomTheme = () => {
    //     setShowCustomTheme((prev) => !prev);
    // };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <Hero />
            <Box sx={{ bgcolor: 'background.default' }}>
                <LogoCollection />
                <Features />
                <Divider />
                <Testimonials />
                <Divider />
                <Highlights />
                <Divider />
                <Pricing />
                <Divider />
                <FAQ />
                <Divider />
                <Footer />
            </Box>
            {/* <ToggleCustomTheme
                showCustomTheme={showCustomTheme}
                toggleCustomTheme={toggleCustomTheme}
            /> */}
        </React.Fragment>
    );
}

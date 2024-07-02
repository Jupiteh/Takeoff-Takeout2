import * as React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
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

export default function LandingPage({ mode, toggleColorMode }) {
    const theme = useTheme();

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
        </React.Fragment>
    );
}

LandingPage.propTypes = {
    mode: PropTypes.oneOf(['dark', 'light']).isRequired,
    toggleColorMode: PropTypes.func.isRequired,
};

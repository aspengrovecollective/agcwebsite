import { useEffect, useState } from 'react';

// @mui material components
// import Container from '@mui/material/Container';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';

// Material Kit 2 React components
import MKBox from 'components/MKBox';
// import MKTypography from 'components/MKTypography';
// import MKSocialButton from 'components/MKSocialButton';

// Material Kit 2 React examples
// import DefaultNavbar from 'examples/Navbars/DefaultNavbar';
// import DefaultFooter from 'examples/Footers/DefaultFooter';
// import FilledInfoCard from 'examples/Cards/InfoCards/FilledInfoCard';

// Presentation page sections
// import Counters from 'pages/Presentation/sections/Counters';
// import Information from 'pages/Presentation/sections/Information';
// import DesignBlocks from 'pages/Presentation/sections/DesignBlocks';
// import Pages from 'pages/Presentation/sections/Pages';
// import Testimonials from 'pages/Presentation/sections/Testimonials';
// import Download from 'pages/Presentation/sections/Download';

// Presentation page components
// import BuiltByDevelopers from 'pages/Presentation/components/BuiltByDevelopers';

// Routes
// import routes from 'routes';
// import footerRoutes from 'footer.routes';

// CSS
import 'assets/theme/style.css';

// Images
import logoImage from 'assets/images/logos/agc-logo.svg';

import FFFForm from 'pages/home/components/fffForm';

const submitForm = require('pages/home/helpers/submitFFFForm');

function Home() {
    const [googleFormData, setGoogleFormData] = useState();
    useEffect(() => {
        // Get Google Form data
        fetch('/api/get-form')
            .then((res) => res.json())
            .then((data) => setGoogleFormData(data));
    }, []);

    // TODO: Finish placeholder boxes
    console.log(googleFormData);
    // eslint-disable-next-line no-unused-vars
    const fffForm = <FFFForm key="test" googleFormData={googleFormData} submitForm={submitForm} />;

    return (
        <>
            <MKBox minHeight="20vh" width="100%" style={{ padding: '10px' }}>
                <img
                    src={`${logoImage}`}
                    alt="Aspen Grove Collective Logo"
                    style={{
                        display: 'block',
                        maxWidth: '100%',
                        height: '30vh',
                        margin: '0 auto',
                    }}
                />
            </MKBox>
            <MKBox
                sx={{
                    display: 'block',
                    maxWidth: '100%',
                    margin: '0 auto',
                }}
                className="fffForm"
            >
                {googleFormData && Object.keys(googleFormData).length !== 0 && (
                    <FFFForm googleFormData={googleFormData} submitForm={submitForm} />
                )}
            </MKBox>
        </>
    );
}

export default Home;

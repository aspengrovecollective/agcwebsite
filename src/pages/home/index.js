// @mui material components
// import Container from '@mui/material/Container';
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

// Images
import logoImage from 'assets/images/logos/agc-logo.png';

function Home() {
    return (
        <>
            <MKBox minHeight="20vh" width="100%" style={{ padding: '10px' }}>
                <img
                    src={`${logoImage}`}
                    alt="Aspen Grove Collective Logo"
                    style={{
                        display: 'block',
                        maxWidth: '100%',
                        maxHeight: '80%',
                        margin: '0 auto',
                    }}
                />
            </MKBox>
            <MKBox
                sx={{
                    display: 'flex',
                    placeItems: 'center',
                    minWidth: '60%',
                    maxWidth: '90%',
                    margin: '0 auto',
                }}
            >
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSc_ZlPDl4_9I2k6glf9Y6ZPZ_Y-YnE9Bwvlss1CJby6Lh6tlA/viewform?embedded=true"
                    style={{
                        display: 'block',
                        margin: '0 auto',
                        border: 'none',
                        overflowY: 'hidden',
                    }}
                    width="640"
                    height="2500"
                    title="Free Feedback Friday Form"
                >
                    Loading…
                </iframe>
            </MKBox>
        </>
    );
}

export default Home;

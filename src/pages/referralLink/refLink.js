import React from 'react';
import logoImage from 'assets/images/logos/agc-logo.svg';
import MKBox from 'components/MKBox';

function RefLink() {
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
            >
                <h1>Referral Link</h1>
                <form>
                    <label htmlFor="referralLink">
                        URL:
                        <input type="text" id="referralLink" name="referralLink" />
                    </label>
                </form>
            </MKBox>
        </>
    );
}

export default RefLink;

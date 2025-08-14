import './PromoPanel.css';
// You can find a free SVG illustration online from sites like undraw.co
// and place it in your `src/assets` folder.
// import loginIllustration from '../assets/login-illustration.svg'; 

const PromoPanel = () => {
    return (
        <div className="promo-panel">
            <div className="promo-panel-content">
                {/* <img src={loginIllustration} alt="Financial management illustration" /> */}
                <h1>FinTrack</h1>
                <p className="subtitle">Take control of your personal finances.</p>
                <p className="creator-credit">Made by Atharv Iche</p>
            </div>
        </div>
    );
};

export default PromoPanel;
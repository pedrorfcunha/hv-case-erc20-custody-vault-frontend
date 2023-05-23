import logo from "../../assets/logo.svg";
import "./signature.styles.scss";

const Signature = () => {
    return (
        <div className="signature">
            <p>Developed with React</p>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    );
};

export default Signature;

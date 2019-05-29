import withData from '../libraries/withData';
import Signup from '../components/Signup';
import App from '../components/App';

const signup = () => (
  <App>
    <div className="full-screen">
      <div className="signup-section">
        <Signup />
      </div>
      <style jsx>{`
        .full-screen {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100vw;
          height: 100vh;
        }
        .signup-section {
          width: 450px;
        }
      `}</style>
    </div>
  </App>
);

signup.isPublic = true;

export default withData(signup);

import withData from '../libraries/withData';
import Signup from '../components/Signup';

const signup = withData(() => (
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
));

export default signup;

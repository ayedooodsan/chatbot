import withData from '../libraries/withData';
import SignIn from '../components/Signin';

export default withData(() => (
  <div className="full-screen">
    <div className="login-section">
      <SignIn />
    </div>
    <style jsx>{`
      .full-screen {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 80vh;
      }
      .login-section {
        width: 450px;
      }
    `}</style>
  </div>
));

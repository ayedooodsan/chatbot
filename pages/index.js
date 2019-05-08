import withData from '../libraries/withData';
import SignIn from '../components/Signin';
import App from '../components/App';

const index = () => (
  <App>
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
  </App>
);

index.isPublic = true;

export default withData(index);

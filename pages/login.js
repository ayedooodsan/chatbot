import App from '../components/App';
import withData from '../libraries/withData';
import AuthFields from '../components/AuthFields';

export default withData(() => (
  <App>
    <AuthFields />
  </App>
));

// @material-ui/icons
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import SpeakerNotes from '@material-ui/icons/SpeakerNotes';

const routes = [
  {
    route: '/intent',
    name: 'Intents',
    icon: <SpeakerNotes />
  },
  {
    route: '/dialog',
    name: 'Dialog',
    icon: <QuestionAnswer />
  }
];

export default routes;

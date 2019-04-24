// @material-ui/icons
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import SpeakerNotes from '@material-ui/icons/SpeakerNotes';

const routes = [
  {
    route: '/dialog',
    name: 'Dialog',
    icon: <QuestionAnswer />
  },
  {
    route: '/intent',
    name: 'Intents',
    icon: <SpeakerNotes />
  }
];

export default routes;

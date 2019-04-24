// @material-ui/icons
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import SpeakerNotes from '@material-ui/icons/SpeakerNotes';
import LocalFlorist from '@material-ui/icons/LocalFlorist';

const routes = [
  {
    route: '/entity',
    name: 'Entities',
    icon: <LocalFlorist />
  },
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

// @material-ui/icons
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import SpeakerNotes from '@material-ui/icons/SpeakerNotes';
import LocalFlorist from '@material-ui/icons/LocalFlorist';
import Settings from '@material-ui/icons/Settings';

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
    name: 'Dialogs',
    icon: <QuestionAnswer />
  },
  {
    route: '/setting',
    name: 'Settings',
    icon: <Settings />
  }
];

export default routes;

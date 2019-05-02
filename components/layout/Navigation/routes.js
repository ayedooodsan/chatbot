// @material-ui/icons
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import SpeakerNotes from '@material-ui/icons/SpeakerNotes';
import LocalFlorist from '@material-ui/icons/LocalFlorist';
import LocalLibrary from '@material-ui/icons/LocalLibrary';

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
  },
  {
    route: '/training',
    name: 'Training',
    icon: <LocalLibrary />
  }
];

export default routes;

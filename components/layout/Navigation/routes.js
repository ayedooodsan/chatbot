// @material-ui/icons
import QuestionAnswer from '@material-ui/icons/QuestionAnswerOutlined';
import SpeakerNotes from '@material-ui/icons/SpeakerNotesOutlined';
import LocalFlorist from '@material-ui/icons/LocalFloristOutlined';
import Settings from '@material-ui/icons/SettingsOutlined';
import LocalLibrary from '@material-ui/icons/LocalLibraryOutlined';
import InsertChart from '@material-ui/icons/InsertChartOutlined';
import LockOpen from '@material-ui/icons/LockOpenOutlined';
import Image from '@material-ui/icons/Image';

const routes = [
  [
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
      route: '/image',
      name: 'Images',
      icon: <Image />
    }
  ],
  [
    {
      route: '/training',
      name: 'Training',
      icon: <LocalLibrary />
    },
    {
      route: '/analytic',
      name: 'Analytic',
      icon: <InsertChart />
    }
  ],
  [
    {
      route: '/setting',
      name: 'Settings',
      icon: <Settings />
    },
    {
      name: 'Logout',
      icon: <LockOpen />
    }
  ]
];

export default routes;

import { SheetsRegistry } from 'jss';
import {
  createMuiTheme,
  createGenerateClassName
} from '@material-ui/core/styles';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#04c3bb',
      main: '#00a19a',
      dark: '#01948e'
    },
    secondary: {
      light: '#ffa726',
      main: '#ffa726',
      dark: '#fb8c00'
    }
  },
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        '& $notchedOutline': {
          borderColor: 'transparent'
        }
      },
      input: {
        borderRadius: 4,
        backgroundColor: '#f4f5f7'
      }
    }
  }
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName()
  };
}

let pageContext;

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!pageContext) {
    pageContext = createPageContext();
  }

  return pageContext;
}

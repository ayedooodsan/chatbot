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
          borderColor: 'transparent',
          backgroundColor: '#f4f5f7'
        }
      },
      input: {
        zIndex: 1
      }
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 0,
        backgroundColor: 'black',
        color: 'white',
        boxShadow:
          '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
        fontSize: 12
      },
      popper: {
        opacity: 1
      }
    },
    MuiInputBase: {
      error: {
        color: 'red'
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

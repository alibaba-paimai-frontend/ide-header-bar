import * as React from 'react';
import { render } from 'react-dom';
import {
  HeaderBar,
  IHeaderBarProps,
  IHeaderBarButton,
  IHeaderBarIconText
} from '../src/';

const props: IHeaderBarProps = {
  logo: 'https://git-scm.com/images/logos/downloads/Git-Logo-2Color.png',
  onClickButton: (button: IHeaderBarButton) => {
    console.log('clicked button:', button);
  },
  onClickIconText: (iconText: IHeaderBarIconText) => {
    console.log('clicked icon text button:', iconText);
  }
};

render(<HeaderBar {...props} />, document.getElementById(
  'example'
) as HTMLElement);

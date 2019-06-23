import { Button } from 'antd';
import styled from 'styled-components';
import { IBaseStyledProps } from 'ide-lib-base-component';

import { IIconButtonsProps } from './index';

interface IStyledProps extends IIconButtonsProps, IBaseStyledProps{
  [prop: string]: any;
}

export const StyledButton = styled(Button).attrs({
  style: (props: IStyledProps) => props.style || {} // 优先级会高一些，行内样式
})`
  margin: 0 5px;
`;

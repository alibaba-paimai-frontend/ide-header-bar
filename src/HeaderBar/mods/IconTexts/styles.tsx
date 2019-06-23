import { Button } from 'antd';
import styled from 'styled-components';
import { IBaseStyledProps } from 'ide-lib-base-component';

import { IIconTextProps } from './index';

interface IStyledProps extends IIconTextProps, IBaseStyledProps {
  [prop: string]: any;
}
export const StyledIconText = styled.div.attrs({
  style: (props: IStyledProps) => props.style || {}
})<IStyledProps>`
  margin-top: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: ${(props: IStyledProps) =>
    props.active ? props.theme.main : props.theme.second};
  &:hover {
    color: ${(props: IStyledProps) => props.theme.main};
  }
  .oper-icon {
    font-size: 24px;
    margin-bottom: 4px;
  }
  .oper-name {
    font-size: 12px;
  }
`;

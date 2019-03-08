import { Button } from 'antd';
import styled from 'styled-components';
import { IBaseStyledProps } from 'ide-lib-base-component';
import { desaturate } from 'polished';

import { IHeaderBarProps } from './index';

interface IStyledProps extends IHeaderBarProps, IBaseStyledProps{
  [prop: string]: any;
}

export const StyledContainer = styled.div.attrs({
  style: (props: IStyledProps) => props.style || {} // 优先级会高一些，行内样式
})`
  width: 100%;
  background: white;
  height: ${(props: IStyledProps) => props.height || '65px'};
  border-bottom: 2px solid ${(props: IStyledProps) => props.theme.main};
`;

export const StyledLogo = styled.img.attrs({
  style: (props: IStyledProps) => props.style || {}
})`
  max-width: 210px;
  max-height: 64px;
`;

export const StyledIconText = styled.div.attrs({
  style: (props: IStyledProps) => props.style || {}
}) <IStyledProps>`
  margin-top: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: ${(props: IStyledProps) => props.active ? props.theme.main : props.theme.second};
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

export const StyledButton = styled(Button).attrs({
  style: (props: IStyledProps) => props.style || {} // 优先级会高一些，行内样式
})`
  margin: 0 5px;
  &.ant-btn-primary,
  &.ant-btn-primary:focus {
    background-color: ${(props: IStyledProps) => props.theme.main};
    border-color: ${(props: IStyledProps) => props.theme.main};
    &:hover {
      background-color: ${(props: IStyledProps) =>
    props.theme.main ? desaturate(0.2, props.theme.main) : 'inherit'};
    }
  }
`;

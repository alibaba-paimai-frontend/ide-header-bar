import { IAnyModelType } from 'mobx-state-tree';
import { IIconButtonModel } from './icon-button';

export function modelExtends(model: IAnyModelType) {
  return model.views(self => {
    return {
      getButtonById(id: string) {
        let button = null;
        self.buttons.some((item: IIconButtonModel) => {
          if (item.id === id) {
            button = item;
            return true;
          } else {
            return false;
          }
        });
        return button;
      },
      getIconById(id: string) {
        let icon = null;
        self.iconTexts.some((item: IIconButtonModel) => {
          if (item.id === id) {
            icon = item;
            return true;
          } else {
            return false;
          }
        });
        return icon;
      }
    };
  });
}

import { SiderItemType } from '../types';
import { NavLinkStyled } from './styled';
import IconSVG from '@/components/IconSVG';
import cs from 'classnames';

type props = {
  item: SiderItemType;
  isActive: boolean;
  onSelect?: (item: SiderItemType) => void;
};

const SiderItem = (props: props) => {
  const { item, isActive, onSelect } = props;
  const { path, iconURL } = item;

  const className = isActive ? 'selected' : 'un-select';

  const onClick = () => {
    onSelect && onSelect(item);
  };

  return (
    <NavLinkStyled className={cs(className, item.className)} onClick={onClick} to={path}>
      <IconSVG src={iconURL} maxWidth="32" />
    </NavLinkStyled>
  );
};

export default SiderItem;

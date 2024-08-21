import { ChangeEvent } from 'react';

import { Search } from '@edifice-ui/icons';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { Size } from '../../types';
import { SearchButton } from '../Button';
import FormControl from '../Form/FormControl';

export interface BaseProps {
  /**
   * String or Template literal with React i18next namespace
   */
  placeholder?: string;
  /**
   * Control SearchBar size
   */
  size?: Exclude<Size, 'sm'>;
  /**
   * Disabled status
   */
  disabled?: boolean;
  /**
   * Optional class for styling purpose
   */
  className?: string;
  /**
   * ChangeEvent Handler
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

type DefaultSearchBar = {
  /**
   * Switch between button or dynamic search bar
   */
  isVariant: false;
  /**
   * Handle Search with Default SearchBar
   */
  onClick: () => void;
};

type DynamicSearchBar = {
  /**
   * Switch between button or dynamic search bar
   */
  isVariant: true;
  /**
   * Handle Search with Default SearchBar
   */
  onClick?: undefined;
};

export type Props = DefaultSearchBar | DynamicSearchBar;

export type SearchBarProps = BaseProps & Props;

const SearchBar = ({
  isVariant = false,
  size = 'md',
  placeholder = 'search',
  className,
  disabled,
  onChange,
  onClick,
  ...restProps
}: SearchBarProps) => {
  const { t } = useTranslation();

  const searchbar = clsx(className, {
    'input-group': !isVariant,
    'position-relative': isVariant,
  });

  const input = clsx({
    'border-end-0': !isVariant,
    'ps-48': isVariant,
  });

  const handleClick = () => {
    onClick?.();
  };

  return (
    <FormControl id="search-bar" className={searchbar}>
      {isVariant && (
        <div className="position-absolute z-1 top-50 start-0 translate-middle-y border-0 ps-12 bg-transparent">
          <Search />
        </div>
      )}
      <FormControl.Input
        type="search"
        placeholder={t(placeholder)}
        size={size}
        noValidationIcon
        className={input}
        onChange={onChange}
        disabled={disabled}
        {...restProps}
      />
      {!isVariant && (
        <SearchButton
          type="submit"
          aria-label={t('search')}
          icon={<Search />}
          className="border-start-0"
          onClick={handleClick}
        />
      )}
    </FormControl>
  );
};

SearchBar.displayName = 'SearchBar';
export default SearchBar;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon, SearchInput } from 'evergreen-ui';

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-top: 8px;
  max-height: 200px;
  overflow-y: auto;
`;

const IconItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  background: ${(props) => (props.selected ? 'rgba(0, 0, 0, 0.1)' : 'transparent')};

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

// 常用图标列表
const COMMON_ICONS = [
  'link',
  'search',
  'home',
  'document',
  'calendar',
  'chat',
  'media',
  'video',
  'people',
  'code',
  'book',
  'map',
  'graph',
  'star',
  'heart',
  'cloud',
  'settings',
  'cog',
  'dashboard',
  'envelope',
  'music',
  'camera',
  'shopping-cart',
  'globe',
];

const IconSelector = ({ selectedIcon, onChange }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredIcons = COMMON_ICONS.filter((icon) =>
    icon.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchInput
        placeholder="search icon..."
        width="100%"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconGrid>
        {filteredIcons.map((icon) => (
          <IconItem key={icon} selected={selectedIcon === icon} onClick={() => onChange(icon)}>
            <Icon icon={icon} size={20} />
          </IconItem>
        ))}
      </IconGrid>
    </div>
  );
};

IconSelector.propTypes = {
  selectedIcon: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default IconSelector;

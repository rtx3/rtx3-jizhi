import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon, Menu, Position, Popover } from 'evergreen-ui';

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  margin: 4px;
  background: ${(props) => (props.isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${(props) => (props.isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)')};
  }
`;

const Title = styled.span`
  margin: 0 8px;
  color: ${(props) => (props.isDarkMode ? '#fff' : '#000')};
`;

const LinkItem = ({ link, isDarkMode, onEdit, onDelete }) => {
  return (
    <LinkWrapper isDarkMode={isDarkMode}>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
      >
        <Icon icon={link.icon || 'link'} color={isDarkMode ? '#fff' : '#000'} />
        <Title isDarkMode={isDarkMode}>{link.title}</Title>
      </a>
      <Popover
        position={Position.BOTTOM_RIGHT}
        content={
          <Menu>
            <Menu.Group>
              <Menu.Item onSelect={() => onEdit(link)}>编辑</Menu.Item>
              <Menu.Item onSelect={() => onDelete(link.id)} intent="danger">
                删除
              </Menu.Item>
            </Menu.Group>
          </Menu>
        }
      >
        <Icon icon="more" color={isDarkMode ? '#fff' : '#000'} marginLeft={8} />
      </Popover>
    </LinkWrapper>
  );
};

LinkItem.propTypes = {
  link: PropTypes.object.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default LinkItem;

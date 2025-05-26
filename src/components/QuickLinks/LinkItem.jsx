import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon, Menu, Position, Popover, IconButton } from 'evergreen-ui';

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  margin: 4px;
  position: relative;
  z-index: ${(props) => (props.isOpen ? 9999 : 1)};

  &:hover .menu-button {
    opacity: 1;
  }
`;

const LinkBox = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  background: ${(props) => (props.isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')};
  border-radius: 4px;
  transition: all 0.3s;
  flex: 1;
`;

const LinkContent = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  flex: 1;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Title = styled.span`
  margin: 0 8px;
  color: ${(props) => (props.isDarkMode ? '#fff' : '#000')};
`;

const StyledIconButton = styled(IconButton)`
  background: ${(props) =>
    props.isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} !important;
  &:hover {
    background: ${(props) =>
      props.isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'} !important;
  }
  color: ${(props) => (props.isDarkMode ? '#fff' : '#000')} !important;
  margin-right: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 10000;
  position: relative;
`;

const LinkItem = ({ link, isDarkMode, onEdit, onDelete, isMenuOpen, onMenuOpenChange }) => {
  const handleEdit = () => {
    onMenuOpenChange(false);
    onEdit(link);
  };

  const handleDelete = () => {
    onMenuOpenChange(false);
    onDelete(link.id);
  };

  return (
    <LinkWrapper isOpen={isMenuOpen}>
      <Popover
        position={Position.BOTTOM_RIGHT}
        minWidth={120}
        isShown={isMenuOpen}
        onOpen={() => onMenuOpenChange(true)}
        onClose={() => onMenuOpenChange(false)}
        zIndex={10001}
        statelessProps={{
          style: {
            zIndex: 10001,
          },
        }}
        content={
          <Menu>
            <Menu.Group>
              <Menu.Item onSelect={handleEdit} icon="edit">
                编辑
              </Menu.Item>
              <Menu.Item onSelect={handleDelete} icon="trash" intent="danger">
                删除
              </Menu.Item>
            </Menu.Group>
          </Menu>
        }
      >
        <StyledIconButton
          icon="more"
          isDarkMode={isDarkMode}
          height={32}
          appearance="minimal"
          className="menu-button"
        />
      </Popover>
      <LinkBox isDarkMode={isDarkMode}>
        <LinkContent href={link.url} target="_blank" rel="noopener noreferrer">
          <Icon icon={link.icon || 'link'} color={isDarkMode ? '#fff' : '#000'} />
          <Title isDarkMode={isDarkMode}>{link.title}</Title>
        </LinkContent>
      </LinkBox>
    </LinkWrapper>
  );
};

LinkItem.propTypes = {
  link: PropTypes.object.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  onMenuOpenChange: PropTypes.func.isRequired,
};

export default LinkItem;

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
  z-index: ${(props) => (props.isOpen ? 2 : 1)};
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
`;

const LinkItem = ({ link, isDarkMode, onEdit, onDelete, isMenuOpen, onMenuOpenChange }) => {
  return (
    <LinkWrapper>
      <Popover
        position={Position.BOTTOM_LEFT}
        minWidth={120}
        isShown={isMenuOpen}
        onOpen={() => onMenuOpenChange(true)}
        onClose={() => onMenuOpenChange(false)}
        content={
          <Menu>
            <Menu.Group>
              <Menu.Item onSelect={() => onEdit(link)} icon="edit">
                编辑
              </Menu.Item>
              <Menu.Item onSelect={() => onDelete(link.id)} icon="trash" intent="danger">
                删除
              </Menu.Item>
            </Menu.Group>
          </Menu>
        }
      >
        <StyledIconButton icon="more" isDarkMode={isDarkMode} height={32} appearance="minimal" />
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

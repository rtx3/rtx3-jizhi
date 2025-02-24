import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Icon, toaster, Heading } from 'evergreen-ui';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  getQuickLinks,
  addQuickLink,
  updateQuickLink,
  deleteQuickLink,
  updateLinksOrder,
} from '../../utils/quickLinks';
import { LINK_TYPES } from '../../constants/quickLinksConstants';
import LinkItem from './LinkItem';
import LinkForm from './LinkForm';

const QuickLinksWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 1000;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 8px;
  min-width: 200px;
  position: relative;
`;

const MenuSpace = styled.div`
  height: ${(props) => (props.isOpen ? '65px' : '0')};
  transition: height 0.2s ease;
  position: absolute;
  left: 0;
  right: 0;
  top: ${(props) => props.top}px;
  pointer-events: none;
`;

const CategoryContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  position: relative;
`;

const LinkItemWrapper = styled.div`
  position: relative;
  width: 100%;
  transition: transform 0.2s ease;
  transform: translateY(${(props) => (props.shouldMove ? '95px' : '0')});
`;

const CategoryTitle = styled(Heading)`
  margin: 8px 0;
  color: ${(props) => (props.isDarkMode ? '#fff' : '#000')};
  opacity: 0.8;
`;

const QuickLinks = ({ isDarkMode }) => {
  const [links, setLinks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    const quickLinks = await getQuickLinks();
    setLinks(quickLinks);
  };

  // 按类型对链接进行分组
  const groupedLinks = links.reduce((acc, link) => {
    const type = link.type || '其他';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(link);
    return acc;
  }, {});

  // 计算每个链接的全局索引
  const allLinks = LINK_TYPES.reduce((acc, type) => {
    const typeLinks = groupedLinks[type] || [];
    return [...acc, ...typeLinks];
  }, []);

  const shouldMoveDown = (link) => {
    if (!openMenuId) return false;
    const openMenuIndex = allLinks.findIndex((l) => l.id === openMenuId);
    const currentIndex = allLinks.findIndex((l) => l.id === link.id);
    return currentIndex > openMenuIndex; // 所有在打开菜单之后的链接都需要移动
  };

  const handleAddLink = async (link) => {
    try {
      const newLinks = await addQuickLink(link);
      setLinks(newLinks);
      toaster.success('添加成功');
    } catch (error) {
      toaster.danger('添加失败');
    }
  };

  const handleEditLink = async (link) => {
    try {
      const newLinks = await updateQuickLink(editingLink.id, link);
      setLinks(newLinks);
      setEditingLink(null);
      toaster.success('更新成功');
    } catch (error) {
      toaster.danger('更新失败');
    }
  };

  const handleDeleteLink = async (id) => {
    try {
      const newLinks = await deleteQuickLink(id);
      setLinks(newLinks);
      toaster.success('删除成功');
    } catch (error) {
      toaster.danger('删除失败');
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const newOrder = {};
    const items = Array.from(links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    items.forEach((item, index) => {
      newOrder[item.id] = index + 1;
    });

    try {
      const newLinks = await updateLinksOrder(newOrder);
      setLinks(newLinks);
    } catch (error) {
      toaster.danger('排序失败');
    }
  };

  const getMenuPosition = () => {
    if (!openMenuId) return 0;
    const openItem = document.querySelector(`[data-id="${openMenuId}"]`);
    return openItem ? openItem.offsetTop + openItem.offsetHeight : 0;
  };

  return (
    <QuickLinksWrapper>
      <Button appearance="minimal" intent="success" onClick={() => setShowForm(true)}>
        <Icon icon="plus" marginRight={8} />
        添加链接
      </Button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="quick-links">
          {(provided) => (
            <LinksContainer {...provided.droppableProps} ref={provided.innerRef}>
              {openMenuId && <MenuSpace isOpen top={getMenuPosition()} />}
              {LINK_TYPES.map((type) => {
                const typeLinks = groupedLinks[type] || [];
                if (typeLinks.length === 0) return null;
                return (
                  <CategoryContainer key={type}>
                    <CategoryTitle size={300} isDarkMode={isDarkMode}>
                      {type}
                    </CategoryTitle>
                    {typeLinks.map((link, index) => (
                      <Draggable key={link.id} draggableId={link.id} index={index}>
                        {(provided) => (
                          <LinkItemWrapper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            shouldMove={shouldMoveDown(link)}
                            data-id={link.id}
                          >
                            <LinkItem
                              link={link}
                              isDarkMode={isDarkMode}
                              onEdit={(link) => {
                                setEditingLink(link);
                                setShowForm(true);
                              }}
                              onDelete={handleDeleteLink}
                              isMenuOpen={openMenuId === link.id}
                              onMenuOpenChange={(isOpen) => setOpenMenuId(isOpen ? link.id : null)}
                            />
                          </LinkItemWrapper>
                        )}
                      </Draggable>
                    ))}
                  </CategoryContainer>
                );
              })}
              {provided.placeholder}
            </LinksContainer>
          )}
        </Droppable>
      </DragDropContext>

      <LinkForm
        isShown={showForm}
        link={editingLink}
        onClose={() => {
          setShowForm(false);
          setEditingLink(null);
        }}
        onSubmit={editingLink ? handleEditLink : handleAddLink}
      />
    </QuickLinksWrapper>
  );
};

QuickLinks.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default QuickLinks;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Icon, toaster } from 'evergreen-ui';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  getQuickLinks,
  addQuickLink,
  updateQuickLink,
  deleteQuickLink,
  updateLinksOrder,
} from '../../utils/quickLinks';
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
`;

const QuickLinks = ({ isDarkMode }) => {
  const [links, setLinks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState(null);

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    const quickLinks = await getQuickLinks();
    setLinks(quickLinks);
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
              {links.map((link, index) => (
                <Draggable key={link.id} draggableId={link.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <LinkItem
                        link={link}
                        isDarkMode={isDarkMode}
                        onEdit={(link) => {
                          setEditingLink(link);
                          setShowForm(true);
                        }}
                        onDelete={handleDeleteLink}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
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

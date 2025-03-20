import { STORAGE_KEY, DEFAULT_QUICK_LINKS } from '../constants/quickLinksConstants';
import Storager from './storager';

// 获取所有快捷链接
export const getQuickLinks = () => {
  return new Promise((resolve) => {
    Storager.get([STORAGE_KEY], (result) => {
      resolve(result[STORAGE_KEY] || DEFAULT_QUICK_LINKS);
    });
  });
};

// 保存快捷链接
export const saveQuickLinks = (links) => {
  return new Promise((resolve) => {
    Storager.set({ [STORAGE_KEY]: links }, () => {
      resolve(true);
    });
  });
};

// 添加快捷链接
export const addQuickLink = async (link, onSuccess) => {
  try {
    const links = await getQuickLinks();
    const newLinks = [
      ...links,
      {
        ...link,
        id: Date.now().toString(),
        order: links.length + 1,
      },
    ];
    await saveQuickLinks(newLinks);
    // 添加成功后执行回调
    if (typeof onSuccess === 'function') {
      onSuccess(newLinks);
    }
    return newLinks;
  } catch (error) {
    console.error('add quick link failed:', error);
    throw error;
  }
};

// 更新快捷链接
export const updateQuickLink = async (id, link) => {
  const links = await getQuickLinks();
  const newLinks = links.map((item) => (item.id === id ? { ...item, ...link } : item));
  await saveQuickLinks(newLinks);
  return newLinks;
};

// 删除快捷链接
export const deleteQuickLink = async (id) => {
  const links = await getQuickLinks();
  const newLinks = links
    .filter((item) => item.id !== id)
    .map((item, index) => ({
      ...item,
      order: index + 1,
    }));
  await saveQuickLinks(newLinks);
  return newLinks;
};

// 更新链接顺序
export const updateLinksOrder = async (newOrder) => {
  const links = await getQuickLinks();
  const newLinks = links
    .map((link) => ({
      ...link,
      order: newOrder[link.id],
    }))
    .sort((a, b) => a.order - b.order);
  await saveQuickLinks(newLinks);
  return newLinks;
};

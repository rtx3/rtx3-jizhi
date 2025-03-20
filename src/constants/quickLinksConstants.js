// 默认快捷链接
export const DEFAULT_QUICK_LINKS = [
  {
    id: '1',
    title: 'RTX3',
    url: 'https://rtx3.com',
    icon: 'code',
    order: 1,
    type: 'Tools',
  },
];

// 本地存储键名
export const STORAGE_KEY = 'jizhi_quick_links';

// 链接类型
export const LINK_TYPES = ['Search', 'Media', 'News', 'Tools', 'Shopping', 'Other'];

// 表单验证规则
export const LINK_FORM_RULES = {
  title: {
    required: true,
    maxLength: 20,
  },
  url: {
    required: true,
    pattern: /^https?:\/\/.+/,
  },
  type: {
    required: true,
  },
};

// 默认快捷链接
export const DEFAULT_QUICK_LINKS = [
  {
    id: '1',
    title: '百度',
    url: 'https://www.baidu.com',
    icon: 'search',
    order: 1,
  },
  {
    id: '2',
    title: '谷歌',
    url: 'https://www.google.com',
    icon: 'search',
    order: 2,
  },
];

// 本地存储键名
export const STORAGE_KEY = 'jizhi_quick_links';

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
};

// 默认快捷链接
export const DEFAULT_QUICK_LINKS = [
  {
    id: '1',
    title: 'RTX3',
    url: 'https://www.rtx3.com',
    icon: 'code',
    order: 1,
    type: '工具',
  },
];

// 本地存储键名
export const STORAGE_KEY = 'jizhi_quick_links';

// 链接类型
export const LINK_TYPES = ['搜索引擎', '社交媒体', '新闻资讯', '工具', '购物', '其他'];

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

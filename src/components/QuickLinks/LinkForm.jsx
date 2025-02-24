import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, TextInputField } from 'evergreen-ui';
import { LINK_FORM_RULES } from '../../constants/quickLinksConstants';

const LinkForm = ({ isShown, link, onClose, onSubmit }) => {
  const [title, setTitle] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [errors, setErrors] = React.useState({});

  // 当表单显示状态或编辑链接改变时重置表单
  useEffect(() => {
    if (isShown) {
      // 如果是编辑模式，使用现有数据
      setTitle(link?.title || '');
      setUrl(link?.url || '');
      setErrors({});
    }
  }, [isShown, link]);

  const validate = () => {
    const newErrors = {};
    if (!title) {
      newErrors.title = '请输入标题';
    } else if (title.length > LINK_FORM_RULES.title.maxLength) {
      newErrors.title = `标题不能超过${LINK_FORM_RULES.title.maxLength}个字符`;
    }

    if (!url) {
      newErrors.url = '请输入链接地址';
    } else if (!LINK_FORM_RULES.url.pattern.test(url)) {
      newErrors.url = '请输入有效的链接地址';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({ title, url });
      // 提交后重置表单
      setTitle('');
      setUrl('');
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    // 关闭时重置表单
    setTitle('');
    setUrl('');
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      isShown={isShown}
      title={link ? '编辑链接' : '添加链接'}
      onCloseComplete={handleClose}
      confirmLabel={link ? '保存' : '添加'}
      onConfirm={handleSubmit}
    >
      <TextInputField
        label="标题"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        validationMessage={errors.title}
      />
      <TextInputField
        label="链接地址"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        validationMessage={errors.url}
      />
    </Dialog>
  );
};

LinkForm.propTypes = {
  isShown: PropTypes.bool.isRequired,
  link: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LinkForm;

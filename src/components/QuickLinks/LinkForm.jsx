import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, TextInputField, FormField, SelectField } from 'evergreen-ui';
import { LINK_FORM_RULES, LINK_TYPES } from '../../constants/quickLinksConstants';
import IconSelector from './IconSelector';

const LinkForm = ({ isShown, link, onClose, onSubmit }) => {
  const [title, setTitle] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [icon, setIcon] = React.useState('link');
  const [type, setType] = React.useState(LINK_TYPES[0]);
  const [errors, setErrors] = React.useState({});

  // 当表单显示状态或编辑链接改变时重置表单
  useEffect(() => {
    if (isShown) {
      // 如果是编辑模式，使用现有数据
      setTitle(link?.title || '');
      setUrl(link?.url || '');
      setIcon(link?.icon || 'link');
      setType(link?.type || LINK_TYPES[0]);
      setErrors({});
    }
  }, [isShown, link]);

  const validate = () => {
    const newErrors = {};
    if (!title) {
      newErrors.title = 'Please enter title';
    } else if (title.length > LINK_FORM_RULES.title.maxLength) {
      newErrors.title = `Title cannot be more than ${LINK_FORM_RULES.title.maxLength} characters`;
    }

    if (!url) {
      newErrors.url = 'Please enter url';
    } else if (!LINK_FORM_RULES.url.pattern.test(url)) {
      newErrors.url = 'Please enter a valid url';
    }

    if (!type) {
      newErrors.type = 'Please select type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({ title, url, icon, type });
      // 提交后重置表单
      setTitle('');
      setUrl('');
      setIcon('link');
      setType(LINK_TYPES[0]);
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    // 关闭时重置表单
    setTitle('');
    setUrl('');
    setIcon('link');
    setType(LINK_TYPES[0]);
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      isShown={isShown}
      title={link ? 'edit link' : 'add link'}
      onCloseComplete={handleClose}
      confirmLabel={link ? 'save' : 'add'}
      onConfirm={handleSubmit}
      width={400}
    >
      <TextInputField
        label="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        validationMessage={errors.title}
      />
      <TextInputField
        label="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        validationMessage={errors.url}
      />
      <SelectField
        label="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        validationMessage={errors.type}
      >
        {LINK_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </SelectField>
      <FormField label="select icon">
        <IconSelector selectedIcon={icon} onChange={setIcon} />
      </FormField>
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

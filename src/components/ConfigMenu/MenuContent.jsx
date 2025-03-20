import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Pane,
  Menu,
  Tablist,
  Switch,
  SidebarTab,
  SegmentedControl,
  Spinner,
  Text,
  InlineAlert,
} from 'evergreen-ui';
import styled from 'styled-components';
import { WAVES } from '../../constants/appConstants';
import Legal from './Legal';
import FontStatement from './FontStatement';
import SaveBgMenuItem from './SaveBgMenuItem';

const SwitchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SegmentedControlWrapper = styled.div`
  margin-left: 16px;
`;

const MenuContent = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {
    isPlaying,
    onPlayPauseSelect,
    showSearchBarChecked,
    onShowSearchBarChange,
    defaultPlayChecked,
    verticalVersesChecked,
    onVerticalVersesChange,
    onDefaultPlayChange,
    colorStayChecked,
    onColorStayChange,
    selected,
    onBgOptionChange,
    engineOption,
    onEngineOptionChange,
    colorMode,
    onColorModeOptionChange,
    fontName,
    onFontTypeChange,
    isFontLoading,
    waveColor,
  } = props;

  const bgOptions = [
    { label: 'Waves', value: 'waves' },
    { label: 'Blobs', value: 'blobs' },
  ];

  const engineOptions = [
    {
      label: 'Google',
      value: 'https://www.google.com/search?q=',
    },
    {
      label: 'Bing',
      value: 'https://www.bing.com/search?q=',
    },
  ];

  const colorModeOptions = [
    {
      label: 'Light',
      value: 'light',
    },
    {
      label: 'Dark',
      value: 'dark',
    },
    {
      label: 'Follow System',
      value: 'os',
    },
  ];

  const fontOptions = [
    { label: 'JiangXi ZhuoKai', value: 'JXZhuoKai' },
    { label: 'XinYi JiXiang Song', value: 'JiXiangSong' },
    { label: 'FangZheng Xi JinLing', value: 'FZXiJinLJW' },
  ];

  const switchOptions = [
    // {
    //   name: 'Dark Mode',
    //   checkedState: darkModeChecked,
    //   onChangeFunc: onDarkModeChange,
    // },
    {
      name: 'Vertical Verses',
      checkedState: verticalVersesChecked,
      onChangeFunc: onVerticalVersesChange,
    },
    {
      name: 'Default Animation Play',
      checkedState: defaultPlayChecked,
      onChangeFunc: onDefaultPlayChange,
    },
    {
      name: 'Show Search Bar',
      checkedState: showSearchBarChecked,
      onChangeFunc: onShowSearchBarChange,
    },
    {
      name: 'Keep Color Name',
      checkedState: colorStayChecked,
      onChangeFunc: onColorStayChange,
    },
  ];

  const tabs = [
    {
      tabName: 'Settings',
      tabContent: (
        <>
          <Menu.Group title="Preferences">
            {switchOptions.map((option) => {
              if (selected !== WAVES && option.name === 'Keep Color Name') return;
              return (
                <Menu.Item key={option.name}>
                  <SwitchWrapper>
                    {option.name}
                    <Switch checked={option.checkedState} onChange={option.onChangeFunc} />
                  </SwitchWrapper>
                </Menu.Item>
              );
            })}
          </Menu.Group>
          <Menu.Divider />

          <Menu.Group title="Search Engine">
            <SegmentedControlWrapper>
              <SegmentedControl
                width={280}
                options={engineOptions}
                value={engineOption}
                onChange={onEngineOptionChange}
              />
            </SegmentedControlWrapper>
          </Menu.Group>
        </>
      ),
    },
    {
      tabName: 'Background',
      tabContent: (
        <>
          <Menu.Group title="Animation Effect">
            <Menu.OptionsGroup
              options={bgOptions}
              selected={selected}
              onChange={onBgOptionChange}
            />
          </Menu.Group>
          <Menu.Divider />
          <Menu.Group title="Color Mode">
            <SegmentedControlWrapper>
              <SegmentedControl
                width={280}
                options={colorModeOptions}
                value={colorMode}
                onChange={onColorModeOptionChange}
              />
            </SegmentedControlWrapper>
          </Menu.Group>
        </>
      ),
    },
    {
      tabName: 'Actions',
      tabContent: (
        <Menu.Group>
          <SaveBgMenuItem />
          <Menu.Item
            icon={isPlaying ? 'pause' : 'play'}
            intent="success"
            onSelect={onPlayPauseSelect}
            secondaryText="Space"
          >
            {isPlaying ? 'Pause Animation' : 'Play Animation'}
          </Menu.Item>
          <InlineAlert intent="none" marginRight={15} marginLeft={15}>
            <p>Use left and right arrow keys to randomly change colors in wave background</p>
          </InlineAlert>
        </Menu.Group>
      ),
    },

    {
      tabName: 'Font',
      tabContent: (
        <Menu.Group title="Select Font">
          <SegmentedControlWrapper>
            <SegmentedControl
              width={280}
              options={fontOptions}
              value={fontName}
              onChange={onFontTypeChange}
            />
            {isFontLoading ? (
              <Pane height={30} width={280} marginBottom={-10} marginTop={10} display="flex">
                <Spinner size={20} marginRight={5} />
                <Text>Loading remotely...</Text>
              </Pane>
            ) : (
              <FontStatement fontName={fontName} />
            )}
          </SegmentedControlWrapper>
        </Menu.Group>
      ),
    },
    { tabName: 'About', tabContent: <Legal waveColor={waveColor} selected={selected} /> },
  ];

  return (
    <Pane display="flex" height={300}>
      <Tablist width={80} margin={10}>
        {tabs.map(({ tabName }, index) => (
          <SidebarTab
            key={tabName}
            id={tabName}
            onSelect={() => setSelectedIndex(index)}
            isSelected={index === selectedIndex}
            aria-controls={`panel-${tabName}`}
          >
            {tabName}
          </SidebarTab>
        ))}
      </Tablist>
      <Pane width={350} background="tint1">
        {tabs.map(({ tabName, tabContent }, index) => (
          <Pane
            key={tabName}
            id={`panel-${tabName}`}
            role="tabpanel"
            aria-labelledby={tabName}
            aria-hidden={index !== selectedIndex}
            display={index === selectedIndex ? 'block' : 'none'}
          >
            {tabContent}
          </Pane>
        ))}
      </Pane>
    </Pane>
  );
};

MenuContent.propTypes = {
  children: PropTypes.any,
  showSearchBarChecked: PropTypes.bool,
  onShowSearchBarChange: PropTypes.func,
  onPlayPauseSelect: PropTypes.func.isRequired,
  onVerticalVersesChange: PropTypes.func.isRequired,
  verticalVersesChecked: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  defaultPlayChecked: PropTypes.bool.isRequired,
  onDefaultPlayChange: PropTypes.func.isRequired,
  colorStayChecked: PropTypes.bool.isRequired,
  onColorStayChange: PropTypes.func.isRequired,
  selected: PropTypes.string,
  onBgOptionChange: PropTypes.func,
  engineOption: PropTypes.string,
  onEngineOptionChange: PropTypes.func,
  colorMode: PropTypes.string,
  onColorModeOptionChange: PropTypes.func,
  fontName: PropTypes.string,
  onFontTypeChange: PropTypes.func,
  isFontLoading: PropTypes.bool,
  waveColor: PropTypes.object,
};

export default MenuContent;

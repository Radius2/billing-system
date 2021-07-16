import { MenuItem, Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import React, { useContext } from 'react';
import { LanguageContext, ThemeContext } from '../../../App';
import { AVAILABLE_LANGUAGE, INTERFACE_LANGUAGE } from '../../../util/language';
import TooltipButton from '../../Handbook/TooltipButton';
import { BootstrapInput } from '../../Styled/Components';
import Search from './Search';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness5Icon from '@material-ui/icons/Brightness5';

export default function Header({ logout, children }) {
  const { lang, setLang } = useContext(LanguageContext);
  const { isDark, themeSwitch } = useContext(ThemeContext);
  return (
    <Toolbar>
      {children}

      <Search />

      <Button onClick={logout}>{INTERFACE_LANGUAGE.exit[lang]}</Button>
      <FormControl variant='outlined'>
        <Select value={lang} onChange={e => setLang(e.target.value)} label='Language' input={<BootstrapInput />}>
          {AVAILABLE_LANGUAGE.map(lang => (
            <MenuItem key={lang} value={lang}>
              {lang}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TooltipButton tooltipTitle='переключить тему' actionHandler={themeSwitch} icon={isDark ? <Brightness5Icon /> : <Brightness4Icon />} />
    </Toolbar>
  );
}

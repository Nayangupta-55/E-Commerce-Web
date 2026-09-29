import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, toggleTheme } from '../features/theme/themeSlice';

function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector(selectThemeMode);
  const onClick = useCallback(() => dispatch(toggleTheme()), [dispatch]);

  return (
    <button
      className="btn btn-ghost"
      onClick={onClick}
      aria-pressed={mode === 'dark'}
      aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
    >
      {mode === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}

export default memo(ThemeToggle);

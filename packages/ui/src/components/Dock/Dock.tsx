import React, { useState, useRef } from 'react';
import styled from 'styled-components';

type DockPosition = 'top' | 'bottom' | 'left' | 'right';
type DockTheme = 'glass' | 'dark' | 'light';

/**
 * The item to display in the dock.
 * @typedef {Object} DockItem
 * @property {string} id - The unique identifier for the dock item.
 * @property {React.ReactNode} icon - The icon to display for the dock item.
 * @property {string} [label] - The label to display for the dock item.
 * @property () => void [onClick] - The callback function to be called when the dock item is clicked.
 * @returns {JSX.Element} The dock item.
 */
export interface DockItem {
  /**
   * The unique identifier for the dock item.
   * @type {string}
   * @required
   * @example 0
   */
  id: string;
  /**
   * The icon to display for the dock item.
   * @type {React.ReactNode}
   * @required
   * @example <Icon icon="mdi:home" width="24" />
   */
  icon: React.ReactNode;
  /**
   * The label to display for the dock item.
   * @type {string}
   * @optional
   * @example 'Home'
   */
  label?: string;
  /**
   * The callback function to be called when the dock item is clicked.
   * @type () => void
   * @optional
   * @example () => console.log('Home clicked')
   */
  onClick?: () => void;
}

/**
 * The props for the Dock component.
 * @typedef {Object} DockProps
 * @property {DockItem[]} items - The items to display in the dock.
 * @property {DockPosition} [position] - The position of the dock.
 * @property {DockTheme} [theme] - The theme of the dock.
 * @property {string} [width] - The width of the dock.
 * @property {string} [height] - The height of the dock.
 * @property {string} [padding] - The padding of the dock.
 * @returns {JSX.Element} The dock component.
 */
export interface DockProps {
  /**
   * The items to display in the dock.
   * @type {DockItem[]}
   * @required
   * @example [{ id: '0', icon: <Icon icon="mdi:home" width="24" />, label: 'Home', onClick: () => console.log('Home clicked') }]
   */
  items: DockItem[];
  /**
   * The position of the dock.
   * @type {DockPosition}
   * @optional
   * @default 'bottom'
   * @example 'top'
   */
  position?: DockPosition;
  /**
   * The theme of the dock.
   * @type {DockTheme}
   * @optional
   * @default 'glass'
   * @example 'dark'
   */
  theme?: DockTheme;
  /**
   * The width of the dock.
   * @type {string}
   * @optional
   * @default 'auto'
   * @example '100%'
   */
  width?: string;
  /**
   * The height of the dock.
   * @type {string}
   * @optional
   * @default 'auto'
   * @example '100%'
   */
  height?: string;
  /**
   * The padding of the dock.
   * @type {string}
   * @optional
   * @default '8px'
   * @example '16px'
   */
  padding?: string;
}

const getPositionStyles = (position: DockPosition, isDocked: boolean): string => {
  switch (position) {
    case 'top':
      return isDocked
        ? 'top: 0; left: 0; right: 0; height: 40px; width: 100%; border-radius: 0;'
        : 'top: 20px; left: 50%; transform: translateX(-50%);';
    case 'bottom':
      return isDocked
        ? 'bottom: 0; left: 0; right: 0; height: 40px; width: 100%; border-radius: 0;'
        : 'bottom: 20px; left: 50%; transform: translateX(-50%);';
    case 'left':
      return isDocked
        ? 'left: 0; top: 0; bottom: 0; width: 40px; border-radius: 0;'
        : 'left: 10px; top: 50%; transform: translateY(-50%); flex-direction: column;';
    case 'right':
      return isDocked
        ? 'right: 0; top: 0; bottom: 0; width: 40px; border-radius: 0;'
        : 'right: 10px; top: 50%; transform: translateY(-50%); flex-direction: column;';
    default:
      return '';
  }
};

const getBackgroundColor = (theme: DockTheme): string => {
  if (theme === 'glass') return 'rgba(255, 255, 255, 0.2)';
  if (theme === 'dark') return '#1e1e1e';
  return '#f5f5f7';
};

const getThemeStyles = (theme: DockTheme): string => {
  if (theme === 'glass') {
    return `background: ${getBackgroundColor(theme)}; backdrop-filter: blur(10px);`;
  }
  return `background: ${getBackgroundColor(theme)};`;
};

const getBorderRadiusValue = (position: DockPosition, isDocked: boolean): string => {
  if (isDocked) return '0';
  return position === 'bottom' ? '24px' : '12px';
};

const getBorderRadiusStyles = (position: DockPosition, isDocked: boolean): string => {
  return getBorderRadiusValue(position, isDocked);
};

const DockContainer = styled.div<{ $position: DockPosition; theme: DockTheme; width: string; height: string; $isDocked: boolean; $isVertical: boolean; padding?: string }>`
  position: fixed;
  display: flex;
  flex-direction: ${({ $isVertical }) => $isVertical ? 'column' : 'row'};
  ${({ $position, $isDocked }) => getPositionStyles($position, $isDocked)}
  ${({ theme }) => getThemeStyles(theme)}
  border-radius: ${({ $position, $isDocked }) => getBorderRadiusStyles($position, $isDocked)};
  padding: ${({ padding }) => padding || '8px'};
  gap: 8px;
  width: ${({ $position, width }) => $position === 'bottom' ? width : 'auto'};
  height: ${({ $position, height }) => $position !== 'bottom' ? height : 'auto'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 999;
  cursor: move;
  transition: all 0.3s ease;
  user-select: none;
`;

const DockItemWrapper = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 1.4);
  padding: 8px;
  border-radius: 8px;
  transform: ${({ $isActive }) => $isActive ? 'scale(1.4)' : 'scale(1)'};
  margin: ${({ $isActive }) => $isActive ? '0 12px' : '0'};
  filter: ${({ $isActive }) => $isActive ? 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.2))' : 'none'};

  &:hover {
    transform: scale(1.4);
    margin: 0 12px;
  }

  & > * {
    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 1.4);
  }
`;

const DockItemLabel = styled.div<{ $position: DockPosition; theme: DockTheme }>`
  position: absolute;
  font-size: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme === 'dark' ? '#fff' : '#000'};
  background: ${({ theme }) => getBackgroundColor(theme)};
  backdrop-filter: ${({ theme }) => theme === 'glass' ? 'blur(10px)' : 'none'};
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
  ${({ $position }) => $position === 'top' ? 'bottom: -28px;' : ''}
  ${({ $position }) => $position === 'bottom' ? 'top: -28px;' : ''}
  ${({ $position }) => $position === 'left' ? 'right: -8px; transform: translateX(100%);' : ''}
  ${({ $position }) => $position === 'right' ? 'left: -8px; transform: translateX(-100%);' : ''}
`;

/**
 * The Dock component.
 * @param {DockProps} props - The props for the Dock component.
 * @returns {JSX.Element} The dock component.
 */
const Dock: React.FC<DockProps> = ({
  items,
  position = 'bottom',
  theme = 'glass',
  width = 'auto',
  height = 'auto',
  padding
}) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isDocked] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showLabel, setShowLabel] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const positionState = position;
  return (
    <DockContainer
      $position={positionState}
      theme={theme}
      width={width}
      height={height}
      $isDocked={isDocked}
      $isVertical={positionState === 'left' || positionState === 'right'}
      padding={padding}
    >
      {items.map((item) => (
        <DockItemWrapper
          key={item.id}
          $isActive={activeItem === item.id}
          onMouseEnter={() => {
            setActiveItem(item.id);
            setHoveredItem(item.id);
            hoverTimerRef.current = setTimeout(() => {
              setShowLabel(true);
            }, 1250);
          }}
          onMouseLeave={() => {
            setActiveItem(null);
            setHoveredItem(null);
            setShowLabel(false);
            if (hoverTimerRef.current) {
              clearTimeout(hoverTimerRef.current);
            }
          }}
          onClick={() => {
            setActiveItem(item.id);
            if (item.onClick) {
              item.onClick();
            }
          }}
        >
          {item.icon}
          {hoveredItem === item.id && showLabel && item.label && (
            <DockItemLabel $position={positionState}>
              {item.label}
            </DockItemLabel>
          )}
        </DockItemWrapper>
      ))}
    </DockContainer>
  );
};

export default Dock;

import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import {
  Menu,
  Bell,
  Package,
  Box,
  MapPin,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Undo2,
  FileText,
  Wrench,
  AlertCircle,
  Clock,
  Edit,
  Pen,
  List,
  ClipboardList,
  Check,
  Building,
  BookOpen,
  Search,
  UserSearch,
  User,
  Settings,
  UserSquare2,
  SearchX,
  Users,
  UserCog,
  Network,
  Home,
  File,
  Phone,
  Archive,
  Grid3x3,
  PhoneCall,
  Mail,
  Laptop,
  Truck,
  Edit3,
  UserPlus,
  Factory,
  LogOut,
  type LucideIcon,
} from 'lucide-react';

// ─── Icon registry for Playground controls ───────────────────────────────────

const iconMap: Record<string, LucideIcon> = {
  Menu,
  Bell,
  Package,
  Box,
  MapPin,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Undo2,
  FileText,
  Wrench,
  AlertCircle,
  Clock,
  Edit,
  Pen,
  List,
  ClipboardList,
  Check,
  Building,
  BookOpen,
  Search,
  UserSearch,
  User,
  Settings,
  UserSquare2,
  SearchX,
  Users,
  UserCog,
  Network,
  Home,
  File,
  Phone,
  Archive,
  Grid3x3,
  PhoneCall,
  Mail,
  Laptop,
  Truck,
  Edit3,
  UserPlus,
  Factory,
  LogOut,
};

// ─── IconDisplay component ────────────────────────────────────────────────────

interface IconDisplayProps {
  icon: LucideIcon;
  name: string;
  size?: number;
}

const IconDisplay: React.FC<IconDisplayProps> = ({
  icon: Icon,
  name,
  size = 24,
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      padding: '16px',
      minWidth: '100px',
    }}>
      <Icon size={size} color="#000000" strokeWidth={1.5} />
      <span style={{ fontSize: '11px', textAlign: 'center', color: '#666' }}>{name}</span>
    </div>
  );
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Icons',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────
// Pick any icon, size, and color from the Storybook Controls panel.

interface PlaygroundArgs {
  iconName: string | LucideIcon;
  size: number;
  color: string;
  strokeWidth: number;
}

export const Playground: StoryObj<PlaygroundArgs> = {
  argTypes: {
    iconName: {
      name: 'Icon',
      options: Object.keys(iconMap),
      mapping: iconMap,
      control: { type: 'select' },
      defaultValue: 'Package',
    },
    size: {
      name: 'Size (px)',
      control: { type: 'range', min: 12, max: 64, step: 4 },
      defaultValue: 24,
    },
    color: {
      name: 'Color',
      control: { type: 'color' },
      defaultValue: '#000000',
    },
    strokeWidth: {
      name: 'Stroke width',
      control: { type: 'range', min: 0.5, max: 3, step: 0.25 },
      defaultValue: 1.5,
    },
  },
  args: {
    iconName: 'Package',
    size: 24,
    color: '#000000',
    strokeWidth: 1.5,
  },
  render: (args: PlaygroundArgs) => {
    const Icon: LucideIcon = typeof args.iconName === 'string'
      ? iconMap[args.iconName]
      : args.iconName;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <Icon size={args.size} color={args.color} strokeWidth={args.strokeWidth} />
        <span style={{ fontSize: '12px', color: '#666' }}>
          {typeof args.iconName === 'string' ? args.iconName : 'Icon'}
        </span>
      </div>
    );
  },
};

// ─── All icons ────────────────────────────────────────────────────────────────

export const AllProjectIcons: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '24px', color: '#000' }}>Project Icons (Black)</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
        border: '1px solid #e5e7eb',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fff',
      }}>
        {/* Row 1 */}
        <IconDisplay icon={Menu} name="Menu" />
        <IconDisplay icon={Bell} name="Bell" />
        <IconDisplay icon={Package} name="Package" />
        <IconDisplay icon={Box} name="Box" />
        <IconDisplay icon={MapPin} name="MapPin" />

        {/* Row 2 */}
        <IconDisplay icon={TrendingUp} name="TrendingUp" />
        <IconDisplay icon={TrendingDown} name="TrendingDown" />
        <IconDisplay icon={ArrowRight} name="ArrowRight" />
        <IconDisplay icon={Undo2} name="Undo" />
        <IconDisplay icon={FileText} name="FileText" />

        {/* Row 3 */}
        <IconDisplay icon={Wrench} name="Wrench" />
        <IconDisplay icon={AlertCircle} name="AlertCircle" />
        <IconDisplay icon={Clock} name="Clock" />
        <IconDisplay icon={Edit} name="Edit" />
        <IconDisplay icon={Pen} name="Pen" />

        {/* Row 4 */}
        <IconDisplay icon={List} name="List" />
        <IconDisplay icon={ClipboardList} name="ClipboardList" />
        <IconDisplay icon={Check} name="Check" />
        <IconDisplay icon={Building} name="Building" />
        <IconDisplay icon={BookOpen} name="BookOpen" />

        {/* Row 5 */}
        <IconDisplay icon={Search} name="Search" />
        <IconDisplay icon={UserSearch} name="UserSearch" />
        <IconDisplay icon={User} name="User" />
        <IconDisplay icon={Clock} name="Clock" />
        <IconDisplay icon={Settings} name="Settings" />

        {/* Row 6 */}
        <IconDisplay icon={UserSquare2} name="UserSquare" />
        <IconDisplay icon={SearchX} name="SearchX" />
        <IconDisplay icon={Network} name="Network" />
        <IconDisplay icon={Users} name="Users" />
        <IconDisplay icon={UserCog} name="UserCog" />

        {/* Row 7 */}
        <IconDisplay icon={Home} name="Home" />
        <IconDisplay icon={File} name="File" />
        <IconDisplay icon={Phone} name="Phone" />
        <IconDisplay icon={Archive} name="Archive" />
        <IconDisplay icon={Grid3x3} name="Grid" />

        {/* Row 8 */}
        <IconDisplay icon={PhoneCall} name="PhoneCall" />
        <IconDisplay icon={Mail} name="Mail" />
        <IconDisplay icon={Laptop} name="Laptop" />
        <IconDisplay icon={Truck} name="Truck" />
        <IconDisplay icon={Edit3} name="Edit3" />

        {/* Row 9 */}
        <IconDisplay icon={UserPlus} name="UserPlus" />
        <IconDisplay icon={Factory} name="Factory" />
        <IconDisplay icon={LogOut} name="LogOut" />
      </div>
    </div>
  ),
};

// ─── Individual icon examples ─────────────────────────────────────────────────

export const MenuIcon: Story = {
  render: () => <IconDisplay icon={Menu} name="Menu" />,
};

export const BellIcon: Story = {
  render: () => <IconDisplay icon={Bell} name="Bell" />,
};

export const PackageIcon: Story = {
  render: () => <IconDisplay icon={Package} name="Package" />,
};

export const UserIcon: Story = {
  render: () => <IconDisplay icon={User} name="User" />,
};

export const SearchIcon: Story = {
  render: () => <IconDisplay icon={Search} name="Search" />,
};

export const SettingsIcon: Story = {
  render: () => <IconDisplay icon={Settings} name="Settings" />,
};

// ─── Icon sizes ───────────────────────────────────────────────────────────────

export const IconSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <IconDisplay icon={Package} name="Small (16px)" size={16} />
      <IconDisplay icon={Package} name="Medium (24px)" size={24} />
      <IconDisplay icon={Package} name="Large (32px)" size={32} />
      <IconDisplay icon={Package} name="XLarge (48px)" size={48} />
    </div>
  ),
};

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NavigationIcons: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: '16px' }}>Navigation</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
      }}>
        <IconDisplay icon={Menu} name="Menu" />
        <IconDisplay icon={Home} name="Home" />
        <IconDisplay icon={ArrowRight} name="ArrowRight" />
        <IconDisplay icon={Undo2} name="Undo" />
        <IconDisplay icon={LogOut} name="LogOut" />
      </div>
    </div>
  ),
};

// ─── User & People ────────────────────────────────────────────────────────────

export const UserIcons: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: '16px' }}>User & People</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
      }}>
        <IconDisplay icon={User} name="User" />
        <IconDisplay icon={Users} name="Users" />
        <IconDisplay icon={UserPlus} name="UserPlus" />
        <IconDisplay icon={UserSearch} name="UserSearch" />
        <IconDisplay icon={UserSquare2} name="UserSquare" />
        <IconDisplay icon={UserCog} name="UserCog" />
      </div>
    </div>
  ),
};

// ─── Actions ─────────────────────────────────────────────────────────────────

export const ActionIcons: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: '16px' }}>Actions</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
      }}>
        <IconDisplay icon={Edit} name="Edit" />
        <IconDisplay icon={Edit3} name="Edit3" />
        <IconDisplay icon={Pen} name="Pen" />
        <IconDisplay icon={Check} name="Check" />
        <IconDisplay icon={Search} name="Search" />
        <IconDisplay icon={SearchX} name="SearchX" />
      </div>
    </div>
  ),
};

// ─── Business ────────────────────────────────────────────────────────────────

export const BusinessIcons: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: '16px' }}>Business</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
      }}>
        <IconDisplay icon={Package} name="Package" />
        <IconDisplay icon={Box} name="Box" />
        <IconDisplay icon={Truck} name="Truck" />
        <IconDisplay icon={Building} name="Building" />
        <IconDisplay icon={Factory} name="Factory" />
        <IconDisplay icon={Archive} name="Archive" />
      </div>
    </div>
  ),
};

// ─── Communication ───────────────────────────────────────────────────────────

export const CommunicationIcons: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: '16px' }}>Communication</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
      }}>
        <IconDisplay icon={Bell} name="Bell" />
        <IconDisplay icon={Mail} name="Mail" />
        <IconDisplay icon={Phone} name="Phone" />
        <IconDisplay icon={PhoneCall} name="PhoneCall" />
      </div>
    </div>
  ),
};

// ─── System ──────────────────────────────────────────────────────────────────

export const SystemIcons: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: '16px' }}>System</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
      }}>
        <IconDisplay icon={Settings} name="Settings" />
        <IconDisplay icon={Wrench} name="Wrench" />
        <IconDisplay icon={Clock} name="Clock" />
        <IconDisplay icon={AlertCircle} name="AlertCircle" />
        <IconDisplay icon={Grid3x3} name="Grid" />
        <IconDisplay icon={Network} name="Network" />
      </div>
    </div>
  ),
};
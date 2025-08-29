# Responsive Tabs Component

A responsive React tabs component that automatically switches between horizontal tabs and dropdown menu on mobile devices.

## Features

- 🎯 **Responsive Design**: Automatically adapts to mobile and desktop
- 📱 **Mobile Dropdown**: Switches to dropdown when too many tabs for mobile
- 🏷️ **Count Badges**: Optional count badges for each tab
- 🎨 **Customizable**: Configurable mobile breakpoint and styling
- 📦 **TypeScript**: Fully typed with TypeScript support
- 🎭 **Styling**: Works with Tailwind CSS and custom CSS

## Installation

```bash
npm install @localwebcafe/responsive-tabs
# or
yarn add @localwebcafe/responsive-tabs
```

**Note**: This package is published to GitHub Packages. If you haven't configured npm to use GitHub Packages, you may need to:

1. Create a `.npmrc` file in your project root with:
```
@localwebcafe:registry=https://npm.pkg.github.com
```

2. Or run this command to configure npm:
```bash
npm config set @localwebcafe:registry https://npm.pkg.github.com
```

## Dependencies

This component requires the following peer dependencies:

```json
{
  "react": ">=16.8.0",
  "react-dom": ">=16.8.0"
}
```

And these dependencies:

```json
{
  "@radix-ui/react-dropdown-menu": "^2.1.16",
  "clsx": "^2.1.1",
  "lucide-react": "^0.487.0"
}
```

## Usage

```tsx
import { ResponsiveTabs, TabItem } from '@localwebcafe/responsive-tabs';

const tabs: TabItem[] = [
  {
    id: "overview",
    label: "Overview",
    shortLabel: "Overview",
    count: 5,
    content: <div>Overview content</div>
  },
  {
    id: "analytics",
    label: "Analytics",
    shortLabel: "Analytics",
    count: 12,
    content: <div>Analytics content</div>
  },
  {
    id: "reports",
    label: "Reports",
    shortLabel: "Reports",
    count: 3,
    content: <div>Reports content</div>
  }
];

function MyComponent() {
  return (
    <ResponsiveTabs 
      tabs={tabs}
      defaultTab="overview"
      showCounts={true}
      mobileBreakpoint={4}
      onTabChange={(tabId) => console.log('Tab changed to:', tabId)}
    />
  );
}
```

## Props

### ResponsiveTabsProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `TabItem[]` | - | Array of tab items (required) |
| `defaultTab` | `string` | First tab ID | ID of the initially active tab |
| `className` | `string` | - | Additional CSS classes |
| `onTabChange` | `(tabId: string) => void` | - | Callback when tab changes |
| `showCounts` | `boolean` | `true` | Whether to show count badges |
| `mobileBreakpoint` | `number` | `4` | Number of tabs before switching to dropdown on mobile |
| `isMobile` | `boolean` | - | External control of mobile state (optional) |

### TabItem

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier for the tab |
| `label` | `string` | Yes | Full label for desktop display |
| `shortLabel` | `string` | No | Short label for mobile display |
| `count` | `number \| null` | No | Count to display in badge |
| `content` | `React.ReactNode` | Yes | Content to render when tab is active |

## Styling

The component uses Tailwind CSS classes. You can customize the appearance by:

1. **Overriding classes**: Pass custom `className` prop
2. **CSS Variables**: The component uses CSS custom properties for theming
3. **Tailwind Config**: Ensure your Tailwind config includes the necessary classes

### CSS Variables Used

```css
:root {
  --background: #ffffff;
  --foreground: #000000;
  --primary: #007acc;
  --primary-foreground: #ffffff;
  --secondary: #f1f5f9;
  --secondary-foreground: #64748b;
  --muted: #f8fafc;
  --muted-foreground: #64748b;
  --accent: #f1f5f9;
  --accent-foreground: #0f172a;
  --border: #e2e8f0;
}
```

## Examples

### Basic Usage

```tsx
<ResponsiveTabs tabs={tabs} />
```

### With Custom Styling

```tsx
<ResponsiveTabs 
  tabs={tabs}
  className="my-custom-tabs"
  showCounts={false}
/>
```

### With External Mobile Control

```tsx
const [isMobile, setIsMobile] = useState(false);

<ResponsiveTabs 
  tabs={tabs}
  isMobile={isMobile}
  mobileBreakpoint={3}
/>
```

### With Tab Change Handler

```tsx
<ResponsiveTabs 
  tabs={tabs}
  onTabChange={(tabId) => {
    // Handle tab change
    analytics.track('tab_changed', { tabId });
  }}
/>
```

## Browser Support

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

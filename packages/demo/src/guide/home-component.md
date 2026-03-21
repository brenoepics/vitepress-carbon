# Home Page

::: tip Tips
The global `layout: home` component must be used in the `md` file of the home page plus some other metadata. This is an example of how it works:
:::

<<< @/index.md{2}

### Glowing Icon Customization

The background color of the glowing icon can be customized using the `glowingIcon` prop.

```vue
<VPHighlight glowingIcon="#ff0000" />
```

| Prop          | Type     | Default               | Description                                           |
| ------------- | -------- | --------------------- | ----------------------------------------------------- |
| `glowingIcon` | `string` | `var(--vp-c-brand-3)` | Sets the background color of the glowing icon effect. |

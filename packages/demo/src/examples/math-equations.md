# Math Equations

This is currently opt-in. To enable it, you need to install `markdown-it-mathjax3` and set `markdown.math` to `true` in your config file:

```sh
npm add -D markdown-it-mathjax3
```

```ts
// .vitepress/config.ts
export default {
  markdown: {
    math: true
  }
}
```

## Inline Equations

You can add inline math equations by wrapping them in single dollar signs `$`.

**Input:**
```md
Albert Einstein's famous equation is $E = mc^2$, which explains the relationship between mass and energy. 
Another inline example is the Pythagorean theorem $a^2 + b^2 = c^2$, which works perfectly within a sentence without breaking the layout.
```

**Output:**

Albert Einstein's famous equation is $E = mc^2$, which explains the relationship between mass and energy. 
Another inline example is the Pythagorean theorem $a^2 + b^2 = c^2$, which works perfectly within a sentence without breaking the layout.

## Block Equations (Centered)

For equations that need to stand out or require more space, you can use block equations by wrapping them in double dollar signs `$$`. This will center them on their own line.

**Input:**
```md
When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are:

$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$
```

**Output:**

When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are:

$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$

## Large Equations (Scrollable)

If an equation is too long to fit on the screen, VitePress will automatically provide a horizontal scrollbar so it doesn't break the layout.

**Input:**
```md
$$
\left( \sum_{k=1}^n a_k b_k \right)^2 \le \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right) \quad \text{where } a_i, b_i \in \mathbb{R} \text{ for } i = 1, \dots, n \text{ and } \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi} \text{ and } \lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e
$$
```

**Output:**

$$
\left( \sum_{k=1}^n a_k b_k \right)^2 \le \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right) \quad \text{where } a_i, b_i \in \mathbb{R} \text{ for } i = 1, \dots, n \text{ and } \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi} \text{ and } \lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e
$$

## Equations in Tables

You can even place equations inside Markdown tables:

**Input:**
```md
| equation | description |
| -------- | ----------- |
| $\nabla \cdot \vec{\mathbf{B}}  = 0$ | divergence of $\vec{\mathbf{B}}$ is zero |
| $\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t}  = \vec{\mathbf{0}}$ | curl of $\vec{\mathbf{E}}$ is proportional to the rate of change of $\vec{\mathbf{B}}$ |
| $\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} = \frac{4\pi}{c}\vec{\mathbf{j}} \quad \nabla \cdot \vec{\mathbf{E}} = 4 \pi \rho$ | Maxwell's equations |
```

**Output:**

| equation | description |
| -------- | ----------- |
| $\nabla \cdot \vec{\mathbf{B}}  = 0$ | divergence of $\vec{\mathbf{B}}$ is zero |
| $\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t}  = \vec{\mathbf{0}}$ | curl of $\vec{\mathbf{E}}$ is proportional to the rate of change of $\vec{\mathbf{B}}$ |
| $\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} = \frac{4\pi}{c}\vec{\mathbf{j}} \quad \nabla \cdot \vec{\mathbf{E}} = 4 \pi \rho$ | Maxwell's equations |

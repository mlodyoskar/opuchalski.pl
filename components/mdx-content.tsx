import * as runtime from 'react/jsx-runtime';

type MDXComponent = React.ComponentType<{
  components?: Record<string, React.ElementType>;
}>;

const componentCache = new Map<string, MDXComponent>();

const useMDXComponent = (code: string) => {
  const cachedComponent = componentCache.get(code);

  if (cachedComponent) {
    return cachedComponent;
  }

  const fn = new Function(code);
  const Component = fn({ ...runtime }).default as MDXComponent;
  componentCache.set(code, Component);
  return Component;
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ElementType>;
}

export const MDXContent = ({ code, components }: MDXProps) => {
  const Component = useMDXComponent(code);
  // eslint-disable-next-line react-hooks/static-components
  return <Component components={components} />;
};

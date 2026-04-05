import ContainerWrapper from '../(user)/ContainerWrapper';

export default function EditorLayout({ children }) {
  return (
    <main style={{ paddingTop: '88px' }}>
      <ContainerWrapper>{children}</ContainerWrapper>
    </main>
  );
}

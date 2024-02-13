import { Button, Layout, Card } from 'antd';
import { useEffect, useState } from 'react';

const { Content } = Layout;

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [installPrompt, setInstallPrompt] = useState<any>(null);


  useEffect(() => {

    window.addEventListener('beforeinstallprompt', (e) => {
      setInstallPrompt(e);
      console.log("It is okay")
    });
  }, []);

  const installPWA = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('PWA installed');
    } else {
      console.log('PWA installation rejected');
    }
    setInstallPrompt(null);
  };

  return (
    <Layout className="layout" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Content style={{ padding: '20px' }}>
        <Card title="Welcome to My PWA" bordered={true} style={{ width: 300 }}>
          <Button type="primary" block disabled={!installPrompt} onClick={installPWA}>
            Install
          </Button>
        </Card>
      </Content>
    </Layout>
  );
}

export default App;

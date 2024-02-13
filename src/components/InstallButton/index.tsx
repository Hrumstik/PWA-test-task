import { useEffect, useState } from "react";
import { Button, Progress } from "antd";

export default function InstallButton() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [installProgress, setInstallProgress] = useState(0);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [showDownloadButton, setShowDownloadButton] = useState(true);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    const isPWAInstalledOnLoad = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    setIsPWAInstalled(isPWAInstalledOnLoad);

    window.addEventListener("beforeinstallprompt", (e) => {
      setInstallPrompt(e);
      console.log("It is okay");
    });

    window.addEventListener("appinstalled", () => {
      setIsPWAInstalled(true);
      window.location.href = "https://www.youtube.com/watch?v=37vhxQQukdE";
    });
  }, []);

  const downloadPWA = async () => {
    if (!installPrompt && isPWAInstalled) return;
    setShowDownloadButton(false);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setInstallProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsDownloaded(true);
        setInstallProgress(0);
      }
    }, 1000);
  };

  const installPWA = () => {
    if (isPWAInstalled) {
      setInstalling(true);
      setTimeout(() => {
        window.location.href = "https://www.youtube.com/watch?v=37vhxQQukdE";
      }, 10000);
    } else {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          console.log("PWA installed");
        } else {
          console.log("PWA installation rejected");
        }
        setInstallPrompt(null);
      });
    }
  };
  return (
    <>
      {installProgress > 0 && <Progress percent={installProgress} />}
      {showDownloadButton && (
        <Button type="primary" block onClick={downloadPWA}>
          Download
        </Button>
      )}
      {isDownloaded && (
        <Button type="primary" block onClick={installPWA}>
          {installing ? "Installing" : "Install"}
        </Button>
      )}
    </>
  );
}

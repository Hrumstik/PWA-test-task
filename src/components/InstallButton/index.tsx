import { useEffect, useState } from "react";
import { Button, Progress } from "antd";

// Определение типа для события beforeinstallprompt
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function InstallButton() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isPWAInstalled, setIsPWAInstalled] = useState<boolean>(false);
  const [installing, setInstalling] = useState<boolean>(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [showOpenButton, setShowOpenButton] = useState<boolean>(false);

  useEffect(() => {
    const isPWAInstalledOnLoad = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    setIsPWAInstalled(isPWAInstalledOnLoad);

    const fakeInstall = async () => {
      console.log(1);
      setInstalling(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setInstallProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setInstallProgress(0);
          setShowOpenButton(true);
        }
      }, 1000);
    };

    if (isPWAInstalledOnLoad) {
      setIsPWAInstalled(true);
      fakeInstall();
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );

    window.addEventListener("appinstalled", () => {});

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
    };
  }, [installPrompt, isPWAInstalled]);

  const installPWA = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();

    const choiceResult = await installPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("PWA installed");
      setIsPWAInstalled(true);
    } else {
      console.log("PWA installation rejected");
    }
    setInstallPrompt(null);
  };

  const openLink = () => {
    window.location.href = "https://www.youtube.com/watch?v=37vhxQQukdE";
  };

  return (
    <>
      {installProgress > 0 && (
        <Progress
          strokeColor={{ "0%": "rgb(0, 135, 95)", "100%": "rgb(0, 135, 95)" }}
          percent={installProgress}
        />
      )}
      {!isPWAInstalled && (
        <Button
          style={{
            backgroundColor: "rgb(0, 135, 95)",
            borderColor: "rgb(0, 135, 95)",
            color: "#fff",
          }}
          type="primary"
          block
          onClick={installPWA}
        >
          {installing ? "Installing" : "Install"}
        </Button>
      )}
      {showOpenButton && (
        <Button
          style={{
            backgroundColor: "rgb(0, 135, 95)",
            borderColor: "rgb(0, 135, 95)",
            color: "#fff",
          }}
          type="primary"
          block
          onClick={openLink}
        >
          Open
        </Button>
      )}
    </>
  );
}

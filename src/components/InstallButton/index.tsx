import React, { useEffect, useState } from "react";
import { Button, Progress } from "antd";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface Props {
  link: string;
}

const InstallButton: React.FC<Props> = ({ link }) => {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isPWAActive, setIsPWAActive] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [isFakeLoadingEnded, setIsFakeLoadingEnded] = useState(false);
  const [showOpenButton, setShowOpenButton] = useState(false);

  const isPWAInstalled = localStorage.getItem("isPWAInstalled") === "true";

  const fakeInstall = async () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setInstallProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setInstallProgress(0);
        setIsFakeLoadingEnded(true);
      }
    }, 1000);
  };

  useEffect(() => {
    const isPWAActiveted = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    setIsPWAActive(isPWAActiveted);

    if (isPWAActiveted) {
      setIsPWAActive(true);
      setShowOpenButton(true);
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
    };
  }, [installPrompt, isPWAActive]);

  const installPWA = async () => {
    if (!isPWAInstalled && installPrompt) {
      setInstalling(true);
      await installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setIsPWAActive(true);
        localStorage.setItem("isPWAInstalled", "true");
      } else {
        alert("PWA installation rejected");
      }

      setInstallPrompt(null);
      setShowOpenButton(true);
    }
  };

  const openLink = () => {
    window.location.href = link;
  };

  const showDownloadButton =
    !isPWAActive &&
    !isFakeLoadingEnded &&
    installProgress === 0 &&
    !isPWAInstalled;
  const showInstallButton =
    !isPWAActive && isFakeLoadingEnded && !isPWAInstalled;
  const showOpenAppButton = (isPWAActive && showOpenButton) || isPWAInstalled;

  return (
    <>
      {installProgress > 0 && (
        <Progress
          strokeColor={{ "0%": "rgb(0, 135, 95)", "100%": "rgb(0, 135, 95)" }}
          percent={installProgress}
        />
      )}
      {showDownloadButton && (
        <Button
          style={{
            backgroundColor: "rgb(0, 135, 95)",
            borderColor: "rgb(0, 135, 95)",
            color: "#fff",
          }}
          type="primary"
          onClick={fakeInstall}
          block
        >
          Download
        </Button>
      )}
      {showInstallButton && (
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
      {showOpenAppButton && (
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
};

export default InstallButton;

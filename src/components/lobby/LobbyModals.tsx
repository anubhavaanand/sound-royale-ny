import React from 'react';
import { OnboardingModal } from '@/components/game/OnboardingModal';
import { DiscordLinkModal } from '@/components/game/DiscordLinkModal';

interface LobbyModalsProps {
  showOnboarding: boolean;
  showDiscordModal: boolean;
  onOnboardingClose: () => void;
  onDiscordModalClose: () => void;
  onDiscordStatusChange: () => void;
}

export function LobbyModals({
  showOnboarding,
  showDiscordModal,
  onOnboardingClose,
  onDiscordModalClose,
  onDiscordStatusChange,
}: LobbyModalsProps) {
  return (
    <>
      <OnboardingModal isOpen={showOnboarding} onClose={onOnboardingClose} />

      <DiscordLinkModal
        isOpen={showDiscordModal}
        onClose={onDiscordModalClose}
        onStatusChange={onDiscordStatusChange}
      />
    </>
  );
}
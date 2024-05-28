export function getAvatarVisualNumber({ address }: { address: string }) {
  const slicedAddress = address.slice(2);
  const chosenImageIndex = parseInt(slicedAddress, 10) % 13;
  if (chosenImageIndex < 1 || chosenImageIndex > 13) {
    return 'profile-avatar-bg-1';
  }
  return `profile-avatar-bg-${chosenImageIndex}`;
}
